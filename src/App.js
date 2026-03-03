import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import Catalog from "./pages/Catalog";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";

const CART_KEY = "ministore_cart_v1";

export default function App() {
  const [cart, setCart] = useState(() => {
    try {
      const raw = localStorage.getItem(CART_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  const cartCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  function addToCart(product) {
    setCart((prev) => {
      const found = prev.find((i) => i.id === product.id);
      if (found) {
        return prev.map((i) =>
          i.id === product.id
            ? { ...i, quantity: Math.min(i.quantity + 1, 20) }
            : i,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }

  function setQty(productId, quantity) {
    const q = Number(quantity);
    if (!Number.isFinite(q)) return;
    const safe = Math.max(1, Math.min(20, q));

    setCart((prev) =>
      prev.map((i) => (i.id === productId ? { ...i, quantity: safe } : i)),
    );
  }

  function removeFromCart(productId) {
    setCart((prev) => prev.filter((i) => i.id !== productId));
  }

  function clearCart() {
    setCart([]);
  }

  return (
    <BrowserRouter>
      <Header cartCount={cartCount} />

      <Routes>
        <Route path="/" element={<Catalog onAddToCart={addToCart} />} />

        <Route
          path="/products/:id"
          element={<ProductDetail onAddToCart={addToCart} />}
        />

        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              setQty={setQty}
              removeFromCart={removeFromCart}
              clearCart={clearCart}
            />
          }
        />

        <Route
          path="*"
          element={
            <main className="container">
              <h1 className="h1">404</h1>
              <p className="sub">Page not found</p>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
