import { useState } from 'react'
import { Link } from 'react-router-dom'
import { listarProductos, eliminarProducto } from '../../../data/productos'
import { formatearPrecio } from '../../../utils/formato'
import Button from '../../atoms/Button'
import { useAuth } from '../../../context/AuthContext'

export default function ProductosAdmin() {
  const [productos, setProductos] = useState(() => listarProductos())
  const [soloCriticos, setSoloCriticos] = useState(false)
  const { usuario } = useAuth()
  const esAdmin = usuario?.tipoUsuario === 'administrador'

  const esCritico = (p) => p.stock <= p.stockCritico
  const visibles = soloCriticos ? productos.filter(esCritico) : productos

  const eliminar = (producto) => {
    if (!esAdmin) return
    if (!window.confirm('¿Eliminar el producto ' + producto.nombre + '?')) return
    eliminarProducto(producto.id)
    setProductos(listarProductos())
  }

  return (
    <section>
      <h2>Administración de productos</h2>

      <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
        <label>
          <input
            type="checkbox"
            checked={soloCriticos}
            onChange={(e) => setSoloCriticos(e.target.checked)}
          />{' '}
          Mostrar solo productos críticos
        </label>
        {esAdmin && <Link to="/admin/productos/nuevo">Nuevo producto</Link>}
      </div>

      <p>{visibles.length} producto(s)</p>

      {visibles.length === 0 ? (
        <p>No hay productos para mostrar.</p>
      ) : (
        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>Código</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Stock</th>
                {esAdmin && <th>Acciones</th>}
              </tr>
            </thead>
            <tbody>
              {visibles.map((p) => (
                <tr key={p.id}>
                  <td>{p.codigo}</td>
                  <td><Link to={'/productos/' + p.id}>{p.nombre}</Link></td>
                  <td>{p.categoria}</td>
                  <td>{formatearPrecio(p.precio)}</td>
                  <td>
                    {p.stock} {esCritico(p) && <span className="chip chip-critico">Crítico</span>}
                  </td>
                 {esAdmin && (
  <td>
    <div className="d-flex gap-2">
      <Link to={'/admin/productos/' + p.id + '/editar'}>
        Editar
      </Link>
      <Button
        etiqueta="Eliminar"
        onClick={() => eliminar(p)}
      />
    </div>
  </td>
)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

