import { Link } from "react-router-dom";
import "./Header.css";

export default function Header({ cartCount }) {
  return (
    <header className="header">
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <div className="header-inner">
        <Link className="brand" to="/">
          Mini StoreCart
        </Link>

        <nav className="nav" aria-label="Main navigation">
          <Link
            className="cart-pill"
            to="/cart"
            aria-label={`Cart with ${cartCount} items`}
          >
            <span>Cart</span>
            <span className="cart-count" aria-hidden="true">
              {cartCount}
            </span>
          </Link>

          <Link className="btn" to="/login">
            {/* {userEmail ? "Account" : "Login"} */}
          </Link>
        </nav>
      </div>
    </header>
  );
}
