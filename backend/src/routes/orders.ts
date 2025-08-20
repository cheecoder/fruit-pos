import { Router } from "express";
import {
  getOrders,
  submitOrder,
  updateOrderStatus,
} from "../controllers/ordersController";

const router = Router();
router.post("/", submitOrder);
router.get("/", getOrders);
router.patch("/status", updateOrderStatus);

export default router;
