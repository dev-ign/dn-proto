import { BOOSTS } from '../builderData'
import type { BuilderState } from '../builderTypes'

interface BoostsStepProps {
  state: BuilderState
  onChange: (boosts: string[]) => void
}

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const BoostIcon = ({ icon, selected }: { icon: string; selected: boolean }) => {
  const color = selected ? '#fff' : '#E1241B'
  const bg = selected ? '#E1241B' : 'rgba(225,36,27,0.08)'

  const paths: Record<string, React.ReactNode> = {
    muscle: <path d="M4 10l2-3h4l2 3M8 7V4M6 4h4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>,
    bolt:   <path d="M10 4H7l-1 4h3l-2 5 5-6H9l1-3z" fill={color}/>,
    flame:  <path d="M10 12C10 12 6 10 7 7c1-3 4-4 3-6C13 3 13 8 10 10c0 0 1-2 0-3-1 2-2 3 0 5z" fill={color}/>,
  }

  return (
    <div style={{
      width: 34, height: 34, borderRadius: 8,
      background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0, transition: 'background .16s',
    }}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">{paths[icon]}</svg>
    </div>
  )
}

export default function BoostsStep({ state, onChange }: BoostsStepProps) {
  function toggle(id: string) {
    if (state.boosts.includes(id)) {
      onChange(state.boosts.filter(b => b !== id))
    } else {
      onChange([...state.boosts, id])
    }
  }

  return (
    <div>
      <div className="b-step-head">
        <span className="b-step-num">05</span>
        <span className="b-step-title">ADD BOOSTS</span>
        <span className="b-step-hint">Premium add-ons</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(158px, 1fr))', gap: 10, marginTop: 12 }}>
        {BOOSTS.map(b => {
          const sel = state.boosts.includes(b.id)
          return (
            <button
              key={b.id}
              onClick={() => toggle(b.id)}
              className={`b-opt${sel ? ' b-opt--sel' : ''}`}
              style={{ padding: '13px 14px', display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left' }}
            >
              <div className="b-tick"><CheckIcon /></div>
              <BoostIcon icon={b.icon} selected={sel} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 13, color: '#111', marginBottom: 2 }}>{b.label}</div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#8C8C8C' }}>{b.benefit}</div>
              </div>
              <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 12, color: sel ? '#E1241B' : '#B3B3B3', flexShrink: 0 }}>
                +${b.price.toFixed(2)}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
