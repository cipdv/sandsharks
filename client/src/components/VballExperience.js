import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { updateProfile } from '../actions/userActions'

const VballExperience = ({user}) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [errors, setErrors] = useState({})

    const submitGotIt = (e) => {
        e.preventDefault()
        dispatch(updateProfile({gotItVballExperience: true}, setErrors, navigate, user._id))
    }

    if(user.vballExperience === 'indoorexperienceonly') {
        return (
            <div className='post'>
                This person has only played indoor vball: watch this video, suggest coming to intro session
            </div>
        )
    }

    if(user.vballExperience === 'no2v2experience') {
        return (
            <div className='post'>
                This person played some beach vball, but not 2v2: watch this video, suggest coming to intro session
            </div>
        )
    }

    if(user.vballExperience === 'novballexperience') {
        return (
            <>
                {!user.gotItVballExperience ? (
                    <div className='post'>
                        <h4>Welcome to Sandsharks!</h4>
                        <p>
                            Since you haven't played volleyball before, you're welcome to come join us on days when a beginner clinic will be offered. When a clinic is offered it will show up here, keep checking for updates. 
                        </p>
                        {!user.wantsEmailNotifications ? (
                            <p>If you would like to receive updates in your email, make sure to <Link to='/updateprofile'>update your profile</Link> and check the box beside "I want to receive email updates"</p>
                        ) : (
                            <p>You're set up to receive email updates. If you'd like to change that, <Link to='/updateprofile'>update your profile here.</Link></p>
                        )}
                        {errors.message && <p className='error-msg'>{errors.message}</p>}
                        <button className='btn' onClick={submitGotIt}>Got it</button>
                    </div>
                    ) : (<></>)
                }
            </>  
        )
    }

  
}

export default VballExperience