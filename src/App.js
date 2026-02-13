import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import Catalog from "./pages/Catalog";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";

export default function App() {
  const [cart, setCart] = useState([]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  function addToCart(product) {
    const existing = cart.find((x) => x.id === product.id);
    if (existing) {
      setCart(
        cart.map((x) =>
          x.id === product.id ? { ...x, quantity: x.quantity + 1 } : x,
        ),
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
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
        <Route path="/cart" element={<Cart cart={cart} />} />
      </Routes>
    </BrowserRouter>
  );
}
