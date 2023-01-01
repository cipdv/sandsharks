import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { LOGOUT } from '../constants/userConstants'

const Header = ({user}) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch({type: LOGOUT})
        navigate('/')
    }

    return (
        <nav>
            <div>
                <Link to='/'>
                    Sandsharks
                </Link>
            </div>
            <div>
                {user ? (
                    <div>
                        <div>
                            <Link to='/updateprofile'>
                                Update Profile
                            </Link>
                        </div>
                        
                        {user.adminStatus === 'yes' && (
                            <Link to='/viewprofiles'>
                                View Profiles
                            </Link>
                        )}
                        <div onClick={handleLogout}>
                            <button className='btn'>Logout</button>
                        </div>
                    </div>
                ) : (
                    <Link to='/login'>Login</Link>
                )
                }
            </div>
        </nav>
    )
}

export default Header