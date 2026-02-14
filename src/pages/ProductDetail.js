import { useParams, Link } from "react-router-dom";
import products from "../data/products";
import "./ProductDetail.css";

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

      <div className="pd-grid">
        <img className="pd-image" src={product.image} alt={product.name} />

        <div className="pd-info">
          <h1 className="h1 pd-title">{product.name}</h1>
          <p className="sub">{product.description}</p>

          <div className="pd-badges">
            <span className={`badge ${inStock ? "badge--ok" : "badge--out"}`}>
              {inStock ? "In stock" : "Out of stock"}
            </span>
            <span className="badge">{product.category}</span>
            <span className="badge">⭐ {product.rating}</span>
          </div>

          <div className="pd-price">${product.price}</div>

          <button className="btn btn--primary" disabled={!inStock}>
            Add to cart
          </button>
        </div>
      </div>
    </main>
  );
}
