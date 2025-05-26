import React, { useState } from 'react'

function SearchWork({ onSearch }) {
  const [query, setQuery] = useState("")

  const handleSearchChange = (event) => {
    setQuery(event.target.value)
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault()
    onSearch(query)
  }

  return (
    <form onSubmit={handleSearchSubmit} className='mt-20'>
      <input
        name='query'
        type='text'
        value={query}
        onChange={handleSearchChange}
        className='border border-gray-500 rounded-md px-4 py-2 mb-4'
        placeholder='Search works...'
      />
      <button
        type='submit'
        className='bg-cyan-500 text-white rounded-md px-4 py-2'
      >
        Search
      </button>
    </form>
  )
}

export default SearchWork