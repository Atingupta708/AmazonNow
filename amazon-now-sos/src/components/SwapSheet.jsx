import React from "react";
import { motion } from "framer-motion";

const TAG_LABEL = { cheap: "Cheaper", rated: "Higher rated", healthy: "Healthier", popular: "Popular nearby" };
const TAG_CLASS = { cheap: "tag-cheap", rated: "tag-rated", healthy: "tag-healthy", popular: "tag-popular" };

export default function SwapSheet({ item, onClose, onSwap }) {
  return (
    <motion.div className="sheet-ov" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div
        className="sheet"
        onClick={(e) => e.stopPropagation()}
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 320 }}
      >
        <div className="grip" />
        <h3>
          Swap “{item.name}” {item.emoji}
        </h3>
        <div className="sub">Smart Swap Engine · alternatives in stock near you, ranked by fit</div>

        {item.swaps.map((s, i) => (
          <motion.button
            key={i}
            className="swap-opt"
            onClick={() => onSwap(s)}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ x: 3 }}
          >
            <div className="so-emo">{s.emoji}</div>
            <div>
              <div className="so-name">{s.name}</div>
              <div className="so-why">
                <b style={{ color: "#fff" }}>Why AI recommends this:</b> {s.reason}. ★ {s.rating}
              </div>
              <span className={`tagpill ${TAG_CLASS[s.tag]}`}>{TAG_LABEL[s.tag]}</span>
            </div>
            <div className="so-right">
              <div className="so-price">₹{s.price}</div>
              <div style={{ fontSize: 11, color: "var(--calm-2)", fontWeight: 600, marginTop: 4 }}>Swap →</div>
            </div>
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  );
}
