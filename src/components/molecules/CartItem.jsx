import QuantitySelector from './QuantitySelector';
import Price from '../atoms/Price';

export default function CartItem({
  item,
  onAumentar,
  onDisminuir,
  onEliminar
}) {
  const subtotal = item.precio * item.cantidad;

  return (
    <tr className="carrito-fila">
      <td className="carrito-imagen-celda">
        <img
          src={item.imagen}
          alt={item.nombre}
          className="carrito-imagen"
        />
      </td>

      <td>{item.nombre}</td>

      <td>
        <Price valor={item.precio} />
      </td>

      <td>
        <QuantitySelector
          cantidad={item.cantidad}
          onAumentar={() => onAumentar(item.id)}
          onDisminuir={() => onDisminuir(item.id)}
        />
      </td>

      <td>
        <Price valor={subtotal} />
      </td>

      <td>
        <button
          type="button"
          className="boton-eliminar-carrito"
          onClick={() => onEliminar(item.id)}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
}