import React from 'react'
import PostMessage from './PostMessage'
import Posts from './Posts'

const AdminDashboard = ({user}) => {

    return (
        //admin dashboard 
        //-view/update/delete user profiles
        <div className='container'>
            
            <div>
                <h3>Welcome {user.preferredName}</h3>
            </div>
            <div className='box-1'>
                <PostMessage />
            </div>
            <div className='box-1'>
                <Posts user={user}/>
            </div>
        </div>
    )
}

export default AdminDashboard