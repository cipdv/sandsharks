import { AUTH, SHOW_LOADER, HIDE_LOADER, LOGOUT } from "../constants/userConstants"

//authorize a user
export const authReducer = (state = { user: null, loading: false }, action) => {
    switch(action.type) {
        case AUTH:
            localStorage.setItem('user', JSON.stringify({...action.data}))
            return { ...state, user: action.data, loading: false}
        case LOGOUT:
            localStorage.clear()
            return { ...state, user: null, loading: false }
        case SHOW_LOADER:
            console.log(state.loading)
            return { ...state, loading: true }
        case HIDE_LOADER:
            console.log(state.loading)
            return { ...state, loading: false }
        default:
            return state
    }
}