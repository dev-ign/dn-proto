import { useEffect, useMemo, useState } from 'react'

import type { HeroThumb } from '../../../types'
import Button from '../../ui/Button/Button'
import './Hero.scss'

interface HeroProps {
  thumbs: HeroThumb[]
}

export default function Hero({ thumbs }: HeroProps) {
  const initialIndex = thumbs.findIndex((thumb) => thumb.isActive)
  const [activeIndex, setActiveIndex] = useState(initialIndex >= 0 ? initialIndex : 0)

  const activeThumb = useMemo(
    () => thumbs[activeIndex] ?? thumbs[0],
    [activeIndex, thumbs]
  )

  useEffect(() => {
    if (thumbs.length <= 1) return

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mediaQuery.matches) return

    const intervalId = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % thumbs.length)
    }, 4200)

    return () => window.clearInterval(intervalId)
  }, [thumbs.length])

  if (!activeThumb) return null

  return (
    <section className="hero-section">
      {/* Left: content */}
      <div className="hero-section__content">
        <div className="hero-section__chip">
          <span className="hero-section__chip-text">FRESH MADE.</span>
        </div>

        <h1 className="hero-section__heading">
          MADE TO ORDER.<br />
          MADE FOR YOU.
        </h1>

        <p className="hero-section__subheading">
          Try our delicious protein shakes and smoothies.
          Crafted fresh in-store with premium ingredients.
        </p>

        <div className="hero-section__cta-row">
          <Button href="/smoothie-builder" variant="primary" size="lg">ORDER ONLINE</Button>
          <Button variant="outline" size="lg">VIEW PRODUCTS</Button>
        </div>
      </div>

      {/* Right: hero image with feather gradient */}
      <div className="hero-section__image-wrap">
        {thumbs.map((thumb, index) => (
          <img
            key={thumb.image}
            src={thumb.image}
            alt={index === activeIndex ? thumb.label : ''}
            aria-hidden={index === activeIndex ? undefined : true}
            className={`hero-section__image${index === activeIndex ? ' hero-section__image--active' : ''}`}
          />
        ))}
        <div className="hero-section__feather" aria-hidden="true" />
      </div>

      {/* Bottom: carousel thumbnails */}
      <div className="hero-section__thumbs-row scroll-x">
        {thumbs.map((thumb, index) => (
          <button
            key={thumb.image}
            type="button"
            className={`hero-section__thumb${index === activeIndex ? ' hero-section__thumb--active' : ''}`}
            onClick={() => setActiveIndex(index)}
            aria-label={`Show ${thumb.label}`}
            aria-pressed={index === activeIndex}
          >
            <img src={thumb.image} alt={thumb.label} />
          </button>
        ))}
      </div>
    </section>
  )
}
