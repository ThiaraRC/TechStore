export default function QuantitySelector({
  cantidad,
  onAumentar,
  onDisminuir
}) {
  return (
    <div className="selector-cantidad">
      <button
        type="button"
        onClick={onDisminuir}
        aria-label="Disminuir cantidad"
      >
        -
      </button>

      <span>{cantidad}</span>

      <button
        type="button"
        onClick={onAumentar}
        aria-label="Aumentar cantidad"
      >
        +
      </button>
    </div>
  );
}