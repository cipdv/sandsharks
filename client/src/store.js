// import { combineReducers, applyMiddleware } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
//reducers
import { authReducer } from './reducers/userReducers'
import { loadingReducer } from './reducers/loadingReducers'
import { postReducer } from './reducers/postReducers'

const userInfoFromStorage = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null

const reducers = { authReducer, loadingReducer, postReducer }
const initialState = {
    authReducer: { user: userInfoFromStorage, users: []},
    loadingReducer: { loading: false },
    postReducer: { posts: [] }
}
const middleware = [thunk]

const store = configureStore({
    reducer: reducers,
    preloadedState: initialState,
    middleware: middleware
})

export default store