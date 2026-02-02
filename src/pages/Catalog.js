import products from "../data/products";
import ProductCard from "../components/ProductCard";

export default function Catalog() {
  return (
    <main>
      <h1>Catalog</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, 200px)",
          gap: 16,
        }}
      >
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </main>
  );
}
