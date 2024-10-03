import type { Product } from '../types'

//const baseUrl = '/api/products'

//const baseUrl = '/api/products'; // Change this line

const baseUrl = 'http://localhost:3000/products' // Use the full URL

export const fetchProducts = async (query = '', page = 1) => {
    // TODO Fetch the products from the API
    const response = await fetch(
        `${baseUrl}?query=${query}&page=${page}` // Use baseUrl here
    )

    if (response.ok) {
        console.log('YES')
    }
    /*console.log(response.json());*/

    if (!response.ok) {
        console.log('Failed')
        throw new Error('Failed to fetch products')
    }
    const data = await response.json()
    //console.log(response.json());
    console.log(data)
    return data
}

//export const fetchProducts = async (query = '', page = 1) => {
//    try {
//        // Fetch the products from the API
//        const response = await fetch(
//            `${baseUrl}?query=${encodeURIComponent(query)}&page=${page}`
//        );

//        if (!response.ok) {
//            throw new Error('Failed to fetch products');
//        }

//        const data = await response.json();
//        return data; // Return the fetched data
//    } catch (error) {
//        console.error("Error fetching products:", error);
//        throw error; // Rethrow the error for further handling
//    }
//}

export const addProduct = async (product: Omit<Product, 'id'>) => {
    const response = await fetch(`${baseUrl}`, {
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
