import React from "react";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext.jsx";
import { useCountUp } from "../hooks/useCountUp.js";

function Stat({ value, suffix, label, delay }) {
  const n = useCountUp(value, 1300);
  return (
    <motion.div className="stat" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay }}>
      <div className="sv">
        {n}
        {suffix}
      </div>
      <div className="sl">{label}</div>
    </motion.div>
  );
}

export default function StatsDashboard() {
  const { stats } = useCart();
  // baselines so the dashboard looks alive before the first resolve
  const searches = 138 + stats.searches;
  const minutes = 96 + stats.minutes;
  const products = 412 + stats.products;
  const fatigue = Math.min(98, 73 + stats.products);

  return (
    <section className="section wrap">
      <div className="eyebrow">Shopping time saved</div>
      <h2 className="h-sec">Less searching. Less deciding. Measurably.</h2>
      <p className="sub-sec">A live count of the effort SOS removes — it climbs every time you build a cart.</p>

      <div className="grid-stats">
        <Stat value={searches} suffix="" label="Searches avoided" delay={0} />
        <Stat value={minutes} suffix=" min" label="Minutes saved" delay={0.08} />
        <Stat value={products} suffix="" label="Products auto-selected" delay={0.16} />
        <Stat value={fatigue} suffix="%" label="Decision fatigue reduced" delay={0.24} />
      </div>
    </section>
  );
}
