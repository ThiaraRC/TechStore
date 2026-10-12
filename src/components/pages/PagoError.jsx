import { Link } from 'react-router-dom';

export default function PagoError() {
  return (
    <section>
      <h2>No fue posible realizar el pago</h2>

      <p>
        Revisa los datos ingresados e inténtalo nuevamente.
      </p>

      <div className="d-flex gap-2 flex-wrap">
        <Link to="/checkout">
          Volver a realizar el pago
        </Link>

        <Link to="/carrito">
          Volver al carrito
        </Link>
      </div>
    </section>
  );
}