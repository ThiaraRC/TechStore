import { listarProductos } from './data/productos'
import { formatearPrecio } from './utils/formato'

export default function App() {
  const productos = listarProductos()
  return (
    <>
      <header>
        <img src="/img/logo.png" alt="Logo Tech Store" />
        <h1>Tech Store</h1>
      </header>
      <main>
        <section>
          <h2>Prueba de datos ({productos.length} productos)</h2>
          <ul>
            {productos.map((p) => (
              <li key={p.id}>
                {p.nombre} - {formatearPrecio(p.precio)}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  )
}