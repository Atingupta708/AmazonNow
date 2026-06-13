import React, { useMemo } from "react";
import { motion } from "framer-motion";

// Context-aware prediction. In production this comes from weather + time +
// reorder history; here we infer a believable nudge from the local clock.
function predict() {
  const h = new Date().getHours();
  if (h >= 22 || h < 5)
    return { emoji: "🌙", text: "It's late and you've reordered noodles 3 times this month.", cta: "Working Late?", key: "working-late" };
  if (h >= 6 && h < 11)
    return { emoji: "🍳", text: "Morning in Bengaluru — your usual breakfast staples are low.", cta: "Quick Breakfast", key: "breakfast" };
  if (h >= 17 && h < 21)
    return { emoji: "🌧️", text: "Rain forecast tonight + it's evening.", cta: "Rainy Day Essentials", key: "rainy-day" };
  return { emoji: "🎬", text: "Weekend afternoon — perfect for a night in.", cta: "Movie Night", key: "movie-night" };
}

export default function PredictiveBar({ onPick }) {
  const p = useMemo(predict, []);
  return (
    <motion.div className="predict" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
      <div className="dotwrap">{p.emoji}</div>
      <div className="ptxt">
        <b>Predictive need detected.</b> {p.text} Want a cart ready before you ask?
      </div>
      <motion.button className="pgo" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} onClick={() => onPick(p.key)}>
        {p.cta} →
      </motion.button>
    </motion.div>
  );
}
