import { useEffect } from 'react'

import { useGetUserQuery } from './features/auth/authApi'
import { useAppDispatch } from './hooks/useAppDispatch'
import { finishLoading, setCredentials } from './features/auth/authSlice'
import AppRoutes from './routes/AppRoutes'

function App() {
  const dispatch = useAppDispatch()

  const { data, isLoading, isSuccess, isError } = useGetUserQuery(undefined)

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setCredentials({ user: data }))
    }

    if (isError) {
      dispatch(finishLoading())
    }
  }, [isSuccess, isError, isLoading, data, dispatch])

  return <AppRoutes />
}

export default App
