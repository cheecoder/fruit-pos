import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/fruits", async (req, res) => {
  const fruits = await prisma.fruit.findMany();
  res.json(fruits);
});

app.listen(3000, () => console.log("Backend running on http://localhost:3000"));
