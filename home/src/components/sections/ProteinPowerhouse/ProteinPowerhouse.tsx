import Button from '../../ui/Button/Button'
import './ProteinPowerhouse.scss'

const BULLETS = [
  'Fast-absorbing whey proteins',
  'Slow-release casein formulas',
  'Plant-based alternatives',
  'Protein bars and snacks',
]

export default function ProteinPowerhouse() {
  return (
    <section className="protein-powerhouse">
      <div className="protein-powerhouse__text">
        <h2 className="protein-powerhouse__heading">
          PROTEIN<br />POWERHOUSE
        </h2>
        <p className="protein-powerhouse__body">
          Trusted by Tampa athletes for recovery, strength, and performance. Build lean muscle with
          our premium selection of protein supplements. From whey isolate to plant-based options,
          we have everything you need to support your fitness goals.
        </p>
        <ul className="protein-powerhouse__bullets">
          {BULLETS.map((b) => (
            <li key={b} className="protein-powerhouse__bullet">{b}</li>
          ))}
        </ul>
        <div>
          <Button variant="primary" size="lg">SHOP PROTEIN</Button>
        </div>
      </div>

      <div className="protein-powerhouse__image-wrap">
        <img
          src="/images/protein-section.png"
          alt="Protein supplements"
          className="protein-powerhouse__image"
        />
      </div>
    </section>
  )
}
