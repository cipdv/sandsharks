import { SUBMIT_POST } from "../constants/postConstants"

//authorize a user
export const authReducer = (state = { posts: [] }, action) => {

    switch(action.type) {
        case SUBMIT_POST:
            return { ...state, posts: action.data }
        default:
            return state
    }
}