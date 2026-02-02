import { useParams, Link } from "react-router-dom";
import products from "../data/products";

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <main className="container">
        <h1 className="h1">Not found</h1>
        <p className="sub">Product doesn’t exist.</p>
        <Link className="btn" to="/">
          Back to catalog
        </Link>
      </main>
    );
  }

  const inStock = product.stock > 0;

  return (
    <main className="container" id="main">
      <Link className="btn" to="/">
        ← Back
      </Link>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 20,
          marginTop: 16,
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: "100%",
            borderRadius: 18,
            border: "1px solid var(--border)",
          }}
        />

        <div>
          <h1 className="h1" style={{ marginTop: 0 }}>
            {product.name}
          </h1>
          <p className="sub">{product.description}</p>

          <div
            style={{
              display: "flex",
              gap: 10,
              margin: "12px 0",
              flexWrap: "wrap",
            }}
          >
            <span className={`badge ${inStock ? "badge--ok" : "badge--out"}`}>
              {inStock ? "In stock" : "Out of stock"}
            </span>
            <span className="badge">{product.category}</span>
            <span className="badge">⭐ {product.rating}</span>
          </div>

          <div style={{ fontSize: 28, fontWeight: 900, margin: "8px 0 16px" }}>
            ${product.price}
          </div>

          <button className="btn btn--primary" disabled={!inStock}>
            Add to cart
          </button>
        </div>
      </div>
    </main>
  );
}
