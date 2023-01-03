import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
//actions
import { updateProfile } from '../actions/userActions'

const UpdateProfileScreen = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const user = useSelector(state => state.authReducer.user)

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [preferredName, setPreferredName] = useState('')
    const [email, setEmail] = useState('')
    const [pronouns, setPronouns] = useState('')
    const [wantsEmailNotifications, setWantsEmailNotifications] = useState(false)
    const [image, setImage] = useState('')
    
    //error handling
    const [errors, setErrors] = useState({})

    useEffect(()=>{
        if(user) {
            setFirstName(user.firstName)
            setLastName(user.lastName)
            setPreferredName(user.preferredName)
            setEmail(user.email)
            setPronouns(user.pronouns)
            setWantsEmailNotifications(user.wantsEmailNotifications)
            setImage(user.image)
        }
    }, [user])

    //form data
    const formData = {
        firstName,
        lastName,
        preferredName,
        email,
        pronouns,
        wantsEmailNotifications
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(user){
            dispatch(updateProfile(formData, setErrors, navigate, user._id))
        } else {
            setErrors({message: 'Something went wrong, try again'})
        }
    }

    return (
        <div className='post'>
            <h3>Update Your Profile</h3>
            {errors.message && <p className='error-msg'>{errors.message}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <img className='profile-circle' src={image} alt='profile-photo' />
                </div>
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
                    <label>I want to receive email updates for when Sandsharks is setting up to play</label>
                    <input type='checkbox' name='wantsEmailNotifications' checked={wantsEmailNotifications} onChange={e=>setWantsEmailNotifications(e.target.checked)}/>
                </div>
                <button type="submit" className='btn'>Update</button>
            </form>
            <div>
                <Link to='/deleteprofile'>Delete my profile</Link>
            </div>
        </div>
    )
}

export default UpdateProfileScreen