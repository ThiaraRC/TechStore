
import { useState } from 'react'
import FormField from '../molecules/FormField'
import { validarContacto } from '../../utils/validaciones'

export default function Contacto() {
  const [datos, setDatos] = useState({
    nombre: '',
    correo: '',
    mensaje: ''
  })

  const [errores, setErrores] = useState({})
  const [mensajeFinal, setMensajeFinal] = useState('')

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

    setMensajeFinal('')
  }

  function manejarEnvio(e) {
    e.preventDefault()

    const resultado = validarContacto(datos)
    setErrores(resultado)

    if (Object.keys(resultado).length > 0) {
      return
    }

    setMensajeFinal('¡Formulario validado correctamente!')

    setDatos({
      nombre: '',
      correo: '',
      mensaje: ''
    })
  }

  return (
    <section
      className="container"
      style={{
        width: '95%',
        maxWidth: '760px',
        margin: '35px auto',
        padding: '30px',
        backgroundColor: '#f4eef9',
        borderRadius: '25px'
      }}
    >
      <h2 className="text-center">Contáctanos</h2>

      <p className="text-center mb-4">
        ¿Tienes alguna duda? Déjanos tu mensaje.
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
        <FormField
          id="nombre"
          name="nombre"
          etiqueta="Nombre"
          type="text"
          className="form-control"
          placeholder="Ingresa tu nombre"
          value={datos.nombre}
          onChange={manejarCambio}
          error={errores.nombre}
        />

        <FormField
          id="correo"
          name="correo"
          etiqueta="Correo electrónico"
          type="email"
          className="form-control"
          placeholder="Ingresa tu correo"
          value={datos.correo}
          onChange={manejarCambio}
          error={errores.correo}
        />

        <div className="mb-3">
          <label htmlFor="mensaje" className="form-label">
            Mensaje
          </label>

          <textarea
            id="mensaje"
            name="mensaje"
            className="form-control"
            rows="5"
            placeholder="Escribe aquí tu mensaje..."
            value={datos.mensaje}
            onChange={manejarCambio}
            style={{ width: '100%', maxWidth: '100%' }}
          />

          {errores.mensaje && (
            <p className="text-danger mt-1">
              {errores.mensaje}
            </p>
          )}
        </div>

        {mensajeFinal && (
          <p className="text-success text-center" role="status">
            {mensajeFinal}
          </p>
        )}

        <div className="text-center mt-4">
          <button type="submit" className="btn btn-primary">
            Enviar mensaje
          </button>
        </div>
      </form>
    </section>
  )
}

