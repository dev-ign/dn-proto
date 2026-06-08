import './AuthorizedRetailer.scss'

interface AuthorizedRetailerProps {
  brands: string[]
}

export default function AuthorizedRetailer({ brands }: AuthorizedRetailerProps) {
  return (
    <div className="authorized-retailer">
      <p className="authorized-retailer__label">
        AUTHORIZED RETAILER OF PREMIUM BRANDS INCLUDING
      </p>
      <div className="authorized-retailer__brands">
        {brands.map((brand) => (
          <span key={brand} className="authorized-retailer__brand">
            {brand}
          </span>
        ))}
      </div>
    </div>
  )
}
