import { Router } from "express";
import { createFruit, getAllFruits } from "../controllers/fruitsController.ts";
import { authenticateToken } from "../middleware/authMiddleware.ts";

const router = Router();
router.get("/", getAllFruits);
router.post("/", authenticateToken, createFruit);
export default router;
