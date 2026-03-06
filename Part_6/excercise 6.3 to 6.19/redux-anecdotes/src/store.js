import reducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
// import { createStore, combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'

const store = configureStore({
  reducer: {
    anecdotes: reducer,
    filter: filterReducer,
    notification : notificationReducer,
  }
})

export default store