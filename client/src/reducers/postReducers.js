import { DELETE_POST, GET_ALL_POSTS, REPLY_TO_POST, SUBMIT_POST, UPDATE_POST } from "../constants/postConstants"

//authorize a user
export const postReducer = (state = { posts: [] }, action) => {

    switch(action.type) {
        case SUBMIT_POST:
            return { ...state, posts: [...state.posts, action.data] }
        case GET_ALL_POSTS:
            return { ...state, posts: action.data }
        case REPLY_TO_POST:
            return { ...state, posts: [...state.posts, action.data]}
        case DELETE_POST: 
            return { ...state, posts: action.data }
        case UPDATE_POST: 
            return { ...state, posts: [...state.posts, action.data]}
        default:
            return state
    }
}