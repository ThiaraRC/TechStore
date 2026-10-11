import { useParams, Link } from 'react-router-dom'
import { obtenerProducto } from '../../data/productos'

export default function DetalleProducto() {

  const { id } = useParams()

  const producto = obtenerProducto(id)

  const formatoPrecio = (precio) => {
    return precio.toLocaleString('es-CL', {
      style: 'currency',
      currency: 'CLP',
    })
  }

  if (!producto) {
    return (
      <section>
        <h2>Producto no encontrado</h2>
        <p>El producto que buscas no existe.</p>
        <Link to="/productos">Volver al catálogo</Link>
      </section>
    )
  }

  const tieneOferta =
    producto.oferta && producto.precioOferta > 0

  const precioFinal = tieneOferta
    ? producto.precioOferta
    : producto.precio

  return (
    <section>

      <Link to="/productos">
        ← Volver a productos
      </Link>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '40px',
          marginTop: '30px',
          alignItems: 'center',
        }}
      >

        <div style={{ flex: '1 1 300px' }}>

          <img
            src={producto.imagen}
            alt={producto.nombre}
            style={{
              width: '100%',
              maxHeight: '400px',
              objectFit: 'contain',
              background: 'white',
              borderRadius: '15px',
              padding: '20px',
              boxSizing: 'border-box',
            }}
          />

        </div>

        <div style={{ flex: '1 1 300px' }}>

          <h1>{producto.nombre}</h1>

          <p>
            Código: {producto.codigo}
          </p>

          <p>
            Categoría: {producto.categoria}
          </p>

          <h3>Descripción</h3>

          <p>{producto.descripcion}</p>

          {tieneOferta && (
            <p>
              Precio normal:
              <del style={{ marginLeft: '10px' }}>
                {formatoPrecio(producto.precio)}
              </del>
            </p>
          )}

          <h2 style={{ color: '#6415b8' }}>
            {formatoPrecio(precioFinal)}
          </h2>

          {tieneOferta && (
            <p style={{ color: 'red', fontWeight: 'bold' }}>
              ¡Producto en oferta!
            </p>
          )}

          <p>
            <strong>Stock disponible:</strong> {producto.stock}
          </p>

          {producto.stock <= 0 ? (
            <p style={{ color: 'red' }}>
              Producto agotado
            </p>
          ) : producto.stock <= producto.stockCritico ? (
            <p style={{ color: 'orange' }}>
              ¡Últimas unidades disponibles!
            </p>
          ) : (
            <p style={{ color: 'green' }}>
              Producto disponible
            </p>
          )}

        </div>

      </div>

    </section>
  )
}

