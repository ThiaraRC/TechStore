import { useParams, Link } from 'react-router-dom';
import { obtenerOrden } from '../../../data/ordenes';
import Price from '../../atoms/Price';

export default function BoletaAdmin() {
  const { id } = useParams();
  const orden = obtenerOrden(id);

  if (!orden) {
    return (
      <section className="boleta-admin">
        <h2>Boleta</h2>
        <p>No se encontró la orden.</p>

        <Link to="/admin/ordenes">
          Volver a órdenes
        </Link>
      </section>
    );
  }

  return (
    <section className="boleta-admin">
      <h2>Boleta de orden N° {orden.id}</h2>

      <p>
        <strong>Fecha:</strong> {orden.fecha}
      </p>

      <p>
        <strong>Estado:</strong> {orden.estado}
      </p>

      <h3>Cliente</h3>

      <p>
        {orden.cliente.nombre} {orden.cliente.apellidos}
      </p>

      <p>{orden.cliente.correo}</p>

      <h3>Dirección</h3>

      <p>
        {orden.direccion.calle}
        {orden.direccion.departamento
          ? `, departamento ${orden.direccion.departamento}`
          : ''}
      </p>

      <p>
        {orden.direccion.comuna}, {orden.direccion.region}
      </p>

      {orden.direccion.indicaciones && (
        <p>
          <strong>Indicaciones:</strong>{' '}
          {orden.direccion.indicaciones}
        </p>
      )}

      <h3>Productos</h3>

      <div className="table-responsive">
        <table className="table align-middle">
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Subtotal</th>
            </tr>
          </thead>

          <tbody>
            {orden.items.map((item) => (
              <tr key={item.id}>
                <td>
                  <img
                    src={item.imagen}
                    alt={item.nombre}
                  />
                </td>

                <td>{item.nombre}</td>

                <td>{item.cantidad}</td>

                <td>
                  <Price valor={item.precio} />
                </td>

                <td>
                  <Price
                    valor={item.precio * item.cantidad}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="total-boleta">
        <h3>
          Total: <Price valor={orden.total} />
        </h3>
      </div>

      <div className="acciones-boleta">
        <button
          type="button"
          onClick={() => window.print()}
        >
          Imprimir boleta
        </button>

        <Link to="/admin/ordenes">
          Volver a órdenes
        </Link>
      </div>
    </section>
  );
}