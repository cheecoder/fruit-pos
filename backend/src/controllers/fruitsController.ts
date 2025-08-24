import z from "zod";
import { prisma } from "../utils/db.ts";
import { Request, Response } from "express";
import { capitalizeFirstLetterOfName } from "../utils/helper.ts";
import { logger } from "../utils/logger.ts";

const createFruitSchema = z.object({
  name: z.string().min(1, "Fruit name is required"),
  stock: z.number().int().nonnegative("Stock must be >= 0"),
  price: z.number().nonnegative("Price must be >= 0"), // dollars as float
});

export const getAllFruits = async (req: Request, res: Response) => {
  logger.debug("Incoming getAllFruits request");

  try {
    // Fruits with highest stock count should be listed first
    const fruits = await prisma.fruit.findMany({ orderBy: { stock: "desc" } });

    logger.info({ count: fruits.length }, "Fetched orders list");

    return res.json(fruits);
  } catch (err) {
    logger.error({ err }, "Error retrieving fruits");

    return res.status(500).json({ message: "Failed to fetch fruits" });
  }
};

export const createOrModifyFruitByName = async (
  req: Request,
  res: Response
) => {
  logger.debug("Incoming createOrModifyFruitByName request");
  try {
    const { name, stock, price } = createFruitSchema.parse(req.body);

    const priceCents = Math.round(price * 100);
    const normalizedName = capitalizeFirstLetterOfName(name);

    const fruit = await prisma.fruit.upsert({
      where: { name: normalizedName },
      update: {
        stock,
        priceCents,
      },
      create: {
        name: normalizedName,
        stock,
        priceCents,
      },
    });
    logger.info({ fruit }, "Fruit created or modified");

    return res.status(200).json(fruit);
  } catch (err: any) {
    if (err.code === "P2002") {
      // Unique constraint failed
      logger.error({ err }, "Fruit with this name already exists");

      return res
        .status(400)
        .json({ error: "Fruit with this name already exists" });
    }
    if (err instanceof z.ZodError) {
      logger.error({ error: z.prettifyError(err) }, "ZodError");

      return res
        .status(400)
        .json({ error: "Something went wrong with the schema" });
    }
    logger.error({ err });
    return res.status(500).json({ error: "Internal server error" });
  }
};
