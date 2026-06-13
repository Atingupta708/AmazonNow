import React from "react";
import { motion } from "framer-motion";
import ConfidenceRing from "./ConfidenceRing.jsx";
import { useCart } from "../context/CartContext.jsx";

const TIER_LABEL = { budget: "Budget", best: "Best", premium: "Premium" };

export default function ProductCard({ item, onQty, onSwapOpen, onRemove, onTier, onSize, onColor, onExpand }) {
  const { addItem, fly } = useCart();

  // ---------- Out of stock ----------
  if (item.outOfStock) {
    return (
      <motion.div className="pcard oos" layout initial={{ opacity: 0, y: 16, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ type: "spring", damping: 24, stiffness: 260 }}>
        <div className="pc-top">
          <div className="pemo oos-emo">🔍</div>
          <div style={{ minWidth: 0 }}>
            <div className="pname">{item.name}</div>
            <div className="oos-tag">Out of Stock</div>
          </div>
        </div>
        <div className="oos-msg">{item.reason}{item.budget != null && <span className="item-budget" style={{ marginLeft: 8 }}>budget ₹{item.budget}</span>}</div>
        <div className="pc-actions" style={{ flexWrap: "wrap", gap: 8 }}>
          {item.canExpand ? (
            <motion.button className="expand-btn" onClick={() => onExpand(item)} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              ↗ Can we go beyond budget?
            </motion.button>
          ) : (
            <div className="oos-note">We didn't swap in anything random.</div>
          )}
          <motion.button className="rm-btn" onClick={() => onRemove(item.lineId)} whileTap={{ scale: 0.9 }} title="Remove">✕</motion.button>
        </div>
      </motion.div>
    );
  }

  // ---------- recipe item (no tiers) ----------
  if (!item.tiers) {
    const add = (e) => { const r = e.currentTarget.getBoundingClientRect(); fly(item.emoji, r); addItem({ name: item.name, emoji: item.emoji, price: item.price, category: item.category }, item.qty); };
    return (
      <motion.div className="pcard" layout initial={{ opacity: 0, y: 16, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ type: "spring", damping: 24, stiffness: 260 }}>
        <ConfidenceRing value={item.confidence} />
        <div className="pc-top">
          <div className="pemo">{item.emoji}</div>
          <div style={{ minWidth: 0, paddingRight: 40 }}>
            <div className="pname">{item.name}</div>
            <div className="pwhy">{item.why}</div>
          </div>
        </div>
        <div className="pmeta">
          <span className="pprice">₹{item.price}</span>
          <span>★ {item.rating}</span>
          <span className="qty" style={{ marginLeft: "auto" }}>
            <button onClick={() => onQty(item.lineId, -1)}>−</button>
            <span style={{ minWidth: 16, textAlign: "center", fontWeight: 600 }}>{item.qty}</span>
            <button onClick={() => onQty(item.lineId, 1)}>+</button>
          </span>
        </div>
        <div className="pc-actions">
          {item.swaps && item.swaps.length > 0 && (
            <button className="swap-btn" onClick={() => onSwapOpen(item)}>⇄ Swap with better</button>
          )}
          <motion.button className="rm-btn" onClick={() => onRemove(item.lineId)} whileTap={{ scale: 0.9 }}>✕</motion.button>
          <motion.button className="rm-btn" style={{ color: "var(--amber-2)", borderColor: "rgba(255,153,0,0.35)" }} onClick={add} whileTap={{ scale: 0.9 }}>+</motion.button>
        </div>
      </motion.div>
    );
  }

  // ---------- search item (Amazon-style, with tiers) ----------
  const cur = item.tiers[item.selectedTier];
  const overBudget = item.budget != null && cur.price > item.budget;

  const add = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    fly(cur.emoji, r);
    addItem({ name: cur.name, emoji: cur.emoji, price: cur.price, mrp: cur.mrp, discount: cur.discount, rating: cur.rating, delivery: cur.delivery, brand: cur.brand, category: cur.category }, item.qty);
  };

  return (
    <motion.div className="pcard amz" layout initial={{ opacity: 0, y: 16, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ type: "spring", damping: 24, stiffness: 260 }}>
      <ConfidenceRing value={item.confidence} />
      <div className="pc-top">
        <div className="pc-img">
          <span className="pc-emoji">{cur.emoji}</span>
          {cur.discount > 0 && <span className="disc-badge">-{cur.discount}%</span>}
        </div>
        <div style={{ minWidth: 0, paddingRight: 40 }}>
          <div className="brandline">{cur.brand}</div>
          <div className="pname">{cur.name}</div>
          <div className="raterow">
            <span className="ratepill">★ {cur.rating}</span>
            <span className="delivery">🚚 {cur.delivery}</span>
          </div>
        </div>
      </div>

      <div className="pricerow">
        <span className="pprice">₹{cur.price.toLocaleString("en-IN")}</span>
        {cur.mrp > cur.price && <span className="mrp">₹{cur.mrp.toLocaleString("en-IN")}</span>}
        {item.budget != null && (
          <span className={`item-budget ${overBudget ? "ib-over" : ""}`}>{overBudget ? `₹${cur.price - item.budget} over ₹${item.budget}` : `within ₹${item.budget}`}</span>
        )}
        <span className="qty" style={{ marginLeft: "auto" }}>
          <button onClick={() => onQty(item.lineId, -1)}>−</button>
          <span style={{ minWidth: 16, textAlign: "center", fontWeight: 600 }}>{item.qty}</span>
          <button onClick={() => onQty(item.lineId, 1)}>+</button>
        </span>
      </div>

      {item.optimize && (
        <div className="opt-tags">
          <span className="opt-lbl">AI optimised for</span>
          {item.optimize.map((o) => <span key={o} className="opt">{o}</span>)}
        </div>
      )}

      {item.sizes && (
        <div className="variant-row">
          <span className="vlbl">Size</span>
          {item.sizes.map((s) => (
            <button key={s} className={`size-chip ${item.selectedSize === s ? "active" : ""}`} onClick={() => onSize(item.lineId, s)}>{s}</button>
          ))}
        </div>
      )}
      {item.colors && (
        <div className="variant-row">
          <span className="vlbl">Colour</span>
          {item.colors.map((c) => (
            <button key={c} className={`color-dot ${item.selectedColor === c ? "active" : ""}`} title={c} style={{ background: c.toLowerCase() }} onClick={() => onColor(item.lineId, c)} />
          ))}
        </div>
      )}

      <div className="tier-row">
        {["budget", "best", "premium"].map((t) => (
          <button key={t} className={`tier ${item.selectedTier === t ? "active" : ""}`} onClick={() => onTier(item.lineId, t)}>
            <span className="tname">{TIER_LABEL[t]}</span>
            <span className="tprice">₹{item.tiers[t].price.toLocaleString("en-IN")}</span>
          </button>
        ))}
      </div>

      <div className="pc-actions">
        <motion.button className="rm-btn" onClick={() => onRemove(item.lineId)} whileTap={{ scale: 0.9 }} title="Remove">✕</motion.button>
        <motion.button className="add-now" onClick={add} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.96 }}>+ Add</motion.button>
      </div>
    </motion.div>
  );
}
