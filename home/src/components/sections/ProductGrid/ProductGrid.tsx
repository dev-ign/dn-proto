import type { ProductItem } from '../../../types'
import ProductCard from '../../ui/ProductCard/ProductCard'
import './ProductGrid.scss'

interface ProductGridProps {
  products: ProductItem[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <section className="product-grid">
      <h2 className="product-grid__heading">EVERYTHING YOU NEED TO PERFORM</h2>
      <div className="product-grid__cards">
        {products.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}
