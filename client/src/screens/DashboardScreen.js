import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPosts } from '../actions/postActions'
import AdminDashboard from '../components/AdminDashboard'
import UserDashboard from '../components/UserDashboard'
import WaiverCoC from './WaiverCoC'

const DashboardScreen = () => {

    const dispatch = useDispatch()

    const user = useSelector(state => state.authReducer.user)

    useEffect(()=>{
        dispatch(getAllPosts())
    }, [])

    return (
        user.adminStatus === 'yes' ? (
            <AdminDashboard user={user}/>
        ) : user.waiverAndCoC ? (
            <UserDashboard user={user} />
        ) : (
            <WaiverCoC user={user}/>
        )

    )
}

export default DashboardScreen