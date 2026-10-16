import Price from '../atoms/Price';

export default function CartSummary({
  total,
  onVaciar,
  onComprar
}) {
  return (
    <div>
      <h3>
        Total: <Price valor={total} />
      </h3>

      <div className="d-flex gap-2 flex-wrap">
        <button
          type="button"
          onClick={onVaciar}
        >
          Vaciar carrito
        </button>

        <button
          type="button"
          onClick={onComprar}
        >
          Comprar ahora
        </button>
      </div>
    </div>
  );
}
