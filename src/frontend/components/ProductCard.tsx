import type React from 'react'
import type { Product } from '../types'

interface ProductCardProps {
    product: Product
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <div key={product.id} className="product-card" role="article">
            <img
                src={product.image_url || '/public/placeholder.png'}
                alt={product.name}
                onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = '/public/placeholder.png'
                }}
            />
            <h3>{product.name}</h3>
            <p>ID: {product.id}</p>
        </div>
    )
}

export default ProductCard
