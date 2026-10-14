import { useParams, Link } from 'react-router-dom';
import { obtenerOrden } from '../../data/ordenes';
import Price from '../atoms/Price';

export default function CompraExitosa() {
  const { id } = useParams();
  const orden = obtenerOrden(id);

  if (!orden) {
    return (
      <section className="compra-exitosa-contenedor">
        <div className="compra-exitosa-error">
          <h2>No se encontró la orden</h2>

          <p>
            La compra no pudo ser localizada.
          </p>

          <Link
            to="/productos"
            className="compra-exitosa-boton"
          >
            Volver a productos
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="compra-exitosa-contenedor">

      {/* CONFIRMACIÓN */}
      <div className="compra-exitosa-hero">
        <div className="compra-exitosa-check">
          ✓
        </div>

        <div>
          <span>COMPRA CONFIRMADA</span>

          <h2>
            Compra realizada con éxito
          </h2>

          <p>
            Tu pedido fue registrado correctamente.
            Gracias por comprar en Tech Store.
          </p>
        </div>
      </div>


      {/* INFORMACIÓN DE LA ORDEN */}
      <div className="compra-exitosa-info-orden">

        <div>
          <span>Orden</span>
          <strong>#{orden.id}</strong>
        </div>

        <div>
          <span>Fecha</span>
          <strong>{orden.fecha}</strong>
        </div>

        <div>
          <span>Estado</span>
          <strong className="compra-exitosa-estado">
            {orden.estado}
          </strong>
        </div>

      </div>


      {/* CLIENTE Y DIRECCIÓN */}
      <div className="row g-4 compra-exitosa-datos">

        <div className="col-12 col-md-6">
          <div className="compra-exitosa-tarjeta">

            <div className="compra-exitosa-titulo">
              👤
              <h3>Datos del cliente</h3>
            </div>

            <p>
              <strong>Nombre</strong>
              <span>
                {orden.cliente.nombre}{' '}
                {orden.cliente.apellidos}
              </span>
            </p>

            <p>
              <strong>Correo</strong>
              <span>
                {orden.cliente.correo}
              </span>
            </p>

          </div>
        </div>


        <div className="col-12 col-md-6">
          <div className="compra-exitosa-tarjeta">

            <div className="compra-exitosa-titulo">
              📍
              <h3>Dirección de entrega</h3>
            </div>

            <p>
              <strong>Dirección</strong>
              <span>
                {orden.direccion.calle}

                {orden.direccion.departamento
                  ? `, departamento ${orden.direccion.departamento}`
                  : ''}
              </span>
            </p>

            <p>
              <strong>Comuna / Región</strong>
              <span>
                {orden.direccion.comuna},{' '}
                {orden.direccion.region}
              </span>
            </p>

            {orden.direccion.indicaciones && (
              <p>
                <strong>Indicaciones</strong>
                <span>
                  {orden.direccion.indicaciones}
                </span>
              </p>
            )}

          </div>
        </div>

      </div>


      {/* PRODUCTOS */}
      <div className="compra-exitosa-productos">

        <div className="compra-exitosa-productos-header">
          <div>
            <span>RESUMEN DEL PEDIDO</span>
            <h3>Productos comprados</h3>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table compra-exitosa-tabla">

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
                    <div className="compra-exitosa-imagen">
                      <img
                        src={item.imagen}
                        alt={item.nombre}
                      />
                    </div>
                  </td>

                  <td>
                    <strong>
                      {item.nombre}
                    </strong>
                  </td>

                  <td>
                    {item.cantidad}
                  </td>

                  <td>
                    <Price valor={item.precio} />
                  </td>

                  <td>
                    <Price
                      valor={
                        item.precio *
                        item.cantidad
                      }
                    />
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </div>


      {/* TOTAL */}
      <div className="compra-exitosa-total">

        <div>
          <span>Total pagado</span>

          <strong>
            <Price valor={orden.total} />
          </strong>
        </div>

      </div>


      {/* BOTONES */}
      <div className="compra-exitosa-acciones">

        <button
          type="button"
          className="compra-exitosa-boton-secundario"
          onClick={() => window.print()}
        >
          🖨 Imprimir comprobante
        </button>

        <Link
          to="/productos"
          className="compra-exitosa-boton"
        >
          Seguir comprando
        </Link>

      </div>

    </section>
  );
}