export interface NavItem {
  label: string
  href: string
  hasDropdown?: boolean
}

export interface SmoothieItem {
  id: string
  name: string
  price: number
  image: string
}

export interface HeroThumb {
  image: string
  label: string
  isActive?: boolean
}

export interface ProductItem {
  id: string
  name: string
  category: string
  price: number
  rating: number
  image: string
}

export interface StatItem {
  value: string
  label: string
}

export interface BulletItem {
  text: string
}
