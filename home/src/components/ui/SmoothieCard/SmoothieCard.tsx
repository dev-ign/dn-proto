import type { SmoothieItem } from '../../../types'
import './SmoothieCard.scss'

interface SmoothieCardProps {
  item: SmoothieItem
}

export default function SmoothieCard({ item }: SmoothieCardProps) {
  return (
    <div className="smoothie-card">
      <img
        src={item.image}
        alt={item.name}
        className="smoothie-card__image"
      />
      <div className="smoothie-card__overlay" aria-hidden="true" />
      <div className="smoothie-card__info">
        <span className="smoothie-card__name">{item.name}</span>
        <span className="smoothie-card__price">${item.price.toFixed(2)}</span>
      </div>
    </div>
  )
}
