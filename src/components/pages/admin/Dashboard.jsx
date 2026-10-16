
import { Link } from 'react-router-dom'
import { listarProductos, productosCriticos } from '../../../data/productos'
import { listarUsuarios } from '../../../data/usuarios'
import { listarOrdenes } from '../../../data/ordenes'
import { formatearPrecio } from '../../../utils/formato'

export default function Dashboard() {

  // Obtenemos la información de TechStore
  const productos = listarProductos()
  const usuarios = listarUsuarios()
  const ordenes = listarOrdenes()
  const criticos = productosCriticos()

  // Sumamos el total de las órdenes registradas
  const totalVentas = ordenes.reduce(
    (suma, orden) => suma + Number(orden.total || 0),
    0
  )

  // Mostramos las últimas cinco órdenes
  const ultimasOrdenes = ordenes.slice(-5).reverse()

  // Información de las tarjetas
  const tarjetas = [
    {
      titulo: 'Productos',
      valor: productos.length,
      ruta: '/admin/productos'
    },
    {
      titulo: 'Usuarios',
      valor: usuarios.length,
      ruta: '/admin/usuarios'
    },
    {
      titulo: 'Órdenes',
      valor: ordenes.length,
      ruta: '/admin/ordenes'
    },
    {
      titulo: 'Ventas registradas',
      valor: formatearPrecio(totalVentas),
      ruta: '/admin/ordenes'
    }
  ]

  return (
    <section
      className="container"
      style={{
        width: '95%',
        maxWidth: '1200px',
        margin: '30px auto',
        padding: '30px',
        backgroundColor: '#f4eef9',
        borderRadius: '25px'
      }}
    >
      <h2>Panel de administración</h2>
      <p>Bienvenido al resumen general de TechStore.</p>

      {/* TARJETAS DE RESUMEN */}
      <div className="row g-3 mt-3">
        {tarjetas.map((tarjeta) => (
          <div
            className="col-12 col-md-6 col-lg-3"
            key={tarjeta.titulo}
          >
            <div
              style={{
                backgroundColor: 'white',
                borderRadius: '18px',
                padding: '22px',
                height: '100%'
              }}
            >
              <p>{tarjeta.titulo}</p>

              <h3 style={{ color: '#59208f' }}>
                {tarjeta.valor}
              </h3>

              <Link to={tarjeta.ruta}>
                Ver detalle
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* INFORMACIÓN ADICIONAL */}
      <div className="row g-3 mt-3">

        {/* STOCK CRÍTICO */}
        <div className="col-12 col-md-6">
          <div
            style={{
              backgroundColor: 'white',
              padding: '25px',
              borderRadius: '18px',
              height: '100%'
            }}
          >
            <h3>Productos con stock crítico</h3>

            {criticos.length === 0 ? (
              <p>No hay productos con stock crítico.</p>
            ) : (
              <ul>
                {criticos.map((producto) => (
                  <li key={producto.id}>
                    {producto.nombre} — Stock: {producto.stock}
                  </li>
                ))}
              </ul>
            )}

            <Link to="/admin/productos">
              Administrar productos
            </Link>
          </div>
        </div>

        {/* ÚLTIMAS ÓRDENES */}
        <div className="col-12 col-md-6">
          <div
            style={{
              backgroundColor: 'white',
              padding: '25px',
              borderRadius: '18px',
              height: '100%'
            }}
          >
            <h3>Últimas órdenes</h3>

            {ultimasOrdenes.length === 0 ? (
              <p>Todavía no hay compras registradas.</p>
            ) : (
              <ul>
                {ultimasOrdenes.map((orden) => (
                  <li key={orden.id}>
                    <Link to={`/admin/ordenes/${orden.id}`}>
                      Orden #{orden.id}
                    </Link>
                    {' — '}
                    {formatearPrecio(orden.total)}
                    {' — '}
                    {orden.estado}
                  </li>
                ))}
              </ul>
            )}

            <Link to="/admin/ordenes">
              Ver todas las órdenes
            </Link>
          </div>
        </div>

      </div>
    </section>
  )
}
