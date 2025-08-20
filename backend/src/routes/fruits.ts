import { Router } from "express";
import { getAllFruits } from "../controllers/fruitsController";

const router = Router();
router.get("/", getAllFruits);

export default router;
