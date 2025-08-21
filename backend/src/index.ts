import express from "express";
import cors from "cors";
import fruitsRouter from "./routes/fruits.ts";
import ordersRouter from "./routes/orders.ts";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/fruits", fruitsRouter);
app.use("/api/orders", ordersRouter);

const PORT = process.env.PORT || 3000;

app.listen(3000, () =>
  console.log(`Backend running on http://localhost:${PORT}`)
);
