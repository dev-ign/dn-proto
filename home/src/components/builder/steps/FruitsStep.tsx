import { FRUITS } from '../builderData'
import type { BuilderState } from '../builderTypes'

interface FruitsStepProps {
  state: BuilderState
  onChange: (fruits: string[]) => void
}

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

function FruitDisc({ id, disc }: { id: string; disc: string }) {
  const glyphs: Record<string, React.ReactNode> = {
    strawberry: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <path d="M13 4C13 4 5 9 5 16a8 8 0 0 0 16 0C21 9 13 4 13 4z" fill="rgba(255,255,255,0.7)"/>
        <path d="M11 6l2-3 2 3" stroke="rgba(255,255,255,0.9)" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    banana: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <path d="M6 18C6 10 12 5 18 6" stroke="rgba(255,255,255,0.8)" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M6 18C9 22 15 22 18 18" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    blueberry: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <circle cx="13" cy="14" r="6" fill="rgba(255,255,255,0.7)"/>
        <path d="M10 8l3-3 3 3" stroke="rgba(255,255,255,0.8)" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    mango: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <path d="M13 5C9 5 5 9 6 14c1 5 5 8 9 8 4 0 6-3 6-7 0-6-4-10-8-10z" fill="rgba(255,255,255,0.7)"/>
      </svg>
    ),
    pineapple: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <ellipse cx="13" cy="16" rx="6" ry="8" fill="rgba(255,255,255,0.7)"/>
        <path d="M10 8l3-5M13 8l0-5M16 8l-3-5" stroke="rgba(255,255,255,0.8)" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  }
  return (
    <div style={{
      width: 46, height: 46, borderRadius: '50%',
      background: `radial-gradient(circle at 35% 35%, ${disc}cc, ${disc})`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: '0 3px 8px rgba(0,0,0,.16)',
      flexShrink: 0,
    }}>
      {glyphs[id]}
    </div>
  )
}

export default function FruitsStep({ state, onChange }: FruitsStepProps) {
  function toggle(id: string) {
    if (state.fruits.includes(id)) {
      onChange(state.fruits.filter(f => f !== id))
    } else {
      onChange([...state.fruits, id])
    }
  }

  return (
    <div>
      <div className="b-step-head">
        <span className="b-step-num">04</span>
        <span className="b-step-title">ADD FRUITS</span>
        <span className="b-step-hint">Pick as many as you like</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(96px, 1fr))', gap: 10, marginTop: 12 }}>
        {FRUITS.map(f => {
          const sel = state.fruits.includes(f.id)
          return (
            <button
              key={f.id}
              onClick={() => toggle(f.id)}
              className={`b-opt${sel ? ' b-opt--sel' : ''}`}
              style={{ padding: '14px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}
            >
              <div className="b-tick"><CheckIcon /></div>
              <FruitDisc id={f.id} disc={f.disc} />
              <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 12, color: '#111' }}>{f.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
