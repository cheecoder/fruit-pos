import { Router } from "express";
import {
  getOrders,
  getUserOrders,
  submitOrder,
  updateOrderStatus,
} from "../controllers/ordersController.ts";
import {
  authenticateToken,
  optionalAuthenticateToken,
} from "../middleware/authMiddleware.ts";

const router = Router();
router.post("/", optionalAuthenticateToken, submitOrder);
router.get("/", authenticateToken, getOrders);
router.get("/me", authenticateToken, getUserOrders);
router.patch("/status", authenticateToken, updateOrderStatus);

export default router;
