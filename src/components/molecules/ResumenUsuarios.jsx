export default function ResumenUsuarios({ usuarios }) {
  const total = usuarios.length

  const clientes = usuarios.filter(
    (usuario) => usuario.tipoUsuario === 'cliente'
  ).length

  const vendedores = usuarios.filter(
    (usuario) => usuario.tipoUsuario === 'vendedor'
  ).length

  const administradores = usuarios.filter(
    (usuario) => usuario.tipoUsuario === 'administrador'
  ).length

  const tarjetas = [
    { titulo: 'Total de usuarios', valor: total },
    { titulo: 'Clientes', valor: clientes },
    { titulo: 'Vendedores', valor: vendedores },
    { titulo: 'Administradores', valor: administradores }
  ]

  return (
    <div className="row g-4 justify-content-center">
      {tarjetas.map((tarjeta) => (
        <div key={tarjeta.titulo} className="col-12 col-sm-6 col-lg-3">
          <article
            style={{
              textAlign: 'center',
              padding: '25px 20px',
              borderRadius: '20px',
              minHeight: '180px',
              maxWidth: '250px',
              margin: '0 auto',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            <h3
              style={{
                fontSize: '1.1rem',
                marginBottom: '15px'
              }}
            >
              {tarjeta.titulo}
            </h3>

            <h2
              style={{
                fontSize: '2.2rem',
                margin: 0
              }}
            >
              {tarjeta.valor}
            </h2>
          </article>
        </div>
      ))}
    </div>
  )
}