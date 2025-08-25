import { describe, it, expect, vi, beforeEach } from "vitest";
import { Request, Response } from "express";
import {
  getAllFruits,
  createOrModifyFruitByName,
} from "../fruitsController.ts";
import { prisma } from "../../utils/db.ts";

vi.mock("../../utils/db.ts", () => ({
  prisma: {
    fruit: {
      findMany: vi.fn(),
      upsert: vi.fn(),
    },
  },
}));

const mockResponse = () => {
  const res: Partial<Response> = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res as Response;
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe("getAllFruits", () => {
  it("returns all fruits ordered by stock desc", async () => {
    const fruitsMock = [
      { name: "Apple", stock: 10, priceCents: 500 },
      { name: "Banana", stock: 5, priceCents: 200 },
    ];

    (prisma.fruit.findMany as any).mockResolvedValue(fruitsMock);

    const req = {} as Request;
    const res = mockResponse();

    await getAllFruits(req, res);

    expect(prisma.fruit.findMany).toHaveBeenCalledWith({
      orderBy: { stock: "desc" },
    });
    expect(res.json).toHaveBeenCalledWith(fruitsMock);
  });

  it("handles errors", async () => {
    (prisma.fruit.findMany as any).mockRejectedValue(new Error("DB error"));

    const req = {} as Request;
    const res = mockResponse();

    await getAllFruits(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Failed to fetch fruits",
    });
  });
});

describe("createOrModifyFruitByName", () => {
  it("creates or updates a fruit successfully", async () => {
    const req = { body: { name: "apple", stock: 5, price: 2.5 } } as Request;
    const res = mockResponse();

    const upsertMock = { name: "Apple", stock: 5, priceCents: 250 };
    (prisma.fruit.upsert as any).mockResolvedValue(upsertMock);

    await createOrModifyFruitByName(req, res);

    expect(prisma.fruit.upsert).toHaveBeenCalledWith({
      where: { name: "Apple" },
      update: { stock: 5, priceCents: 250 },
      create: { name: "Apple", stock: 5, priceCents: 250 },
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(upsertMock);
  });

  it("returns 400 on Zod schema error", async () => {
    const req = { body: { name: "", stock: -1, price: -5 } } as Request;
    const res = mockResponse();

    await createOrModifyFruitByName(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Something went wrong with the schema",
    });
  });

  it("returns 400 on unique constraint error", async () => {
    const req = { body: { name: "Apple", stock: 5, price: 2.5 } } as Request;
    const res = mockResponse();

    (prisma.fruit.upsert as any).mockRejectedValue({ code: "P2002" });

    await createOrModifyFruitByName(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Fruit with this name already exists",
    });
  });

  it("returns 500 on unexpected error", async () => {
    const req = { body: { name: "Apple", stock: 5, price: 2.5 } } as Request;
    const res = mockResponse();

    (prisma.fruit.upsert as any).mockRejectedValue(new Error("DB down"));

    await createOrModifyFruitByName(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
  });
});
