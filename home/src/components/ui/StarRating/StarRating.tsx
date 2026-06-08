import { useId } from 'react'

interface StarRatingProps {
  rating: number
  max?: number
}

function Star({ fill }: { fill: 'full' | 'half' | 'empty' }) {
  const id = useId()
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      {fill === 'half' && (
        <defs>
          <clipPath id={id}>
            <rect x="0" y="0" width="7" height="14" />
          </clipPath>
        </defs>
      )}
      {/* background star (empty) */}
      <path
        d="M7 1l1.54 3.12 3.44.5-2.49 2.43.59 3.42L7 8.77l-3.08 1.7.59-3.42L2.02 4.62l3.44-.5L7 1z"
        fill={fill === 'empty' ? '#E6E6E6' : '#E12920'}
        clipPath={fill === 'half' ? `url(#${id})` : undefined}
      />
      {fill === 'half' && (
        <path
          d="M7 1l1.54 3.12 3.44.5-2.49 2.43.59 3.42L7 8.77l-3.08 1.7.59-3.42L2.02 4.62l3.44-.5L7 1z"
          fill="#E6E6E6"
          style={{ clipPath: 'none' }}
        />
      )}
    </svg>
  )
}

export default function StarRating({ rating, max = 5 }: StarRatingProps) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {Array.from({ length: max }, (_, i) => {
        const val = rating - i
        const fill = val >= 1 ? 'full' : val >= 0.5 ? 'half' : 'empty'
        return <Star key={i} fill={fill} />
      })}
    </div>
  )
}
