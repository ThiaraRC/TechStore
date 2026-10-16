export default function HomeSection({ titulo, descripcion, className, children }) {
  return (
    <section className={className}>
      <h2>{titulo}</h2>
      {descripcion ? <p>{descripcion}</p> : null}
      {children}
    </section>
  )
}
