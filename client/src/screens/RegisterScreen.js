import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'
//actions
import { register } from '../actions/userActions'
import { HIDE_LOADING_SCREEN, SHOW_LOADING_SCREEN } from '../constants/loadingConstants'

const RegisterScreen = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [preferredName, setPreferredName] = useState('')
    const [email, setEmail] = useState('')
    const [pronouns, setPronouns] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [vballExperience, setVballExperience] = useState('')
    const [wantsEmailNotifications, setWantsEmailNotifications] = useState(false)
    const [image, setImage] = useState('')
    
    //error handling
    const [errors, setErrors] = useState({})

    //form data
    const formData = {
        firstName,
        lastName,
        preferredName,
        email,
        pronouns,
        confirmPassword,
        password,
        vballExperience,
        wantsEmailNotifications,
        image,
        waiverAndCoc: false
    }

    const submitForm = (e) => {
        e.preventDefault()
        dispatch(register(formData, setErrors, navigate))
    }

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        dispatch({ type: SHOW_LOADING_SCREEN})

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('/api/upload', formData, config)
            setImage(data)
            dispatch({ type: HIDE_LOADING_SCREEN})
        } catch (error) {
            console.error(error)
            dispatch({ type: HIDE_LOADING_SCREEN})
        }
    }

    return (
        <div className='post'>
            <h4>Become a SandShark</h4>
            <p>Complete the form below to become a member and get updates for when we'll be playing.</p>
            <form onSubmit={submitForm}>
                <div>
                    <label>Full Name</label>
                    <input type='text' name='firstName' placeholder='First name' value={firstName} onChange={e=>setFirstName(e.target.value)} />
                    {errors.firstName && <p className='error-msg'>{errors.firstName}</p>}
                    <input type='text' name='lastName' placeholder='Last name' value={lastName} onChange={e=>setLastName(e.target.value)}/>
                    {errors.lastName && <p className='error-msg'>{errors.lastName}</p>}
                    
                </div>
                <div>
                    <label>Name you go by</label>
                    <input type='text' name='preferredName' placeholder='Preferred name' value={preferredName} onChange={e=>setPreferredName(e.target.value)}/>
                </div>
                <div>
                    <label>Pronouns</label>
                    <input type='text' name='pronouns' placeholder='Pronouns' value={pronouns} onChange={e=>setPronouns(e.target.value)}/>
                    {errors.pronouns && <p className='error-msg'>{errors.pronouns}</p>}
                </div>
                <div>
                    <label>Email</label>
                    <input type='email' name='email' placeholder='Email address' value={email} onChange={e=>setEmail(e.target.value)}/>
                    {errors.email && <p className='error-msg'>{errors.email}</p>}
                    {errors.emailEmpty && <p className='error-msg'>{errors.emailEmpty}</p>}
                </div>
                <div>
                    <label>Password</label>
                    <input type='password' name='password' placeholder='Create a password' value={password} onChange={e=>setPassword(e.target.value)}/>
                    {errors.password && <p className='error-msg'>{errors.password}</p>}
                </div>
                <div>
                    <label>Confirm password</label>
                    <input type='password' name='confirmPassword' placeholder='Confirm your password' value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)}/>
                    {errors.confirmPassword && <p className='error-msg'>{errors.confirmPassword}</p>}
                </div>
                <div className='form-field'>
                    <label>What experience playing beach volleyball do you have?</label>
                    <select name='vballExperience' value={vballExperience} onChange={e=>setVballExperience(e.target.value)}>
                        <option disabled value=''>Select</option>
                        <option value='2v2experience'>I have played 2v2 beach volleyball</option>
                        <option value='indoorexperienceonly'>I haven't played beach volleyball, but I have played indoor volleyball</option>
                        <option value='no2v2experience'>I have played 4v4 or 6v6 beach volleyball</option>
                        <option value='novballexperience'>I have never played any beach or indoor volleyball</option>
                    </select>
                    {errors.vballExperience && <p className='error-msg'>{errors.vballExperience}</p>}
                </div>
                <div>
                    <label>I want to receive email updates for when Sandsharks is setting up to play</label>
                    <input type='checkbox' name='wantsEmailNotifications' checked={wantsEmailNotifications} onChange={e=>setWantsEmailNotifications(e.target.checked)}/>
                </div>
                <div>
                    <label>Profile photo</label>
                    <input type='file' id='image-file' label='Upload file' onChange={uploadFileHandler} />
                </div>
                <button type="submit" className='btn'>Register</button>
            </form>
        </div>
    )
}

export default RegisterScreen