import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "./ProductCard.jsx";
import SwapSheet from "./SwapSheet.jsx";
import { useCart } from "../context/CartContext.jsx";
import { getSwaps, uid, curPrice, searchOne } from "../lib/ai.js";
import { PRODUCTS } from "../data/catalog.js";

const cur = (it) => (it.tiers ? it.tiers[it.selectedTier] : it);

export default function SmartCart({ data, onBack, onCheckout }) {
  const [items, setItems] = useState(data.items);
  const [anticip, setAnticip] = useState(data.anticip);
  const [swapFor, setSwapFor] = useState(null);
  const { addMany, fly } = useCart();

  const live = items.filter((i) => !i.outOfStock);
  const total = useMemo(() => live.reduce((s, i) => s + curPrice(i) * i.qty, 0), [items]);
  const etaMins = useMemo(() => (live.length ? Math.max(...live.map((i) => cur(i).eta || 0)) : 0), [items]);
  const deliveryText = etaMins === 0 ? "—" : etaMins <= 60 ? `${etaMins} min` : "by tomorrow";
  const confidence = useMemo(() => (live.length ? Math.round(live.reduce((s, i) => s + i.confidence, 0) / live.length) : 0), [items]);
  const budget = data.budget;
  const remaining = budget != null ? budget - total : null;
  const overBudget = remaining != null && remaining < 0;

  const setItem = (lineId, patch) => setItems((arr) => arr.map((i) => (i.lineId === lineId ? { ...i, ...patch } : i)));
  const changeQty = (lineId, d) => setItems((arr) => arr.map((i) => (i.lineId === lineId ? { ...i, qty: Math.max(1, i.qty + d) } : i)));
  const remove = (lineId) => setItems((arr) => arr.filter((i) => i.lineId !== lineId));
  const onTier = (lineId, t) => setItem(lineId, { selectedTier: t });
  const onSize = (lineId, s) => setItem(lineId, { selectedSize: s });
  const onColor = (lineId, c) => setItem(lineId, { selectedColor: c });
  const onExpand = (it) => {
    const fresh = searchOne({ term: it.term, budget: null });
    setItems((arr) => arr.map((i) => (i.lineId === it.lineId ? { ...fresh } : i)));
  };

  const doSwap = (option) => {
    setItems((arr) => arr.map((i) => (i.lineId === swapFor.lineId ? { ...i, name: option.name, emoji: option.emoji, price: option.price, rating: option.rating, why: "Swapped on your call — " + option.reason.toLowerCase(), swaps: [{ name: swapFor.name, emoji: swapFor.emoji, price: swapFor.price, rating: swapFor.rating, reason: "Switch back to the original pick", tag: "rated" }, ...i.swaps.filter((s) => s.name !== option.name)] } : i)));
    setSwapFor(null);
  };

  const addAnticip = (a, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    fly(a.emoji, rect);
    const p = PRODUCTS[a.id];
    setItems((arr) => [...arr, { id: a.id, lineId: uid(), name: p.name, emoji: p.emoji, price: p.price, rating: p.rating, eta: p.eta, why: "You added this — good call", qty: 1, confidence: 90, swaps: getSwaps(p), budget: null }]);
    setAnticip((arr) => arr.filter((x) => x.id !== a.id));
  };

  const addEntireCart = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    live.slice(0, 6).forEach((it, idx) => setTimeout(() => fly(cur(it).emoji, { left: rect.left + idx * 18, top: rect.top, width: rect.width, height: rect.height }), idx * 80));
    addMany(live.map((it) => { const c = cur(it); return { name: c.name, emoji: c.emoji, price: c.price, mrp: c.mrp, discount: c.discount, rating: c.rating, delivery: c.delivery, brand: c.brand, category: c.category, qty: it.qty }; }));
    setTimeout(() => onCheckout(), 700);
  };

  return (
    <section className="section wrap">
      <div className="cart-head">
        <div>
          <button className="back-btn" onClick={onBack}>← New search</button>
          <div className="cart-title" style={{ marginTop: 14 }}><span>{data.emoji}</span> {data.title}</div>
          <div className="cart-sub">{data.subtitle}</div>
        </div>
        <div className="cart-metrics">
          <div className="metric"><div className="mv">₹{total.toLocaleString("en-IN")}</div><div className="ml">cart total</div></div>
          <div className="metric"><div className="mv amber">⚡ {deliveryText}</div><div className="ml">delivery</div></div>
          <div className="metric"><div className="mv calm">{confidence}%</div><div className="ml">AI match</div></div>
        </div>
      </div>

      {budget != null && (
        <motion.div className={`budget-track ${overBudget ? "over" : ""}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <div className="bt"><span className="btl">Total budget</span><span className="btv">₹{budget.toLocaleString("en-IN")}</span></div>
          <div className="bt"><span className="btl">Current cart value</span><span className="btv">₹{total.toLocaleString("en-IN")}</span></div>
          <div className="bt"><span className="btl">{overBudget ? "Over by" : "Remaining"}</span><span className="btv">₹{Math.abs(remaining).toLocaleString("en-IN")}</span></div>
          <div className="bt-bar"><div className="bt-fill" style={{ width: `${Math.min(100, Math.round((total / budget) * 100))}%` }} /></div>
        </motion.div>
      )}

      <motion.div className="grid-products" layout>
        <AnimatePresence>
          {items.map((it) => (
            <ProductCard key={it.lineId} item={it} onQty={changeQty} onSwapOpen={setSwapFor} onRemove={remove} onTier={onTier} onSize={onSize} onColor={onColor} onExpand={onExpand} />
          ))}
        </AnimatePresence>
      </motion.div>

      {anticip.length > 0 && (
        <div className="anticip">
          <div className="al">Dynamic cart intelligence · people in this moment also forget:</div>
          {anticip.map((a) => (
            <motion.button key={a.id} className="add-chip" onClick={(e) => addAnticip(a, e)} whileTap={{ scale: 0.95 }} layout>
              <span className="pl">+</span> {a.emoji} {a.name} · ₹{a.price}
            </motion.button>
          ))}
        </div>
      )}

      <div className="cta-bar">
        <div className="total">
          <div className="tl">{live.length} item{live.length !== 1 ? "s" : ""} · free SOS delivery{etaMins ? ` · ${deliveryText}` : ""}</div>
          <div className="tv">₹{total.toLocaleString("en-IN")}</div>
          <div className="ts" style={overBudget ? { color: "#ff7a6a" } : undefined}>{overBudget ? `⚠ ₹${Math.abs(remaining)} over budget` : `You skipped ~${live.length * 2 + 6} min of searching`}</div>
        </div>
        <motion.button className="btn-add-all" onClick={addEntireCart} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} disabled={!live.length}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M20 6 9 17l-5-5" /></svg>
          Add to Cart & Review
        </motion.button>
      </div>

      <AnimatePresence>{swapFor && <SwapSheet item={swapFor} onClose={() => setSwapFor(null)} onSwap={doSwap} />}</AnimatePresence>
    </section>
  );
}
