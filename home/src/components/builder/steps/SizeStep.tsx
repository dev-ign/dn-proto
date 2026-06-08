import { SIZES } from '../builderData'
import type { BuilderState } from '../builderTypes'

interface SizeStepProps {
  state: BuilderState
  onChange: (size: BuilderState['size']) => void
}

const CupIcon = ({ scale }: { scale: number }) => (
  <svg viewBox="0 0 40 56" width={Math.round(28 * scale)} height={Math.round(40 * scale)} fill="none">
    <path d="M6 4h28l-4 44H10L6 4z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
    <path d="M6 4c0 0 2 3 14 3s14-3 14-3" stroke="currentColor" strokeWidth="2"/>
  </svg>
)

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export default function SizeStep({ state, onChange }: SizeStepProps) {
  return (
    <div>
      <div className="b-step-head">
        <span className="b-step-num">01</span>
        <span className="b-step-title">CHOOSE SIZE</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginTop: 12 }}>
        {SIZES.map(s => {
          const sel = state.size === s.id
          return (
            <button
              key={s.id}
              onClick={() => onChange(s.id)}
              className={`b-opt${sel ? ' b-opt--sel' : ''}`}
              style={{ padding: '18px 8px 14px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}
            >
              <div className="b-tick"><CheckIcon /></div>
              <div style={{ color: '#111', display: 'flex', alignItems: 'flex-end', minHeight: 44 }}>
                <CupIcon scale={s.scale} />
              </div>
              <span style={{ fontFamily: '"Bebas Neue","Anton",sans-serif', fontStyle: 'italic', fontSize: 22, color: '#111', lineHeight: 1 }}>{s.label}</span>
              <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 10, letterSpacing: '0.1em', color: '#8C8C8C', textTransform: 'uppercase' }}>{s.sub}</span>
              <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 13, color: sel ? '#E1241B' : '#8C8C8C' }}>${s.price.toFixed(2)}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
