import { useState } from 'react'
import { listarProductos } from './data/productos'
import Navbar from './components/organisms/Navbar'
import Footer from './components/organisms/Footer'
import ProductCard from './components/molecules/ProductCard'

export default function App() {
  const productos = listarProductos()
  const [cantidad, setCantidad] = useState(0)

  return (
    <>
      <Navbar cantidadCarrito={cantidad} />
      <main>
        <section>
          <h2>Catálogo de productos</h2>
          {productos.map((p) => (
            <ProductCard key={p.id} producto={p} onAgregar={() => setCantidad(cantidad + 1)} />
          ))}
        </section>
      </main>
      <Footer />
    </>
  )
}