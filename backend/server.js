import express from "express";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoute.js";
import products from "./data/products.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
dotenv.config();
const port = process.env.PORT || 8000;

const app = express();
connectDB();

app.get("/", (req, res) => {
  res.send("App is running");
});

app.use("/api/products", productRoutes);
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log("Server listening on port", port);
});
