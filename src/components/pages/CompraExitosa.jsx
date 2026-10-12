import { useParams, Link } from 'react-router-dom';
import { obtenerOrden } from '../../data/ordenes';
import Price from '../atoms/Price';

export default function CompraExitosa() {
  const { id } = useParams();
  const orden = obtenerOrden(id);

  if (!orden) {
    return (
      <section>
        <h2>Compra exitosa</h2>
        <p>No se encontró la orden.</p>

        <Link to="/productos">
          Volver a productos
        </Link>
      </section>
    );
  }

  return (
    <section>
      <h2>Compra realizada con éxito</h2>

      <p>
        <strong>Orden N°:</strong> {orden.id}
      </p>

      <p>
        <strong>Fecha:</strong> {orden.fecha}
      </p>

      <p>
        <strong>Estado:</strong> {orden.estado}
      </p>

      <h3>Datos del cliente</h3>

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
        <table className="table">
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
                    style={{
                      width: 70,
                      height: 70,
                      objectFit: 'contain'
                    }}
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

      <h3>
        Total: <Price valor={orden.total} />
      </h3>

      <div className="d-flex gap-2 flex-wrap">
        <button
          type="button"
          onClick={() => window.print()}
        >
          Imprimir
        </button>

        <Link to="/productos">
          Seguir comprando
        </Link>
      </div>
    </section>
  );
}