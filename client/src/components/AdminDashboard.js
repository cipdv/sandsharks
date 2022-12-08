import React from 'react'
import PostMessage from './PostMessage'
import Posts from './Posts'

const AdminDashboard = ({user}) => {

    return (
        //admin dashboard 
        //-view/update/delete user profiles
        <>
            <div>
                <h3>Welcome {user.preferredName}</h3>
            </div>
            <div>
                <PostMessage />
            </div>
            <div>
                <Posts user={user}/>
            </div>
        </>
    )
}

export default AdminDashboard