const express = require("express");
const cors = require("cors");
const { products } = require("./data");

const app = express();
app.use(cors());
app.use(express.json());

function apiError(res, status, code, message) {
  return res.status(status).json({ error: { code, message } });
}

app.get("/api/products", (req, res) => {
  const q = (req.query.q || "").toString().trim().toLowerCase();
  const category = (req.query.category || "").toString().trim();
  const sort = (req.query.sort || "").toString().trim();
  const order =
    (req.query.order || "asc").toString().trim().toLowerCase() === "desc"
      ? "desc"
      : "asc";

  const page = Math.max(1, Number(req.query.page || 1));
  const pageSize = Math.max(1, Math.min(50, Number(req.query.pageSize || 8)));

  let items = [...products];

  if (q) {
    items = items.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q),
    );
  }

  if (category) {
    items = items.filter((p) => p.category === category);
  }

  if (sort === "price") items.sort((a, b) => a.price - b.price);
  if (sort === "rating") items.sort((a, b) => a.rating - b.rating);
  if (order === "desc") items.reverse();

  const total = items.length;
  const start = (page - 1) * pageSize;
  const paged = items.slice(start, start + pageSize);

  res.json({ items: paged, total, page, pageSize });
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p.id === req.params.id);
  if (!product) return apiError(res, 404, "NOT_FOUND", "Product not found");
  res.json(product);
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
