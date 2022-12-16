//api
import * as api from '../api'

//constants
import { AUTH, SHOW_LOADER, HIDE_LOADER, UPDATE_PROFILE, DELETE_PROFILE } from '../constants/userConstants'
import { HIDE_LOADING_SCREEN, SHOW_LOADING_SCREEN } from '../constants/loadingConstants'

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

//update a user profile
export const updateProfile = (formData, setErrors, navigate, userId) => async (dispatch) => {
    dispatch({ type: SHOW_LOADING_SCREEN})
    
    try {
        const {data} = await api.updateProfile(formData, userId)
        if (data) {
            dispatch({ type: UPDATE_PROFILE, data})
            navigate('/')
        } else {
            setErrors({message: 'Your profile was not updated, try again'})
        }
    } catch (error) {
        setErrors({message: error.response.data.message})
    }

    dispatch({ type: HIDE_LOADING_SCREEN})
}

// user deletes their own profile
export const deleteProfile = (formData, setErrors, navigate) => async (dispatch) => {
    dispatch({ type: SHOW_LOADING_SCREEN})

    try {
        const {data} = await api.deleteProfile(formData)
        if(data.message === 'Profile deleted') {
            dispatch({ type: DELETE_PROFILE})
            window.alert('Your profile was deleted')
            navigate('/')
        } else {
            setErrors({message: 'Something went wrong, try again'})
        }
    } catch (error) {
        setErrors({message: error.response.data.message})
    }

    dispatch({ type: HIDE_LOADING_SCREEN})
}

