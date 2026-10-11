import { listarProductos } from '../../data/productos'
import ProductCard from '../molecules/ProductCard'
import { useCarrito } from '../../context/CarritoContext'

export default function Productos() {
  const productos = listarProductos()
  const { agregar } = useCarrito()
  return (
    <section>
      <h2>Catálogo de productos</h2>
      {productos.map((p) => (
        <ProductCard key={p.id} producto={p} onAgregar={agregar} />
      ))}
    </section>
  )
}