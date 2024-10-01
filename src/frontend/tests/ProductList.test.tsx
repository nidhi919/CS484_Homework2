// ProductList.test.tsx
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, test, expect, vi } from 'vitest'
import ProductList from '../components/ProductList'
import '@testing-library/jest-dom'

describe('ProductList Component', () => {
    const mockProducts = Array.from({ length: 25 }, (_, i) => ({
        id: i + 1,
        name: `Product ${i + 1}`,
        image_url: `http://localhost:5173/public/placeholder.png`,
        deleted: false,
    }))

    test('(5pts) displays products on page', () => {
        render(
            <ProductList
                products={mockProducts}
                currentPage={1}
                totalPages={Math.ceil(mockProducts.length / 10)}
                setCurrentPage={(p) => {
                    p = 1
                }}
            />
        )
        const productCards = screen.getAllByRole('article')
        expect(productCards.length).toBe(25)
    })

    test('(5pts) navigates through pages', () => {
        const mockSetCurrentPage = vi.fn()
        render(
            <ProductList
                products={mockProducts}
                currentPage={1}
                totalPages={Math.ceil(mockProducts.length / 10)}
                setCurrentPage={mockSetCurrentPage}
            />
        )

        const page2Button = screen.getByText('2')
        fireEvent.click(page2Button)

        expect(mockSetCurrentPage).toHaveBeenCalledWith(2)
    })
})
