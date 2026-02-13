import express from "express";
import cors from "cors";
import { products } from "./data.js";

const app = express();

app.use(cors());
app.use(express.json());

function apiError(res, status, code, message) {
  return res.status(status).json({ error: { code, message } });
}

app.get("/api/products", (req, res) => {
  res.json({ items: products, total: products.length });
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p.id === req.params.id);
  if (!product) return apiError(res, 404, "NOT_FOUND", "Product not found");
  res.json(product);
});

app.listen(4000, () => {
  console.log("API running on http://localhost:4000");
});
