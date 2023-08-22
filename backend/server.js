import express from "express";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoute.js";
import userRoutes from "./routes/userRoute.js";
import products from "./data/products.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
dotenv.config();
const port = process.env.PORT || 8000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
connectDB();

app.get("/", (req, res) => {
  res.send("App is running");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log("Server listening on port", port);
});
