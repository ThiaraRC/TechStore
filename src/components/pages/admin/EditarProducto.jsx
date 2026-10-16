import { Link, useNavigate, useParams } from 'react-router-dom'
import { actualizarProducto, listarProductos, obtenerProducto } from '../../../data/productos'
import ProductoForm from '../../organisms/ProductoForm'

export default function EditarProducto() {
  const { id } = useParams()
  const navigate = useNavigate()
  const producto = obtenerProducto(id)

  if (!producto) {
    return (
      <section>
        <h2>Producto no encontrado</h2>
        <Link to="/admin/productos">Volver al listado</Link>
      </section>
    )
  }

  const categorias = [...new Set(listarProductos().map((p) => p.categoria))]

  const guardar = (datos) => {
    actualizarProducto(id, datos)
    navigate('/admin/productos')
  }

  return (
    <section>
      <h2>Editar producto</h2>
      <ProductoForm
        key={producto.id}
        inicial={producto}
        categorias={categorias}
        soloLecturaCodigo
        onGuardar={guardar}
      />
    </section>
  )
}