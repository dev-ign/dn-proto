import { PROTEINS } from '../builderData'
import type { BuilderState } from '../builderTypes'

interface ProteinStepProps {
  state: BuilderState
  onChange: (protein: BuilderState['protein']) => void
}

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const IconShaker = () => (
  <svg width="34" height="40" viewBox="0 0 34 40" fill="none">
    <rect x="8" y="8" width="18" height="26" rx="4" stroke="currentColor" strokeWidth="2"/>
    <path d="M11 8V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v3" stroke="currentColor" strokeWidth="2"/>
    <path d="M13 18h8M13 22h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)

const IconLeaf = () => (
  <svg width="34" height="40" viewBox="0 0 34 40" fill="none">
    <path d="M17 34C17 34 6 26 6 16c0-6 5-10 11-10s11 4 11 10c0 10-11 18-11 18z" stroke="currentColor" strokeWidth="2"/>
    <path d="M17 34V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)

const IconMoon = () => (
  <svg width="34" height="40" viewBox="0 0 34 40" fill="none">
    <path d="M22 8a10 10 0 1 0 0 20 14 14 0 0 1 0-20z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
  </svg>
)

const icons: Record<string, React.ReactNode> = {
  shaker: <IconShaker />,
  leaf: <IconLeaf />,
  moon: <IconMoon />,
}

export default function ProteinStep({ state, onChange }: ProteinStepProps) {
  return (
    <div>
      <div className="b-step-head">
        <span className="b-step-num">02</span>
        <span className="b-step-title">CHOOSE PROTEIN</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginTop: 12 }}>
        {PROTEINS.map(p => {
          const sel = state.protein === p.id
          return (
            <button
              key={p.id}
              onClick={() => onChange(p.id)}
              className={`b-opt${sel ? ' b-opt--sel' : ''}`}
              style={{ padding: '16px 10px 14px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}
            >
              <div className="b-tick"><CheckIcon /></div>
              <div style={{ color: '#111', height: 40, display: 'flex', alignItems: 'center' }}>{icons[p.icon]}</div>
              <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 14, color: '#111' }}>{p.label}</span>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#8C8C8C', textAlign: 'center', lineHeight: 1.35 }}>{p.desc}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
