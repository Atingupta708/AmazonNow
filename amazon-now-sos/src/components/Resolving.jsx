import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const STEPS = [
  ["Amazon Bedrock", "Reading your intent"],
  ["Location Service", "Finding stores within 2 km"],
  ["DynamoDB", "Checking what's in stock now"],
  ["SageMaker", "Building & timing your cart"],
];

export default function Resolving({ emoji, chip }) {
  const [step, setStep] = useState(-1);
  useEffect(() => {
    const timers = STEPS.map((_, i) => setTimeout(() => setStep(i), 250 + i * 420));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div className="resolve-ov" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div
        className="resolve-card glass"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0 }}
      >
        <div className="resolve-orb">
          <motion.span className="ring" animate={{ scale: [1, 1.5], opacity: [0.8, 0] }} transition={{ duration: 1.6, repeat: Infinity }} />
          <motion.span className="ring" animate={{ scale: [1, 1.5], opacity: [0.8, 0] }} transition={{ duration: 1.6, repeat: Infinity, delay: 0.8 }} />
          {emoji}
        </div>
        <div className="resolve-parsed">We understood your situation:</div>
        <div className="resolve-chip">{chip}</div>
        <div className="resolve-steps">
          {STEPS.map((s, i) => (
            <div key={i} className={`rstep ${step >= i ? "on" : ""}`}>
              <span className="tk">{step > i ? "✓" : i + 1}</span>
              <span>
                <span className="svc">{s[0]}</span> <span className="rl">· {s[1]}</span>
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
