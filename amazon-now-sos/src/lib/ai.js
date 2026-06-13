import { PRODUCTS, RECIPES, SEARCH_CATALOG } from "../data/catalog.js";

let _uid = 1;
export const uid = () => _uid++;

function hashConf(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) % 1000;
  return 88 + (h % 12);
}
const titleCase = (s) => s.replace(/\b\w/g, (c) => c.toUpperCase());

// ============================================================
//  INTENT (recipe) path — curated bundles for moments/tiles
// ============================================================
const KEYWORDS = [
  [/(movie|netflix|film|cinema)/, "movie-night"],
  [/(house party|party|celebrat|friends over)/, "house-party"],
  [/(birthday|bday)/, "birthday"],
  [/(guest|visitors|coming over|in[- ]?laws)/, "guests"],
  [/(exam|study|prep|assignment|revision)/, "study"],
  [/(gym|workout|fitness)/, "gym"],
  [/(working late|deadline|overnight|night shift|late tonight)/, "working-late"],
  [/(breakfast|morning|cereal)/, "breakfast"],
  [/(rain|rainy|monsoon)/, "rainy-day"],
  [/(new pet|puppy|kitten|adopt)/, "new-pet"],
  [/(date night|romantic|anniversary)/, "date-night"],
  [/(game night|gaming|playstation|xbox)/, "game-night"],
  [/(festival|diwali|holi|christmas|eid|pooja|puja)/, "festival"],
  [/(road trip|highway)/, "road-trip"],
  [/(family dinner|family meal)/, "family-dinner"],
  [/(food.*10|hungry now|need food)/, "food-10"],
  [/(sick kid|toddler|child.*fever|baby.*fever)/, "sick-kid"],
  [/(medicine|cold|flu|fever|cough)/, "medicine"],
  [/(diaper|infant|newborn)/, "baby-care"],
  [/(power cut|blackout|no electricity|outage)/, "power-cut"],
];
export function resolveText(text) {
  const t = (text || "").toLowerCase().trim();
  for (const [re, key] of KEYWORDS) if (re.test(t)) return key;
  return "breakfast";
}
export function buildCart(key, rawText) {
  const r = RECIPES[key] || RECIPES["breakfast"];
  const items = r.items.map((id) => hydrate(id));
  const confidence = Math.round(items.reduce((s, i) => s + i.confidence, 0) / items.length);
  return { key: r.key, title: r.title, emoji: r.emoji, subtitle: r.subtitle, mode: r.mode, eta: r.eta, confidence, items, anticip: getAnticip(key), budget: null };
}
function hydrate(id) {
  const p = PRODUCTS[id];
  return { id, lineId: uid(), name: p.name, emoji: p.emoji, price: p.price, rating: p.rating, eta: p.eta, why: p.why, qty: 1, confidence: hashConf(p.name), swaps: getSwaps(p), budget: null };
}
export function getSwaps(p) {
  if (p.swaps && p.swaps.length) return p.swaps;
  return [
    { name: p.name.replace(/\(.*\)/, "").trim() + " — value pack", emoji: p.emoji, price: Math.round(p.price * 0.85), rating: +(p.rating - 0.1).toFixed(1), reason: "Same item, ~15% cheaper", tag: "cheap" },
    { name: p.name.replace(/\(.*\)/, "").trim() + " — premium", emoji: p.emoji, price: Math.round(p.price * 1.18), rating: Math.min(4.9, +(p.rating + 0.2).toFixed(1)), reason: "Higher rated, popular nearby", tag: "rated" },
  ];
}
const ANTICIP = {
  "movie-night": ["chips", "almonds"], "house-party": ["candles", "almonds"], "birthday": ["napkins", "almonds"],
  "guests": ["candles", "almonds"], "study": ["water", "noodles"], "gym": ["water", "energybar"],
  "working-late": ["chocolate", "water"], "breakfast": ["coffee", "cereal"], "rainy-day": ["chocolate", "umbrella"],
  "new-pet": ["petlitter", "pettoys"], "date-night": ["coke", "almonds"], "game-night": ["icecream", "water"],
  "festival": ["balloons", "chocolate"], "road-trip": ["gum", "almonds"], "family-dinner": ["chocolate", "napkins"],
  "food-10": ["water", "chips"], "guests-sudden": ["napkins", "candles"], "medicine": ["ors", "water"],
  "baby-care": ["wipes", "patches"], "pet-emergency": ["pettoys", "petlitter"], "sick-kid": ["mask", "water"], "power-cut": ["batteries", "chips"],
};
function getAnticip(key) {
  return (ANTICIP[key] || ["water", "chocolate"]).map((id) => { const p = PRODUCTS[id]; return { id, name: p.name, emoji: p.emoji, price: p.price }; });
}

// ============================================================
//  EXPLICIT-ITEM path — Amazon-style search, tiers, brands
// ============================================================
const CLOTHING = new Set(["t-shirt", "jeans", "shirt"]);
const SIZES = ["S", "M", "L", "XL", "XXL"];
const COLORS = ["Black", "White", "Blue", "Red", "Green"];
const OPTIMIZE = {
  mobile: ["Battery", "Camera", "Performance"], laptop: ["Performance", "Battery", "Display"],
  headphones: ["Sound", "Battery", "Comfort"], watch: ["Battery", "Health tracking"], shoes: ["Comfort", "Grip"],
};
// brand tokens → canonical brand (as stored on products)
const BRAND_ALIASES = { iphone: "Apple", apple: "Apple", macbook: "Apple", airpods: "Apple", xiaomi: "Redmi", redmi: "Redmi", samsung: "Samsung", galaxy: "Samsung", oneplus: "OnePlus", nord: "OnePlus", realme: "realme", nike: "Nike", adidas: "Adidas", puma: "Puma", levis: "Levi's", "levi's": "Levi's", roadster: "Roadster", hrx: "HRX", boat: "boAt", jbl: "JBL", sony: "Sony", noise: "Noise", titan: "Titan", hp: "HP", dell: "Dell", lenovo: "Lenovo", asus: "ASUS", lego: "LEGO", nerf: "Nerf", maggi: "Maggi", cadbury: "Cadbury", amul: "Amul", "u.s. polo": "U.S. Polo Assn", "us polo": "U.S. Polo Assn", wrangler: "Wrangler", sparx: "Sparx", campus: "Campus", yonex: "Yonex" };
function detectBrand(term) {
  const t = " " + term.toLowerCase() + " ";
  for (const k of Object.keys(BRAND_ALIASES)) if (t.includes(" " + k + " ") || t.includes(k)) return BRAND_ALIASES[k];
  return null;
}

export function parseQuery(raw) {
  const s = (raw || "").trim();
  if (!s) return { isExplicit: false, items: [], intentText: s };
  const work = s.replace(/^\s*(i\s+want\s+to\s+buy|i\s+want|i\s+need|i\s+would\s+like|get\s+me|please\s+get|buy\s+me|buy|need|please|build\s+me|build|make\s+me|order|give\s+me|show\s+me)\b[:,]?\s*/i, "");
  const chunks = work.split(/\s*(?:,|;|\band\b|&|\n|\+)\s*/i).map((c) => c.trim()).filter(Boolean);
  const items = chunks.map(parseChunk).filter(Boolean);
  const anyBudget = items.some((it) => it.budget != null);
  let isExplicit = items.length > 1 || anyBudget;
  if (!isExplicit && items.length === 1) isExplicit = matchesCatalog(items[0].term);
  return { isExplicit, items, intentText: s };
}
function parseChunk(chunk) {
  let budget = null;
  const budRe = /\b(?:of|for|under|below|around|upto|up to|@|costing|worth|priced at|within|budget(?:\s+of)?)?\s*(?:₹|rs\.?|inr)\s*([\d][\d,]*)\b/i;
  const budRe2 = /\b([\d][\d,]*)\s*(?:₹|rs\.?|rupees|inr|bucks|k)\b/i;
  const budRe3 = /\b(?:under|below|around|upto|up to|within|budget(?:\s+of)?)\s+([\d][\d,]{1,7})\b/i;
  const m = chunk.match(budRe) || chunk.match(budRe2) || chunk.match(budRe3);
  let term = chunk;
  if (m) {
    let raw = m[1].replace(/,/g, "");
    if (/k\b/i.test(m[0])) raw = String(parseInt(raw, 10) * 1000);
    budget = parseInt(raw, 10);
    term = chunk.replace(m[0], " ");
  }
  term = term.replace(/(₹|rs\.?|inr|rupees|bucks)/gi, " ").replace(/\b(of|for|under|below|around|upto|up to|within|budget|a|an|the|some|one|priced|at|costing|worth)\b/gi, " ").replace(/[^\w\s'.-]/g, " ").replace(/\s+/g, " ").trim().toLowerCase();
  if (!term) return null;
  return { term, budget };
}

function scoreMatch(term, p) {
  const t = term.toLowerCase().trim();
  const kws = [p.category, ...p.keywords, p.name.toLowerCase(), p.brand.toLowerCase()];
  if (kws.some((k) => k === t)) return { score: 98, level: "exact" };
  if (p.category === t || t.includes(p.category) || p.category.includes(t)) return { score: 93, level: "category" };
  if (kws.some((k) => k.includes(t) || t.includes(k))) return { score: 90, level: "keyword" };
  const tw = t.split(" ").filter((w) => w.length >= 3);
  if (tw.some((w) => kws.some((k) => k.split(/[\s-]/).includes(w)))) return { score: 84, level: "closest" };
  return null;
}
function matchesCatalog(term) {
  return SEARCH_CATALOG.some((p) => scoreMatch(term, p));
}

function mapProduct(p) {
  const discount = p.mrp > p.price ? Math.round(((p.mrp - p.price) / p.mrp) * 100) : 0;
  return { id: p.id, name: p.name, brand: p.brand, emoji: p.emoji, price: p.price, mrp: p.mrp, discount, rating: p.rating, delivery: p.delivery, eta: p.eta, category: p.category };
}

// candidates for a term, ranked, optionally brand-filtered
function candidatesFor(term) {
  const brand = detectBrand(term);
  let scored = SEARCH_CATALOG.map((p) => ({ p, m: scoreMatch(term, p) })).filter((x) => x.m).sort((a, b) => b.m.score - a.m.score);
  if (brand) {
    const f = scored.filter((x) => x.p.brand.toLowerCase() === brand.toLowerCase());
    if (f.length) scored = f; // brand priority: only that brand
  }
  return { cands: scored.map((x) => x.p), level: scored[0]?.m.level, brand };
}

const ROT = {};

export function searchOne(req) {
  const { term, budget } = req;
  const { cands, level } = candidatesFor(term);
  if (cands.length === 0) return outOfStock(term, budget, "No product found.", false);

  const cat = cands[0].category;
  const sortedAsc = [...cands].sort((a, b) => a.price - b.price);

  let best, budgetTier, premiumTier;

  if (budget != null) {
    const within = sortedAsc.filter((p) => p.price <= budget);
    if (within.length === 0) {
      // nothing within budget → out of stock, but offer to expand
      return outOfStock(term, budget, `No product found within ₹${budget}.`, true, sortedAsc.slice(0, 1)[0]);
    }
    best = within[within.length - 1]; // closest under budget
    budgetTier = within.length > 1 ? within[Math.max(0, within.length - 2)] : within[0];
    premiumTier = sortedAsc.find((p) => p.price > best.price) || best;
  } else {
    const center = (ROT[cat] = (ROT[cat] || 0) + 1) % sortedAsc.length;
    best = sortedAsc[center];
    budgetTier = sortedAsc[Math.max(0, center - 1)];
    premiumTier = sortedAsc[Math.min(sortedAsc.length - 1, center + 1)];
  }

  const tiers = { budget: mapProduct(budgetTier), best: mapProduct(best), premium: mapProduct(premiumTier) };
  const conf = { exact: 97, category: 95, keyword: 93, closest: 88 }[level] || 92;
  return {
    lineId: uid(), term, category: cat, budget: budget ?? null,
    tiers, selectedTier: "best",
    why: budget != null ? `Best ${cat} under ₹${budget}` : `Top ${cat} match for “${term}”`,
    confidence: conf, qty: 1,
    sizes: CLOTHING.has(cat) ? SIZES : null, colors: CLOTHING.has(cat) ? COLORS : null,
    selectedSize: CLOTHING.has(cat) ? "M" : null, selectedColor: CLOTHING.has(cat) ? "Black" : null,
    optimize: OPTIMIZE[cat] || null,
  };
}

function outOfStock(term, budget, reason, canExpand, nearest) {
  return { lineId: uid(), outOfStock: true, term, budget: budget ?? null, reason, canExpand: !!canExpand, nearest: nearest ? mapProduct(nearest) : null, name: titleCase(term), emoji: "🔍", price: 0, qty: 1, confidence: 0, eta: 0 };
}

// find a cheaper in-stock product in the same category (for the cart "find cheaper")
export function findCheaper(category, currentPrice) {
  const cheaper = SEARCH_CATALOG.filter((p) => p.category === category && p.price < currentPrice).sort((a, b) => b.price - a.price);
  return cheaper.length ? mapProduct(cheaper[0]) : null;
}

function explicitTitle(items) {
  const names = items.map((i) => titleCase(i.term));
  if (names.length <= 3) return names.join("  ·  ");
  return names.slice(0, 3).join("  ·  ") + `  +${names.length - 3}`;
}

export function trimToBudget(data, budget) {
  if (budget == null) return { ...data, budget: null };
  let used = 0;
  const kept = [];
  for (const it of data.items) {
    if (it.outOfStock) { kept.push(it); continue; }
    const price = curPrice(it);
    if (used + price <= budget || kept.length === 0) { kept.push(it); used += price; }
  }
  return { ...data, items: kept, budget };
}

// price of an item given its selected tier (works for both search & recipe items)
export function curPrice(it) {
  if (it.outOfStock) return 0;
  if (it.tiers) return it.tiers[it.selectedTier].price;
  return it.price;
}

export function buildSmartCart(input, overallBudget) {
  const q = parseQuery(input);
  if (q.isExplicit) {
    const items = q.items.map(searchOne);
    const inStock = items.filter((i) => !i.outOfStock);
    const confidence = inStock.length ? Math.round(inStock.reduce((s, i) => s + i.confidence, 0) / inStock.length) : 0;
    const eta = inStock.length ? Math.max(...inStock.map((i) => i.tiers.best.eta)) : 0;
    return {
      key: "list", title: explicitTitle(q.items), emoji: "🛒",
      subtitle: overallBudget != null ? `Exactly what you asked for, tracked against ₹${overallBudget} — nothing extra` : "Exactly what you asked for — nothing extra added",
      mode: "list", eta, confidence, items, anticip: [], budget: overallBudget ?? null,
    };
  }
  const key = resolveText(input);
  const data = buildCart(key, input);
  return trimToBudget(data, overallBudget ?? null);
}

export function parseBudget(v) {
  if (v == null) return null;
  const n = parseInt(String(v).replace(/[^\d]/g, ""), 10);
  return Number.isFinite(n) && n > 0 ? n : null;
}

export const VOICE_SAMPLES = [
  "Nike shoes under 5000",
  "Samsung mobile under 20000",
  "T-shirt and jeans under 1500",
  "Boat headphones",
];
