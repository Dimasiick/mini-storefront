import { Link } from "react-router-dom";
import "./ProductCard.css";

export default function ProductCard({ product, onAdd }) {
  const inStock = product.stock > 0;

  return (
    <article className="card">
      <div className="card-media">
        <img src={product.image} alt={product.name} loading="lazy" />
      </div>

      <div className="card-body">
        <h3 className="card-title">{product.name}</h3>
        <p className="card-desc">{product.description}</p>

        <div className="row">
          <div className="price">${product.price}</div>
          <div
            className="rating"
            aria-label={`Rating ${product.rating} out of 5`}
          >
            ⭐ {product.rating}
          </div>
        </div>

        <div className="row" style={{ marginTop: 10 }}>
          <span className={`badge ${inStock ? "badge--ok" : "badge--out"}`}>
            {inStock ? "In stock" : "Out of stock"}
          </span>
          <span className="badge">{product.category}</span>
        </div>

        <div className="card-actions">
          <button
            className="btn btn--primary"
            disabled={!inStock}
            onClick={() => onAdd?.(product)}
          >
            Add to cart
          </button>
          <Link className="btn" to={`/products/${product.id}`}>
            View
          </Link>
        </div>
      </div>
    </article>
  );
}
