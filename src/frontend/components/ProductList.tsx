import React from 'react'
import type { Product } from '../types'
import '../public/ProductList.css'

// TODO
// Implement the ProductListProps interface.
interface ProductListProps {}

const ProductList: React.FC<ProductListProps> = ({
    products,
    currentPage,
    totalPages,
    setCurrentPage,
}) => {
    const renderPaginationLinks = () => {
        const links = []
        // TODO
        // Here you should populate the "links" array with JSX elements for each page number.
        // Each link is an <a> element with the page number as the text content.
        // The current page should have the class "active".
        // Make sure to handle the click event.

        return links
    }

    return (
        <div className="product-list">
            <h2>Products</h2>
            {products.length === 0 ? (
                <p>No products found.</p>
            ) : (
                <div className="product-grid">
                    {/* TODO Generate a ProductCard component for each product in the products array. */}
                </div>
            )}
            <div className="pagination">{renderPaginationLinks()}</div>
        </div>
    )
}

export default ProductList
