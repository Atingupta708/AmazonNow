import React from "react";
import { motion } from "framer-motion";
import { MOMENTS, RECIPES } from "../data/catalog.js";

export default function MomentsGrid({ onPick }) {
  return (
    <section className="section wrap">
      <div className="eyebrow">One-tap life moments</div>
      <h2 className="h-sec">Tap a moment. Skip the shopping.</h2>
      <p className="sub-sec">Each card is a complete, optimised cart — generated the instant you tap it.</p>

      <div className="grid-moments">
        {MOMENTS.map((m, i) => {
          const r = RECIPES[m.key];
          return (
            <motion.button
              key={m.key}
              className="moment"
              onClick={() => onPick(m.key)}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ y: -5, scale: 1.015 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="sheen" style={{ background: m.grad }} />
              <div className="emo">{r.emoji}</div>
              <div>
                <div className="mt">{r.title}</div>
                <div className="mc">tap to build instantly</div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
