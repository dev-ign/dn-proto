import Button from '../../ui/Button/Button'
import './CustomizeCTA.scss'

export default function CustomizeCTA() {
  return (
    <section className="customize-cta">
      <div className="customize-cta__image-wrap">
        <img
          src="/images/customize-cta.png"
          alt="Build your smoothie"
          className="customize-cta__image"
        />
      </div>

      <div className="customize-cta__text">
        <h2 className="customize-cta__heading">
          CUSTOMIZE.<br />FUEL. REPEAT.
        </h2>
        <p className="customize-cta__body">
          Pick your base, add your fruits and boosts.
          We blend it fresh, in-store, exactly the way you want it.
        </p>
        <div>
          <Button href="/smoothie-builder" variant="primary" size="lg">BUILD A SMOOTHIE</Button>
        </div>
      </div>
    </section>
  )
}
