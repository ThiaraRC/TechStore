import { useNavigate } from 'react-router-dom'
import { crearProducto, listarProductos } from '../../../data/productos'
import ProductoForm from '../../organisms/ProductoForm'

export default function NuevoProducto() {
  const navigate = useNavigate()
  const categorias = [...new Set(listarProductos().map((p) => p.categoria))]

  const guardar = (datos) => {
    if (listarProductos().some((p) => p.codigo === datos.codigo)) {
      alert('Ya existe un producto con el código ' + datos.codigo)
      return
    }
    crearProducto({ ...datos, oferta: false, precioOferta: 0 })
    navigate('/admin/productos')
  }

  return (
    <section>
      <h2>Nuevo producto</h2>
      <ProductoForm categorias={categorias} onGuardar={guardar} />
    </section> 
  )
}