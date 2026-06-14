import type { ProductItem } from '../types'

export const FEATURED_PRODUCTS: ProductItem[] = [
  {
    id: 'whey-protein',
    name: 'Whey Protein',
    category: 'PROTEIN',
    price: 49.99,
    rating: 4.5,
    image: '/images/product-whey.png',
  },
  {
    id: 'pre-workout',
    name: 'Pre-Workout',
    category: 'ENERGY',
    price: 39.99,
    rating: 4.5,
    image: '/images/product-preworkout.png',
  },
  {
    id: 'bcaas',
    name: 'BCAAs',
    category: 'RECOVERY',
    price: 29.99,
    rating: 4.5,
    image: '/images/product-bcaa.png',
  },
  {
    id: 'creatine',
    name: 'Creatine',
    category: 'STRENGTH',
    price: 24.99,
    rating: 4.5,
    image: '/images/product-creatine.png',
  },
]
