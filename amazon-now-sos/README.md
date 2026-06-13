# Amazon Now: SOS

**Say it. Order it. Solved.** — an AI intent-shopping prototype for the *Amazon Now / Reimagining Urgent Shopping* problem statement.

Instead of searching product-by-product, the customer states a moment ("movie night", "sick kid late night", "guests arrived") and the AI instantly builds a complete, in-stock, minutes-away cart with the reasoning shown for every item.

## Run it

```bash
npm install
npm run dev
```

Then open the printed local URL (usually http://localhost:5173).

Build for a venue laptop / hosting:

```bash
npm run build
npm run preview
```

## What's inside

- **SmartCart AI** — intent → full cart with price, qty, delivery time, AI confidence, "Add Entire Cart" with fly-to-cart animation.
- **Smart Swap Engine** — every card swaps to a better/cheaper/healthier/popular option with a "why AI recommends this" explanation.
- **Emergency Mode** — one-tap dramatic rescues (food in 10, sick kid, baby care, pet, power cut…).
- **Voice Shopping** — uses the Web Speech API when available, simulates otherwise so the demo never fails.
- **AI Confidence rings**, **One-tap Life Moments**, **Shopping Time Saved** live dashboard.
- **Wow extras:** Predictive Need Detection (context bar), AI Shopping Copilot (floating assistant), Dynamic Cart Intelligence (totals/ETA/match recompute live + "you forgot" nudges).

## Stack

React 18 · Vite 5 · Framer Motion · plain CSS design system. No backend — realistic mock data in `src/data/catalog.js`, mock AI in `src/lib/ai.js`.

## Demo tip

Type any situation in the hero bar, tap a Life Moment, or hit an Emergency card. The 20-second magic moment is: one sentence in → a whole reasoned cart out → Add Entire Cart.
