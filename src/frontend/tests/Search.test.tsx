import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Search from '../components/Search'
import '@testing-library/jest-dom'

describe('Search Component', () => {
    // Mock functions for setQuery and setCurrentPage
    const setQueryMock = vi.fn()
    const setCurrentPageMock = vi.fn()

    // Reset mocks before each test
    beforeEach(() => {
        vi.resetAllMocks()
    })

    it('(5pts) calls setQuery and setCurrentPage with correct arguments on input change', () => {
        render(
            <Search
                query=""
                setQuery={setQueryMock}
                setCurrentPage={setCurrentPageMock}
            />
        )

        const inputElement = screen.getByPlaceholderText(
            'Enter product name...'
        )

        // Simulate user typing 'Banana'
        fireEvent.change(inputElement, { target: { value: 'Banana' } })

        // Assert that setQuery was called with 'Banana'
        expect(setQueryMock).toHaveBeenCalledWith('Banana')

        // Assert that setCurrentPage was called with 1
        expect(setCurrentPageMock).toHaveBeenCalledWith(1)
    })
})
