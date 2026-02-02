import "./ProductCard.css";

export default function ProductCard({ product }) {
  return (
    <div className="card">
      <img src={product.image} alt={product.name} />

      <div className="card-body">
        <h3>{product.name}</h3>
        <p className="price">${product.price}</p>

        <div className="meta">
          <span>⭐ {product.rating}</span>
          <span className={product.stock > 0 ? "in" : "out"}>
            {product.stock > 0 ? "In stock" : "Out"}
          </span>
        </div>

        <button disabled={product.stock === 0}>Add to cart</button>
      </div>
    </div>
  );
}
