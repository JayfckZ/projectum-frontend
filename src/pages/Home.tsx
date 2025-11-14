import { useGetProjectsQuery } from '../features/project/projectApi'
import { useAppSelector } from '../hooks/useAppSelector'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { logout } from '../features/auth/authSlice'

const Home = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector((s) => s.auth.user)

  const { data, isLoading, isError } = useGetProjectsQuery(undefined)

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">
          Bem-vindo, {user?.name || 'usuário'}
        </h1>

        <button
          onClick={() => dispatch(logout())}
          className="rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
        >
          Sair
        </button>
      </div>

      <div className="rounded-xl bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-semibold text-gray-700">Seus Projetos</h2>

        {/* LOADING */}
        {isLoading && <p className="text-gray-500">Carregando projetos...</p>}

        {/* ERRO */}
        {isError && (
          <p className="text-red-600">Não foi possível carregar os projetos.</p>
        )}

        {/* LISTA DE PROJETOS */}
        {data && data.length === 0 && (
          <p className="text-gray-500">Nenhum projeto cadastrado.</p>
        )}

        {data && data.length > 0 && (
          <ul className="space-y-3">
            {data.map((project: any) => (
              <li
                key={project.id}
                className="rounded-lg border border-gray-300 bg-gray-50 p-4"
              >
                <h3 className="text-lg font-semibold">{project.title}</h3>
                <p className="text-sm text-gray-600">{project.description || 'Sem descrição'}</p>

                <span className="mt-2 inline-block rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                  Status: {project.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Home
