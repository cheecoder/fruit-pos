import express from "express";
import cors from "cors";
import fruitsRouter from "./routes/fruits.ts";
import ordersRouter from "./routes/orders.ts";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/fruits", fruitsRouter);
app.use("/api/orders", ordersRouter);

if (process.env.NODE_ENV === "production") {
  import("path").then((path) => {
    import("express").then((express) => {
      const __dirname = path.resolve();
      app.use(express.static(path.join(__dirname, "../frontend/dist")));
      app.get("/{*any}", (req, res) =>
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html"))
      );
    });
  });
}
const PORT = process.env.PORT || 3000;

app.listen(3000, () =>
  console.log(`Backend running on http://localhost:${PORT}`)
);
