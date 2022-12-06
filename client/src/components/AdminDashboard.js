import React from 'react'
import PostMessage from './PostMessage'
import Posts from './Posts'

const AdminDashboard = ({user}) => {

    return (
        //admin dashboard 
        //-make/update/delete weekly posts
        //-view/update/delete user profiles
        <>
            <div>
                <h3>Welcome {user.preferredName}</h3>
            </div>
            <PostMessage />
            <Posts user={user}/>
        </>
    )
}

export default AdminDashboard