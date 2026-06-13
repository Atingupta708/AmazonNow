import React, { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Background from "./components/Background.jsx";
import TopBar from "./components/TopBar.jsx";
import Hero from "./components/Hero.jsx";
import PredictiveBar from "./components/PredictiveBar.jsx";
import MomentsGrid from "./components/MomentsGrid.jsx";
import EmergencyMode from "./components/EmergencyMode.jsx";
import StatsDashboard from "./components/StatsDashboard.jsx";
import RecentSection from "./components/RecentSection.jsx";
import Resolving from "./components/Resolving.jsx";
import SmartCart from "./components/SmartCart.jsx";
import CartPage from "./components/CartPage.jsx";
import Copilot from "./components/Copilot.jsx";
import FlyLayer from "./components/FlyLayer.jsx";
import { buildCart, buildSmartCart, trimToBudget, parseBudget } from "./lib/ai.js";
import { useCart } from "./context/CartContext.jsx";

export default function App() {
  const [view, setView] = useState("home"); // home | resolving | build | cartpage
  const [pending, setPending] = useState(null);
  const [cartData, setCartData] = useState(null);
  const [copilotMsg, setCopilotMsg] = useState(null);
  const [budget, setBudget] = useState("");
  const { recordResolve, addRecent, addHistory } = useCart();

  const start = useCallback(
    (input, isKey = false) => {
      const b = parseBudget(budget);
      const data = isKey ? trimToBudget(buildCart(input), b) : buildSmartCart(input, b);
      const inStock = data.items.filter((i) => !i.outOfStock).length;
      const missing = data.items.length - inStock;

      if (!isKey) addRecent(input);
      addHistory({ title: data.title, emoji: data.emoji, query: isKey ? input : input });

      setPending({ emoji: data.emoji, chip: data.title });
      setView("resolving");
      setCopilotMsg(`On it — building **${data.title}**. Checking the catalog${b ? ` and staying under **₹${b}**` : ""} for the best in-stock picks.`);

      setTimeout(() => {
        setCartData(data);
        recordResolve(inStock);
        setView("build");
        setCopilotMsg(
          data.mode === "list"
            ? `Done — **only what you asked for**. ${inStock} found${missing ? `, ${missing} out of stock` : ""}. Pick Budget / Best / Premium on any item.`
            : `Done. **${inStock} items**${b ? `, under ₹${b}` : ""}. Swap or remove anything in one tap.`
        );
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 1700);
    },
    [recordResolve, budget, addRecent, addHistory]
  );

  const onIntent = useCallback((text) => start(text, false), [start]);
  const onKey = useCallback((key) => start(key, true), [start]);

  const toHome = useCallback(() => { setView("home"); setCopilotMsg("What's next? Search a product (with a budget) or tap a moment."); }, []);
  const toCart = useCallback(() => { setView("cartpage"); window.scrollTo({ top: 0 }); }, []);

  return (
    <>
      <Background />
      <div className="app">
        <TopBar onOpenCart={toCart} onHome={toHome} />

        {view === "cartpage" ? (
          <motion.div key="cartpage" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <CartPage onBack={toHome} />
          </motion.div>
        ) : view === "build" && cartData ? (
          <motion.div key="build" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <SmartCart data={cartData} onBack={toHome} onCheckout={toCart} />
          </motion.div>
        ) : (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Hero onIntent={onIntent} budget={budget} setBudget={setBudget} />
            <div className="wrap"><PredictiveBar onPick={onKey} /></div>
            <RecentSection onPick={onIntent} />
            <MomentsGrid onPick={onKey} />
            <EmergencyMode onPick={onKey} />
            <StatsDashboard />
          </motion.div>
        )}

        <footer className="foot wrap">
          <div className="tag">amazon now : SOS — Say it. Order it. Solved.</div>
          <div style={{ marginTop: 8 }}>Reimagining urgent shopping · HackOn with Amazon · prototype</div>
        </footer>
      </div>

      <AnimatePresence>{view === "resolving" && pending && <Resolving emoji={pending.emoji} chip={pending.chip} />}</AnimatePresence>
      <Copilot message={copilotMsg} />
      <FlyLayer />
    </>
  );
}
