import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteProfile } from '../actions/userActions'

const DeleteProfileScreen = ({user}) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState({})

    const formData = {
        email,
        password
    }

    const handleDelete = (e) => {
        e.preventDefault()
        if(window.confirm(`Are you sure you want to delete your profile? This can't be undone.`)) {
            dispatch(deleteProfile(formData, setErrors, navigate, user._id))
        }
    }

    return (
        <div className='post'>
            <h3>Delete My Profile</h3>
            <p>To delete your profile, enter your email and password for this account:</p>
            {errors.message && <p className='error-msg'>{errors.message}</p>}
            <form onSubmit={handleDelete}>
                <div>
                    <label>Email</label>
                    <input type='email' value={email} onChange={e=>setEmail(e.target.value)} />
                    {errors.email && <p className='error-msg'>{errors.email}</p>}
                </div>
                <div>
                    <label>Password</label>
                    <input type='password' value={password} onChange={e=>setPassword(e.target.value)} />
                    {errors.password && <p className='error-msg'>{errors.password}</p>}
                </div>
                <button type='submit' className='btn-pink'>Delete my profile</button>
            </form>
        </div>
    )
}

export default DeleteProfileScreen