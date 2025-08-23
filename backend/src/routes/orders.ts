import { Router } from "express";
import {
  getOrders,
  submitOrder,
  updateOrderStatus,
} from "../controllers/ordersController.ts";
import { authenticateToken } from "../middleware/authMiddleware.ts";

const router = Router();
router.post("/", submitOrder);
router.get("/", authenticateToken, getOrders);
router.patch("/status", authenticateToken, updateOrderStatus);

export default router;
