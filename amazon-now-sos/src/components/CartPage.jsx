import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext.jsx";
import { findCheaper } from "../lib/ai.js";

export default function CartPage({ onBack }) {
  const { cart, removeFromCart, updateCartItem, clearCart } = useCart();
  const [busy, setBusy] = useState(null); // lineId currently searching
  const [toast, setToast] = useState(null);

  const total = useMemo(() => cart.reduce((s, i) => s + i.price * i.qty, 0), [cart]);
  const saved = useMemo(() => cart.reduce((s, i) => s + (i.mrp && i.mrp > i.price ? (i.mrp - i.price) * i.qty : 0), 0), [cart]);

  const findLower = (item) => {
    if (busy) return;
    setBusy(item.lineId);
    setTimeout(() => {
      const cheaper = item.category ? findCheaper(item.category, item.price) : null;
      if (cheaper) {
        const diff = item.price - cheaper.price;
        updateCartItem(item.lineId, { name: cheaper.name, emoji: cheaper.emoji, price: cheaper.price, mrp: cheaper.mrp, discount: cheaper.discount, rating: cheaper.rating, delivery: cheaper.delivery, brand: cheaper.brand });
        setToast(`Found a cheaper ${item.category} — you saved ₹${diff.toLocaleString("en-IN")}`);
      } else {
        setToast("This is already the cheapest in-stock option.");
      }
      setBusy(null);
      setTimeout(() => setToast(null), 2600);
    }, 650);
  };

  const reasons = [
    "Matched each item to the closest in-stock product near you.",
    saved > 0 ? `Picked options that save ₹${saved.toLocaleString("en-IN")} vs MRP.` : "Picked the best-rated option in each category.",
    "Tap “Find cheaper” on any item to trade down without losing the category.",
  ];

  return (
    <section className="section wrap cartpage">
      <button className="back-btn" onClick={onBack}>← Back to search</button>
      <div className="cart-head" style={{ marginTop: 14 }}>
        <div>
          <div className="cart-title"><span>🛒</span> Your cart</div>
          <div className="cart-sub">Review what the AI built — adjust anything before checkout.</div>
        </div>
        {cart.length > 0 && (
          <div className="cart-metrics">
            <div className="metric"><div className="mv">₹{total.toLocaleString("en-IN")}</div><div className="ml">total</div></div>
            {saved > 0 && <div className="metric"><div className="mv calm">₹{saved.toLocaleString("en-IN")}</div><div className="ml">saved vs MRP</div></div>}
            <div className="metric"><div className="mv amber">{cart.length}</div><div className="ml">items</div></div>
          </div>
        )}
      </div>

      {cart.length === 0 ? (
        <div className="cp-empty">
          <div className="cp-empty-art">🛍️</div>
          <h3>Your cart is empty</h3>
          <p>Tell the AI what you need and it'll build a cart in seconds.</p>
          <button className="btn-add-all" style={{ maxWidth: 240, margin: "18px auto 0" }} onClick={onBack}>Start a search</button>
        </div>
      ) : (
        <>
          <div className="reasoning">
            <div className="rz-h">✨ Why this cart</div>
            <ul>{reasons.map((r, i) => <li key={i}>{r}</li>)}</ul>
          </div>

          <div className="cp-list">
            <AnimatePresence>
              {cart.map((item) => (
                <motion.div className="cp-row" key={item.lineId} layout initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -30 }}>
                  <div className="cp-img"><span>{item.emoji}</span>{item.discount > 0 && <span className="disc-badge sm">-{item.discount}%</span>}</div>
                  <div className="cp-info">
                    {item.brand && <div className="brandline">{item.brand}</div>}
                    <div className="pname">{item.name}</div>
                    <div className="raterow">
                      {item.rating && <span className="ratepill">★ {item.rating}</span>}
                      {item.delivery && <span className="delivery">🚚 {item.delivery}</span>}
                    </div>
                    <div className="cp-pricerow">
                      <span className="pprice">₹{(item.price * item.qty).toLocaleString("en-IN")}</span>
                      {item.mrp > item.price && <span className="mrp">₹{(item.mrp * item.qty).toLocaleString("en-IN")}</span>}
                      <span className="cp-qty">× {item.qty}</span>
                    </div>
                  </div>
                  <div className="cp-actions">
                    <motion.button
                      className={`find-cheaper ${busy === item.lineId ? "searching" : ""}`}
                      onClick={() => findLower(item)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      disabled={!!busy}
                    >
                      <motion.span
                        className="fc-ico"
                        animate={busy === item.lineId ? { rotate: 360 } : { rotate: 0 }}
                        transition={busy === item.lineId ? { repeat: Infinity, duration: 0.7, ease: "linear" } : { duration: 0.3 }}
                      >🔍</motion.span>
                      <span className="fc-text">{busy === item.lineId ? "Finding…" : "Find cheaper"}</span>
                      <span className="fc-glow" />
                    </motion.button>
                    <button className="close-x" onClick={() => removeFromCart(item.lineId)} title="Remove">✕</button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="cp-summary">
            <div className="cp-sum-rows">
              <div className="cp-sum"><span>Subtotal</span><span>₹{total.toLocaleString("en-IN")}</span></div>
              {saved > 0 && <div className="cp-sum saved"><span>You saved</span><span>− ₹{saved.toLocaleString("en-IN")}</span></div>}
              <div className="cp-sum"><span>Delivery</span><span className="free">FREE</span></div>
              <div className="cp-sum total"><span>To pay</span><span>₹{total.toLocaleString("en-IN")}</span></div>
            </div>
            <div className="cp-cta">
              <button className="clear-btn" onClick={clearCart}>🗑 Clear Cart</button>
              <motion.button className="btn-add-all" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>Proceed to checkout</motion.button>
            </div>
          </div>
        </>
      )}

      <AnimatePresence>
        {toast && (
          <motion.div className="cp-toast" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
