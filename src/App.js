import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import Catalog from "./pages/Catalog";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";

export default function App() {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const cartCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  function addToCart(product) {
    setCart((prev) => {
      const found = prev.find((x) => x.id === product.id);
      if (found) {
        return prev.map((x) =>
          x.id === product.id ? { ...x, quantity: x.quantity + 1 } : x,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }

  function setQty(productId, quantity) {
    const q = Math.max(1, Math.min(20, Number(quantity) || 1));
    setCart((prev) =>
      prev.map((x) => (x.id === productId ? { ...x, quantity: q } : x)),
    );
  }

  function removeFromCart(productId) {
    setCart((prev) => prev.filter((x) => x.id !== productId));
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
