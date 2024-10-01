import React, { useState, useEffect } from 'react'
import ProductList from './components/ProductList'
import ProductForm from './components/ProductForm'
import Search from './components/Search'
import StatusBanner from './components/StatusBanner'
import './App.css'
import './public/Icon.css'
import { fetchProducts } from './components/api'

function App() {
    //TODO
    // Add the necessary state variables and their setters.
    // You can understand which variables you need by looking at the code and at the props that the components need.
    // The variable showForm should assume the values "add", "delete", or "none".
    // You're free to either create a type for this or not.

    useEffect(() => {
        const loadProducts = async () => {
            // TODO
            // Fetch the products using the right function from the api module (located in components/api.ts).
            // After receiving the results, you should set the products and the total number of pages to the respective state variables.
            // If there's an error, set the status state variable to the error message "Failed to load products".
        }

        loadProducts()
    }, [query, currentPage])

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
            {showForm === 'add' && <ProductForm />}
            {/* TODO Add the necessary props to the underlying component.
            When removing a product, tou should set the status message to
            "Product deleted successfully" and set the variable showForm back to
            "none" and navigate to the first page of the product list */}
            {showForm === 'delete' && <ProductForm />}
            {showForm === 'none' && (
                <>
                    {' '}
                    {/* TODO Add the necessary props to the underlying components. */}
                    <Search />
                    <ProductList />
                </>
            )}
        </div>
    )
}

export default App
