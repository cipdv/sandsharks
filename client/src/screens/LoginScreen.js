import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
//actions
import { login } from '../actions/userActions'

const LoginScreen = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    //error handling
    const [errors, setErrors] = useState({})

    const formData = {
        email,
        password
    }

    const submitForm = (e) => {
        e.preventDefault()
        dispatch(login(formData, setErrors, navigate))
    }

    return (
        <>
            <h4>Sandshark Member Login</h4>
            <form onSubmit={submitForm}>
                <div>
                    <label>Email</label>
                    <input type='email' name='email' placeholder='Email address' value={email} onChange={e=>setEmail(e.target.value)}/>
                    {errors.email && <p className='error-msg'>{errors.email}</p>}
                </div>
                <div>
                    <label>Password</label>
                    <input type='password' name='password' placeholder='Enter password' value={password} onChange={e=>setPassword(e.target.value)}/>
                    {errors.password && <p className='error-msg'>{errors.password}</p>}
                </div>
                <button type="submit" className='btn'>Login</button>
            </form>
            <div>
                <Link to='/register'>Haven't registered yet? Click here to sign up!</Link>
            </div>
        </>
    )
}

export default LoginScreen