import { BASES } from '../builderData'
import type { BuilderState } from '../builderTypes'

interface BaseStepProps {
  state: BuilderState
  onChange: (base: BuilderState['base']) => void
}

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const IconAlmond = () => (
  <svg width="30" height="34" viewBox="0 0 30 34" fill="none">
    <ellipse cx="15" cy="17" rx="10" ry="14" stroke="currentColor" strokeWidth="2"/>
    <path d="M15 3v28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 3"/>
  </svg>
)

const IconOat = () => (
  <svg width="30" height="34" viewBox="0 0 30 34" fill="none">
    <ellipse cx="15" cy="20" rx="9" ry="12" stroke="currentColor" strokeWidth="2"/>
    <path d="M15 8C15 8 10 4 15 2c5 2 0 6 0 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

const IconWater = () => (
  <svg width="30" height="34" viewBox="0 0 30 34" fill="none">
    <path d="M15 4 L25 20 C25 27 20 31 15 31 C10 31 5 27 5 20 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
    <path d="M10 24 C10 24 12 22 15 23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

const IconMilk = () => (
  <svg width="30" height="34" viewBox="0 0 30 34" fill="none">
    <path d="M10 4h10l2 6H8L10 4z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
    <rect x="6" y="10" width="18" height="20" rx="3" stroke="currentColor" strokeWidth="2"/>
    <path d="M6 18 Q15 22 24 18" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
)

const ICONS: Record<string, React.ReactNode> = {
  almond: <IconAlmond />,
  oat: <IconOat />,
  water: <IconWater />,
  '2pct': <IconMilk />,
}

export default function BaseStep({ state, onChange }: BaseStepProps) {
  return (
    <div>
      <div className="b-step-head">
        <span className="b-step-num">03</span>
        <span className="b-step-title">CHOOSE BASE / MILK</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 10, marginTop: 12 }}>
        {BASES.map(b => {
          const sel = state.base === b.id
          return (
            <button
              key={b.id}
              onClick={() => onChange(b.id)}
              className={`b-opt${sel ? ' b-opt--sel' : ''}`}
              style={{ padding: '14px 8px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}
            >
              <div className="b-tick"><CheckIcon /></div>
              <div style={{ color: '#111', height: 36, display: 'flex', alignItems: 'center' }}>{ICONS[b.id]}</div>
              <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 12, color: '#111', textAlign: 'center', lineHeight: 1.2 }}>{b.label}</span>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: '#8C8C8C', textAlign: 'center', lineHeight: 1.3 }}>{b.sub}</span>
              {b.cal > 0 && (
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: sel ? '#E1241B' : '#B3B3B3', fontWeight: 600 }}>{b.cal} cal</span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
