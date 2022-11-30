//api
import * as api from '../api'

//constants
import { AUTH, SHOW_LOADER, HIDE_LOADER } from '../constants/userConstants'

//register a new user
export const register = (formData, setErrors, navigate) => async (dispatch) => {    
    
    dispatch({ type: SHOW_LOADER})
    
    try {
        const { data } = await api.register(formData)
        
        if (data) {
            dispatch({ type: AUTH, data})
            navigate('/dashboard')
        }
    } catch (error) {
        setErrors(error.response.data.errs)
        dispatch({ type: HIDE_LOADER })
    }
}

//login a user
export const login = (formData, setErrors, navigate) => async (dispatch) => {
    dispatch({ type: SHOW_LOADER})

    try {
        const { data } = await api.login(formData)

        if (data.token) {
            dispatch({ type: AUTH, data})
            navigate('/dashboard')
        }
    } catch (error) {
        let errors = {}

        if (error.response.data.message === 'User does not exist') {
            errors.email = error.response.data.message
        }        
        if (error.response.data.message === 'Password is incorrect') {
            errors.password = error.response.data.message
        }   
        
        setErrors(errors)
        dispatch({ type: HIDE_LOADER })
    }
}