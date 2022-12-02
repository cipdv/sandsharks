import * as api from '../api/index'

import { SUBMIT_POST, DELETE_POST, UPDATE_POST, GET_ALL_POSTS } from '../constants/postConstants'
import { SHOW_LOADING_SCREEN, HIDE_LOADING_SCREEN } from '../constants/loadingConstants'

export const submitPost = (formData, setErrors) => async (dispatch) => {
    dispatch({ type: SHOW_LOADING_SCREEN })

    try {
        const { data } = await api.submitPost(formData)
        if (data) {
            dispatch({ type: SUBMIT_POST, data})
        }
    } catch (error) {
        console.log('action error', error)
        // setErrors({message: error.response.data.message})
    }

    dispatch({ type: HIDE_LOADING_SCREEN})
}

export const updatePost = () => async (dispatch) => {
    
}

export const deletePost = () => async (dispatch) => {
    
}

export const getAllPosts = () => async (dispatch) => {
    console.log('dispatched get all posts')
    dispatch({ type: SHOW_LOADING_SCREEN})
    try {
        const { data } = await api.getAllPosts()
        if (data) {
            console.log('action', data)
            dispatch({ type: GET_ALL_POSTS, data})
        } 
    dispatch({ type: HIDE_LOADING_SCREEN})
    } catch (error) {
        console.log({message: error.response.data.message})
    }
}

export const getSinglePost = () => async (dispatch) => {
    
}