
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import {
  listarUsuarios,
  editarUsuario
} from '../../../data/usuarios'

import { regionesComunas } from '../../../data/regiones'

export default function EditarUsuario() {
  const { run } = useParams()
  const navigate = useNavigate()

  const usuario = listarUsuarios().find(
    (item) => item.run === run
  )

  const [datos, setDatos] = useState({
    nombre: usuario?.nombre || '',
    apellido: usuario?.apellido || '',
    correo: usuario?.correo || '',
    direccion: usuario?.direccion || '',
    region: usuario?.region || '',
    comuna: usuario?.comuna || ''
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

    const nuevosErrores = {}

    const nombre = datos.nombre.trim()
    const apellido = datos.apellido.trim()
    const correo = datos.correo.trim().toLowerCase()

    if (nombre === '') {
      nuevosErrores.nombre = 'Debes ingresar el nombre.'
    } else if (nombre.length > 50) {
      nuevosErrores.nombre = 'Máximo 50 caracteres.'
    }

    if (apellido === '') {
      nuevosErrores.apellido = 'Debes ingresar el apellido.'
    } else if (apellido.length > 100) {
      nuevosErrores.apellido = 'Máximo 100 caracteres.'
    }

    if (correo === '') {
      nuevosErrores.correo = 'Debes ingresar un correo.'
    } else if (
      !correo.includes('@') ||
      !correo.includes('.')
    ) {
      nuevosErrores.correo = 'Ingresa un correo válido.'
    } else if (correo.length > 100) {
      nuevosErrores.correo = 'Máximo 100 caracteres.'
    } else if (
      !correo.endsWith('@gmail.com') &&
      !correo.endsWith('@duoc.cl') &&
      !correo.endsWith('@profesor.duoc.cl')
    ) {
      nuevosErrores.correo = 'El dominio del correo no está permitido.'
    }

    if (datos.direccion.length > 300) {
      nuevosErrores.direccion = 'Máximo 300 caracteres.'
    }

    if (datos.region && !datos.comuna) {
      nuevosErrores.comuna = 'Selecciona una comuna.'
    }

    setErrores(nuevosErrores)

    if (Object.keys(nuevosErrores).length > 0) {
      return
    }

    const actualizado = editarUsuario(run, {
      ...datos,
      nombre,
      apellido,
      correo
    })

    if (!actualizado) {
      setMensaje('No se pudo actualizar. Revisa si el correo ya existe.')
      return
    }

    navigate('/admin/usuarios')
  }

  if (!usuario) {
    return (
      <section className="container my-4">
        <h2>Usuario no encontrado</h2>
        <Link to="/admin/usuarios">
          Volver a usuarios
        </Link>
      </section>
    )
  }

  const campos = [
    { name: 'nombre', label: 'Nombre', type: 'text' },
    { name: 'apellido', label: 'Apellido', type: 'text' },
    { name: 'correo', label: 'Correo electrónico', type: 'email' },
    { name: 'direccion', label: 'Dirección', type: 'text' }
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
      <h2 className="text-center mb-3">
        Editar usuario
      </h2>

      <p className="text-center mb-4">
        Modifica los datos del usuario seleccionado.
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
          <div className="col-12 col-md-6">
            <label className="form-label">
              RUN
            </label>

            <input
              className="form-control"
              value={usuario.run}
              disabled
            />
          </div>

          <div className="col-12 col-md-6">
            <label className="form-label">
              Rol actual
            </label>

            <input
              className="form-control"
              value={usuario.tipoUsuario}
              disabled
            />
          </div>

          {campos.map((campo) => (
            <div
              className="col-12 col-md-6"
              key={campo.name}
            >
              <label
                htmlFor={campo.name}
                className="form-label"
              >
                {campo.label}
              </label>

              <input
                id={campo.name}
                name={campo.name}
                type={campo.type}
                className="form-control"
                value={datos[campo.name]}
                onChange={manejarCambio}
              />

              {errores[campo.name] && (
                <p className="text-danger mt-1">
                  {errores[campo.name]}
                </p>
              )}
            </div>
          ))}

          <div className="col-12 col-md-6">
            <label
              htmlFor="region"
              className="form-label"
            >
              Región
            </label>

            <select
              id="region"
              name="region"
              className="form-select"
              value={datos.region}
              onChange={manejarRegion}
            >
              <option value="">
                Selecciona una región
              </option>

              {regionesComunas.map((item) => (
                <option
                  key={item.region}
                  value={item.region}
                >
                  {item.region}
                </option>
              ))}
            </select>
          </div>

          <div className="col-12 col-md-6">
            <label
              htmlFor="comuna"
              className="form-label"
            >
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
              <option value="">
                Selecciona una comuna
              </option>

              {regionSeleccionada?.comunas.map((comuna) => (
                <option key={comuna} value={comuna}>
                  {comuna}
                </option>
              ))}
            </select>

            {errores.comuna && (
              <p className="text-danger mt-1">
                {errores.comuna}
              </p>
            )}
          </div>
        </div>

        {mensaje && (
          <p className="text-danger text-center mt-3">
            {mensaje}
          </p>
        )}

        <div className="d-flex flex-wrap justify-content-center gap-3 mt-4">
          <button
            type="submit"
            className="btn btn-primary"
          >
            Guardar cambios
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
