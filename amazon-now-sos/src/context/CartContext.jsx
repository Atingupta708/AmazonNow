import React, { createContext, useContext, useState, useRef, useCallback, useEffect } from "react";
import { uid } from "../lib/ai.js";

const CartCtx = createContext(null);
export const useCart = () => useContext(CartCtx);

const load = (k, fb) => {
  try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fb; } catch { return fb; }
};
const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => load("sos.cart", []));
  const [recent, setRecent] = useState(() => load("sos.recent", []));
  const [history, setHistory] = useState(() => load("sos.history", []));
  const [flyers, setFlyers] = useState([]);
  const [stats, setStats] = useState({ searches: 0, minutes: 0, products: 0 });
  const cartTargetRef = useRef(null);

  useEffect(() => save("sos.cart", cart), [cart]);
  useEffect(() => save("sos.recent", recent), [recent]);
  useEffect(() => save("sos.history", history), [history]);

  const registerTarget = useCallback((el) => { cartTargetRef.current = el; }, []);

  const fly = useCallback((emoji, fromRect) => {
    const el = cartTargetRef.current;
    if (!el || !fromRect) return;
    const to = el.getBoundingClientRect();
    const id = uid();
    setFlyers((f) => [...f, { id, emoji, from: { x: fromRect.left + fromRect.width / 2 - 13, y: fromRect.top + fromRect.height / 2 - 13 }, to: { x: to.left + to.width / 2 - 13, y: to.top + to.height / 2 - 13 } }]);
  }, []);
  const removeFlyer = useCallback((id) => setFlyers((f) => f.filter((x) => x.id !== id)), []);

  const addItem = useCallback((item, qty = 1) => setCart((c) => [...c, { lineId: uid(), qty, ...item }]), []);
  const addMany = useCallback((items) => setCart((c) => [...c, ...items.map((it) => ({ lineId: uid(), qty: it.qty || 1, ...it }))]), []);
  const removeFromCart = useCallback((lineId) => setCart((c) => c.filter((x) => x.lineId !== lineId)), []);
  const updateCartItem = useCallback((lineId, patch) => setCart((c) => c.map((x) => (x.lineId === lineId ? { ...x, ...patch } : x))), []);
  const clearCart = useCallback(() => setCart([]), []);

  const addRecent = useCallback((q) => {
    const query = (q || "").trim();
    if (!query) return;
    setRecent((r) => [query, ...r.filter((x) => x.toLowerCase() !== query.toLowerCase())].slice(0, 8));
  }, []);
  const addHistory = useCallback((card) => {
    setHistory((h) => [card, ...h.filter((x) => x.title !== card.title)].slice(0, 6));
  }, []);

  const recordResolve = useCallback((itemCount) => {
    setStats((s) => ({ searches: s.searches + itemCount + 2, minutes: s.minutes + Math.max(6, itemCount * 2), products: s.products + itemCount }));
  }, []);

  const cartCount = cart.reduce((n, i) => n + i.qty, 0);

  const value = {
    cart, cartCount, addItem, addMany, removeFromCart, updateCartItem, clearCart,
    recent, history, addRecent, addHistory,
    flyers, fly, removeFlyer, registerTarget, stats, recordResolve,
  };
  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}
