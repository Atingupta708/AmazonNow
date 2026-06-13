import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { VOICE_SAMPLES } from "../lib/ai.js";

export default function VoiceButton({ onResult }) {
  const [listening, setListening] = useState(false);
  const [label, setLabel] = useState("");
  const sampleIdx = useRef(0);
  const recRef = useRef(null);

  const simulate = () => {
    setListening(true);
    setLabel("Listening…");
    const phrase = VOICE_SAMPLES[sampleIdx.current % VOICE_SAMPLES.length];
    sampleIdx.current++;
    setTimeout(() => {
      setLabel(`“${phrase}”`);
      setListening(false);
      setTimeout(() => {
        onResult(phrase);
        setLabel("");
      }, 650);
    }, 1500);
  };

  const start = () => {
    if (listening) return;
    const SR = typeof window !== "undefined" && (window.SpeechRecognition || window.webkitSpeechRecognition);
    if (!SR) return simulate();
    try {
      const rec = new SR();
      recRef.current = rec;
      rec.lang = "en-IN";
      rec.interimResults = false;
      rec.maxAlternatives = 1;
      setListening(true);
      setLabel("Listening…");
      rec.onresult = (e) => {
        const text = e.results[0][0].transcript;
        setLabel(`“${text}”`);
        setListening(false);
        setTimeout(() => {
          onResult(text);
          setLabel("");
        }, 500);
      };
      rec.onerror = () => {
        setListening(false);
        simulate();
      };
      rec.onend = () => setListening(false);
      rec.start();
    } catch {
      simulate();
    }
  };

  return (
    <div className="voice-wrap">
      <motion.button
        className={`mic ${listening ? "live" : ""}`}
        onClick={start}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        aria-label="Voice shopping"
      >
        {listening && (
          <>
            <motion.span className="ripple" animate={{ scale: [1, 1.8], opacity: [0.7, 0] }} transition={{ duration: 1.4, repeat: Infinity }} />
            <motion.span className="ripple" animate={{ scale: [1, 1.8], opacity: [0.7, 0] }} transition={{ duration: 1.4, repeat: Infinity, delay: 0.7 }} />
          </>
        )}
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="9" y="3" width="6" height="11" rx="3" />
          <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
        </svg>
      </motion.button>
      <AnimatePresence mode="wait">
        <motion.div
          key={label}
          className="voice-label"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          {label ? <b>{label}</b> : "Tap to speak — “get snacks for movie night”"}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
