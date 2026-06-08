import type { PresetOption, BuilderState } from './builderTypes'
import { PRESETS } from './builderData'

interface PresetRowProps {
  onApply: (preset: PresetOption) => void
  state: BuilderState
  compact?: boolean
}

export default function PresetRow({ onApply, compact = false }: PresetRowProps) {
  const h = compact ? 92 : 104
  const w = compact ? 122 : 132

  return (
    <div style={{ overflowX: 'auto', display: 'flex', gap: 10, paddingBottom: 4 }}>
      {PRESETS.map(p => (
        <button
          key={p.name}
          onClick={() => onApply(p)}
          style={{
            flexShrink: 0, width: w, height: h,
            borderRadius: 14, overflow: 'hidden',
            border: 'none', cursor: 'pointer', padding: 0, position: 'relative',
            background: '#0c0c0c',
          }}
        >
          <img
            src={p.image}
            alt={p.name}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(180deg, transparent 20%, rgba(0,0,0,0.82) 100%)',
          }} />
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            padding: '0 10px 10px',
            display: 'flex', flexDirection: 'column', gap: 2,
          }}>
            <span style={{ fontFamily: '"Bebas Neue","Anton",sans-serif', fontStyle: 'italic', fontSize: 15, color: '#fff', lineHeight: 1.1, display: 'block' }}>
              {p.name}
            </span>
            <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 9, letterSpacing: '0.14em', color: '#E1241B', textTransform: 'uppercase' }}>
              TAP TO BUILD
            </span>
          </div>
        </button>
      ))}
    </div>
  )
}
