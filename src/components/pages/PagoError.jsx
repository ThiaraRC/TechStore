import { Link } from 'react-router-dom';

export default function PagoError() {
  return (
    <section className="pago-error-contenedor">

      <div className="pago-error-tarjeta">

        <span className="pago-error-etiqueta">
          PAGO NO COMPLETADO
        </span>

        <h2>
          No fue posible realizar el pago
        </h2>

        <p className="pago-error-texto">
          Revisa los datos ingresados e inténtalo nuevamente.
          Tu carrito se mantiene disponible para que puedas
          continuar con la compra.
        </p>

        <div className="pago-error-aviso">
          <span>🔒</span>

          <div>
            <strong>
              Tu compra no fue procesada
            </strong>

            <p>
              No se realizó ningún cobro.
            </p>
          </div>
        </div>

        <div className="pago-error-acciones">

          <Link
            to="/checkout"
            className="pago-error-boton-principal"
          >
            Intentar nuevamente
          </Link>

          <Link
            to="/carrito"
            className="pago-error-boton-secundario"
          >
            Volver al carrito
          </Link>

        </div>

      </div>

    </section>
  );
}