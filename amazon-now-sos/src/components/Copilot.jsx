import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Copilot({ message }) {
  const [open, setOpen] = useState(true);
  const [msg, setMsg] = useState("Hi — I'm your shopping copilot. Tell me a moment and I'll build the whole cart.");

  useEffect(() => {
    if (message) {
      setMsg(message);
      setOpen(true);
    }
  }, [message]);

  return (
    <div className="copilot">
      <AnimatePresence>
        {open && (
          <motion.div
            className="bubble"
            initial={{ opacity: 0, y: 14, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.95 }}
          >
            {msg.split("**").map((part, i) => (i % 2 ? <b key={i}>{part}</b> : <span key={i}>{part}</span>))}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        className="fab"
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.08, rotate: 6 }}
        whileTap={{ scale: 0.92 }}
        animate={{ y: [0, -6, 0] }}
        transition={{ y: { duration: 3, repeat: Infinity, ease: "easeInOut" } }}
        aria-label="AI copilot"
      >
        ✨
      </motion.button>
    </div>
  );
}
