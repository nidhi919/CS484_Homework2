import type { Product } from '../types'

const baseUrl = '/api/products'

export const fetchProducts = async (query = '', page = 1) => {
    // TODO Fetch the products from the API
    if (!response.ok) {
        throw new Error('Failed to fetch products')
    }
    return response.json()
}

export const addProduct = async (product: Omit<Product, 'id'>) => {
    const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
    })
    if (!response.ok) {
        throw new Error('Failed to add product')
    }
    return response.json()
}

export const updateProduct = async (id: number, product: Partial<Product>) => {
    const response = await fetch(`${baseUrl}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
    })
    if (!response.ok) {
        throw new Error('Failed to update product')
    }
    return response.json()
}

export const deleteProduct = async (id: number) => {
    const response = await fetch(`${baseUrl}/${id}`, {
        method: 'DELETE',
    })
    if (!response.ok) {
        throw new Error('Failed to delete product')
    }
    return response.json()
}
