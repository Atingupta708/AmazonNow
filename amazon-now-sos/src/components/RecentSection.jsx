import React from "react";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext.jsx";

export default function RecentSection({ onPick }) {
  const { history, recent } = useCart();
  if (history.length === 0 && recent.length === 0) return null;

  return (
    <section className="section wrap">
      {history.length > 0 && (
        <>
          <div className="eyebrow">Previously recommended</div>
          <h2 className="h-sec">Pick up where you left off</h2>
          <div className="grid-moments" style={{ marginTop: 18 }}>
            {history.map((h, i) => (
              <motion.button key={h.title + i} className="moment" onClick={() => onPick(h.query)} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }} whileHover={{ y: -5, scale: 1.015 }}>
                <div className="sheen" style={{ background: "linear-gradient(140deg,#2b3155,#13182a)" }} />
                <div className="emo">{h.emoji}</div>
                <div><div className="mt">{h.title}</div><div className="mc">tap to rebuild</div></div>
              </motion.button>
            ))}
          </div>
        </>
      )}

      {recent.length > 0 && (
        <div style={{ marginTop: history.length ? 26 : 0 }}>
          <div className="al" style={{ marginBottom: 10 }}>Recently searched</div>
          <div className="hint-chips" style={{ justifyContent: "flex-start", margin: 0 }}>
            {recent.map((q) => (
              <motion.button key={q} className="hc" onClick={() => onPick(q)} whileHover={{ y: -2 }}>↺ {q}</motion.button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
