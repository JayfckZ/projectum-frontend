import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  user: any | null
  isAuthenticated: boolean
  authLoading: boolean
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  authLoading: true
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: any }>) => {
      state.user = action.payload.user
      state.isAuthenticated = true
      state.authLoading = false
    },
    logout: (state) => {
      state.user = null
      state.isAuthenticated = false
      state.authLoading = false
    },
    finishLoading: (state) => {
      state.authLoading = false
    }
  }
})

export const { setCredentials, logout, finishLoading } = authSlice.actions
export default authSlice.reducer
