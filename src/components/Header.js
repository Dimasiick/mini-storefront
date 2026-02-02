import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header
      style={{
        padding: "16px 24px",
        background: "white",
        borderBottom: "1px solid #ddd",
      }}
    >
      <Link to="/" style={{ fontWeight: "bold" }}>
        Mini Store
      </Link>
      <Link to="/cart">Cart</Link>
    </header>
  );
}
