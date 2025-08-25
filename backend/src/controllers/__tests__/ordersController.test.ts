import { describe, it, expect, vi, beforeEach } from "vitest";
import { Request, Response } from "express";
import {
  getOrders,
  getUserOrders,
  submitOrder,
  updateOrderStatus,
} from "../ordersController.ts";
import { prisma } from "../../utils/db.ts";

vi.mock("../../utils/db.ts", () => ({
  prisma: {
    order: {
      findMany: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
    },
    fruit: {
      update: vi.fn(),
    },
    $transaction: vi.fn(),
  },
}));

const mockResponse = () => {
  const res: Partial<Response> = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res as Response;
};

// Reset mocks before each test
beforeEach(() => {
  vi.clearAllMocks();
});

describe("getOrders", () => {
  it("should return all orders", async () => {
    const mockOrders = [{ id: "1", items: [] }];
    (prisma.order.findMany as any).mockResolvedValue(mockOrders);

    const req = {} as Request;
    const res = mockResponse();

    await getOrders(req, res);

    expect(prisma.order.findMany).toHaveBeenCalledWith({
      include: { items: { include: { fruit: true } } },
      orderBy: { createdAt: "desc" },
    });
    expect(res.json).toHaveBeenCalledWith(mockOrders);
  });

  it("should handle errors", async () => {
    (prisma.order.findMany as any).mockRejectedValue(new Error("DB error"));
    const req = {} as Request;
    const res = mockResponse();

    await getOrders(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Failed to fetch orders",
    });
  });
});

describe("getUserOrders", () => {
  it("should return 401 if no user", async () => {
    const req = {} as Request;
    const res = mockResponse();

    await getUserOrders(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Unauthorized" });
  });

  it("should return user orders", async () => {
    const mockOrders = [{ id: "1", items: [] }];
    (prisma.order.findMany as any).mockResolvedValue(mockOrders);

    const req = { user: { id: "user1" } } as any;
    const res = mockResponse();

    await getUserOrders(req, res);

    expect(prisma.order.findMany).toHaveBeenCalledWith({
      where: { userId: "user1" },
      include: { items: { include: { fruit: true } } },
      orderBy: { createdAt: "desc" },
    });
    expect(res.json).toHaveBeenCalledWith(mockOrders);
  });
});

describe("submitOrder", () => {
  it("should submit order successfully", async () => {
    const req = {
      body: {
        items: [
          { fruitId: "f1", qty: 2, priceCents: 100 },
          { fruitId: "f2", qty: 1, priceCents: 200 },
        ],
      },
      user: { id: "user1" },
    } as any;

    const res = mockResponse();

    const createdOrder = {
      id: "order1",
      items: req.body.items,
      user: { id: "user1" },
    };
    (prisma.order.create as any).mockResolvedValue(createdOrder);

    await submitOrder(req, res);

    expect(prisma.order.create).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(createdOrder);
  });

  it("should return 400 if no items", async () => {
    const req = { body: { items: [] } } as any;
    const res = mockResponse();

    await submitOrder(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Failed to submit order",
    });
  });

  it("should handle errors", async () => {
    const req = {
      body: { items: [{ fruitId: "f1", qty: 1, priceCents: 100 }] },
    } as any;
    const res = mockResponse();

    (prisma.order.create as any).mockRejectedValue(new Error("DB down"));

    await submitOrder(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Failed to submit order",
    });
  });
});

describe("updateOrderStatus", () => {
  it("should update order and decrease fruit stock if completed", async () => {
    const req = { body: { id: "order1", status: "Completed" } } as any;
    const res = mockResponse();

    const order = { id: "order1", items: [{ fruitId: "f1", qty: 2 }] };
    (prisma.$transaction as any).mockImplementation(async (fn: any) =>
      fn(prisma)
    );

    (prisma.order.update as any).mockResolvedValue(order);
    (prisma.fruit.update as any).mockResolvedValue({});

    await updateOrderStatus(req, res);

    expect(res.json).toHaveBeenCalledWith(order);
  });

  it("should handle errors", async () => {
    const req = { body: { id: "order1", status: "Pending" } } as any;
    const res = mockResponse();

    (prisma.$transaction as any).mockRejectedValue(new Error("DB down"));

    await updateOrderStatus(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Failed to update order status",
    });
  });
});
