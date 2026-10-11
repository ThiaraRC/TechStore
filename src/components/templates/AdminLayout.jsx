import { Outlet, Link } from 'react-router-dom'

export default function AdminLayout() {
  return (
    <>
      <header>
        <h1>Panel de administración</h1>

        <nav>
          <Link to="/admin">Dashboard</Link>
          <Link to="/admin/ordenes">Órdenes</Link>
          <Link to="/admin/productos">Productos</Link>
          <Link to="/admin/usuarios">Usuarios</Link>
          <Link to="/">Volver a la tienda</Link>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  )
}