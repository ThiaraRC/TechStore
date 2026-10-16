
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { validarRegistro } from '../../utils/validaciones'
import { registrarUsuario, inicializarUsuarios } from '../../data/usuarios'
import { regionesComunas } from '../../data/regiones'

export default function Registro() {
  const [datos, setDatos] = useState({
    nombre: '',
    apellido: '',
    run: '',
    fechaNacimiento: '',
    direccion: '',
    region: '',
    comuna: '',
    correo: '',
    password: '',
    confirmarPassword: ''
  })

  const [errores, setErrores] = useState({})
  const [mensaje, setMensaje] = useState('')

  const estiloCampo = {
    width: '100%',
    maxWidth: '100%',
    boxSizing: 'border-box'
  }

  const manejarCambio = (e) => {
    const { name, value } = e.target

    setDatos({
      ...datos,
      [name]: value
    })

    setErrores({
      ...errores,
      [name]: ''
    })

    setMensaje('')
  }

  const manejarRegion = (e) => {
    setDatos({
      ...datos,
      region: e.target.value,
      comuna: ''
    })

    setErrores({
      ...errores,
      region: '',
      comuna: ''
    })

    setMensaje('')
  }

  const regionSeleccionada = regionesComunas.find(
    (item) => item.region === datos.region
  )

  const manejarEnvio = (e) => {
    e.preventDefault()

    const resultado = validarRegistro(datos)
    setErrores(resultado)
    setMensaje('')

    if (Object.keys(resultado).length > 0) {
      return
    }

    inicializarUsuarios()

    const registrado = registrarUsuario({
      ...datos,
      run: datos.run.trim().toUpperCase(),
      correo: datos.correo.trim().toLowerCase()
    })

    if (!registrado) {
      setMensaje('El correo o RUN ya está registrado.')
      return
    }

    setMensaje('¡Cuenta registrada correctamente!')
  }

  return (
    <section
      className="container"
      style={{
        width: '95%',
        maxWidth: '850px',
        margin: '40px auto'
      }}
    >
      <h2 style={{ textAlign: 'center' }}>
        Crear cuenta
      </h2>

      <p style={{ textAlign: 'center' }}>
        Regístrate y comienza a comprar en TechStore.
      </p>

      <form
        onSubmit={manejarEnvio}
        noValidate
        style={{
          width: '100%',
          maxWidth: 'none',
          margin: '0',
          padding: '0'
        }}
      >
        <div className="row">

          <div className="col-12 col-md-6">
            <label htmlFor="nombre">Nombre</label>
            <input
              id="nombre"
              name="nombre"
              placeholder="Ingresa tu nombre"
              value={datos.nombre}
              onChange={manejarCambio}
              style={estiloCampo}
            />
            {errores.nombre && (
              <p style={{ color: 'red' }}>{errores.nombre}</p>
            )}
          </div>

          <div className="col-12 col-md-6">
            <label htmlFor="apellido">Apellido</label>
            <input
              id="apellido"
              name="apellido"
              placeholder="Ingresa tu apellido"
              value={datos.apellido}
              onChange={manejarCambio}
              style={estiloCampo}
            />
            {errores.apellido && (
              <p style={{ color: 'red' }}>{errores.apellido}</p>
            )}
          </div>

          <div className="col-12 col-md-6">
            <label htmlFor="run">
              RUN (sin puntos ni guion)
            </label>
            <input
              id="run"
              name="run"
              placeholder="Ej: 19011022K"
              maxLength={9}
              value={datos.run}
              onChange={manejarCambio}
              style={estiloCampo}
            />
            {errores.run && (
              <p style={{ color: 'red' }}>{errores.run}</p>
            )}
          </div>

          <div className="col-12 col-md-6">
            <label htmlFor="fechaNacimiento">
              Fecha de nacimiento
            </label>
            <input
              type="date"
              id="fechaNacimiento"
              name="fechaNacimiento"
              value={datos.fechaNacimiento}
              onChange={manejarCambio}
              style={estiloCampo}
            />
            {errores.fechaNacimiento && (
              <p style={{ color: 'red' }}>
                {errores.fechaNacimiento}
              </p>
            )}
          </div>

          <div className="col-12">
            <label htmlFor="direccion">Dirección</label>
            <input
              id="direccion"
              name="direccion"
              placeholder="Ingresa tu dirección"
              value={datos.direccion}
              onChange={manejarCambio}
              style={estiloCampo}
            />
            {errores.direccion && (
              <p style={{ color: 'red' }}>{errores.direccion}</p>
            )}
          </div>

          <div className="col-12 col-md-6">
            <label htmlFor="region">Región</label>
            <select
              id="region"
              name="region"
              value={datos.region}
              onChange={manejarRegion}
              style={estiloCampo}
            >
              <option value="">Selecciona una región</option>

              {regionesComunas.map((item) => (
                <option key={item.region} value={item.region}>
                  {item.region}
                </option>
              ))}
            </select>
            {errores.region && (
              <p style={{ color: 'red' }}>{errores.region}</p>
            )}
          </div>

          <div className="col-12 col-md-6">
            <label htmlFor="comuna">Comuna</label>
            <select
              id="comuna"
              name="comuna"
              value={datos.comuna}
              onChange={manejarCambio}
              disabled={!datos.region}
              style={estiloCampo}
            >
              <option value="">Selecciona una comuna</option>

              {regionSeleccionada &&
                regionSeleccionada.comunas.map((comuna) => (
                  <option key={comuna} value={comuna}>
                    {comuna}
                  </option>
                ))}
            </select>
            {errores.comuna && (
              <p style={{ color: 'red' }}>{errores.comuna}</p>
            )}
          </div>

          <div className="col-12">
            <label htmlFor="correo">Correo electrónico</label>
            <input
              type="email"
              id="correo"
              name="correo"
              placeholder="Ingresa tu correo"
              value={datos.correo}
              onChange={manejarCambio}
              style={estiloCampo}
            />
            {errores.correo && (
              <p style={{ color: 'red' }}>{errores.correo}</p>
            )}
          </div>

          <div className="col-12 col-md-6">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Crea una contraseña"
              value={datos.password}
              onChange={manejarCambio}
              style={estiloCampo}
            />
            {errores.password && (
              <p style={{ color: 'red' }}>{errores.password}</p>
            )}
          </div>

          <div className="col-12 col-md-6">
            <label htmlFor="confirmarPassword">
              Confirmar contraseña
            </label>
            <input
              type="password"
              id="confirmarPassword"
              name="confirmarPassword"
              placeholder="Repite tu contraseña"
              value={datos.confirmarPassword}
              onChange={manejarCambio}
              style={estiloCampo}
            />
            {errores.confirmarPassword && (
              <p style={{ color: 'red' }}>
                {errores.confirmarPassword}
              </p>
            )}
          </div>

        </div>

        {mensaje && (
          <p
            role="status"
            style={{
              textAlign: 'center',
              color: mensaje.includes('correctamente') ? 'green' : 'red'
            }}
          >
            {mensaje}
          </p>
        )}

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button type="submit">
            Crear cuenta
          </button>
        </div>
      </form>

      <p style={{ marginTop: '20px', textAlign: 'center' }}>
        ¿Ya tienes una cuenta?{' '}
        <Link to="/login">
          Inicia sesión aquí
        </Link>
      </p>
    </section>
  )
}
