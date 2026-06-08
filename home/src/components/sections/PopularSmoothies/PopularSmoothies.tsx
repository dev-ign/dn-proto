import type { SmoothieItem } from '../../../types'
import SmoothieCard from '../../ui/SmoothieCard/SmoothieCard'
import './PopularSmoothies.scss'

interface PopularSmoothiesProps {
  smoothies: SmoothieItem[]
}

export default function PopularSmoothies({ smoothies }: PopularSmoothiesProps) {
  return (
    <section className="popular-smoothies">
      <div className="popular-smoothies__header">
        <h2 className="popular-smoothies__title">POPULAR SMOOTHIES</h2>
        <button className="popular-smoothies__view-all">VIEW FULL MENU →</button>
      </div>
      <div className="popular-smoothies__grid">
        {smoothies.map((item) => (
          <SmoothieCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}
