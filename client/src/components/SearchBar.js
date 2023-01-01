import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { searchUsers } from '../actions/userActions'

const SearchBar = () => {

    const dispatch = useDispatch()

    const [searchName, setSearchName] = useState('')
    const [errors, setErrors] = useState({})

    const submitSearch = (e) => {
        e.preventDefault()
        if(searchName.trim()) {
            dispatch(searchUsers({searchName}, setErrors))
            clear()
        }
    }

    const clear = () => {
        setSearchName('')
        setErrors({})
    }

  return (
    <div>
        <form onSubmit={submitSearch}>
            <input type='text' placeholder='Search users by name' value={searchName} onChange={e=>setSearchName(e.target.value)} />
            <button className='btn' type='submit'>Search</button>
        </form>
        {errors.message && <p className='error-msg'>{errors.message}</p>}
    </div>
  )
}

export default SearchBar