// src/frontend/tests/ProductForm.test.tsx
import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, test, expect, vi, beforeEach } from 'vitest'
import type { Mock } from 'vitest'
import ProductForm from '../components/ProductForm'
import * as api from '../components/api'

// Mock the entire api module
vi.mock('../components/api', () => ({
    addProduct: vi.fn(),
    deleteProduct: vi.fn(),
}))

describe('ProductForm Component', () => {
    beforeEach(() => {
        // Reset all mocks before each test to ensure test isolation
        vi.resetAllMocks()
    })

    test('(5pts) submits correct data in add mode', async () => {
        const mockOnSubmit = vi.fn()

        // Mock addProduct to resolve successfully
        ;(api.addProduct as Mock).mockResolvedValueOnce({})

        render(<ProductForm mode="add" onProductAdded={mockOnSubmit} />)

        // Fill in the form fields
        fireEvent.change(screen.getByPlaceholderText('Enter product name...'), {
            target: { value: 'New Product' },
        })
        fireEvent.change(screen.getByPlaceholderText('Enter image URL...'), {
            target: { value: 'http://localhost:5173/public/placeholder.png' },
        })

        // Submit the form
        fireEvent.click(screen.getByRole('button', { name: 'Add Product' }))

        // Wait for async actions to complete and assertions to pass
        await waitFor(() => {
            // Ensure addProduct was called with correct arguments
            expect(api.addProduct).toHaveBeenCalledWith({
                name: 'New Product',
                image_url: 'http://localhost:5173/public/placeholder.png',
                deleted: false,
            })

            // Ensure onProductAdded callback was invoked
            expect(mockOnSubmit).toHaveBeenCalled()
        })
    })

    test('(5pts) handles API error gracefully in add mode', async () => {
        const mockOnSubmit = vi.fn()

        // Mock addProduct to reject with an error
        ;(api.addProduct as Mock).mockRejectedValueOnce(new Error('API Error'))

        // Mock console.error to suppress error logs in test output
        const consoleErrorMock = vi
            .spyOn(console, 'error')
            .mockImplementation(() => {})

        render(<ProductForm mode="add" onProductAdded={mockOnSubmit} />)

        // Fill in the form fields
        fireEvent.change(screen.getByPlaceholderText('Enter product name...'), {
            target: { value: 'New Product' },
        })
        fireEvent.change(screen.getByPlaceholderText('Enter image URL...'), {
            target: { value: 'http://localhost:5173/public/placeholder.png' },
        })

        // Submit the form
        fireEvent.click(screen.getByRole('button', { name: 'Add Product' }))

        // Wait for async actions to complete and assertions to pass
        await waitFor(() => {
            // Ensure addProduct was called with correct arguments
            expect(api.addProduct).toHaveBeenCalledWith({
                name: 'New Product',
                image_url: 'http://localhost:5173/public/placeholder.png',
                deleted: false,
            })

            // Ensure onProductAdded callback was NOT invoked due to API error
            expect(mockOnSubmit).not.toHaveBeenCalled()

            // Ensure console.error was called with the error
            expect(consoleErrorMock).toHaveBeenCalledWith(
                'Error adding product:',
                expect.any(Error)
            )
        })

        // Restore console.error after the test
        consoleErrorMock.mockRestore()
    })

    test('(5pts) resets form fields after successful submission in add mode', async () => {
        const mockOnSubmit = vi.fn()

        // Mock addProduct to resolve successfully
        ;(api.addProduct as Mock).mockResolvedValueOnce({})

        render(<ProductForm mode="add" onProductAdded={mockOnSubmit} />)

        const nameInput = screen.getByPlaceholderText(
            'Enter product name...'
        ) as HTMLInputElement
        const imageUrlInput = screen.getByPlaceholderText(
            'Enter image URL...'
        ) as HTMLInputElement

        // Fill in the form fields
        fireEvent.change(nameInput, {
            target: { value: 'New Product' },
        })
        fireEvent.change(imageUrlInput, {
            target: { value: 'http://localhost:5173/public/placeholder.png' },
        })

        // Submit the form
        fireEvent.click(screen.getByRole('button', { name: 'Add Product' }))

        // Wait for async actions to complete and assertions to pass
        await waitFor(() => {
            expect(api.addProduct).toHaveBeenCalledWith({
                name: 'New Product',
                image_url: 'http://localhost:5173/public/placeholder.png',
                deleted: false,
            })
            expect(mockOnSubmit).toHaveBeenCalled()
        })

        // Ensure the form fields have been reset
        expect(nameInput.value).toBe('')
        expect(imageUrlInput.value).toBe('')
    })

    test('(5pts) submits correct data in delete mode', async () => {
        const mockOnDelete = vi.fn()

        // Mock deleteProduct to resolve successfully
        ;(api.deleteProduct as Mock).mockResolvedValueOnce({})

        render(<ProductForm mode="delete" onProductDeleted={mockOnDelete} />)

        const productIdInput = screen.getByPlaceholderText(
            'Enter product ID...'
        ) as HTMLInputElement

        // Fill in the product ID
        fireEvent.change(productIdInput, {
            target: { value: '1' },
        })

        // Submit the form
        fireEvent.click(screen.getByRole('button', { name: 'Delete Product' }))

        // Wait for async actions to complete and assertions to pass
        await waitFor(() => {
            expect(api.deleteProduct).toHaveBeenCalledWith(1)
            expect(mockOnDelete).toHaveBeenCalled()
        })

        // Ensure the form field has been reset
        expect(productIdInput.value).toBe('')
    })

    test('(5pts) handles API error gracefully in delete mode', async () => {
        const mockOnDelete = vi.fn()

        // Mock deleteProduct to reject with an error
        ;(api.deleteProduct as Mock).mockRejectedValueOnce(
            new Error('API Error')
        )

        // Mock console.error to suppress error logs in test output
        const consoleErrorMock = vi
            .spyOn(console, 'error')
            .mockImplementation(() => {})

        render(<ProductForm mode="delete" onProductDeleted={mockOnDelete} />)

        const productIdInput = screen.getByPlaceholderText(
            'Enter product ID...'
        ) as HTMLInputElement

        // Fill in the product ID
        fireEvent.change(productIdInput, {
            target: { value: '1' },
        })

        // Submit the form
        fireEvent.click(screen.getByRole('button', { name: 'Delete Product' }))

        // Wait for async actions to complete and assertions to pass
        await waitFor(() => {
            expect(api.deleteProduct).toHaveBeenCalledWith(1)
            expect(mockOnDelete).not.toHaveBeenCalled()
            expect(consoleErrorMock).toHaveBeenCalledWith(
                'Error deleting product:',
                expect.any(Error)
            )
        })

        // Restore console.error after the test
        consoleErrorMock.mockRestore()
    })
})
