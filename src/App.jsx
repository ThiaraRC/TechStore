import { listarProductos } from './data/productos'
import Logo from './components/atoms/Logo'
import ProductImage from './components/atoms/ProductImage'
import Price from './components/atoms/Price'
import Button from './components/atoms/Button'

export default function App() {
  const productos = listarProductos()
  return (
    <>
      <header>
        <Logo />
        <h1>Tech Store</h1>
      </header>
      <main>
        <section>
          <h2>Prueba de átomos</h2>
          {productos.map((p) => (
            <article key={p.id}>
              <ProductImage src={p.imagen} alt={p.nombre} />
              <h3>{p.nombre}</h3>
              <p>{p.descripcion}</p>
              <Price valor={p.oferta ? p.precioOferta : p.precio} original={p.oferta ? p.precio : null} />
              <Button etiqueta="Agregar al carrito" onClick={() => alert('Agregaste ' + p.nombre)} />
            </article>
          ))}
        </section>
      </main>
    </>
  )
}