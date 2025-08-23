import z from "zod";
import { prisma } from "../utils/db.ts";
import { Request, Response } from "express";

const createFruitSchema = z.object({
  name: z.string().min(1, "Fruit name is required"),
  stock: z.number().int().nonnegative("Stock must be >= 0"),
  price: z.number().nonnegative("Price must be >= 0"), // dollars as float
});

export const getAllFruits = async (req: Request, res: Response) => {
  try {
    const fruits = await prisma.fruit.findMany();
    res.json(fruits);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch fruits" });
  }
};

export const createFruit = async (req: Request, res: Response) => {
  console.log("Creating Fruit...");
  try {
    const { name, stock, price } = createFruitSchema.parse(req.body);
    const priceCents = Math.round(price * 100);
    console.log(
      `Creating fruit with name: ${name}, stock: ${stock}, price in cents: ${priceCents}`
    );

    const fruit = await prisma.fruit.create({
      data: { name, stock, priceCents },
    });
    res.status(201).json(fruit);
  } catch (err: any) {
    if (err.code === "P2002") {
      // Unique constraint failed
      return res
        .status(400)
        .json({ error: "Fruit with this name already exists" });
    }
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: z.prettifyError(err) });
    }
    console.error("Error creating fruit:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
