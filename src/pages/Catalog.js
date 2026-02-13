import { useMemo, useState } from "react";
import products from "../data/products";
import ProductCard from "../components/ProductCard";

export default function Catalog({ onAddToCart }) {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("none");

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return ["all", ...Array.from(set)];
  }, []);

  const filtered = useMemo(() => {
    let items = [...products];

    if (q.trim()) {
      const s = q.toLowerCase();
      items = items.filter(
        (p) =>
          p.name.toLowerCase().includes(s) ||
          p.description.toLowerCase().includes(s),
      );
    }

    if (category !== "all") {
      items = items.filter((p) => p.category === category);
    }

    if (sort === "price-asc") items.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") items.sort((a, b) => b.price - a.price);
    if (sort === "rating-desc") items.sort((a, b) => b.rating - a.rating);

    return items;
  }, [q, category, sort]);

  return (
    <main id="main" className="container">
      <h1 className="h1">Catalog</h1>
      <p className="sub">
        Search, filter, and sort products like a real store.
      </p>

      <div className="controls" role="region" aria-label="Catalog controls">
        <input
          className="input"
          placeholder="Search products..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Search products"
        />

        <select
          className="select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          aria-label="Filter by category"
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c === "all" ? "All categories" : c}
            </option>
          ))}
        </select>

        <select
          className="select"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          aria-label="Sort products"
        >
          <option value="none">No sorting</option>
          <option value="price-asc">Price: low → high</option>
          <option value="price-desc">Price: high → low</option>
          <option value="rating-desc">Rating: high → low</option>
        </select>

        <span className="badge" aria-live="polite">
          {filtered.length} items
        </span>
      </div>

      {filtered.length === 0 ? (
        <p className="badge" role="status" aria-live="polite">
          No products found. Try another search.
        </p>
      ) : (
        <section className="grid" aria-label="Product list">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} onAdd={onAddToCart} />
          ))}
        </section>
      )}
    </main>
  );
}
