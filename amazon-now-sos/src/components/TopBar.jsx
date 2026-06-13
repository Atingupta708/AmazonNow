import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext.jsx";

export default function TopBar({ onOpenCart, onHome }) {
  const { cartCount, registerTarget } = useCart();
  const btnRef = useRef(null);
  useEffect(() => { registerTarget(btnRef.current); }, [registerTarget]);

  return (
    <header className="topbar">
      <div className="wrap row">
        <button className="brand" onClick={onHome} style={{ cursor: "pointer" }}>
          <span className="a">amazon</span><span className="now">now</span><span className="sos">SOS</span>
        </button>
        <button className="cartbtn" ref={btnRef} onClick={onOpenCart}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="20" r="1.4" /><circle cx="18" cy="20" r="1.4" /><path d="M2 3h3l2.4 12.2a1.6 1.6 0 0 0 1.6 1.3h8.4a1.6 1.6 0 0 0 1.6-1.3L22 7H6" /></svg>
          <span className="lbl">Cart</span>
          <motion.span className="badge" key={cartCount} animate={{ scale: [1, 1.35, 1] }} transition={{ duration: 0.35 }}>{cartCount}</motion.span>
        </button>
      </div>
    </header>
  );
}
