import { Navigate } from 'react-router-dom'
import { JSX } from 'react'

import { useAppSelector } from '../hooks/useAppSelector.ts'

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated, authLoading } = useAppSelector((s) => s.auth)

  if (authLoading) {
    return (
      <div className="flex h-screen items-center justify-center text-xl font-semibold">
        Carregando...
      </div>
    )
  }
  
  if (!isAuthenticated) return <Navigate to="/login" replace />

  return children
}
