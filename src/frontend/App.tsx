import React, { useState, useEffect } from 'react'
import type { Product } from './types'
import ProductList from './components/ProductList'
import ProductForm from './components/ProductForm'
import Search from './components/Search'
import StatusBanner from './components/StatusBanner'
import './App.css'
import './public/Icon.css'
import { fetchProducts, addProduct, deleteProduct } from './components/api'

function App() {
    //TODO
    // Add the necessary state variables and their setters.
    // You can understand which variables you need by looking at the code and at the props that the components need.
    // The variable showForm should assume the values "add", "delete", or "none".
    // You're free to either create a type for this or not.

    const [query, setQuery] = useState('') // Search query
    const [currentPage, setCurrentPage] = useState(1) // Pagination
    const [totalPages, setTotalPages] = useState(1)
    const [showForm, setShowForm] = useState('none') // Form visibility
    //const [products, setProducts] = useState([]); // List of products
    const [products, setProducts] = useState<Product[]>([]) // Change here

    const [status, setStatus] = useState('') // Status for error or success messages
    //const query = '';
    //const currentPage = 1;
    //const showForm = 'none';
    //const products = [];

    useEffect(() => {
        const loadProducts = async () => {
            // TODO
            // Fetch the products using the right function from the api module (located in components/api.ts).
            // After receiving the results, you should set the products and the total number of pages to the respective state variables.
            // If there's an error, set the status state variable to the error message "Failed to load products".
            try {
                // Fetch products using the fetchProducts function
                const result = await fetchProducts(query, currentPage)
                console.log(result)
                // Assuming result has a structure like { products: [...], totalPages: X }
                setProducts(result.products) // Set the products fetched from the API
                setTotalPages(result.totalPages)
            } catch (error) {
                // Handle any errors by updating the status
                setStatus(
                    'Failed to load products. Unable to connect to the server.'
                )
            }
        }

        loadProducts()
    }, [query, currentPage])

    const handleAddProduct = async (newProduct: Omit<Product, 'id'>) => {
        try {
            const addedProducts = await addProduct(newProduct) // Add product to backend
            //setProducts((prevProducts) => [...prevProducts, addedProducts]) // Add to products state
            //Product.deleted = true;
            setStatus('Product added successfully')
            setShowForm('none') // Hide form
            setCurrentPage(1) // Reset to first page
        } catch (error) {
            setStatus('Failed to add product. Unable to connect to the server.')
        }
    }

    const handleDeleteProduct = async (productId: number) => {
        try {
            await deleteProduct(productId) // Delete product from backend
            //setProducts((prevProducts) =>
            //    prevProducts.filter((product) => product.id !== productId)
            //) // Update state to remove deleted product

            setProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product.id === productId ? { ...product, deleted: true } : product
                )
            );


            setStatus('Product deleted successfully')
            setShowForm('none') // Hide form
            setCurrentPage(1) // Reset to first page
        } catch (error) {
            setStatus(
                'Failed to delete product. Unable to connect to the server.'
            )
        }
    }

    return (
        <div>
            <header>
                <a
                    className="header-link"
                    href="#"
                    onClick={(e) => {
                        e.preventDefault()
                        setShowForm(showForm === 'add' ? 'none' : 'add')
                    }}
                >
                    <img
                        src="/public/add.svg"
                        alt="Add Product"
                        className="icon"
                    />
                </a>
                <a href="/" className="header-link">
                    <img src="/public/home.svg" alt="Home" className="icon" />
                </a>
                <a
                    className="header-link"
                    href="#"
                    onClick={(e) => {
                        e.preventDefault()
                        setShowForm(showForm === 'delete' ? 'none' : 'delete')
                    }}
                >
                    <img
                        src="/public/delete.svg"
                        alt="Delete Product"
                        className="icon"
                    />
                </a>
            </header>
            {status && (
                <StatusBanner message={status} onClose={() => setStatus('')} />
            )}
            {/* TODO Add the necessary props to the underlying component. 
            When adding a product, you should set the status message to
            "Product added successfully", set the variable showForm back to
            "none" and navigate to the first page of the product list */}
            {showForm === 'add' && (
                <ProductForm
                    mode="add"
                    onSubmit={handleAddProduct} // Add the onSubmit handler for adding products
                    onProductAdded={() => {
                        setShowForm('none') // Hide form after adding
                        setCurrentPage(1) // Refresh product list
                    }}
                    onCancel={() => setShowForm('none')} // Handle cancel
                />
            )}

            {/* TODO Add the necessary props to the underlying component.
            When removing a product, tou should set the status message to
            "Product deleted successfully" and set the variable showForm back to
            "none" and navigate to the first page of the product list */}
            {showForm === 'delete' && (
                <ProductForm
                    mode="delete"
                    onSubmit={handleDeleteProduct} // Add the onSubmit handler for deleting products
                    onProductDeleted={() => {
                        setShowForm('none') // Hide form after deleting
                        setCurrentPage(1) // Refresh product list
                    }}
                    onCancel={() => setShowForm('none')} // Handle cancel
                />
            )}
            {showForm === 'none' && (
                <>
                    {' '}
                    {/* TODO Add the necessary props to the underlying components. */}
                    <Search
                        query={query}
                        setQuery={setQuery} // Updates the query state based on user input
                        setCurrentPage={setCurrentPage} // Resets the current page to 1 when a new search is made
                    />
                    <ProductList
                        products={products}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        setCurrentPage={setCurrentPage}
                    />
                </>
            )}
        </div>
    )
}

export default App
