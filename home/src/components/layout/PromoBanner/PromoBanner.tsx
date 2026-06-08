import './PromoBanner.scss'

interface PromoBannerProps {
  onDismiss: () => void
}

export default function PromoBanner({ onDismiss }: PromoBannerProps) {
  return (
    <div className="promo-banner">
      <span className="promo-banner__shipping">FREE SHIPPING ON ORDERS $30+</span>
      <span className="promo-banner__sale">🏷️&nbsp; CYBER MONDAY SALE: 20% OFF SITE WIDE</span>
      <button
        className="promo-banner__dismiss"
        onClick={onDismiss}
        aria-label="Dismiss banner"
      >
        ✕
      </button>
    </div>
  )
}
