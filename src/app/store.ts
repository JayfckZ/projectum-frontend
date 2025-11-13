import { configureStore } from '@reduxjs/toolkit'

import { authApi } from '../features/auth/authApi'
import authReducer from '../features/auth/authSlice'
import { projectApi } from '../features/project/projectApi'
import projectReducer from '../features/project/projectSlice'

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
    [projectApi.reducerPath]: projectApi.reducer,
    project: projectReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(projectApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
