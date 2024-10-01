import React from 'react'
import '../public/Search.css'

//TODO Implement the SearchProps interface.
interface SearchProps {}

//TODO Make sure that the component works properly.
// Every time the user types in the input field, the first page of the results should be displayed.
const Search: React.FC<SearchProps> = ({ query, setQuery, setCurrentPage }) => {
    return (
        <div className="search-container">
            <form className="search-form" role="search">
                <h2 className="search-form-title">Search Products</h2>
                <div className="search-form-group">
                    <input
                        type="text"
                        id="search-query"
                        value={query}
                        placeholder="Enter product name..."
                        required
                    />
                </div>
            </form>
        </div>
    )
}

export default Search
