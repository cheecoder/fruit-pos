import { prisma } from "../utils/db.ts";
import { Request, Response } from "express";

export const getAllFruits = async (req: Request, res: Response) => {
  try {
    const fruits = await prisma.fruit.findMany();
    res.json(fruits);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch fruits" });
  }
};
