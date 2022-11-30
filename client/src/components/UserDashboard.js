import React from 'react'

const UserDashboard = ({user}) => {

    console.log(user)

    return (
        <div>
            <h3>Welcome {user.preferredName}</h3>
            <div>
                -see weekly posts, latest on top, "I'll be there/can't make it/maybe" button
            </div>
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