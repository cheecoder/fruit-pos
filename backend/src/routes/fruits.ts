import { Router } from "express";
import {
  createOrModifyFruitByName,
  getAllFruits,
} from "../controllers/fruitsController.ts";
import { authenticateToken } from "../middleware/authMiddleware.ts";

const router = Router();
router.get("/", getAllFruits);
router.post("/", authenticateToken, createOrModifyFruitByName);
export default router;
