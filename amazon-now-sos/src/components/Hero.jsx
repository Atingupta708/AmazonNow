import React, { useState } from "react";
import { motion } from "framer-motion";
import VoiceButton from "./VoiceButton.jsx";

const SUGGESTIONS = ["Movie Night", "Quick Breakfast", "Working Late Tonight"];

export default function Hero({ onIntent, budget, setBudget }) {
  const [text, setText] = useState("");

  const submit = () => {
    if (!text.trim()) return;
    onIntent(text.trim());
  };

  return (
    <section className="hero wrap">
      <motion.div className="kicker" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <span className="pulse" /> AI intent shopping · live
      </motion.div>

      <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
        Don't shop. <span className="grad">Just say what's going on.</span>
      </motion.h1>

      <motion.p className="lede" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
        One sentence in, a whole cart out — already in stock, already timed, with the reasoning shown.
        Say it. Order it. Solved.
      </motion.p>

      <motion.div className="intentbar" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="List items or a moment — e.g. cricket bat, noodles, chocolates"
          aria-label="Describe your intent"
        />
        <motion.button className="btn-go" onClick={submit} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
          Build my cart
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </motion.button>
      </motion.div>

      <motion.div className="budget-row" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.26 }}>
        <span className="budget-cap">Optional overall budget</span>
        <div className="budget-field">
          <span className="cur">₹</span>
          <input
            inputMode="numeric"
            value={budget}
            onChange={(e) => setBudget(e.target.value.replace(/[^\d]/g, ""))}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            placeholder="e.g. 500"
            aria-label="Overall budget"
          />
          {budget && (
            <button className="budget-clear" onClick={() => setBudget("")} aria-label="clear budget">
              ✕
            </button>
          )}
        </div>
        <span className="budget-hint">We'll build the cart and never cross it.</span>
      </motion.div>

      <div className="hint-chips">
        {SUGGESTIONS.map((s, i) => (
          <motion.button
            key={s}
            className="hc"
            onClick={() => onIntent(s)}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.04 }}
            whileHover={{ y: -2 }}
          >
            {s}
          </motion.button>
        ))}
      </div>

      <VoiceButton onResult={onIntent} />
    </section>
  );
}
