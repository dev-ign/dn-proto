import Button from '../../ui/Button/Button'
import './PerformanceSupplements.scss'

const BULLETS = [
  'Pre-workout energy formulas',
  'Intra-workout recovery',
  'Post-workout nutrition',
  'Endurance & strength support',
]

export default function PerformanceSupplements() {
  return (
    <section className="performance-supplements">
      <div className="performance-supplements__image-wrap">
        <img
          src="/images/performance-section.png"
          alt="Performance supplements"
          className="performance-supplements__image"
        />
      </div>

      <div className="performance-supplements__text">
        <h2 className="performance-supplements__heading">
          PERFORMANCE<br />SUPPLEMENTS
        </h2>
        <p className="performance-supplements__body">
          Fuel your workouts and maximize your results with our complete line of performance
          supplements. From pre-workouts to BCAAs, we have everything you need to train harder
          and recover faster.
        </p>
        <ul className="performance-supplements__bullets">
          {BULLETS.map((b) => (
            <li key={b} className="performance-supplements__bullet">{b}</li>
          ))}
        </ul>
        <div>
          <Button variant="primary" size="lg">SHOP PERFORMANCE</Button>
        </div>
      </div>
    </section>
  )
}
