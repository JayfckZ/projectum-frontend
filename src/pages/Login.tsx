import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useLoginMutation } from '../features/auth/authApi'
import { setCredentials } from '../features/auth/authSlice'
import { useAppDispatch } from '../hooks/useAppDispatch'

export default function Login() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [login, { isLoading, error }] = useLoginMutation()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      // Faz login na API Django
      const data = await login({ username, password }).unwrap()

      // Você vai receber algo tipo:
      // data = { access: "...", user: {...} }
      dispatch(
        setCredentials({
          user: data.user,
          token: data.access
        })
      )

      // Redireciona usuário logado
      navigate('/')
    } catch (err) {
      console.error('Erro no login:', err)
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-semibold text-gray-800">
          Acessar conta
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* EMAIL */}
          <div>
            <label className="block text-sm font-medium">User</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 p-2 outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="usuario"
              required
            />
          </div>

          {/* SENHA */}
          <div>
            <label className="block text-sm font-medium">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 p-2 outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="••••••••"
              required
            />
          </div>

          {/* ERRO */}
          {error && (
            <p className="text-sm text-red-600">Usuario ou senha incorretos.</p>
          )}

          {/* BOTÃO */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-blue-600 p-2 text-white transition hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  )
}
