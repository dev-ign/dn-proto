// ─────────────────────────────────────────────────────────────
// Discount Nutrition — Smoothie Builder · data model + helpers
// ─────────────────────────────────────────────────────────────

// ---- Inline icons (clean flat/line, brand-consistent) ----
const Ic = {
  cup: (s = 1) => (
    // s scales the cup height to suggest size
    <svg viewBox="0 0 48 56" width="100%" height="100%" fill="none">
      <path d={`M13 ${20 - 8 * s} h22 l-2.4 ${30 + 8 * s} a4 4 0 0 1 -4 3.6 h-9.2 a4 4 0 0 1 -4 -3.6 z`}
        stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round"/>
      <path d={`M12.4 ${20 - 8 * s} h23.2`} stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
      <path d={`M22 ${12 - 8 * s} l4 -4 4 3`} stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  shaker: (
    <svg viewBox="0 0 40 48" width="100%" height="100%" fill="none">
      <rect x="11" y="14" width="18" height="28" rx="4" stroke="currentColor" strokeWidth="2.2"/>
      <path d="M11 21h18" stroke="currentColor" strokeWidth="2.2"/>
      <rect x="13.5" y="8" width="13" height="7" rx="2.5" stroke="currentColor" strokeWidth="2.2"/>
      <path d="M16 28h8M16 33h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  leaf: (
    <svg viewBox="0 0 40 48" width="100%" height="100%" fill="none">
      <path d="M20 40c-9-3-12-12-9-23 8 1 16 5 17 14 .6 5-2 8-8 9z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round"/>
      <path d="M20 40c-2-8-5-13-9-16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  moon: (
    <svg viewBox="0 0 40 48" width="100%" height="100%" fill="none">
      <path d="M27 14a13 13 0 1 0 0 22 11 11 0 0 1 0-22z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round"/>
    </svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" width="62%" height="62%" fill="none">
      <path d="M5 12.5l4.2 4.2L19 7" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  plus: (
    <svg viewBox="0 0 24 24" width="60%" height="60%" fill="none">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round"/>
    </svg>
  ),
  back: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
      <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  bolt: (
    <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none">
      <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
    </svg>
  ),
  cart: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
      <path d="M3 4h2l2.4 12.2a1.5 1.5 0 0 0 1.5 1.2h8.2a1.5 1.5 0 0 0 1.5-1.2L21 8H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="9.5" cy="21" r="1.4" fill="currentColor"/>
      <circle cx="18" cy="21" r="1.4" fill="currentColor"/>
    </svg>
  ),
  flame: (
    <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none">
      <path d="M12 3c1 3-2 4-2 7 0-1-1.5-2-1.5-2C7 10 6 12 6 14a6 6 0 0 0 12 0c0-3-2-5-3.5-7.5C13.5 8 14 5 12 3z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
    </svg>
  ),
  muscle: (
    <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none">
      <path d="M5 12c2-1 3-3 3-5 2 1 3 3 3 5h6a3 3 0 0 1 3 3c0 3-3 5-7 5-5 0-8-3-8-6 0-.8 0-1.4-3-2z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
    </svg>
  ),
};

// small flat fruit glyph (drawn inside a colored disc)
function FruitGlyph({ id }) {
  const common = { strokeWidth: 1.7, fill: "none", strokeLinejoin: "round", strokeLinecap: "round" };
  switch (id) {
    case "strawberry":
      return (<svg viewBox="0 0 32 32" width="56%" height="56%">
        <path d="M16 27c-6-2-9-7-8-12 1 0 3 .4 4 1 1-1.4 2.6-2.4 4-2.4s3 1 4 2.4c1-.6 3-1 4-1 1 5-2 10-8 12z" stroke="#fff" {...common}/>
        <path d="M16 9.5c-1.6-2-1-3.4 0-4.5 1 1.1 1.6 2.5 0 4.5z" stroke="#fff" {...common}/>
        <g fill="#fff"><circle cx="13" cy="18" r="0.9"/><circle cx="19" cy="18" r="0.9"/><circle cx="16" cy="22" r="0.9"/></g>
      </svg>);
    case "banana":
      return (<svg viewBox="0 0 32 32" width="58%" height="58%">
        <path d="M8 9c0 8 5 15 16 15 1.6 0 2.6-.4 3-1.2-7 .4-13-4.6-14-13.8-.3-1 .2-1.4-5 0z" stroke="#fff" {...common}/>
      </svg>);
    case "blueberry":
      return (<svg viewBox="0 0 32 32" width="60%" height="60%">
        <circle cx="12" cy="14" r="5.5" stroke="#fff" {...common}/>
        <circle cx="21" cy="17" r="5" stroke="#fff" {...common}/>
        <path d="M12 9.5l1 2 1.6-1.4M21 13l.8 1.8 1.6-1.2" stroke="#fff" {...common}/>
      </svg>);
    case "mango":
      return (<svg viewBox="0 0 32 32" width="58%" height="58%">
        <path d="M20 8c4 1 6 5 5 10s-6 8-11 7-7-6-5-10c1.5-3 5-3 7-4 2-1 2-2.6 4-3z" stroke="#fff" {...common}/>
        <path d="M18 7l2-2" stroke="#fff" {...common}/>
      </svg>);
    case "pineapple":
      return (<svg viewBox="0 0 32 32" width="56%" height="56%">
        <path d="M16 6c-2-2-4-2-5-1 1 0 2 .6 2.5 1.6M16 6c2-2 4-2 5-1-1 0-2 .6-2.5 1.6M16 5.5v3" stroke="#fff" {...common}/>
        <ellipse cx="16" cy="18" rx="7" ry="9" stroke="#fff" {...common}/>
        <path d="M11 13l10 10M21 13L11 23" stroke="#fff" strokeWidth="1.2"/>
      </svg>);
    default:
      return null;
  }
}

// ---- Sizes ----
const SIZES = [
  { id: "16", label: "16oz", scale: 0.78, price: 6.99, cal: 220, protein: 20, sub: "Single" },
  { id: "20", label: "20oz", scale: 0.92, price: 8.99, cal: 290, protein: 25, sub: "Classic" },
  { id: "24", label: "24oz", scale: 1.06, price: 10.99, cal: 360, protein: 30, sub: "Beast" },
];

// ---- Proteins ----
const PROTEINS = [
  { id: "whey", label: "Whey", icon: "shaker", desc: "Fast-absorbing · post-workout", dProtein: 0 },
  { id: "plant", label: "Plant", icon: "leaf", desc: "Dairy-free · pea + rice blend", dProtein: -2 },
  { id: "casein", label: "Casein", icon: "moon", desc: "Slow-release · overnight fuel", dProtein: 1 },
];

// ---- Fruits ----
const FRUITS = [
  { id: "strawberry", label: "Strawberry", disc: "#E1241B", liquid: "#F2879A", cal: 30 },
  { id: "banana",     label: "Banana",     disc: "#E8B53C", liquid: "#EAD79A", cal: 35 },
  { id: "blueberry",  label: "Blueberry",  disc: "#5C6BC0", liquid: "#9C86C8", cal: 30 },
  { id: "mango",      label: "Mango",      disc: "#F4992E", liquid: "#F6C46B", cal: 35 },
  { id: "pineapple",  label: "Pineapple",  disc: "#F2C928", liquid: "#F1E08A", cal: 30 },
];

// ---- Boosts ----
const BOOSTS = [
  { id: "creatine", label: "Creatine",      benefit: "Strength + Recovery", price: 1.0,  cal: 0,  protein: 0, icon: "muscle", liquid: null },
  { id: "bcaa",     label: "BCAA",          benefit: "Lean Muscle",         price: 1.0,  cal: 5,  protein: 0, icon: "bolt",   liquid: null },
  { id: "collagen", label: "Collagen",      benefit: "Skin + Joints",       price: 1.5,  cal: 20, protein: 3, icon: "muscle", liquid: null },
  { id: "oats",     label: "Oats",          benefit: "Sustained Energy",    price: 1.0,  cal: 60, protein: 2, icon: "flame",  liquid: "#E7DCC2" },
  { id: "pb",       label: "Peanut Butter", benefit: "Healthy Fats",        price: 1.5,  cal: 95, protein: 4, icon: "flame",  liquid: "#C99A5B" },
  { id: "espresso", label: "Espresso Shot", benefit: "Energy Kick",         price: 1.0,  cal: 5,  protein: 0, icon: "bolt",   liquid: "#6E4A33" },
];

// ---- Color blending for the live glass ----
function hexToRgb(h) { const n = parseInt(h.slice(1), 16); return [n >> 16 & 255, n >> 8 & 255, n & 255]; }
function rgbToHex(r, g, b) { return "#" + [r, g, b].map(v => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, "0")).join(""); }
const CREAM = "#ECE3D0"; // protein base

function blendLiquid(state) {
  const cols = [];
  state.fruits.forEach(fid => { const f = FRUITS.find(x => x.id === fid); if (f) cols.push(f.liquid); });
  state.boosts.forEach(bid => { const b = BOOSTS.find(x => x.id === bid); if (b && b.liquid) cols.push(b.liquid); });
  if (cols.length === 0) return CREAM;
  // include a little cream for creaminess
  const all = [CREAM, ...cols, ...cols]; // fruits weighted heavier than base
  let r = 0, g = 0, bl = 0;
  all.forEach(c => { const [rr, gg, bb] = hexToRgb(c); r += rr; g += gg; bl += bb; });
  return rgbToHex(r / all.length, g / all.length, bl / all.length);
}
function lighten(hex, amt) { const [r, g, b] = hexToRgb(hex); return rgbToHex(r + (255 - r) * amt, g + (255 - g) * amt, b + (255 - b) * amt); }
function darken(hex, amt) { const [r, g, b] = hexToRgb(hex); return rgbToHex(r * (1 - amt), g * (1 - amt), b * (1 - amt)); }

// ---- Live macros + price ----
function compute(state) {
  const size = SIZES.find(s => s.id === state.size) || SIZES[1];
  const protein = PROTEINS.find(p => p.id === state.protein) || PROTEINS[0];
  let price = size.price;
  let cal = size.cal;
  let grams = size.protein + protein.dProtein;
  state.fruits.forEach(fid => { const f = FRUITS.find(x => x.id === fid); if (f) cal += f.cal; });
  state.boosts.forEach(bid => { const b = BOOSTS.find(x => x.id === bid); if (b) { price += b.price; cal += b.cal; grams += b.protein; } });
  return { price, cal, grams, size, protein };
}

// ---- Auto naming ----
const COMBO_NAMES = {
  "blueberry,strawberry": "Very Berry",
  "banana,strawberry": "Strawberry Blast",
  "mango,pineapple": "Tropical Storm",
  "banana,blueberry": "Blue Banana",
  "banana,mango": "Sunrise",
  "pineapple,strawberry": "Island Crush",
  "blueberry,mango": "Sunset Berry",
  "banana,blueberry,strawberry": "Berry Power",
  "banana,mango,pineapple": "Island Punch",
};
const SOLO_NAMES = {
  strawberry: "Strawberry Crush",
  banana: "Banana Power",
  blueberry: "Blueberry Boost",
  mango: "Mango Tango",
  pineapple: "Pineapple Punch",
};
function smoothieName(state) {
  const f = [...state.fruits].sort();
  const hasPB = state.boosts.includes("pb");
  const hasEsp = state.boosts.includes("espresso");
  if (f.length === 0) {
    if (hasEsp && hasPB) return "Mocha Crunch";
    if (hasEsp) return "Espresso Kick";
    if (hasPB) return "Peanut Power";
    return "House Classic";
  }
  if (f.length === 1) {
    if (f[0] === "banana" && hasPB) return "PB Banana";
    if (f[0] === "banana" && hasEsp) return "Mocha Banana";
    return SOLO_NAMES[f[0]];
  }
  const key = f.join(",");
  if (COMBO_NAMES[key]) return COMBO_NAMES[key];
  // fallback: two-word from first two fruits
  const cap = s => s[0].toUpperCase() + s.slice(1);
  if (f.length === 2) return `${cap(f[0])} ${cap(f[1])}`;
  return "Custom Blend";
}

// ---- Popular presets (real photography thumbnails) ----
const PRESETS = [
  { name: "Very Berry", img: "assets/preset-strawberry.png", size: "20", protein: "whey", fruits: ["strawberry", "blueberry"], boosts: ["creatine"] },
  { name: "PB Banana",  img: "assets/preset-banana.png",     size: "24", protein: "whey", fruits: ["banana"], boosts: ["pb", "oats"] },
  { name: "Mocha Crunch", img: "assets/preset-chocolate.png", size: "20", protein: "casein", fruits: ["banana"], boosts: ["espresso", "pb"] },
];

Object.assign(window, {
  Ic, FruitGlyph, SIZES, PROTEINS, FRUITS, BOOSTS, PRESETS,
  blendLiquid, lighten, darken, compute, smoothieName, CREAM,
});
