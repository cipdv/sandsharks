import { GET_ALL_POSTS, SUBMIT_POST } from "../constants/postConstants"

//authorize a user
export const postReducer = (state = { posts: [] }, action) => {

    switch(action.type) {
        case SUBMIT_POST:
            return { ...state, posts: [...state.posts, action.data] }
        case GET_ALL_POSTS:
            return { ...state, posts: action.data }
        default:
            return state
    }
}