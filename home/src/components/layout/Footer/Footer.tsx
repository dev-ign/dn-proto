import './Footer.scss'

const SHOP_LINKS = ['Protein', 'Pre-Workout', 'Recovery', 'Lifting Equipment', 'Wellness']
const CONTACT_LINES = ['3725 Gunn Hwy', 'Tampa, FL 33626', '(813) 394-7009', 'info@discountnutrition.com']
const SOCIAL_LINKS = ['Instagram', 'Facebook', 'TikTok', 'YouTube']

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__main">
        <div>
          <span className="footer__brand-name">DISCOUNT NUTRITION</span>
          <p className="footer__brand-desc">
            Tampa's home for premium supplements and honest guidance. Locally served. Community trusted.
          </p>
        </div>

        <div>
          <span className="footer__col-title">SHOP</span>
          <div className="footer__col-links">
            {SHOP_LINKS.map((link) => (
              <button key={link} className="footer__col-link">{link}</button>
            ))}
          </div>
        </div>

        <div>
          <span className="footer__col-title">CONTACT</span>
          <div className="footer__col-links">
            {CONTACT_LINES.map((line) => (
              <span key={line} className="footer__col-link">{line}</span>
            ))}
          </div>
        </div>

        <div>
          <span className="footer__col-title">FOLLOW US</span>
          <div className="footer__col-links">
            {SOCIAL_LINKS.map((link) => (
              <button key={link} className="footer__col-link">{link}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="footer__copyright">
        <p>© 2026 Discount Nutrition. All rights reserved.</p>
      </div>
    </footer>
  )
}
