import Button from '../../ui/Button/Button'
import './VisitStore.scss'

const STORE_INFO = [
  {
    label: 'ADDRESS',
    lines: ['3725 Gunn Hwy', 'Tampa, FL 33626'],
  },
  {
    label: 'HOURS',
    lines: ['Mon-Fri: 8AM-8PM', 'Sat-Sun: 9AM-4PM'],
  },
  {
    label: 'PHONE',
    lines: ['(813) 264-7329'],
  },
]

export default function VisitStore() {
  return (
    <section className="visit-store">
      <h2 className="visit-store__heading">VISIT OUR TAMPA STORE</h2>

      <div className="visit-store__image-container">
        <img
          src="/images/store.png"
          alt="Discount Nutrition Tampa store"
          className="visit-store__image"
        />
        <div className="visit-store__image-overlay" aria-hidden="true" />
        <div className="visit-store__blur-bg" aria-hidden="true" />

        <div className="visit-store__info">
          {STORE_INFO.map((item) => (
            <div key={item.label} className="visit-store__info-item">
              <span className="visit-store__info-label">{item.label}</span>
              <span className="visit-store__info-value">
                {item.lines.map((line, i) => (
                  <span key={i} style={{ display: 'block' }}>{line}</span>
                ))}
              </span>
            </div>
          ))}
        </div>
      </div>

      <p className="visit-store__tagline">
        Experience personalized service and expert guidance from our knowledgeable team.
        We're here to help you achieve your fitness goals.
      </p>

      <div className="visit-store__buttons">
        <Button variant="primary" size="lg">CALL NOW</Button>
        <Button variant="outline-dark" size="lg">GET DIRECTIONS</Button>
      </div>
    </section>
  )
}
