import { useEffect, useState, useSyncExternalStore } from 'react'
import { Link } from 'react-router-dom'
import type { BuilderState, PresetOption } from '../../components/builder/builderTypes'
import { DEFAULT_STATE } from '../../components/builder/builderTypes'
import { compute, smoothieName } from '../../components/builder/builderData'
import SmoothieGlass from '../../components/builder/SmoothieGlass'
import BuildReceipt from '../../components/builder/BuildReceipt'
import PresetRow from '../../components/builder/PresetRow'
import SizeStep from '../../components/builder/steps/SizeStep'
import ProteinStep from '../../components/builder/steps/ProteinStep'
import BaseStep from '../../components/builder/steps/BaseStep'
import FruitsStep from '../../components/builder/steps/FruitsStep'
import BoostsStep from '../../components/builder/steps/BoostsStep'
import './SmoothieBuilderPage.scss'

function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onStoreChange) => {
      const mq = window.matchMedia(query)
      mq.addEventListener('change', onStoreChange)
      return () => mq.removeEventListener('change', onStoreChange)
    },
    () => window.matchMedia(query).matches,
    () => false,
  )
}

function loadState(): BuilderState {
  try {
    const saved = localStorage.getItem('dn-smoothie')
    if (saved) {
      const parsed = JSON.parse(saved) as Partial<BuilderState>
      if (parsed.size) return { ...DEFAULT_STATE, ...parsed }
    }
  } catch { /* ignore */ }
  return DEFAULT_STATE
}

const CartIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <path d="M3 3h2l2.4 11.4A2 2 0 0 0 9.3 16h7.4a2 2 0 0 0 1.9-1.4L20 7H6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="9" cy="19" r="1.2" fill="currentColor"/>
    <circle cx="17" cy="19" r="1.2" fill="currentColor"/>
  </svg>
)

const BackIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <path d="M14 6l-5 5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export default function SmoothieBuilderPage() {
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const [state, setState] = useState<BuilderState>(loadState)
  const [cart, setCart] = useState(0)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    localStorage.setItem('dn-smoothie', JSON.stringify(state))
  }, [state])

  function set(partial: Partial<BuilderState>) {
    setState(s => ({ ...s, ...partial }))
  }

  function applyPreset(p: PresetOption) {
    setState({ size: p.size, protein: p.protein, base: state.base, fruits: [...p.fruits], boosts: [...p.boosts] })
  }

  function handleAdd() {
    if (added) return
    setCart(c => c + 1)
    setAdded(true)
    setTimeout(() => setAdded(false), 1700)
  }

  const macros = compute(state)
  const name = smoothieName(state)

  const steps = (
    <>
      <div className="b-section">
        <SizeStep state={state} onChange={size => set({ size })} />
      </div>
      <div className="b-section">
        <ProteinStep state={state} onChange={protein => set({ protein })} />
      </div>
      <div className="b-section">
        <BaseStep state={state} onChange={base => set({ base })} />
      </div>
      <div className="b-section">
        <FruitsStep state={state} onChange={fruits => set({ fruits })} />
      </div>
      <div className="b-section">
        <BoostsStep state={state} onChange={boosts => set({ boosts })} />
      </div>
    </>
  )

  if (isDesktop) {
    return (
      <div className="sb-page sb-desktop">
        {/* LEFT — config */}
        <div className="sb-desktop__left">
          <header className="sb-desktop__header">
            <Link to="/">
              <img src="/logo.png" alt="Discount Nutrition" className="sb-desktop__logo" />
            </Link>
            <span className="sb-desktop__header-title">BUILD YOUR SMOOTHIE</span>
            <button className="sb-desktop__cart" aria-label="Cart">
              <CartIcon />
              {cart > 0 && <span className="sb-desktop__cart-count">{cart}</span>}
            </button>
          </header>

          <div className="sb-desktop__body">
            <p className="sb-desktop__kicker">Fresh made · ready in minutes</p>
            <h1 className="sb-desktop__heading">CUSTOMIZE YOUR PERFECT BLEND</h1>

            <PresetRow onApply={applyPreset} state={state} />

            {steps}
          </div>
        </div>

        {/* RIGHT — live preview */}
        <div className="sb-desktop__right">
          <div className="sb-desktop__preview">
            <div className="sb-desktop__glass-glow" />
            <SmoothieGlass state={state} variant="lg" />
            <div className="sb-desktop__glass-label">
              <p className="sb-desktop__glass-sub">{macros.sizeLabel} · {macros.proteinLabel}</p>
              <p className="sb-desktop__glass-name">{name}</p>
            </div>
          </div>
          <div className="sb-desktop__receipt">
            <BuildReceipt state={state} macros={macros} />
          </div>
        </div>
      </div>
    )
  }

  // Mobile
  return (
    <div className="sb-page sb-mobile">
      <header className="sb-mobile__header">
        <Link to="/" className="sb-mobile__back" aria-label="Back to home">
          <BackIcon />
        </Link>
        <span className="sb-mobile__header-title">BUILD YOUR SMOOTHIE</span>
        <button className="sb-mobile__cart" aria-label="Cart">
          <CartIcon />
          {cart > 0 && <span className="sb-mobile__cart-count">{cart}</span>}
        </button>
      </header>

      {/* presets */}
      <div style={{ padding: '16px 20px 0' }}>
        <PresetRow onApply={applyPreset} state={state} compact />
      </div>

      {/* steps */}
      <div className="sb-mobile__steps">
        {steps}
      </div>

      {/* sticky bottom bar */}
      <div className="sb-mobile__bar">
        <SmoothieGlass state={state} variant="sm" />
        <div className="sb-mobile__bar-info">
          <div className="sb-mobile__bar-name">{name}</div>
          <div className="sb-mobile__bar-macros">{macros.cal} cal · {macros.grams}g protein</div>
        </div>
        <button
          onClick={handleAdd}
          className={`sb-mobile__bar-btn ${added ? 'sb-mobile__bar-btn--added' : 'sb-mobile__bar-btn--add'}`}
        >
          {added ? '✓ ADDED' : `$${macros.price.toFixed(2)}`}
        </button>
      </div>
    </div>
  )
}
