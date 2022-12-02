import React from 'react'
import Posts from './Posts'

const UserDashboard = ({user}) => {

    return (
        <div>
            <h3>Welcome {user.preferredName}</h3>
            <Posts />
            <div>
                -update/delete account/profile
            </div>
            <div>
                -contact Sandsharks organization
            </div>
            <div>
                -lost and found, make a claim
            </div>
            <div>
                -community section, message board?, post your business profile
            </div>          
        </div>
    )
}

export default UserDashboard