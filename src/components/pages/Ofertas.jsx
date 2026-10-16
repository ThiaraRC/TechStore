import { listarProductos } from '../../data/productos'
import { useCarrito } from '../../context/CarritoContext'
import ProductCard from '../molecules/ProductCard'

export default function Ofertas() {
  const { agregar } = useCarrito()
  const ofertas = listarProductos().filter((p) => p.oferta)

  return (
    <section>
      <h2>Ofertas</h2>
      {ofertas.length === 0 ? <p>Por ahora no hay productos en oferta.</p> : null}
      {ofertas.map((p) => (
        <ProductCard key={p.id} producto={p} onAgregar={agregar} />
      ))}
    </section>
  )
}
