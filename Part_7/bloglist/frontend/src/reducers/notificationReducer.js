import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  // start with a visible initial message so that the component
  // renders something without any actions dispatched yet
  initialState: null,
  reducers: {
    setNotificationValue(state, action) {
      return action.payload
    }
  }
})

const { setNotificationValue } = notificationSlice.actions

const notificationReducer = notificationSlice.reducer

export default notificationReducer

export const setNotification = (message, duration = 5000) => {
  return dispatch => {
    dispatch(setNotificationValue(message))
    setTimeout(() => {
      dispatch(setNotificationValue(null))
    }, duration)
  }
}

export const initilializeNotification = () => {
  return dispatch => {
    dispatch(setNotificationValue({ message: 'Welcome !', status: 'success' }))
  }
}