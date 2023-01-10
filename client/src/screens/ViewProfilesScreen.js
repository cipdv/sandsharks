import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../actions/userActions'
import SearchBar from '../components/SearchBar'
import UserProfile from '../components/UserProfile'

const ViewProfilesScreen = () => {

  const dispatch = useDispatch()

  const [errors, setErrors] = useState({})
  const [profile, setProfile] = useState({})

  const users = useSelector(state => state.authReducer.users)
  
  useEffect(()=>{
      dispatch(getAllUsers(setErrors))
  }, [])

  const selectUser = async (u) => {
    setProfile(u)
  }

  return (
    <>
      <div className='post'>
        <div>
          <h3>User Profiles</h3>
          <SearchBar />
          {
              users.map(user => (
                <div className='profile' id={user._id} onClick={()=>selectUser(user)}>
                  <img className='profile-circle' src={user.image ? (user.image.image) : ('')} alt="profile photo" />
                  <h4>{user.firstName} {user.preferredName !== user.firstName ? (`"${user.preferredName}" `) : (' ')}{user.lastName}</h4>
                  <p>{user.pronouns}</p>
                  
                </div>
              ))
            }
        </div>
        {errors.message && <p className='error-msg'>{errors.message}</p>}
        {/* <h3>User Profiles</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Preferred Name</th>
              <th>Pronouns</th>
              <th>Email</th>
              <th>Vball Experience</th>
              <th>Admin Status</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map(user => (
                <tr id={user._id} onClick={()=>selectUser(user._id, user)}>
                  <td>{user.firstName} {user.lastName}</td>
                  <td>{user.preferredName}</td>
                  <td>{user.pronouns}</td>
                  <td>{user.email}</td>
                  <td>{user.vballExperience}</td>
                  <td>{user.adminStatus}</td>
                </tr>
              ))
            }
          </tbody>
        </table> */}
      </div>
      {Object.keys(profile).length !== 0 ? (
        <UserProfile profile={profile} />
      ) : (<></>)}
    </>
  )
}

export default ViewProfilesScreen