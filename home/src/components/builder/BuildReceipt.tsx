import { useState } from 'react'
import type { BuilderState, ComputedMacros } from './builderTypes'
import { FRUITS, BOOSTS, BASES } from './builderData'

interface BuildReceiptProps {
  state: BuilderState
  macros: ComputedMacros
}

export default function BuildReceipt({ state, macros }: BuildReceiptProps) {
  const [added, setAdded] = useState(false)

  const selectedBase = BASES.find(b => b.id === state.base) ?? BASES[0]
  const selectedFruits = FRUITS.filter(f => state.fruits.includes(f.id))
  const selectedBoosts = BOOSTS.filter(b => state.boosts.includes(b.id))

  function handleAdd() {
    if (added) return
    setAdded(true)
    setTimeout(() => setAdded(false), 1700)
  }

  return (
    <div style={{
      background: '#fff',
      borderRadius: 20,
      boxShadow: '0 8px 30px rgba(17,17,17,.12)',
      padding: '20px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
    }}>
      {/* items */}
      <div style={{ display: 'grid', gap: 14 }}>
        <div>
          <div style={{ fontSize: 10, color: '#E1241B', fontFamily: 'Inter, sans-serif', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 6 }}>
            Base
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
            <span style={{ fontSize: 13, color: '#333', fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>{selectedBase.label}</span>
            <span style={{ fontSize: 12, color: '#8C8C8C', fontFamily: 'Inter, sans-serif', flexShrink: 0 }}>{selectedBase.cal} cal</span>
          </div>
        </div>

        {(selectedFruits.length > 0 || selectedBoosts.length > 0) ? (
          <div style={{ display: 'grid', gridTemplateColumns: selectedFruits.length > 0 && selectedBoosts.length > 0 ? '1fr 1fr' : '1fr', gap: '8px 20px' }}>
            {selectedFruits.map(f => (
              <div key={f.id} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: f.disc, flexShrink: 0, display: 'block' }} />
                <span style={{ fontSize: 13, color: '#333', fontFamily: 'Inter, sans-serif' }}>{f.label}</span>
              </div>
            ))}
            {selectedBoosts.map(b => (
              <div key={b.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                <span style={{ fontSize: 13, color: '#333', fontFamily: 'Inter, sans-serif' }}>{b.label}</span>
                <span style={{ fontSize: 12, color: '#8C8C8C', fontFamily: 'Inter, sans-serif', flexShrink: 0 }}>+${b.price.toFixed(2)}</span>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ fontSize: 13, color: '#8C8C8C', fontFamily: 'Inter, sans-serif', margin: 0, fontStyle: 'italic' }}>
            Just protein &amp; base — add fruits or boosts to customize.
          </p>
        )}
      </div>

      {/* total */}
      <div style={{ borderTop: '1px solid #EFEFEF', paddingTop: 14, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: '"Bebas Neue","Anton",sans-serif', fontStyle: 'italic', fontSize: 36, color: '#111', lineHeight: 1 }}>
          ${macros.price.toFixed(2)}
        </span>
        <span style={{ fontSize: 12, color: '#8C8C8C', fontFamily: 'Inter, sans-serif' }}>
          {macros.cal} cal · {macros.grams}g protein
        </span>
      </div>

      {/* CTA */}
      <button
        onClick={handleAdd}
        style={{
          appearance: 'none', border: 0, width: '100%',
          background: added ? '#1c8a3c' : '#E41B25',
          color: '#fff',
          fontFamily: '"Bebas Neue","Anton",sans-serif',
          fontStyle: 'italic', fontSize: 24, letterSpacing: '0.03em',
          padding: '16px 20px', borderRadius: 14, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          boxShadow: added ? '0 8px 22px rgba(28,138,60,.3)' : '0 8px 22px rgba(228,27,37,.32)',
          transition: 'background .25s, box-shadow .25s',
        }}
      >
        {added ? '✓ ADDED TO ORDER' : 'ADD TO ORDER'}
      </button>
    </div>
  )
}
