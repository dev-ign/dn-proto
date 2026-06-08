import type { ComputedMacros } from './builderTypes'

interface MacroChipsProps {
  macros: ComputedMacros
  dark?: boolean
}

export default function MacroChips({ macros, dark = false }: MacroChipsProps) {
  const bg = dark ? 'rgba(255,255,255,0.08)' : 'rgba(17,17,17,0.05)'
  const border = dark ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(17,17,17,0.08)'
  const valColor = dark ? '#fff' : '#111'
  const labelColor = dark ? 'rgba(255,255,255,0.5)' : '#8C8C8C'

  const chips = [
    { value: `${macros.grams}g`, label: 'PROTEIN' },
    { value: `${macros.cal}`, label: 'CALORIES' },
    { value: `$${macros.price.toFixed(2)}`, label: 'TOTAL' },
  ]

  return (
    <div style={{ display: 'flex', gap: 8 }}>
      {chips.map(chip => (
        <div key={chip.label} style={{
          background: bg,
          border,
          borderRadius: 12,
          padding: '8px 14px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          minWidth: 60,
        }}>
          <span style={{ fontFamily: '"Bebas Neue", "Anton", sans-serif', fontStyle: 'italic', fontSize: 22, lineHeight: 1, color: valColor }}>
            {chip.value}
          </span>
          <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 9, letterSpacing: '0.14em', color: labelColor, textTransform: 'uppercase' }}>
            {chip.label}
          </span>
        </div>
      ))}
    </div>
  )
}
