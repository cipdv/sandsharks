import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { adminDeleteProfile, adminUserUpdate } from '../actions/userActions'

const UserProfile = ({profile}) => {

    //update the user profile: grant admin status, approve/disapprove photo, change their vball experience (new players to 'has 2v2 experience')
    //click their email to send an email 
    const dispatch = useDispatch()

    const { firstName, lastName, pronouns, email, adminStatus, preferredName, vballExperience, image, imageApproved } = profile

    const [adminState, setAdminState] = useState('')
    const [vballXPState, setVballXPState] = useState('')
    const [imgApprovedState, setImgApprovedState] = useState(false)
    const [errors, setErrors] = useState({})

    useEffect(()=>{
        if(profile) {
            setAdminState(adminStatus)
            setVballXPState(vballExperience)
            setImgApprovedState(imageApproved)
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
            
                <img className='profile-circle-large' src={image} alt='profile-photo' />
                <div>
                <label>Image approved?</label>
                <input type='checkbox' value={imgApprovedState} onChange={e=>setImgApprovedState(e.target.checked)} />
            </div>
            <h4>{firstName} {preferredName !== firstName ? (`"${preferredName}" `) : (' ')}{lastName}</h4>
            <p>{pronouns}</p>
            <p>{email}</p>
            <div>
                <label>Volleyball Experience</label>
                <select value={vballXPState} onChange={e=>setVballXPState(e.target.value)}>
                    <option value='2v2experience'>Has 2v2 beach experience</option>
                    <option value='indoorexperienceonly'>Has only played indoor volleyball</option>
                    <option value='no2v2experience'>Has played 4v4 or 6v6 beach volleyball</option>
                    <option value='novballexperience'>Has never played any beach or indoor volleyball</option>
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