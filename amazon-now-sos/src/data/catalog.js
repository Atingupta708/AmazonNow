// ============================================================
//  Mock catalog. Prices in INR. eta in minutes.
// ============================================================

// Each product: id, name, emoji, price, rating, eta, why, swaps[]
// swaps: { name, emoji, price, rating, reason, tag }  tag in: cheap|rated|healthy|popular
export const PRODUCTS = {
  // snacks / party
  popcorn: { name: "Butter popcorn (3 packs)", emoji: "🍿", price: 180, rating: 4.5, eta: 11, why: "The non-negotiable movie snack", swaps: [
    { name: "Air-popped lite popcorn", emoji: "🍿", price: 160, rating: 4.6, reason: "60% less oil, same crunch", tag: "healthy" },
    { name: "Caramel popcorn tub", emoji: "🍿", price: 220, rating: 4.7, reason: "Higher rated, crowd favourite", tag: "rated" },
  ]},
  nachos: { name: "Nachos + salsa dip", emoji: "🧀", price: 240, rating: 4.4, eta: 11, why: "Pairs with the popcorn, zero prep", swaps: [
    { name: "Baked tortilla chips", emoji: "🌽", price: 210, rating: 4.5, reason: "Baked not fried, cheaper", tag: "cheap" },
  ]},
  coke: { name: "Coca-Cola (1.25L)", emoji: "🥤", price: 75, rating: 4.6, eta: 11, why: "Cold fizz for the couch", swaps: [
    { name: "Pepsi (1.25L)", emoji: "🥤", price: 70, rating: 4.5, reason: "₹5 cheaper, in stock nearby", tag: "cheap" },
    { name: "Sprite (1.25L)", emoji: "🥤", price: 75, rating: 4.6, reason: "Caffeine-free for late night", tag: "healthy" },
    { name: "Coke Zero (1.25L)", emoji: "🥤", price: 78, rating: 4.7, reason: "No sugar, higher rated", tag: "rated" },
  ]},
  icecream: { name: "Ice cream tub (1L)", emoji: "🍨", price: 320, rating: 4.7, eta: 14, why: "The reward after the climax", swaps: [
    { name: "Frozen yoghurt tub", emoji: "🍦", price: 300, rating: 4.6, reason: "Lighter, cheaper", tag: "healthy" },
  ]},
  chocolate: { name: "Assorted chocolates", emoji: "🍫", price: 150, rating: 4.6, eta: 11, why: "Because you deserve it", swaps: [
    { name: "Dark chocolate (70%)", emoji: "🍫", price: 160, rating: 4.8, reason: "Higher rated, less sugar", tag: "rated" },
  ]},
  chips: { name: "Chips variety pack", emoji: "🥔", price: 160, rating: 4.3, eta: 10, why: "Instant crunch, no plates needed", swaps: [
    { name: "Baked veggie crisps", emoji: "🥕", price: 170, rating: 4.5, reason: "Healthier alternative", tag: "healthy" },
  ]},
  soda: { name: "Mixers & soda (6)", emoji: "🧃", price: 240, rating: 4.4, eta: 13, why: "Covers most drinks without guessing" },
  ice: { name: "Ice bag (2kg)", emoji: "🧊", price: 60, rating: 4.5, eta: 9, why: "The thing everyone forgets" },
  napkins: { name: "Paper napkins & cups", emoji: "🧻", price: 110, rating: 4.4, eta: 10, why: "Less washing up, more hosting" },
  cheese: { name: "Cheese & cracker platter", emoji: "🧀", price: 320, rating: 4.6, eta: 14, why: "Looks intentional, needs no cooking" },
  almonds: { name: "Roasted almonds", emoji: "🥜", price: 150, rating: 4.6, eta: 12, why: "Classier nibble for guests" },
  candles: { name: "Tea-light candles (12)", emoji: "🕯️", price: 90, rating: 4.5, eta: 12, why: "Instant ambience" },

  // birthday
  cake: { name: "Chocolate truffle cake (0.5kg)", emoji: "🎂", price: 549, rating: 4.7, eta: 22, why: "The centre of the celebration", swaps: [
    { name: "Eggless vanilla cake (0.5kg)", emoji: "🎂", price: 499, rating: 4.6, reason: "Eggless, cheaper", tag: "cheap" },
  ]},
  balloons: { name: "Balloons & banner kit", emoji: "🎈", price: 220, rating: 4.4, eta: 18, why: "Five-minute decoration" },
  candlesBday: { name: "Birthday candles + sparkler", emoji: "🎉", price: 80, rating: 4.5, eta: 18, why: "The moment everyone films" },
  gift: { name: "Gift wrap & card", emoji: "🎁", price: 120, rating: 4.3, eta: 18, why: "In case you forgot to wrap it" },

  // sick kid / medical
  thermometer: { name: "Digital thermometer", emoji: "🌡️", price: 249, rating: 4.6, eta: 11, why: "Track the fever every couple of hours" },
  paracetamol: { name: "Kids' paracetamol syrup", emoji: "💊", price: 88, rating: 4.7, eta: 11, why: "Right dose & form — not adult tablets", swaps: [
    { name: "Kids' ibuprofen syrup", emoji: "💊", price: 96, rating: 4.6, reason: "Alternative if fever persists", tag: "rated" },
  ]},
  ors: { name: "ORS electrolyte sachets (5)", emoji: "🧂", price: 75, rating: 4.6, eta: 10, why: "Fever dehydrates fast — keep fluids up" },
  patches: { name: "Cooling gel patches (6)", emoji: "❄️", price: 200, rating: 4.4, eta: 11, why: "Comfort between doses, safe for kids" },
  coldmed: { name: "Cold & flu relief", emoji: "🤧", price: 130, rating: 4.5, eta: 12, why: "Decongestant + paracetamol combo" },
  mask: { name: "Steam inhaler / vaporub", emoji: "🌬️", price: 110, rating: 4.4, eta: 12, why: "Eases a blocked nose overnight" },

  // baby
  diapers: { name: "Diapers (pack of 30)", emoji: "🍼", price: 499, rating: 4.7, eta: 13, why: "The one you can't run out of" },
  wipes: { name: "Baby wipes (72)", emoji: "🧷", price: 180, rating: 4.6, eta: 12, why: "For literally everything" },
  formula: { name: "Infant formula", emoji: "🥛", price: 540, rating: 4.5, eta: 14, why: "Backup feed for the night" },

  // pet
  petfood: { name: "Dog food (1.2kg)", emoji: "🐶", price: 420, rating: 4.6, eta: 16, why: "The bag that just ran out" },
  petbowl: { name: "Food & water bowls", emoji: "🥣", price: 260, rating: 4.4, eta: 16, why: "First thing a new pet needs" },
  petbed: { name: "Pet bed (medium)", emoji: "🛏️", price: 899, rating: 4.5, eta: 20, why: "A spot of their own from day one" },
  petlitter: { name: "Cat litter (5kg)", emoji: "🐱", price: 340, rating: 4.5, eta: 16, why: "Set up before they arrive" },
  pettoys: { name: "Chew & play toys", emoji: "🦴", price: 220, rating: 4.6, eta: 16, why: "Keeps them busy, saves your shoes" },

  // study / work
  coffee: { name: "Instant coffee (200g)", emoji: "☕", price: 320, rating: 4.6, eta: 12, why: "Fuel for the long night", swaps: [
    { name: "Cold brew cans (4)", emoji: "🥫", price: 360, rating: 4.7, reason: "Smoother, ready to drink", tag: "rated" },
    { name: "Green tea (25 bags)", emoji: "🍵", price: 180, rating: 4.5, reason: "Calmer focus, cheaper", tag: "healthy" },
  ]},
  energybar: { name: "Protein / energy bars (6)", emoji: "🍫", price: 360, rating: 4.5, eta: 12, why: "Brain food without a cooking break" },
  nuts: { name: "Trail mix (250g)", emoji: "🌰", price: 240, rating: 4.6, eta: 12, why: "Slow-burn snacking at the desk" },
  stickies: { name: "Sticky notes & pens", emoji: "📝", price: 140, rating: 4.4, eta: 14, why: "For the 1am breakthrough" },
  noodles: { name: "Instant noodles (5)", emoji: "🍜", price: 150, rating: 4.4, eta: 11, why: "Two-minute dinner, no decisions" },
  water: { name: "Mineral water (6 x 1L)", emoji: "💧", price: 120, rating: 4.5, eta: 11, why: "Hydration you'll forget otherwise" },

  // gym
  protein: { name: "Whey protein (1kg)", emoji: "💪", price: 1899, rating: 4.6, eta: 18, why: "The core of any starter pack", swaps: [
    { name: "Plant protein (1kg)", emoji: "🌱", price: 1799, rating: 4.5, reason: "Vegan, easier on the stomach", tag: "healthy" },
  ]},
  shaker: { name: "Shaker bottle", emoji: "🥤", price: 299, rating: 4.5, eta: 18, why: "Mix on the go" },
  bands: { name: "Resistance bands set", emoji: "🏋️", price: 599, rating: 4.6, eta: 20, why: "Train anywhere, day one" },
  towel: { name: "Gym towel + grips", emoji: "🧖", price: 350, rating: 4.4, eta: 18, why: "The small stuff beginners skip" },

  // breakfast / grocery
  bread: { name: "Bread loaf", emoji: "🍞", price: 50, rating: 4.4, eta: 10, why: "Breakfast base" },
  eggs: { name: "Eggs (12)", emoji: "🥚", price: 90, rating: 4.6, eta: 10, why: "Fast protein any way you like" },
  milk: { name: "Milk (1L)", emoji: "🥛", price: 66, rating: 4.6, eta: 9, why: "Coffee, cereal, everything" },
  bananas: { name: "Bananas (6)", emoji: "🍌", price: 50, rating: 4.5, eta: 10, why: "Grab-and-go energy" },
  cereal: { name: "Muesli / cereal", emoji: "🥣", price: 320, rating: 4.5, eta: 11, why: "Zero-effort morning" },
  butter: { name: "Butter & jam", emoji: "🧈", price: 180, rating: 4.5, eta: 11, why: "Makes the toast worth it" },

  // rainy day
  pakora: { name: "Pakora / fritter mix", emoji: "🧆", price: 120, rating: 4.5, eta: 12, why: "Rain demands hot fritters" },
  chai: { name: "Masala chai mix", emoji: "🫖", price: 160, rating: 4.7, eta: 11, why: "The rainy-day ritual" },
  umbrella: { name: "Compact umbrella", emoji: "☂️", price: 399, rating: 4.4, eta: 13, why: "Because you'll need it tomorrow too" },
  soup: { name: "Instant soup (4)", emoji: "🍲", price: 140, rating: 4.4, eta: 11, why: "Warm and ready in minutes" },

  // road trip
  snacksmix: { name: "Road-trip snack box", emoji: "🍪", price: 380, rating: 4.6, eta: 14, why: "Curated mix so no one fights over it" },
  gum: { name: "Gum & mints", emoji: "🌿", price: 80, rating: 4.5, eta: 12, why: "Keeps the driver sharp" },
  wipes2: { name: "Wet wipes & tissues", emoji: "🧻", price: 90, rating: 4.4, eta: 12, why: "Sticky fingers happen" },
  cooler: { name: "Cold drinks (6)", emoji: "🥤", price: 220, rating: 4.5, eta: 13, why: "Stays cold for the first leg" },

  // flashlight / power
  light: { name: "Rechargeable LED light", emoji: "🔦", price: 499, rating: 4.6, eta: 12, why: "Bright, lasts hours, no batteries needed" },
  batteries: { name: "AA batteries (8)", emoji: "🔋", price: 160, rating: 4.5, eta: 12, why: "For the things that still need them" },
  powerbank: { name: "10,000mAh power bank", emoji: "🔌", price: 899, rating: 4.6, eta: 13, why: "Keep your phone alive through the cut" },
};

// recipe: { key, title, emoji, subtitle, mode, items:[id], conf:[per-item], eta }
function recipe(key, title, emoji, subtitle, items, eta, mode = "intent") {
  return { key, title, emoji, subtitle, items, eta, mode };
}

export const RECIPES = {
  "movie-night": recipe("movie-night", "Movie Night", "🎬", "Everything for a perfect night in", ["popcorn", "nachos", "coke", "icecream", "chocolate"], 13),
  "house-party": recipe("house-party", "House Party", "🎉", "A hosting kit that looks effortless", ["ice", "soda", "chips", "napkins", "cheese", "almonds"], 14),
  "birthday": recipe("birthday", "Birthday Celebration", "🎂", "Cake, candles, and the whole vibe", ["cake", "balloons", "candlesBday", "gift", "chocolate"], 22),
  "guests": recipe("guests", "Guests Arrived", "🍷", "Snacks & drinks before the doorbell rings again", ["ice", "soda", "chips", "cheese", "napkins"], 13),
  "study": recipe("study", "Exam Prep / Study Session", "📚", "Fuel and focus for the long haul", ["coffee", "energybar", "nuts", "stickies", "water"], 12),
  "gym": recipe("gym", "Gym Starter Pack", "💪", "Everything a beginner actually needs", ["protein", "shaker", "bands", "towel"], 18),
  "working-late": recipe("working-late", "Working Late Tonight", "🌙", "Dinner and caffeine, decided for you", ["noodles", "coffee", "energybar", "water"], 12),
  "breakfast": recipe("breakfast", "Quick Breakfast", "🍳", "A morning sorted in one tap", ["bread", "eggs", "milk", "bananas", "butter"], 11),
  "rainy-day": recipe("rainy-day", "Rainy Day Essentials", "🌧️", "Cosy, warm, and ready for the weather", ["pakora", "chai", "soup", "umbrella"], 12),
  "new-pet": recipe("new-pet", "New Pet Setup", "🐶", "Day-one essentials for the new arrival", ["petfood", "petbowl", "petbed", "pettoys"], 20),
  "date-night": recipe("date-night", "Date Night", "🌹", "Set the mood without leaving home", ["cheese", "chocolate", "candles", "icecream"], 14),
  "game-night": recipe("game-night", "Game Night", "🎮", "Snacks built for long sessions", ["chips", "coke", "nachos", "energybar"], 12),
  "festival": recipe("festival", "Festival Preparation", "🪔", "Sweets, lights, and the little extras", ["chocolate", "candles", "almonds", "napkins"], 16),
  "road-trip": recipe("road-trip", "Road Trip", "🚗", "Packed for the journey, not the destination", ["snacksmix", "cooler", "gum", "wipes2", "water"], 14),
  "family-dinner": recipe("family-dinner", "Family Dinner", "🍽️", "A warm spread, minimal cooking", ["soup", "bread", "cheese", "icecream", "soda"], 15),

  // emergency recipes
  "food-10": recipe("food-10", "Food in 10 Minutes", "⚡", "Fastest hot food near you, right now", ["noodles", "chips", "coke", "soup"], 9, "emergency"),
  "guests-sudden": recipe("guests-sudden", "Guests Arrived Suddenly", "🚨", "Instant hosting rescue", ["ice", "chips", "soda", "almonds"], 11, "emergency"),
  "medicine": recipe("medicine", "Medicine Refill", "💊", "Common relief, delivered fast", ["coldmed", "paracetamol", "ors", "mask"], 12, "emergency"),
  "baby-care": recipe("baby-care", "Baby Care Emergency", "🍼", "The essentials, no aisle, no panic", ["diapers", "wipes", "formula"], 13, "emergency"),
  "pet-emergency": recipe("pet-emergency", "Pet Emergency Kit", "🐾", "Out of food? Sorted in minutes", ["petfood", "petbowl", "petlitter"], 16, "emergency"),
  "sick-kid": recipe("sick-kid", "Sick Kid, Late Night", "🤒", "Everything for a feverish child", ["thermometer", "paracetamol", "ors", "patches"], 11, "emergency"),
  "power-cut": recipe("power-cut", "Power Cut", "🔦", "A blackout survival kit", ["light", "batteries", "powerbank", "candles"], 12, "emergency"),
};

// life-moment cards shown in the grid (key, gradient)
export const MOMENTS = [
  { key: "movie-night", grad: "linear-gradient(140deg,#3a2d6e,#1a1530)" },
  { key: "date-night", grad: "linear-gradient(140deg,#6e2d4a,#2a1320)" },
  { key: "house-party", grad: "linear-gradient(140deg,#2d566e,#13202a)" },
  { key: "game-night", grad: "linear-gradient(140deg,#2d6e5a,#132a22)" },
  { key: "study", grad: "linear-gradient(140deg,#6e5a2d,#2a2213)" },
  { key: "festival", grad: "linear-gradient(140deg,#6e4a2d,#2a1c13)" },
  { key: "rainy-day", grad: "linear-gradient(140deg,#2d3a6e,#13182a)" },
  { key: "road-trip", grad: "linear-gradient(140deg,#2d6e6e,#132a2a)" },
  { key: "family-dinner", grad: "linear-gradient(140deg,#5a2d6e,#22132a)" },
];

// emergency cards (key)
export const EMERGENCIES = [
  "food-10",
  "guests-sudden",
  "medicine",
  "baby-care",
  "pet-emergency",
  "sick-kid",
  "power-cut",
];

// ============================================================
//  SEARCH_CATALOG — Amazon-style catalog (real brand names),
//  many categories, multiple price tiers per category so we can
//  match a budget, build Budget/Best/Premium options, filter by
//  brand, and rotate for variety. fields:
//  id, name, brand, category, keywords[], emoji, price, mrp,
//  rating, delivery, eta(min)
// ============================================================
function P(id, name, brand, category, keywords, emoji, price, mrp, rating, delivery, eta) {
  return { id, name, brand, category, keywords, emoji, price, mrp, rating, delivery, eta };
}

export const SEARCH_CATALOG = [
  // ---------- t-shirts (clothing) ----------
  P("ts1", "Roadster Men's Round Neck Pure Cotton T-Shirt", "Roadster", "t-shirt", ["t-shirt", "tshirt", "t shirt", "tee", "tees"], "👕", 399, 799, 4.2, "Tomorrow", 720),
  P("ts2", "HRX Slim Fit Training T-Shirt", "HRX", "t-shirt", ["t-shirt", "tshirt", "tee"], "👕", 499, 999, 4.3, "Tomorrow", 720),
  P("ts3", "Allen Solly Men's Solid Cotton T-Shirt", "Allen Solly", "t-shirt", ["t-shirt", "tshirt", "tee"], "👕", 549, 1099, 4.3, "Tomorrow", 720),
  P("ts4", "U.S. Polo Assn Men's Crew Neck T-Shirt", "U.S. Polo Assn", "t-shirt", ["t-shirt", "tshirt", "tee"], "👕", 699, 1299, 4.4, "Tomorrow", 720),
  P("ts5", "Puma Men's Regular Fit T-Shirt", "Puma", "t-shirt", ["t-shirt", "tshirt", "tee"], "👕", 899, 1499, 4.4, "Tomorrow", 720),
  P("ts6", "Levi's Cotton Slim Fit T-Shirt", "Levi's", "t-shirt", ["t-shirt", "tshirt", "tee"], "👕", 1099, 1999, 4.5, "in 2 days", 1440),

  // ---------- jeans ----------
  P("jn1", "Roadster Men's Slim Fit Jeans", "Roadster", "jeans", ["jeans", "denim"], "👖", 799, 1799, 4.1, "Tomorrow", 720),
  P("jn2", "Wrangler Skanders Slim Jeans", "Wrangler", "jeans", ["jeans", "denim"], "👖", 1799, 2999, 4.3, "in 2 days", 1440),
  P("jn3", "Levi's 511 Slim Fit Jeans", "Levi's", "jeans", ["jeans", "denim"], "👖", 1999, 3499, 4.4, "in 2 days", 1440),

  // ---------- shoes ----------
  P("sh1", "Campus Men's Running Shoes", "Campus", "shoes", ["shoes", "shoe", "sneakers", "running shoes", "sports shoes"], "👟", 899, 1799, 4.1, "Tomorrow", 720),
  P("sh2", "Sparx Men's Sports Shoes", "Sparx", "shoes", ["shoes", "sneakers", "sports shoes"], "👟", 1099, 1999, 4.0, "Tomorrow", 720),
  P("sh3", "Puma Men's Sneakers", "Puma", "shoes", ["shoes", "sneakers"], "👟", 2499, 3999, 4.3, "in 2 days", 1440),
  P("sh4", "Adidas Lite Racer Running Shoes", "Adidas", "shoes", ["shoes", "running shoes", "sneakers"], "👟", 3299, 4999, 4.4, "in 2 days", 1440),
  P("sh5", "Nike Revolution 7 Running Shoes", "Nike", "shoes", ["shoes", "running shoes", "sneakers", "nike"], "👟", 3995, 5495, 4.5, "in 2 days", 1440),
  P("sh6", "Nike Air Zoom Pegasus 41", "Nike", "shoes", ["shoes", "running shoes", "nike"], "👟", 7999, 10995, 4.6, "in 3 days", 2880),

  // ---------- mobiles ----------
  P("mo1", "Redmi 13C (4GB, 128GB)", "Redmi", "mobile", ["mobile", "phone", "smartphone", "mobiles", "redmi", "xiaomi"], "📱", 8499, 10999, 4.1, "Tomorrow", 1440),
  P("mo2", "realme NARZO N53 (6GB, 128GB)", "realme", "mobile", ["mobile", "phone", "smartphone", "realme"], "📱", 9499, 12999, 4.2, "Tomorrow", 1440),
  P("mo3", "Samsung Galaxy M14 5G", "Samsung", "mobile", ["mobile", "phone", "smartphone", "samsung", "galaxy"], "📱", 13490, 16990, 4.2, "Tomorrow", 1440),
  P("mo4", "Samsung Galaxy A15 5G", "Samsung", "mobile", ["mobile", "phone", "smartphone", "samsung", "galaxy"], "📱", 16499, 19999, 4.3, "Tomorrow", 1440),
  P("mo5", "OnePlus Nord CE4 (8GB, 128GB)", "OnePlus", "mobile", ["mobile", "phone", "smartphone", "oneplus", "nord"], "📱", 24999, 26999, 4.4, "in 2 days", 2880),
  P("mo6", "Apple iPhone 13 (128GB)", "Apple", "mobile", ["mobile", "phone", "smartphone", "iphone", "apple"], "📱", 49999, 59900, 4.6, "in 2 days", 2880),
  P("mo7", "Apple iPhone 15 (128GB)", "Apple", "mobile", ["mobile", "phone", "smartphone", "iphone", "apple"], "📱", 69999, 79900, 4.7, "in 2 days", 2880),

  // ---------- laptops ----------
  P("lp1", "HP 15s Ryzen 3 Laptop", "HP", "laptop", ["laptop", "laptops", "notebook computer", "hp"], "💻", 32990, 45000, 4.1, "in 2 days", 2880),
  P("lp2", "Lenovo IdeaPad Slim 3", "Lenovo", "laptop", ["laptop", "laptops", "lenovo"], "💻", 38990, 52000, 4.2, "in 2 days", 2880),
  P("lp3", "ASUS Vivobook 15 (i3)", "ASUS", "laptop", ["laptop", "laptops", "asus", "vivobook"], "💻", 42990, 55990, 4.3, "in 2 days", 2880),
  P("lp4", "Dell Inspiron 15 (i5)", "Dell", "laptop", ["laptop", "laptops", "dell", "inspiron"], "💻", 49990, 62000, 4.3, "in 3 days", 4320),
  P("lp5", "HP Pavilion 14 (i5)", "HP", "laptop", ["laptop", "laptops", "hp", "pavilion"], "💻", 64990, 78000, 4.4, "in 3 days", 4320),
  P("lp6", "Apple MacBook Air M2", "Apple", "laptop", ["laptop", "laptops", "macbook", "apple"], "💻", 99900, 114900, 4.7, "in 3 days", 4320),

  // ---------- headphones ----------
  P("hp1", "boAt Airdopes 141 TWS Earbuds", "boAt", "headphones", ["headphones", "earphones", "earbuds", "tws", "boat", "headset"], "🎧", 999, 4490, 4.0, "Tomorrow", 720),
  P("hp2", "boAt Rockerz 450 Headphones", "boAt", "headphones", ["headphones", "headphone", "boat", "headset"], "🎧", 1499, 2990, 4.1, "Tomorrow", 720),
  P("hp3", "OnePlus Bullets Wireless Z2", "OnePlus", "headphones", ["headphones", "earphones", "oneplus", "neckband"], "🎧", 1799, 2299, 4.2, "Tomorrow", 720),
  P("hp4", "JBL Tune 510BT Headphones", "JBL", "headphones", ["headphones", "headphone", "jbl", "headset"], "🎧", 2999, 4999, 4.3, "in 2 days", 1440),
  P("hp5", "Sony WH-CH520 Headphones", "Sony", "headphones", ["headphones", "headphone", "sony", "headset"], "🎧", 3990, 5990, 4.4, "in 2 days", 1440),
  P("hp6", "Apple AirPods (3rd Gen)", "Apple", "headphones", ["headphones", "earbuds", "airpods", "apple", "tws"], "🎧", 16900, 20900, 4.6, "in 2 days", 1440),

  // ---------- watches ----------
  P("wa1", "Fire-Boltt Ninja Call Smartwatch", "Fire-Boltt", "watch", ["watch", "smartwatch", "watches", "fire-boltt", "fireboltt"], "⌚", 1299, 6999, 4.0, "Tomorrow", 720),
  P("wa2", "Noise ColorFit Pulse 3 Smartwatch", "Noise", "watch", ["watch", "smartwatch", "noise"], "⌚", 1799, 5999, 4.1, "Tomorrow", 720),
  P("wa3", "boAt Wave Call Smartwatch", "boAt", "watch", ["watch", "smartwatch", "boat"], "⌚", 1999, 7990, 4.1, "Tomorrow", 720),
  P("wa4", "Titan Neo Analog Watch", "Titan", "watch", ["watch", "watches", "titan", "analog"], "⌚", 2495, 3995, 4.4, "in 2 days", 1440),
  P("wa5", "Samsung Galaxy Fit3", "Samsung", "watch", ["watch", "smartwatch", "samsung"], "⌚", 3999, 4999, 4.3, "in 2 days", 1440),
  P("wa6", "Apple Watch SE (GPS)", "Apple", "watch", ["watch", "smartwatch", "apple watch", "apple"], "⌚", 29900, 32900, 4.6, "in 2 days", 1440),

  // ---------- grocery ----------
  P("gr1", "Tata Salt (1kg)", "Tata", "grocery", ["grocery", "groceries", "salt", "staples"], "🧂", 28, 30, 4.6, "Today in 20 min", 20),
  P("gr2", "Fortune Sunflower Oil (1L)", "Fortune", "grocery", ["grocery", "oil", "cooking oil"], "🛢️", 145, 180, 4.4, "Today in 20 min", 20),
  P("gr3", "Aashirvaad Shudh Atta (5kg)", "Aashirvaad", "grocery", ["grocery", "atta", "flour", "staples"], "🌾", 245, 310, 4.5, "Today in 25 min", 25),
  P("gr4", "Amul Butter (500g)", "Amul", "grocery", ["grocery", "butter", "amul", "dairy"], "🧈", 285, 295, 4.6, "Today in 20 min", 20),
  P("gr5", "Daawat Basmati Rice (5kg)", "Daawat", "grocery", ["grocery", "rice", "basmati", "staples"], "🍚", 560, 700, 4.4, "Today in 25 min", 25),

  // ---------- toys ----------
  P("to1", "Funskool Board Game Set", "Funskool", "toys", ["toys", "toy", "game", "board game"], "🎲", 399, 599, 4.2, "Tomorrow", 720),
  P("to2", "Hot Wheels 5-Car Gift Pack", "Hot Wheels", "toys", ["toys", "toy", "cars", "hot wheels"], "🏎️", 549, 699, 4.4, "Tomorrow", 720),
  P("to3", "Nerf Elite 2.0 Blaster", "Nerf", "toys", ["toys", "toy", "nerf", "blaster"], "🔫", 1299, 1699, 4.3, "Tomorrow", 720),
  P("to4", "LEGO Classic Creative Bricks", "LEGO", "toys", ["toys", "toy", "lego", "bricks"], "🧱", 1799, 2299, 4.6, "in 2 days", 1440),

  // ---------- sports (kept from before, brand-tagged) ----------
  P("cb1", "SG Tennis Cricket Bat (Poplar)", "SG", "cricket bat", ["cricket bat", "bat", "cricket"], "🏏", 549, 899, 4.2, "in 2 days", 1440),
  P("cb2", "SS Kashmir Willow Cricket Bat", "SS", "cricket bat", ["cricket bat", "bat", "willow"], "🏏", 899, 1499, 4.4, "in 2 days", 1440),
  P("cb3", "SG English Willow Cricket Bat", "SG", "cricket bat", ["cricket bat", "bat", "willow"], "🏏", 1199, 1999, 4.6, "in 2 days", 1440),
  P("cb4", "MRF Pro English Willow Bat", "MRF", "cricket bat", ["cricket bat", "bat"], "🏏", 1499, 2499, 4.7, "in 3 days", 2880),
  P("cb5", "Kookaburra Grade-1 Willow Bat", "Kookaburra", "cricket bat", ["cricket bat", "bat"], "🏏", 2499, 3999, 4.8, "in 3 days", 2880),
  P("fb1", "Nivia Practice Football", "Nivia", "football", ["football", "soccer ball", "ball"], "⚽", 299, 599, 4.2, "in 2 days", 1440),
  P("fb2", "Cosco Football (Size 5)", "Cosco", "football", ["football", "soccer ball", "ball"], "⚽", 499, 899, 4.4, "in 2 days", 1440),
  P("fb3", "Nivia Storm Match Football", "Nivia", "football", ["football", "soccer ball"], "⚽", 1299, 1999, 4.7, "in 2 days", 1440),
  P("br1", "Yonex GR 303 Badminton Racket", "Yonex", "badminton racket", ["badminton racket", "racket", "racquet", "badminton"], "🏸", 399, 799, 4.2, "in 2 days", 1440),
  P("br2", "Li-Ning Carbon Badminton Racket", "Li-Ning", "badminton racket", ["badminton racket", "racket", "badminton"], "🏸", 1499, 2999, 4.6, "in 2 days", 1440),
  P("br3", "Yonex Astrox Pro Racket", "Yonex", "badminton racket", ["badminton racket", "racket"], "🏸", 2499, 4499, 4.8, "in 3 days", 2880),

  // ---------- snacks / food (quick commerce) ----------
  P("nd1", "Maggi 2-Minute Noodles (1 pack)", "Maggi", "noodles", ["noodles", "maggi", "instant noodles", "ramen"], "🍜", 14, 15, 4.4, "Today in 12 min", 12),
  P("nd2", "Maggi Masala Noodles (single)", "Maggi", "noodles", ["noodles", "maggi", "instant noodles"], "🍜", 15, 16, 4.4, "Today in 12 min", 12),
  P("nd3", "Nissin Cup Noodles", "Nissin", "noodles", ["noodles", "cup noodles", "ramen"], "🍜", 40, 50, 4.3, "Today in 12 min", 12),
  P("nd4", "Maggi Noodles (Pack of 8)", "Maggi", "noodles", ["noodles", "maggi"], "🍜", 96, 112, 4.5, "Today in 14 min", 14),
  P("nd5", "Korean Ramen Variety (5)", "Nongshim", "noodles", ["noodles", "ramen", "korean"], "🍜", 320, 399, 4.6, "Today in 15 min", 15),
  P("co1", "Lay's Classic Chips (small)", "Lay's", "chips", ["chips", "crisps", "wafers"], "🥔", 20, 20, 4.3, "Today in 11 min", 11),
  P("co2", "Lay's Variety Party Pack", "Lay's", "chips", ["chips", "crisps"], "🥔", 160, 199, 4.3, "Today in 12 min", 12),
  P("co3", "Too Yumm Baked Chips", "Too Yumm", "chips", ["chips", "baked chips"], "🥔", 70, 99, 4.5, "Today in 12 min", 12),
  P("ck1", "Munch Mini Chocolate", "Nestle", "chocolates", ["chocolate", "chocolates"], "🍫", 10, 10, 4.2, "Today in 11 min", 11),
  P("ck2", "Cadbury Dairy Milk", "Cadbury", "chocolates", ["chocolate", "chocolates", "dairy milk"], "🍫", 20, 25, 4.6, "Today in 11 min", 11),
  P("ck3", "Cadbury Silk", "Cadbury", "chocolates", ["chocolate", "chocolates", "silk"], "🍫", 80, 95, 4.7, "Today in 12 min", 12),
  P("ck4", "Amul Dark Chocolate (70%)", "Amul", "chocolates", ["chocolate", "chocolates", "dark chocolate"], "🍫", 90, 110, 4.6, "Today in 12 min", 12),
  P("ck5", "Celebrations Assorted Box", "Cadbury", "chocolates", ["chocolate", "chocolates", "box", "assorted"], "🍫", 150, 199, 4.6, "Today in 13 min", 13),
  P("pp1", "Act II Microwave Popcorn", "Act II", "popcorn", ["popcorn"], "🍿", 45, 55, 4.4, "Today in 12 min", 12),
  P("pp2", "Too Yumm Popcorn (3)", "Too Yumm", "popcorn", ["popcorn"], "🍿", 120, 150, 4.5, "Today in 12 min", 12),
  P("dr1", "Coca-Cola (750ml)", "Coca-Cola", "soft drink", ["soft drink", "cola", "coke", "soda", "cold drink"], "🥤", 40, 45, 4.6, "Today in 11 min", 11),
  P("dr2", "Pepsi (750ml)", "Pepsi", "soft drink", ["soft drink", "pepsi", "soda", "cold drink"], "🥤", 38, 45, 4.5, "Today in 11 min", 11),
  P("dr3", "Sprite (750ml)", "Sprite", "soft drink", ["soft drink", "sprite", "lemon", "cold drink"], "🥤", 40, 45, 4.6, "Today in 11 min", 11),
  P("dr4", "Coca-Cola (1.25L)", "Coca-Cola", "soft drink", ["soft drink", "cola", "coke", "soda"], "🥤", 75, 80, 4.6, "Today in 12 min", 12),
  P("bd1", "Britannia Brown Bread", "Britannia", "bread", ["bread", "loaf"], "🍞", 45, 50, 4.3, "Today in 12 min", 12),
  P("bd2", "Modern White Bread", "Modern", "bread", ["bread", "loaf"], "🍞", 50, 55, 4.4, "Today in 12 min", 12),
  P("bd3", "Britannia Multigrain Bread", "Britannia", "bread", ["bread", "loaf", "multigrain"], "🍞", 65, 75, 4.5, "Today in 12 min", 12),
  P("mk1", "Amul Toned Milk (1L)", "Amul", "milk", ["milk"], "🥛", 60, 64, 4.5, "Today in 10 min", 10),
  P("mk2", "Mother Dairy Full Cream (1L)", "Mother Dairy", "milk", ["milk"], "🥛", 72, 76, 4.6, "Today in 10 min", 10),
  P("mk3", "Sofit Almond Milk (1L)", "Sofit", "milk", ["milk", "almond milk"], "🥛", 220, 250, 4.4, "Today in 12 min", 12),
  P("eg1", "Eggoz Brown Eggs (6)", "Eggoz", "eggs", ["eggs", "egg"], "🥚", 84, 99, 4.6, "Today in 12 min", 12),
  P("eg2", "Farm Eggs (12)", "Licious", "eggs", ["eggs", "egg"], "🥚", 90, 110, 4.5, "Today in 12 min", 12),
  P("cf1", "Nescafe Classic (small)", "Nescafe", "coffee", ["coffee"], "☕", 120, 140, 4.4, "Today in 12 min", 12),
  P("cf2", "Nescafe Gold (200g)", "Nescafe", "coffee", ["coffee"], "☕", 320, 380, 4.6, "Today in 13 min", 13),
  P("cf3", "Sleepy Owl Cold Brew (4)", "Sleepy Owl", "coffee", ["coffee", "cold brew"], "🥫", 360, 449, 4.7, "Today in 14 min", 14),
  P("wt1", "Bisleri Water (1L)", "Bisleri", "water", ["water", "mineral water"], "💧", 20, 22, 4.5, "Today in 10 min", 10),
  P("wt2", "Bisleri Water (6 x 1L)", "Bisleri", "water", ["water", "mineral water"], "💧", 120, 132, 4.5, "Today in 12 min", 12),
  P("pn1", "Cello Ballpoint Pens (5)", "Cello", "pen", ["pen", "pens", "ballpoint"], "🖊️", 50, 60, 4.3, "Tomorrow", 720),
  P("pn2", "Pilot Gel Pens (10)", "Pilot", "pen", ["pen", "pens", "gel pen"], "🖊️", 150, 199, 4.5, "Tomorrow", 720),
  P("nb1", "Classmate Notebook (single)", "Classmate", "notebook", ["notebook", "diary", "register"], "📓", 40, 50, 4.3, "Tomorrow", 720),
  P("nb2", "Classmate Notebooks (6)", "Classmate", "notebook", ["notebook", "register"], "📓", 240, 300, 4.5, "Tomorrow", 720),
];
