import type { SmoothieItem, HeroThumb } from '../types'

export const POPULAR_SMOOTHIES: SmoothieItem[] = [
  {
    id: 'strawberry-blast',
    name: 'Strawberry Blast',
    price: 8.99,
    image: '/images/smoothie-strawberry.jpg',
  },
  {
    id: 'chocolate-delight',
    name: 'Chocolate Delight',
    price: 8.99,
    image: '/images/smoothie-chocolate.jpg',
  },
  {
    id: 'very-berry',
    name: 'Very Berry',
    price: 8.99,
    image: '/images/smoothie-berry.jpg',
  },
  {
    id: 'biscoff-flight',
    name: 'Biscoff Flight',
    price: 8.99,
    image: '/images/smoothie-biscoff.jpg',
  },
]

export const HERO_THUMBS: HeroThumb[] = [
  {
    image: '/images/hero-img.png',
    label: 'Hero',
    isActive: true,
  },
  {
    image: '/images/hero-thumb2.png',
    label: 'Chocolate Delight',
  },
  {
    image: '/images/hero-thumb3.png',
    label: 'Very Berry',
  },
]
