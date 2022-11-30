import React from 'react'
import { useSelector } from 'react-redux'
import AdminDashboard from '../components/AdminDashboard'
import UserDashboard from '../components/UserDashboard'

const DashboardScreen = () => {

    const user = useSelector(state => state.authReducer.user)

    return (
        user.adminStatus === 'yes' ? (
            <AdminDashboard user={user}/>
        ) : (
            <UserDashboard user={user} />
        )

    )
}

export default DashboardScreen