
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { validarLogin } from '../../utils/validaciones'
import { buscarUsuarioPorCorreo } from '../../data/usuarios'
import { useAuth } from '../../context/AuthContext'

export default function Login() {
  const navigate = useNavigate()
  const { iniciarSesion } = useAuth()

  const [correo, setCorreo] = useState('')
  const [password, setPassword] = useState('')
  const [errores, setErrores] = useState({})
  const [mensaje, setMensaje] = useState('')

  function manejarEnvio(e) {
    e.preventDefault()
    setMensaje('')

    const correoLimpio = correo.trim().toLowerCase()

    const erroresEncontrados = validarLogin({
      correo: correoLimpio,
      password
    })

    setErrores(erroresEncontrados)

    if (Object.keys(erroresEncontrados).length > 0) {
      return
    }

    // Cuentas de demostración del proyecto original
    const cuentasDemo = [
      { correo: 'admin@duoc.cl', tipoUsuario: 'administrador' },
      { correo: 'vendedor@duoc.cl', tipoUsuario: 'vendedor' },
      { correo: 'cliente@gmail.com', tipoUsuario: 'cliente' }
    ]

    const cuentaDemo = cuentasDemo.find(
      (cuenta) => cuenta.correo === correoLimpio
    )

    if (!cuentaDemo || password !== '1234') {
      setMensaje(
        'Credenciales incorrectas. Por ahora solo están habilitadas las cuentas de prueba.'
      )
      return
    }

    const usuarioGuardado = buscarUsuarioPorCorreo(correoLimpio)

    if (!usuarioGuardado) {
      setMensaje('No se encontró la cuenta de prueba.')
      return
    }

    iniciarSesion({
      run: usuarioGuardado.run,
      nombre: usuarioGuardado.nombre,
      correo: usuarioGuardado.correo,
      tipoUsuario: cuentaDemo.tipoUsuario
    })

    if (cuentaDemo.tipoUsuario === 'administrador') {
      navigate('/admin/usuarios')
    } else if (cuentaDemo.tipoUsuario === 'vendedor') {
      navigate('/admin/productos')
    } else {
      navigate('/')
    }
  }

  return (
    <section
      className="container"
      style={{ maxWidth: '700px', margin: '40px auto' }}
    >
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <h2>Iniciar sesión</h2>
          <p>Ingresa tus datos para acceder a TechStore.</p>

          <form onSubmit={manejarEnvio}>
            <label htmlFor="correo">
              Correo electrónico
            </label>

            <input
              type="email"
              id="correo"
              name="correo"
              placeholder="Ingresa tu correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />

            {errores.correo && (
              <p style={{ color: 'red' }}>
                {errores.correo}
              </p>
            )}

            <label htmlFor="password">
              Contraseña
            </label>

            <input
              type="password"
              id="password"
              name="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {errores.password && (
              <p style={{ color: 'red' }}>
                {errores.password}
              </p>
            )}

            {mensaje && (
              <p style={{ color: 'red' }}>{mensaje}</p>
            )}

            <button type="submit">
              Iniciar sesión
            </button>
          </form>

          <p style={{ marginTop: '20px', textAlign: 'center' }}>
            ¿No tienes una cuenta?{' '}
            <Link to="/registro">
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
