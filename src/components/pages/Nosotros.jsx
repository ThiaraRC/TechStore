import InfoCard from '../molecules/InfoCard'

const datos = [
  { valor: '+8', texto: 'Categorías de productos' },
  { valor: '100%', texto: 'Enfocado en gamers y profesionales' },
  { valor: '4', texto: 'Personas detrás del proyecto' },
]

const valores = [
  { icono: '✔', titulo: 'Calidad', texto: 'Seleccionamos cada producto pensando en su durabilidad y buen desempeño.' },
  { icono: '🤝', titulo: 'Cercanía', texto: 'Atención directa y honesta, antes y después de cada compra.' },
  { icono: '💡', titulo: 'Innovación', texto: 'Actualizamos el catálogo con lo último en accesorios y periféricos.' },
  { icono: '🔒', titulo: 'Confianza', texto: 'Procesos claros, precios transparentes y compras seguras.' },
]

const equipo = [
  { iniciales: 'LB', nombre: 'Luna Bustamante', rol: 'Desarrollo Frontend' },
  { iniciales: 'RM', nombre: 'Rosa Medina', rol: 'Diseño e interfaz' },
  { iniciales: 'TR', nombre: 'Thiara Rojas', rol: 'Lógica y validaciones' },
  { iniciales: 'AH', nombre: 'Andrea Huenumilla', rol: 'Panel administrador' },
]

export default function Nosotros() {
  return (
    <>
      <section className="hero-nosotros">
        <div className="hero-nosotros-texto">
          <span className="etiqueta-seccion">Sobre nosotros</span>
          <h2>Tecnología pensada para tu día a día</h2>
          <p>
            Somos una tienda tecnológica dedicada a ofrecer productos de calidad para facilitar la vida
            diaria de nuestros clientes.
          </p>
          <p>
            Nuestro objetivo es entregar tecnología moderna, accesible y confiable, ofreciendo productos
            para el entretenimiento, el estudio y el trabajo.
          </p>
        </div>
        <div className="hero-nosotros-datos">
          {datos.map((d) => (
            <div className="dato-destacado" key={d.texto}>
              <strong>{d.valor}</strong>
              <span>{d.texto}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mision-vision">
        <InfoCard
          className="tarjeta-mv"
          claseIcono="icono-mv"
          icono="🎯"
          titulo="Nuestra misión"
          texto="Acercar tecnología moderna y confiable a estudiantes, profesionales y entusiastas, con una experiencia de compra simple, clara y sin complicaciones."
        />
        <InfoCard
          className="tarjeta-mv"
          claseIcono="icono-mv"
          icono="🚀"
          titulo="Nuestra visión"
          texto="Ser una tienda online de referencia en accesorios tecnológicos, reconocida por su cercanía con el cliente y la calidad de sus productos."
        />
      </section>

      <section className="seccion-valores">
        <h2>Nuestros valores</h2>
        <div className="valores-grid">
          {valores.map((v) => (
            <InfoCard key={v.titulo} className="valor-card" claseIcono="icono-valor" {...v} />
          ))}
        </div>
      </section>

      <section className="seccion-equipo">
        <h2>Nuestro equipo</h2>
        <p className="subtitulo-equipo">
          Tech Store fue desarrollado por un equipo de estudiantes de Ingeniería en Informática como parte
          del proyecto de Desarrollo Full Stack.
        </p>
        <div className="equipo-grid">
          {equipo.map((m, i) => (
            <div className="miembro-card" key={m.nombre}>
              <div className={'avatar-iniciales avatar-' + (i + 1)}>{m.iniciales}</div>
              <h3>{m.nombre}</h3>
              <p>{m.rol}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
