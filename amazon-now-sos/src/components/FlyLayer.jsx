import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext.jsx";

export default function FlyLayer() {
  const { flyers, removeFlyer } = useCart();
  return (
    <AnimatePresence>
      {flyers.map((f) => (
        <motion.div
          key={f.id}
          className="fly"
          initial={{ x: f.from.x, y: f.from.y, scale: 1, opacity: 1 }}
          animate={{
            x: [f.from.x, (f.from.x + f.to.x) / 2, f.to.x],
            y: [f.from.y, f.from.y - 120, f.to.y],
            scale: [1, 1.25, 0.3],
            opacity: [1, 1, 0],
          }}
          transition={{ duration: 0.85, ease: "easeInOut" }}
          onAnimationComplete={() => removeFlyer(f.id)}
        >
          {f.emoji}
        </motion.div>
      ))}
    </AnimatePresence>
  );
}
