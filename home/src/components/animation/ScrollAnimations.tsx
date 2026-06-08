import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollAnimations() {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reducedMotion.matches) return

    const lenis = new Lenis({
      duration: 1.08,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const raf = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    const ctx = gsap.context(() => {
      const contentTargets = gsap.utils.toArray<HTMLElement>([
        '.hero-section__content > *',
        '.stats-row__item',
        '.protein-powerhouse__text > *',
        '.performance-supplements__text > *',
        '.customize-cta__text > *',
      ].join(', '))

      contentTargets.forEach((target) => {
        gsap.fromTo(
          target,
          { autoAlpha: 0, y: 28 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.72,
            ease: 'power3.out',
            overwrite: 'auto',
            scrollTrigger: {
              trigger: target,
              start: 'top 86%',
              end: 'bottom 12%',
              toggleActions: 'play reverse play reverse',
            },
          },
        )
      })

      const directionalVisuals = [
        { selector: '.protein-powerhouse__image-wrap', x: 72 },
        { selector: '.performance-supplements__image-wrap', x: -72 },
      ]

      directionalVisuals.forEach(({ selector, x }) => {
        gsap.fromTo(
          selector,
          { autoAlpha: 0, x },
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.95,
            ease: 'power3.out',
            overwrite: 'auto',
            scrollTrigger: {
              trigger: selector,
              start: 'top 82%',
              end: 'bottom 12%',
              toggleActions: 'play reverse play reverse',
            },
          },
        )
      })

      const staggeredRows = [
        { trigger: '.popular-smoothies__grid', targets: '.popular-smoothies__grid .smoothie-card' },
        { trigger: '.product-grid__cards', targets: '.product-grid__cards .product-card' },
      ]

      staggeredRows.forEach(({ trigger, targets }) => {
        const cards = gsap.utils.toArray<HTMLElement>(targets)
        if (!cards.length) return

        const rowTimeline = gsap.timeline({
          paused: true,
          defaults: {
            duration: 0.68,
            ease: 'power3.out',
            overwrite: 'auto',
          },
        })

        rowTimeline.fromTo(
          cards,
          { autoAlpha: 0, y: 28 },
          {
            autoAlpha: 1,
            y: 0,
            stagger: 0.09,
          },
        )

        ScrollTrigger.create({
          trigger,
          start: 'top 84%',
          end: 'bottom 12%',
          onEnter: () => rowTimeline.play(),
          onEnterBack: () => rowTimeline.play(),
          onLeave: () => rowTimeline.reverse(),
          onLeaveBack: () => rowTimeline.reverse(),
        })
      })

      ScrollTrigger.refresh()
    })

    return () => {
      ctx.revert()
      gsap.ticker.remove(raf)
      lenis.destroy()
      ScrollTrigger.update()
    }
  }, [])

  return null
}
