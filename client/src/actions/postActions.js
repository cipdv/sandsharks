import * as api from '../api/index'

import { SUBMIT_POST, DELETE_POST, UPDATE_POST, GET_ALL_POSTS, REPLY_TO_POST } from '../constants/postConstants'
import { SHOW_LOADING_SCREEN, HIDE_LOADING_SCREEN } from '../constants/loadingConstants'

export const submitPost = (formData, setErrors) => async (dispatch) => {
    dispatch({ type: SHOW_LOADING_SCREEN })

    try {
        const { data } = await api.submitPost(formData)
        if (data) {
            dispatch({ type: SUBMIT_POST, data})
        }
    } catch (error) {
        setErrors({message: error.response.data.message})
    }

    dispatch({ type: HIDE_LOADING_SCREEN})
}

export const updatePost = (formData, postId, setErrors) => async (dispatch) => {

    dispatch({ type: SHOW_LOADING_SCREEN})

    try {
        const {data} = await api.updatePost(formData, postId)
        if(data) {
            dispatch({ type: UPDATE_POST, data})
        }
    } catch (error) {
        setErrors({message: error.response.data.message})
    }

    dispatch({ type: HIDE_LOADING_SCREEN})
}

export const deletePost = (postId, setErrors) => async (dispatch) => {
    dispatch({ type: SHOW_LOADING_SCREEN })
    try {
        const {data} = await api.deletePost(postId)
        if (data) {
            dispatch({ type: DELETE_POST, data})
        }
        dispatch({ type: HIDE_LOADING_SCREEN})
    } catch (error) {
        setErrors({message: error.response.data.message})
    }    
}

export const getAllPosts = () => async (dispatch) => {
    dispatch({ type: SHOW_LOADING_SCREEN})
    try {
        const { data } = await api.getAllPosts()
        if (data) {
            dispatch({ type: GET_ALL_POSTS, data})
        } 
    dispatch({ type: HIDE_LOADING_SCREEN})
    } catch (error) {
        console.log({message: error.response.data.message})
    }
}

export const getSinglePost = () => async (dispatch) => {
    
}

export const replyToPost = (reply, id, setErrors) => async (dispatch) => {
    dispatch({ type: SHOW_LOADING_SCREEN})
    try {
        const { data } = await api.replyToPost(reply, id)
        if(data) {
            dispatch({ type: REPLY_TO_POST, data})
        }
    } catch (error) {
        setErrors({message: error.response.data.message})
    }
    dispatch({ type: HIDE_LOADING_SCREEN})
}