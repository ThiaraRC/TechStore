import { Link, useNavigate } from 'react-router-dom';
import CartList from '../organisms/CartList';
import CartSummary from '../organisms/CartSummary';
import { useCarrito } from '../../context/CarritoContext';

export default function Carrito() {
  const navigate = useNavigate();

  const {
    items,
    total,
    aumentar,
    disminuir,
    quitar,
    vaciar
  } = useCarrito();

  if (items.length === 0) {
    return (
      <section className="carrito-contenedor">
        <h2>Carrito de compras</h2>

        <div className="carrito-vacio">
          <div className="carrito-vacio-icono">
            🛒
          </div>

          <h3>Tu carrito está vacío</h3>

          <p>
            Aún no has agregado productos.
            Explora nuestra tienda y encuentra algo que te guste.
          </p>

          <Link
            to="/productos"
            className="carrito-vacio-boton"
          >
            Ver productos
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="carrito-contenedor">
      <h2>Carrito de compras</h2>

      <CartList
        items={items}
        onAumentar={aumentar}
        onDisminuir={disminuir}
        onEliminar={quitar}
      />

      <CartSummary
        total={total}
        onVaciar={vaciar}
        onComprar={() => navigate('/checkout')}
      />
    </section>
  );
}