import type { SizeOption, ProteinOption, BaseOption, FruitOption, BoostOption, PresetOption, BuilderState, ComputedMacros } from './builderTypes'

export const SIZES: SizeOption[] = [
  { id: '16', label: '16oz', scale: 0.78, price: 6.99, baseCal: 220, baseProtein: 20, sub: 'Single' },
  { id: '20', label: '20oz', scale: 0.92, price: 8.99, baseCal: 290, baseProtein: 25, sub: 'Classic' },
  { id: '24', label: '24oz', scale: 1.06, price: 10.99, baseCal: 360, baseProtein: 30, sub: 'Beast' },
]

export const PROTEINS: ProteinOption[] = [
  { id: 'whey',   label: 'Whey',   desc: 'Fast-absorbing · post-workout',    icon: 'shaker', proteinMod: 0  },
  { id: 'plant',  label: 'Plant',  desc: 'Dairy-free · pea + rice blend',    icon: 'leaf',   proteinMod: -2 },
  { id: 'casein', label: 'Casein', desc: 'Slow-release · overnight fuel',    icon: 'moon',   proteinMod: 1  },
]

export const BASES: BaseOption[] = [
  { id: 'almond', label: 'Almond Milk', sub: 'Dairy-free · light',         cal: 30 },
  { id: 'oat',    label: 'Oat Milk',    sub: 'Creamy · naturally sweet',   cal: 50 },
  { id: 'water',  label: 'Water',       sub: 'Zero cal · pure',            cal: 0  },
  { id: '2pct',   label: '2% Milk',     sub: 'Classic · rich protein',     cal: 60 },
]

export const FRUITS: FruitOption[] = [
  { id: 'strawberry', label: 'Strawberry', disc: '#E1241B', liquid: '#F2879A', cal: 30 },
  { id: 'banana',     label: 'Banana',     disc: '#E8B53C', liquid: '#EAD79A', cal: 35 },
  { id: 'blueberry',  label: 'Blueberry',  disc: '#5C6BC0', liquid: '#9C86C8', cal: 30 },
  { id: 'mango',      label: 'Mango',      disc: '#F4992E', liquid: '#F6C46B', cal: 35 },
  { id: 'pineapple',  label: 'Pineapple',  disc: '#F2C928', liquid: '#F1E08A', cal: 30 },
]

export const BOOSTS: BoostOption[] = [
  { id: 'creatine', label: 'Creatine',      benefit: 'Strength + Recovery', price: 1.00, cal: 0,  protein: 0, icon: 'muscle' },
  { id: 'bcaa',     label: 'BCAA',          benefit: 'Lean Muscle',         price: 1.00, cal: 5,  protein: 0, icon: 'bolt'   },
  { id: 'collagen', label: 'Collagen',      benefit: 'Skin + Joints',       price: 1.50, cal: 20, protein: 3, icon: 'muscle' },
  { id: 'oats',     label: 'Oats',          benefit: 'Sustained Energy',    price: 1.00, cal: 60, protein: 2, icon: 'flame'  },
  { id: 'pb',       label: 'Peanut Butter', benefit: 'Healthy Fats',        price: 1.50, cal: 95, protein: 4, icon: 'flame'  },
  { id: 'espresso', label: 'Espresso Shot', benefit: 'Energy Kick',         price: 1.00, cal: 5,  protein: 0, icon: 'bolt'   },
]

export const PRESETS: PresetOption[] = [
  { name: 'Very Berry',   size: '20', protein: 'whey',   fruits: ['strawberry','blueberry'], boosts: ['creatine'], image: '/images/preset-strawberry.png' },
  { name: 'PB Banana',    size: '24', protein: 'whey',   fruits: ['banana'],                 boosts: ['pb','oats'], image: '/images/preset-banana.png'     },
  { name: 'Mocha Crunch', size: '20', protein: 'casein', fruits: ['banana'],                 boosts: ['espresso','pb'], image: '/images/preset-chocolate.png' },
]

// ── Color helpers ──────────────────────────────────────────────
function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '')
  return [parseInt(h.slice(0,2),16), parseInt(h.slice(2,4),16), parseInt(h.slice(4,6),16)]
}
function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r,g,b].map(v => Math.round(Math.max(0,Math.min(255,v))).toString(16).padStart(2,'0')).join('')
}

export function lighten(hex: string, amt: number): string {
  const [r,g,b] = hexToRgb(hex)
  return rgbToHex(r + (255-r)*amt, g + (255-g)*amt, b + (255-b)*amt)
}
export function darken(hex: string, amt: number): string {
  const [r,g,b] = hexToRgb(hex)
  return rgbToHex(r*(1-amt), g*(1-amt), b*(1-amt))
}

const CREAM = '#ECE3D0'

export function blendLiquid(state: BuilderState): string {
  const colors: string[] = []
  state.fruits.forEach(fid => {
    const f = FRUITS.find(x => x.id === fid)
    if (f) colors.push(f.liquid)
  })
  if (state.boosts.includes('pb')) colors.push('#C99A5B')
  if (state.boosts.includes('espresso')) colors.push('#4A2E1E')
  if (colors.length === 0) return CREAM
  const base = hexToRgb(CREAM)
  const avg = colors.reduce<[number,number,number]>(([ar,ag,ab], c) => {
    const [r,g,b] = hexToRgb(c)
    return [ar+r, ag+g, ab+b]
  }, [0,0,0]).map(v => v / colors.length) as [number,number,number]
  return rgbToHex((base[0]+avg[0])/2, (base[1]+avg[1])/2, (base[2]+avg[2])/2)
}

// ── Name generator ─────────────────────────────────────────────
export function smoothieName(state: BuilderState): string {
  const f = state.fruits
  const b = state.boosts
  if (f.includes('strawberry') && f.includes('blueberry')) return 'Very Berry'
  if (f.includes('mango') && f.includes('pineapple')) return 'Tropical Storm'
  if (f.includes('blueberry') && f.includes('banana')) return 'Blue Banana'
  if (f.includes('strawberry') && f.includes('mango')) return 'Sunrise'
  if (f.includes('mango') && f.includes('pineapple') && b.includes('bcaa')) return 'Island Crush'
  if (f.includes('strawberry') && f.includes('blueberry') && b.includes('bcaa')) return 'Sunset Berry'
  if (f.includes('strawberry') && f.includes('blueberry') && b.includes('creatine')) return 'Berry Power'
  if (f.includes('mango') && f.includes('pineapple') && b.includes('creatine')) return 'Island Punch'
  if (b.includes('espresso') && b.includes('pb')) return 'Mocha Crunch'
  if (b.includes('espresso') && f.includes('banana')) return 'Mocha Banana'
  if (b.includes('pb') && f.includes('banana')) return 'PB Banana'
  if (b.includes('espresso')) return 'Espresso Kick'
  if (b.includes('pb')) return 'Peanut Power'
  if (f.length === 0) return 'House Classic'
  if (f.includes('strawberry')) return 'Strawberry Crush'
  if (f.includes('banana')) return 'Banana Power'
  if (f.includes('blueberry')) return 'Blueberry Boost'
  if (f.includes('mango')) return 'Mango Tango'
  if (f.includes('pineapple')) return 'Pineapple Punch'
  return 'Custom Blend'
}

// ── Compute macros ─────────────────────────────────────────────
export function compute(state: BuilderState): ComputedMacros {
  const size = SIZES.find(s => s.id === state.size) ?? SIZES[1]
  const protein = PROTEINS.find(p => p.id === state.protein) ?? PROTEINS[0]
  const base = BASES.find(b => b.id === state.base) ?? BASES[0]
  const fruits = FRUITS.filter(f => state.fruits.includes(f.id))
  const boosts = BOOSTS.filter(b => state.boosts.includes(b.id))

  const fruitCal = fruits.reduce((sum, f) => sum + f.cal, 0)
  const boostCal = boosts.reduce((sum, b) => sum + b.cal, 0)
  const boostPrice = boosts.reduce((sum, b) => sum + b.price, 0)
  const boostProtein = boosts.reduce((sum, b) => sum + b.protein, 0)

  return {
    price: size.price + boostPrice,
    cal: size.baseCal + base.cal + fruitCal + boostCal,
    grams: size.baseProtein + protein.proteinMod + boostProtein,
    sizeLabel: size.label,
    proteinLabel: protein.label,
  }
}
