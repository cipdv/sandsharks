// import { combineReducers, applyMiddleware } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
//reducers
import { authReducer } from './reducers/userReducers'

const userInfoFromStorage = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null

const reducers = { authReducer }
const initialState = {
    authReducer: { user: userInfoFromStorage},
}
const middleware = [thunk]

const store = configureStore({
    reducer: reducers,
    preloadedState: initialState,
    middleware: middleware
})

export default store