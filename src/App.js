import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Catalog from "./pages/Catalog";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Catalog />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
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
