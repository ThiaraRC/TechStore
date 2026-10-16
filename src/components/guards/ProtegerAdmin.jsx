
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function ProtegerAdmin({ children }) {
  const { usuario } = useAuth()
  const { pathname } = useLocation()

  if (!usuario) {
    return <Navigate to="/login" replace />
  }

  if (usuario.tipoUsuario === 'administrador') {
    return children
  }

  if (usuario.tipoUsuario === 'vendedor') {
    const verProductos = pathname === '/admin/productos'

    const verOrdenes = pathname === '/admin/ordenes'

    const verDetalleOrden =
      pathname.startsWith('/admin/ordenes/') &&
      pathname.split('/').length === 4

    if (verProductos || verOrdenes || verDetalleOrden) {
      return children
    }

    return <Navigate to="/admin/productos" replace />
  }

  return <Navigate to="/" replace />
}
