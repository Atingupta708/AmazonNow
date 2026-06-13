import React, { useMemo } from "react";
import { motion } from "framer-motion";

export default function Background() {
  const particles = useMemo(
    () =>
      Array.from({ length: 26 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 1 + Math.random() * 2.5,
        delay: Math.random() * 6,
        dur: 8 + Math.random() * 10,
      })),
    []
  );

  const blobs = [
    { c: "rgba(255,153,0,0.35)", x: "8%", y: "-6%", s: 460, d: 18 },
    { c: "rgba(139,123,255,0.32)", x: "78%", y: "4%", s: 420, d: 22 },
    { c: "rgba(23,211,154,0.28)", x: "42%", y: "82%", s: 520, d: 26 },
  ];

  return (
    <div className="bg" aria-hidden="true">
      <div className="grid" />
      {blobs.map((b, i) => (
        <motion.div
          key={i}
          className="blob"
          style={{ background: b.c, left: b.x, top: b.y, width: b.s, height: b.s }}
          animate={{ x: [0, 30, -20, 0], y: [0, -25, 20, 0], scale: [1, 1.08, 0.96, 1] }}
          transition={{ duration: b.d, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="particle"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{ y: [0, -28, 0], opacity: [0.15, 0.7, 0.15] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
