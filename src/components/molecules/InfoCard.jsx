export default function InfoCard({ icono, titulo, texto, className, claseIcono }) {
  return (
    <div className={className}>
      {icono ? <span className={claseIcono}>{icono}</span> : null}
      <h3>{titulo}</h3>
      <p>{texto}</p>
    </div>
  )
}
