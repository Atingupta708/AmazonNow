import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext.jsx";

export default function CartDrawer() {
  const { cart, drawerOpen, setDrawerOpen, removeFromCart, clearCart } = useCart();
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <AnimatePresence>
      {drawerOpen && (
        <>
          <motion.div className="drawer-ov" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDrawerOpen(false)} />
          <motion.aside
            className="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 320 }}
          >
            <div className="dh">
              <h3>Your cart · {cart.length}</h3>
              <div style={{ display: "flex", gap: 8 }}>
                {cart.length > 0 && (
                  <button className="clear-btn sm" onClick={clearCart} title="Clear cart">
                    🗑 Clear
                  </button>
                )}
                <button className="close-x" onClick={() => setDrawerOpen(false)}>
                  ✕
                </button>
              </div>
            </div>
            <div className="dbody">
              {cart.length === 0 ? (
                <div className="empty">Nothing here yet. Say a moment and add a whole cart in one tap.</div>
              ) : (
                cart.map((it) => (
                  <motion.div className="drow" key={it.lineId} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} layout>
                    <div className="de">{it.emoji}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>{it.name}</div>
                      <div style={{ fontSize: 12, color: "var(--muted)" }}>Qty {it.qty}</div>
                    </div>
                    <div style={{ fontWeight: 700, fontFamily: "var(--display)" }}>₹{it.price * it.qty}</div>
                    <button className="close-x" style={{ width: 30, height: 30 }} onClick={() => removeFromCart(it.lineId)}>
                      ✕
                    </button>
                  </motion.div>
                ))
              )}
            </div>
            {cart.length > 0 && (
              <div className="dfoot">
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                  <span style={{ color: "var(--muted)" }}>Total · free SOS delivery</span>
                  <span style={{ fontFamily: "var(--display)", fontWeight: 700, fontSize: 22 }}>₹{total}</span>
                </div>
                <button className="btn-add-all" style={{ width: "100%" }}>
                  Checkout — get it sorted
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
