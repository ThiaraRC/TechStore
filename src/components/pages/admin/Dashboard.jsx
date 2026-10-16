import { Link } from 'react-router-dom'
import { productosCriticos } from '../../../data/productos'

export default function Dashboard() {
  const criticos = productosCriticos()

  return (
    <section>
      <h2>Bienvenido al sistema administrativo</h2>
      <p>Desde este panel puedes administrar los productos, usuarios y revisar las órdenes de Tech Store.</p>

      {criticos.length > 0 ? (
        <div>
          <h3>⚠ Productos con stock crítico</h3>
          <ul>
            {criticos.map((p) => (
              <li key={p.id}>
                {p.nombre}: quedan {p.stock} unidades (crítico: {p.stockCritico})
              </li>
            ))}
          </ul>
          <Link to="/admin/productos">Ir a productos</Link>
        </div>
      ) : (
        <p>No hay productos con stock crítico.</p>
      )}
    </section>
  )
}
