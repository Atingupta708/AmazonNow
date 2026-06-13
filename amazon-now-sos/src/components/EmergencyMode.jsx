import React from "react";
import { motion } from "framer-motion";
import { EMERGENCIES, RECIPES } from "../data/catalog.js";

export default function EmergencyMode({ onPick }) {
  return (
    <section className="section wrap">
      <motion.div
        className="emergency"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="etitle">
          <span className="dot" />
          <h2>Emergency Mode</h2>
        </div>
        <p className="sub-sec" style={{ marginTop: 8 }}>
          One tap. Fastest available delivery, optimised items, a ready-to-order bundle — for the moments that can't wait.
        </p>

        <div className="grid-emergency">
          {EMERGENCIES.map((key, i) => {
            const r = RECIPES[key];
            return (
              <motion.button
                key={key}
                className="ecard"
                onClick={() => onPick(key)}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -4, boxShadow: "0 16px 40px -12px rgba(255,90,70,0.4)" }}
                whileTap={{ scale: 0.97 }}
              >
                <div className="ee">{r.emoji}</div>
                <div className="en">{r.title}</div>
                <div className="ed">⚡ ready in ~{r.eta} min</div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
