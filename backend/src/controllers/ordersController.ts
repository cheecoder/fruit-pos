import { prisma } from "../utils/db.ts";
import { Request, Response } from "express";
import { z } from "zod";
import { logger } from "../utils/logger.ts";

type OrderItemInput = {
  fruitId: string;
  qty: number;
  priceCents: number;
};

type OrderUpdatePayload = {
  id: string;
  status: "Pending" | "Completed";
};

const submitOrderSchema = z.object({
  items: z
    .array(
      z.object({
        fruitId: z.string(),
        qty: z.number().int().min(1),
        priceCents: z.number().int().min(1),
      })
    )
    .nonempty(),
});

export const getOrders = async (req: Request, res: Response) => {
  logger.debug("Incoming getOrders request");

  try {
    const orders = await prisma.order.findMany({
      include: {
        items: {
          include: {
            fruit: true, // include fruit details
          },
        },
      },
      orderBy: { createdAt: "desc" }, // latest orders first
    });

    logger.info({ count: orders.length }, "Fetched orders list");

    return res.json(orders);
  } catch (err) {
    logger.error({ err }, "Error retrieving orders");

    return res.status(500).json({ message: "Failed to fetch orders" });
  }
};

export const submitOrder = async (req: Request, res: Response) => {
  logger.debug("Incoming submitOrder request");

  try {
    const data = submitOrderSchema.parse(req.body);
    const { items } = data;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items in order" });
    }
    const totalCents = items.reduce(
      (acc: number, i: OrderItemInput) => acc + i.qty * i.priceCents,
      0
    );

    const order = await prisma.order.create({
      data: {
        totalCents,
        items: {
          create: items.map((i: OrderItemInput) => ({
            fruitId: i.fruitId,
            qty: i.qty,
            unitPriceCents: i.priceCents,
          })),
        },
      },
      include: { items: true },
    });

    logger.info({ items }, "Submit order");

    return res.status(201).json(order);
  } catch (err) {
    logger.error({ err });

    return res.status(500).json({ message: "Failed to submit order" });
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  logger.debug("Incoming updateOrderStatus request");

  try {
    const { id, status } = req.body as OrderUpdatePayload;

    const result = await prisma.$transaction(async (tx) => {
      // 1. Update the order status
      const updatedOrder = await tx.order.update({
        where: { id },
        data: { status },
        include: { items: { include: { fruit: true } } },
      });

      // 2. If updated to Complete successfully, decrease the stock for each fruit
      if (status === "Completed") {
        for (const item of updatedOrder.items) {
          await tx.fruit.update({
            where: { id: item.fruitId },
            data: { stock: { decrement: item.qty } },
          });
        }
      }
      return updatedOrder;
    });
    logger.info({ result }, "Update order status");

    return res.json(result);
  } catch (err) {
    logger.error({ err });
    return res.status(500).json({ message: "Failed to update order status" });
  }
};
