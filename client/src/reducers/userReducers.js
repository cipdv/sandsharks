import { AUTH, SHOW_LOADER, HIDE_LOADER, LOGOUT, UPDATE_PROFILE, DELETE_PROFILE, GET_ALL_USERS } from "../constants/userConstants"

//authorize a user
export const authReducer = (state = { user: null, users: [], loading: false }, action) => {

    switch(action.type) {
        case AUTH:
            localStorage.setItem('user', JSON.stringify({...action.data}))
            return { ...state, user: action.data, loading: false}
        case LOGOUT:
            localStorage.clear()
            return { ...state, user: null, loading: false }
        case UPDATE_PROFILE:
            localStorage.setItem('user', JSON.stringify({...action.data}))
            return { ...state, user: action.data}
        case DELETE_PROFILE:
            localStorage.clear()
            return { ...state, user: null, loading: false }
        case GET_ALL_USERS:
            return { ...state, users: action.data}
        case SHOW_LOADER:
            return { ...state, loading: true }
        case HIDE_LOADER:
            return { ...state, loading: false }
        default:
            return state
    }
}

