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
    <tr>
      <td>
        <img
          src={item.imagen}
          alt={item.nombre}
          style={{ width: 70 }}
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
          onClick={() => onEliminar(item.id)}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
}