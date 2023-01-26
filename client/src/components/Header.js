import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { LOGOUT } from '../constants/userConstants'
import Sandsharks from '../images/SandSharks.jpg'

const Header = ({user}) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch({type: LOGOUT})
        navigate('/')
    }

    return (
        <nav>
            <div className='item'>
                <Link to='/'>
                    <img className='logo' src={Sandsharks} alt='sandsharks-logo' />
                </Link>
            </div>
            <div >
                {user ? (
                    <div>
                        <div className='item'>
                            <Link to='/updateprofile'>
                                Update Profile
                            </Link>
                        </div>
                        
                        {user.adminStatus === 'yes' && (
                            <Link to='/viewprofiles'>
                                View Profiles
                            </Link>
                        )}
                        <div className='item' onClick={handleLogout}>
                            <button className='btn'>Logout</button>
                        </div>
                    </div>
                ) : (
                    <div className='item'>
                        <Link className='item' to='/login'>
                            Login
                        </Link>
                    </div>
                )
                }
            </div>
        </nav>
    )
}

export default Header