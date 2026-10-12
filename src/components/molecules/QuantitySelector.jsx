export default function QuantitySelector({
  cantidad,
  onAumentar,
  onDisminuir
}) {
  return (
    <div className="input-group input-group-sm" style={{ width: 120 }}>
      <button
        type="button"
        className="btn btn-outline-secondary"
        onClick={onDisminuir}
      >
        -
      </button>

      <span className="form-control text-center">
        {cantidad}
      </span>

      <button
        type="button"
        className="btn btn-outline-secondary"
        onClick={onAumentar}
      >
        +
      </button>
    </div>
  );
}