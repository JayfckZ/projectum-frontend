import { Navigate } from 'react-router-dom'
import { JSX } from 'react'

import { useAppSelector } from '../hooks/useAppSelector.ts'

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const isAuthenticated = useAppSelector((state) => Boolean(state.auth.token))

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  return children
}
