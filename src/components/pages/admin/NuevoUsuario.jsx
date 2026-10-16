
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { validarRegistro } from '../../../utils/validaciones'
import { crearUsuarioAdmin } from '../../../data/usuarios'
import { regionesComunas } from '../../../data/regiones'

export default function NuevoUsuario() {
  const navigate = useNavigate()

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
    confirmarPassword: '',
    tipoUsuario: 'cliente'
  })

  const [errores, setErrores] = useState({})
  const [mensaje, setMensaje] = useState('')

  const regionSeleccionada = regionesComunas.find(
    (item) => item.region === datos.region
  )

  function manejarCambio(e) {
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

  function manejarRegion(e) {
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
  }

  function manejarEnvio(e) {
    e.preventDefault()

    const resultado = validarRegistro(datos)
    setErrores(resultado)

    if (Object.keys(resultado).length > 0) {
      return
    }

    const creado = crearUsuarioAdmin(datos)

    if (!creado) {
      setMensaje('El correo o RUN ya está registrado.')
      return
    }

    navigate('/admin/usuarios')
  }

  const campos = [
    { name: 'nombre', label: 'Nombre', type: 'text' },
    { name: 'apellido', label: 'Apellido', type: 'text' },
    { name: 'run', label: 'RUN sin puntos ni guion', type: 'text' },
    { name: 'fechaNacimiento', label: 'Fecha de nacimiento', type: 'date' },
    { name: 'direccion', label: 'Dirección', type: 'text' },
    { name: 'correo', label: 'Correo electrónico', type: 'email' },
    { name: 'password', label: 'Contraseña', type: 'password' },
    { name: 'confirmarPassword', label: 'Confirmar contraseña', type: 'password' }
  ]

  return (
    <section
      className="container"
      style={{
        width: '95%',
        maxWidth: '900px',
        margin: '30px auto',
        padding: '25px',
        backgroundColor: '#f4eef9',
        borderRadius: '25px'
      }}
    >
      <h2 className="text-center">Nuevo usuario</h2>

      <p className="text-center">
        Completa los datos para crear una cuenta en TechStore.
      </p>

      <form
        onSubmit={manejarEnvio}
        noValidate
        style={{
          width: '100%',
          maxWidth: 'none',
          margin: 0,
          padding: 0
        }}
      >
        <div className="row g-3">
          {campos.map((campo) => (
            <div className="col-12 col-md-6" key={campo.name}>
              <label htmlFor={campo.name} className="form-label">
                {campo.label}
              </label>

              <input
                id={campo.name}
                name={campo.name}
                type={campo.type}
                className="form-control"
                value={datos[campo.name]}
                onChange={manejarCambio}
                style={{ width: '100%', maxWidth: '100%' }}
              />

              {errores[campo.name] && (
                <p className="text-danger mt-1">
                  {errores[campo.name]}
                </p>
              )}
            </div>
          ))}

          <div className="col-12 col-md-6">
            <label htmlFor="region" className="form-label">
              Región
            </label>

            <select
              id="region"
              name="region"
              className="form-select"
              value={datos.region}
              onChange={manejarRegion}
            >
              <option value="">Selecciona una región</option>

              {regionesComunas.map((item) => (
                <option key={item.region} value={item.region}>
                  {item.region}
                </option>
              ))}
            </select>

            {errores.region && (
              <p className="text-danger mt-1">{errores.region}</p>
            )}
          </div>

          <div className="col-12 col-md-6">
            <label htmlFor="comuna" className="form-label">
              Comuna
            </label>

            <select
              id="comuna"
              name="comuna"
              className="form-select"
              value={datos.comuna}
              onChange={manejarCambio}
              disabled={!datos.region}
            >
              <option value="">Selecciona una comuna</option>

              {regionSeleccionada?.comunas.map((comuna) => (
                <option key={comuna} value={comuna}>
                  {comuna}
                </option>
              ))}
            </select>

            {errores.comuna && (
              <p className="text-danger mt-1">{errores.comuna}</p>
            )}
          </div>

          <div className="col-12 col-md-6">
            <label htmlFor="tipoUsuario" className="form-label">
              Rol del usuario
            </label>

            <select
              id="tipoUsuario"
              name="tipoUsuario"
              className="form-select"
              value={datos.tipoUsuario}
              onChange={manejarCambio}
            >
              <option value="cliente">Cliente</option>
              <option value="vendedor">Vendedor</option>
              <option value="administrador">Administrador</option>
            </select>
          </div>
        </div>

        {mensaje && (
          <p className="text-danger text-center mt-3">{mensaje}</p>
        )}

        <div className="d-flex flex-wrap gap-3 justify-content-center mt-4">
          <button type="submit" className="btn btn-primary">
            Guardar usuario
          </button>

          <Link
            to="/admin/usuarios"
            className="btn btn-outline-secondary"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </section>
  )
}

