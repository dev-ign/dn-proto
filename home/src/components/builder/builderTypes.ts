export interface BuilderState {
  size: '16' | '20' | '24'
  protein: 'whey' | 'plant' | 'casein'
  base: 'almond' | 'oat' | 'water' | '2pct'
  fruits: string[]
  boosts: string[]
}

export const DEFAULT_STATE: BuilderState = {
  size: '20',
  protein: 'whey',
  base: 'almond',
  fruits: ['strawberry', 'banana'],
  boosts: ['creatine'],
}

export interface SizeOption {
  id: '16' | '20' | '24'
  label: string
  scale: number
  price: number
  baseCal: number
  baseProtein: number
  sub: string
}

export interface ProteinOption {
  id: 'whey' | 'plant' | 'casein'
  label: string
  desc: string
  icon: string
  proteinMod: number
}

export interface BaseOption {
  id: 'almond' | 'oat' | 'water' | '2pct'
  label: string
  sub: string
  cal: number
}

export interface FruitOption {
  id: string
  label: string
  disc: string
  liquid: string
  cal: number
}

export interface BoostOption {
  id: string
  label: string
  benefit: string
  price: number
  cal: number
  protein: number
  icon: string
  color?: string
}

export interface PresetOption {
  name: string
  size: '16' | '20' | '24'
  protein: 'whey' | 'plant' | 'casein'
  fruits: string[]
  boosts: string[]
  image: string
}

export interface ComputedMacros {
  price: number
  cal: number
  grams: number
  sizeLabel: string
  proteinLabel: string
}
