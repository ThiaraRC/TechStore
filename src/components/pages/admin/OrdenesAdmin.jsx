import { Link } from 'react-router-dom';
import { listarOrdenes } from '../../../data/ordenes';
import Price from '../../atoms/Price';

export default function OrdenesAdmin() {
  const ordenes = listarOrdenes();

  return (
    <section>
      <h2>Órdenes</h2>

      {ordenes.length === 0 ? (
        <p>No hay órdenes registradas.</p>
      ) : (
        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>N° Orden</th>
                <th>Cliente</th>
                <th>Fecha</th>
                <th>Total</th>
                <th>Estado</th>
                <th>Detalle</th>
              </tr>
            </thead>

            <tbody>
              {ordenes.map((orden) => (
                <tr key={orden.id}>
                  <td>{orden.id}</td>

                  <td>
                    {orden.cliente.nombre} {orden.cliente.apellidos}
                  </td>

                  <td>{orden.fecha}</td>

                  <td>
                    <Price valor={orden.total} />
                  </td>

                  <td>{orden.estado}</td>

                  <td>
                    <Link to={`/admin/ordenes/${orden.id}`}>
                      Ver boleta
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}