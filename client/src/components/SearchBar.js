import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { searchUsers } from '../actions/userActions'

const SearchBar = () => {

    const dispatch = useDispatch()

    const [searchName, setSearchName] = useState('')
    const [volleyballExperience, setVolleyballExperience] = useState('')
    const [adminStatus, setAdminStatus] = useState('')
    const [errors, setErrors] = useState({})

    const submitSearch = (e) => {
        e.preventDefault()
        dispatch(searchUsers({searchName, volleyballExperience, adminStatus}, setErrors))
        clear()
        // if(searchName.trim()) {
        //     dispatch(searchUsers({searchName, volleyballExperience}, setErrors))
        //     clear()
        // }
    }

    const clear = () => {
        setSearchName('')
        setErrors({})
    }

  return (
    <div className='search-bar'>
        <div>
            <div>
                <label>Volleyball Experience</label>
                <select value={volleyballExperience} onChange={e=>setVolleyballExperience(e.target.value)}>
                <option disabled value=''>Select</option>
                    <option value='2v2experience'>2v2 beach volleyball</option>
                    <option value='indoorexperienceonly'>Just indoor volleyball</option>
                    <option value='no2v2experience'>4v4 or 6v6 beach volleyball</option>
                    <option value='novballexperience'>No beach or indoor volleyball</option>
                </select>
            </div>
            <div>
                <label>Admin Status</label>
                <select value={adminStatus} onChange={e=>setAdminStatus(e.target.value)}>
                <option disabled value=''>Select</option>
                    <option value='yes'>yes</option>
                    <option value='no'>no</option>
                    <option value='super'>super</option>
                </select>
            </div>
        </div>
        <form onSubmit={submitSearch}>
            <input type='text' placeholder='Search users by name' value={searchName} onChange={e=>setSearchName(e.target.value)} />
            <button className='btn' type='submit'>Search</button>
        </form>
        {errors.message && <p className='error-msg'>{errors.message}</p>}
    </div>
  )
}

export default SearchBar