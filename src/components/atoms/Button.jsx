export default function Button({ etiqueta, onClick, tipo = 'button', className, ...resto }) {
  return (
    <button type={tipo} className={className} onClick={onClick} {...resto}>
      {etiqueta}
    </button>
  )
}