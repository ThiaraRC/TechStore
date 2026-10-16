
import { Outlet, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function AdminLayout() {
  const { usuario } = useAuth()

  return (
    <>
      <header>
        <h1>
  {usuario?.tipoUsuario === 'vendedor'
    ? 'Panel de vendedor'
    : 'Panel de administración'}
</h1>

        <nav>
          {usuario?.tipoUsuario === 'administrador' && <Link to="/admin">Dashboard</Link>}
          <Link to="/admin/ordenes">Órdenes</Link>
          <Link to="/admin/productos">Productos</Link>
          {usuario?.tipoUsuario === 'administrador' && <Link to="/admin/usuarios">Usuarios</Link>}
          <span className="saludo-sesion">
            Hola, {usuario?.nombre}
          </span>

          <Link to="/">Volver a la tienda</Link>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  )
}
