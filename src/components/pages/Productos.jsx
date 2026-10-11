import { Link } from 'react-router-dom'
import { listarProductos } from '../../data/productos'

export default function Productos() {

  const productos = listarProductos()

  const formatoPrecio = (precio) => {
    return precio.toLocaleString('es-CL', {
      style: 'currency',
      currency: 'CLP',
    })
  }

  return (
    <section>

      <h1>Catálogo de Productos</h1>

      <p>Descubre nuestros productos tecnológicos.</p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '25px',
          marginTop: '30px',
        }}
      >

        {productos.map((producto) => {

          const precioFinal =
            producto.oferta && producto.precioOferta > 0
              ? producto.precioOferta
              : producto.precio

          return (

            <div
              key={producto.id}
              style={{
                background: 'white',
                padding: '20px',
                borderRadius: '15px',
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
              }}
            >

              <img
                src={producto.imagen}
                alt={producto.nombre}
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'contain',
                }}
              />

              <h2>{producto.nombre}</h2>

              <p>{producto.descripcion}</p>

              {producto.oferta && producto.precioOferta > 0 && (
                <p>
                  <del>{formatoPrecio(producto.precio)}</del>
                </p>
              )}

              <h3>{formatoPrecio(precioFinal)}</h3>

              <p>Stock disponible: {producto.stock}</p>

              {producto.oferta && (
                <p style={{ color: 'red', fontWeight: 'bold' }}>
                  ¡EN OFERTA!
                </p>
              )}

              <Link to={`/productos/${producto.id}`}>
                Ver producto
              </Link>
              <button
              type="button"
              onClick={() => agregarProducto(producto)}
              disabled={producto.stock <= 0}
              style={{
              marginTop: '15px',
              width: '100%',
              padding: '12px',
              background: '#6415b8',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold',
              }}
>
  🛒 Agregar al carrito
</button>

            </div>

          )
        })}

      </div>

    </section>
  )
}
