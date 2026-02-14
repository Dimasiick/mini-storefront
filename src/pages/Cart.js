export default function Cart({ cart, setQty, removeFromCart, clearCart }) {
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  if (cart.length === 0) {
    return (
      <div style={{ padding: 24 }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h1>Cart</h1>
          <p style={{ color: "#666" }}>Your cart is empty</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: 24 }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <h1>Cart</h1>
        <p style={{ color: "#666" }}>Manage quantities and review totals</p>

        {cart.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              padding: 16,
              marginTop: 16,
              background: "#f9f9f9",
              borderRadius: 14,
              border: "1px solid #e5e5e5",
            }}
          >
            <img
              src={item.image}
              alt={item.name}
              style={{
                width: 80,
                height: 60,
                objectFit: "cover",
                borderRadius: 10,
              }}
            />

            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700 }}>{item.name}</div>
              <div style={{ fontSize: 14, color: "#777" }}>
                ${item.price} each
              </div>

              <div
                style={{
                  display: "flex",
                  gap: 8,
                  marginTop: 10,
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <button
                  onClick={() => setQty(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                  style={{
                    padding: "6px 12px",
                    borderRadius: 8,
                    border: "1px solid #ddd",
                    background: "#f3f3f3",
                  }}
                >
                  −
                </button>

                <input
                  value={item.quantity}
                  onChange={(e) => setQty(item.id, Number(e.target.value))}
                  style={{
                    width: 60,
                    textAlign: "center",
                    padding: 6,
                    borderRadius: 8,
                    border: "1px solid #ddd",
                  }}
                />

                <button
                  onClick={() => setQty(item.id, item.quantity + 1)}
                  disabled={item.quantity >= 20}
                  style={{
                    padding: "6px 12px",
                    borderRadius: 8,
                    border: "1px solid #ddd",
                    background: "#f3f3f3",
                  }}
                >
                  +
                </button>

                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{
                    padding: "6px 12px",
                    borderRadius: 8,
                    border: "1px solid #ddd",
                    background: "#fff",
                  }}
                >
                  Remove
                </button>
              </div>
            </div>

            <div
              style={{
                fontWeight: 700,
                fontSize: 18,
                marginLeft: "auto",
              }}
            >
              ${item.price * item.quantity}
            </div>
          </div>
        ))}

        <div
          style={{
            marginTop: 24,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <button
            onClick={clearCart}
            style={{
              padding: "8px 14px",
              borderRadius: 8,
              border: "1px solid #ddd",
              background: "#f3f3f3",
            }}
          >
            Clear cart
          </button>

          <div style={{ fontSize: 20, fontWeight: 800 }}>
            Subtotal: ${subtotal.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
}
