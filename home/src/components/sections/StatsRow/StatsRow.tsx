import type { StatItem } from '../../../types'
import './StatsRow.scss'

interface StatsRowProps {
  stats: StatItem[]
}

export default function StatsRow({ stats }: StatsRowProps) {
  return (
    <div className="stats-row">
      {stats.map((stat) => (
        <div key={stat.label} className="stats-row__item">
          <span className="stats-row__value">{stat.value}</span>
          <span className="stats-row__label">{stat.label}</span>
        </div>
      ))}
    </div>
  )
}
