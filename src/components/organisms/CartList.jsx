import CartItem from '../molecules/CartItem';

export default function CartList({
  items,
  onAumentar,
  onDisminuir,
  onEliminar
}) {
  return (
    <div className="table-responsive">
      <table className="table align-middle">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
            <th>Acción</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onAumentar={onAumentar}
              onDisminuir={onDisminuir}
              onEliminar={onEliminar}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}