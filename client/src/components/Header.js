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
                    <div onClick={handleLogout}>Logout</div>
                ) :(
                    <Link to='/login'>Login</Link>
                )
                }
            </div>
        </nav>
    )
}

export default Header