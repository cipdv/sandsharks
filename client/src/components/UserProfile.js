import React from 'react'

const UserProfile = ({profile}) => {

    //update the user profile: grant admin status, approve/disapprove photo, change their vball experience (new players to 'has 2v2 experience')
    //click their email to send an email 

  return (
    <>
        <div className='post'>
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
                <tr>
                    <td>{profile.firstName} {profile.lastName}</td>
                    <td>{profile.preferredName}</td>
                    <td>{profile.pronouns}</td>
                    <td>{profile.email}</td>
                    <td>{profile.vballExperience}</td>
                    <td>{profile.adminStatus}</td>
                </tr>
            </tbody>
        </table>
        </div>
    </>
  )
}

export default UserProfile