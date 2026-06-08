import type { ProductItem } from '../../../types'
import Button from '../Button/Button'
import StarRating from '../StarRating/StarRating'
import './ProductCard.scss'

interface ProductCardProps {
  item: ProductItem
}

export default function ProductCard({ item }: ProductCardProps) {
  return (
    <div className="product-card">
      <div className="product-card__image-wrap">
        <img src={item.image} alt={item.name} className="product-card__image" />
      </div>
      <div className="product-card__body">
        <div className="product-card__meta">
          <div className="product-card__labels">
            <span className="product-card__category">{item.category}</span>
            <span className="product-card__name">{item.name}</span>
          </div>
          <StarRating rating={item.rating} />
        </div>
        <div className="product-card__footer">
          <span className="product-card__price">${item.price.toFixed(2)}</span>
          <Button variant="dark">SHOP</Button>
        </div>
      </div>
    </div>
  )
}
