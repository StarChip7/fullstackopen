import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/Users'

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload
    }
  }
})

const { setUsers } = usersSlice.actions

const usersReducer = usersSlice.reducer

export default usersReducer

export const initializeUsers = () => {
  return async dispatch => {
    const allUsers = await userService.users()
    dispatch(setUsers(allUsers.map(user => ({
      ...user,
      blogsCount : user.blogs.length
    }))))
  }
}