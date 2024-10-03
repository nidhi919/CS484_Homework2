import React, { useState } from 'react'
import type { Product } from 'frontend/types'
import { addProduct, deleteProduct } from './api'
import '../public/ProductForm.css'

// TODO
// Implement the ProductFormProps interface.
// Note that mode can be either "add" or "delete".
// onProductAdded and onProductDeleted may or may not be necessarily passed to the component.
interface ProductFormProps {
    mode: 'add' | 'delete'
    onProductAdded?: () => void
    onProductDeleted?: () => void
    //onSubmit: (productId: number) => void; // Adjust type if necessary
    //onSubmit: (product: Omit<Product, 'id'>) => void; // For 'add' mode
    onSubmit: (input: Omit<Product, 'id'> | number) => void // Accepts either a product or product ID
    //onSubmit: (input: mode extends 'add' ? Omit<Product, 'id'> : number) => void; // Adjust type based on mode
    onCancel: () => void
    deleteMode?: boolean
}

const ProductForm: React.FC<ProductFormProps> = ({
    mode,
    onProductAdded,
    onProductDeleted,
    onCancel,
}) => {
    const [name, setName] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [productId, setProductId] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            if (mode === 'add') {
                await addProduct({ name, image_url: imageUrl, deleted: false })
                //onSubmit({
                //    name,
                //    image_url: imageUrl,
                //    deleted: false// Pass product data
                //});
                if (onProductAdded) onProductAdded() // Call the callback if provided
                setName('') // Reset form state
                setImageUrl('')
                // TODO
                // Call the correct function from the api module (located in components/api.ts) to add a product
                // and reset the state of the component. The view should go back to the list of products.
            } else if (mode === 'delete') {
                await deleteProduct(Number(productId)) // Convert productId to a number
                //onSubmit(Number(productId)); // Ensure productId is a number
                if (onProductDeleted) onProductDeleted() // Call the callback if provided
                setProductId('') // Reset form state
                // TODO
                // Call the correct function from the api module (located in components/api.ts) to delete a product
                // and reset the state of the component. The view should go back to the list of products.
            }
        } catch (error) {
            console.error(
                `Error ${mode === 'add' ? 'adding' : 'deleting'} product:`,
                error
            )
        }
    }

    return (
        <div className="product-form-container">
            <h2 className="product-form-title">
                {/* TODO Set the correct title based on whether the component is for adding or deleting products.
          The titles should be "Add New Product" and "Delete Product" respectively. */}
            </h2>
            <form onSubmit={handleSubmit} className="product-form">
                {mode === 'add' ? (
                    <>
                        <div className="form-group">
                            <label htmlFor="name"></label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)} // Add onChange to update state
                                placeholder="Enter product name..."
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="imageUrl"></label>
                            <input
                                type="url"
                                id="imageUrl"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)} // Add onChange to update state
                                placeholder="Enter image URL..."
                            />
                        </div>
                    </>
                ) : (
                    <div className="form-group">
                        <label htmlFor="productId"></label>
                        <input
                            type="text"
                            id="productId"
                            value={productId}
                            onChange={(e) => setProductId(e.target.value)} // Add onChange to update state
                            placeholder="Enter product ID..."
                            required
                        />
                    </div>
                )}
                <button
                    type="submit"
                    className={
                        mode === 'add' ? 'submit-button' : 'delete-button'
                    }
                >
                    {mode === 'add' ? 'Add Product' : 'Delete Product'}
                </button>
            </form>
        </div>
    )
}

export default ProductForm
