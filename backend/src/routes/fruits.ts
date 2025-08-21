import { Router } from "express";
import { getAllFruits } from "../controllers/fruitsController.ts";

const router = Router();
router.get("/", getAllFruits);

export default router;
