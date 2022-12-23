import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { adminDeleteProfile, adminUserUpdate } from '../actions/userActions'

const UserProfile = ({profile}) => {

    //update the user profile: grant admin status, approve/disapprove photo, change their vball experience (new players to 'has 2v2 experience')
    //click their email to send an email 
    const dispatch = useDispatch()

    const { firstName, lastName, pronouns, email, adminStatus, preferredName, vballExperience } = profile

    const [adminState, setAdminState] = useState('')
    const [vballXPState, setVballXPState] = useState('')
    const [errors, setErrors] = useState({})

    useEffect(()=>{
        if(profile) {
            setAdminState(adminStatus)
            setVballXPState(vballExperience)
        }
    }, [profile])

    const handleProfileUpdate = () => {
        dispatch(adminUserUpdate({adminStatus: adminState, vballExperience: vballXPState}, setErrors, profile._id))
    }

    const handleDeleteProfile = () => {
        if(window.confirm(`Are you sure you want to delete this proflie? It can't be undone`)) {
            dispatch(adminDeleteProfile(profile._id))
        }
    }

  return (
    <>
        <div className='post'>
            <h4>{firstName} {lastName}</h4>
            <p>Goes by {preferredName}</p>
            <p>{pronouns}</p>
            <p>{email}</p>
            <div>
                <label>Volleyball Experience</label>
                <select value={vballXPState} onChange={e=>setVballXPState(e.target.value)}>
                    <option value='2v2experience'>I have played 2v2 beach volleyball</option>
                    <option value='indoorexperienceonly'>I haven't played beach volleyball, but I have played indoor volleyball</option>
                    <option value='no2v2experience'>I have played 4v4 or 6v6 beach volleyball</option>
                    <option value='novballexperience'>I have never played any beach or indoor volleyball</option>
                </select>
            </div>
            <div>
                <label>Admin Status</label>
                <select value={adminState} onChange={e=>setAdminState(e.target.value)}>
                    <option value='yes'>Yes</option>
                    <option value='no'>No</option>
                </select>
            </div>
            {errors.message && <p className='error-msg'>{errors.message}</p>}
            <button className='btn' onClick={()=>handleProfileUpdate()}>Update Profile</button>
            <button className='btn-pink' onClick={()=>handleDeleteProfile()}>Delete Profile</button>
        </div>
    </>
  )
}

export default UserProfile