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
      <section>
        <h2>Carrito de compras</h2>
        <p>Tu carrito está vacío.</p>

        <Link to="/productos">
          Ir a productos
        </Link>
      </section>
    );
  }

  return (
    <section>
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
