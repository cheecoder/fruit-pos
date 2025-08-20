import express from "express";
import cors from "cors";
import fruitsRouter from "./routes/fruits";
import ordersRouter from "./routes/orders";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/fruits", fruitsRouter);
app.use("/api/orders", ordersRouter);

app.listen(3000, () => console.log("Backend running on http://localhost:3000"));
