import { act } from 'react'
import { montar, escribir, boton } from '../test/montar'
import Registro from '../components/pages/Registro'
import Login from '../components/pages/Login'
import Contacto from '../components/pages/Contacto'
import { AuthProvider } from '../context/AuthContext'
import {
  validarRun, validarRegistro, validarLogin, validarContacto
} from './validaciones'
import {
  crearUsuarioAdmin, editarUsuario, eliminarUsuario
} from '../data/usuarios.js'
import { comunasPorRegion } from '../data/regiones.js'

// Acciones repetidas por los formularios
function hacerClic(vista, texto) {
  act(() => boton(vista.contenedor, texto).click())
}

function seleccionar(elemento, valor) {
  act(() => {
    elemento.value = valor
    elemento.dispatchEvent(new Event('change', { bubbles: true }))
  })
}

function escribirMensaje(elemento, valor) {
  const cambiarValor = Object.getOwnPropertyDescriptor(
    HTMLTextAreaElement.prototype, 'value'
  ).set

  act(() => {
    cambiarValor.call(elemento, valor)
    elemento.dispatchEvent(new Event('input', { bubbles: true }))
  })
}

// Permite comprobar varios datos sin repetir el mismo expect
function comprobarErrores(validar, datosBase, casos) {
  casos.forEach(([cambio, campo]) => {
    const errores = validar({ ...datosBase, ...cambio })
    expect(errores[campo]).toBeDefined()
  })
}

// localStorage ficticio para no alterar usuarios ni sesiones reales
function simularStorage(memoria) {
  spyOn(Storage.prototype, 'getItem').and.callFake(
    (clave) => memoria[clave] ?? null
  )
  return spyOn(Storage.prototype, 'setItem').and.callFake(
    (clave, valor) => { memoria[clave] = valor }
  )
}

describe('Pruebas de Thiara - TechStore', () => {
  let vista

  afterEach(() => {
    if (vista) {
      vista.desmontar()
      vista = null
    }
  })

  // PRUEBA 1: REGISTRO, REGIONES Y USUARIOS
  it('valida el registro y permite crear un cliente', () => {
    const base = {
      nombre: 'Ana',
      apellido: 'Perez',
      run: '100000040',
      fechaNacimiento: '1995-01-01',
      direccion: 'Calle 123',
      region: 'Metropolitana de Santiago',
      comuna: 'Maipú',
      correo: 'ana@gmail.com',
      password: '1234',
      confirmarPassword: '1234'
    }

    // Datos válidos, RUN y regiones
    expect(validarRun(base.run)).toBe(true)
    expect(validarRun('123456788')).toBe(false)
    expect(validarRun('10000013K')).toBe(true)
    expect(validarRegistro(base)).toEqual({})
    expect(comunasPorRegion('Metropolitana de Santiago')).toContain('Maipú')
    expect(comunasPorRegion('Región inventada')).toEqual([])

    // Cumpleaños pendiente: ejecuta las dos condiciones del cálculo de edad
    expect(validarRegistro({
      ...base, fechaNacimiento: '2007-12-01'
    })).toEqual({})
    expect(validarRegistro({
      ...base, fechaNacimiento: '2007-10-25'
    })).toEqual({})

    comprobarErrores(validarRegistro, base, [
      [{ nombre: '' }, 'nombre'],
      [{ nombre: 'a'.repeat(51) }, 'nombre'],
      [{ apellido: '' }, 'apellido'],
      [{ apellido: 'a'.repeat(101) }, 'apellido'],
      [{ run: '' }, 'run'],
      [{ run: '12' }, 'run'],
      [{ run: '12-34567' }, 'run'],
      [{ run: '123456788' }, 'run'],
      [{ fechaNacimiento: '' }, 'fechaNacimiento'],
      [{ fechaNacimiento: 'fecha-invalida' }, 'fechaNacimiento'],
      [{ fechaNacimiento: '2999-01-01' }, 'fechaNacimiento'],
      [{ fechaNacimiento: '2016-01-01' }, 'fechaNacimiento'],
      [{ direccion: '' }, 'direccion'],
      [{ direccion: 'a'.repeat(301) }, 'direccion'],
      [{ region: '' }, 'region'],
      [{ comuna: '' }, 'comuna'],
      [{ correo: '' }, 'correo'],
      [{ correo: 'correo-invalido' }, 'correo'],
      [{ correo: 'a'.repeat(101) + '@gmail.com' }, 'correo'],
      [{ correo: 'ana@yahoo.com' }, 'correo'],
      [{ password: '' }, 'password'],
      [{ password: '123' }, 'password'],
      [{ password: '12345678901' }, 'password'],
      [{ confirmarPassword: '' }, 'confirmarPassword'],
      [{ confirmarPassword: 'otra' }, 'confirmarPassword']
    ])

    const memoria = {}
    simularStorage(memoria)
    vista = montar(<Registro />)
    expect(vista.contenedor.textContent).toContain('Crear cuenta')

    // Formulario vacío
    hacerClic(vista, 'Crear cuenta')
    expect(vista.contenedor.textContent).toContain('Debes ingresar tu nombre.')

    // Registro exitoso desde el formulario React
    const campos = [
      'nombre', 'apellido', 'run', 'fechaNacimiento',
      'direccion', 'correo', 'password', 'confirmarPassword'
    ]
    campos.forEach((campo) => {
      escribir(vista.contenedor.querySelector(`#${campo}`), base[campo])
    })
    seleccionar(vista.contenedor.querySelector('#region'), base.region)
    seleccionar(vista.contenedor.querySelector('#comuna'), base.comuna)
    hacerClic(vista, 'Crear cuenta')
    expect(vista.contenedor.textContent)
      .toContain('¡Cuenta registrada correctamente!')

    const usuarios = JSON.parse(memoria.tech_usuarios)
    const registrado = usuarios.find((u) => u.correo === base.correo)
    expect(registrado).toBeDefined()
    expect(registrado.tipoUsuario).toBe('cliente')

    // Rechazar un registro repetido
    hacerClic(vista, 'Crear cuenta')
    expect(vista.contenedor.textContent)
      .toContain('El correo o RUN ya está registrado.')

    // CRUD de usuarios del administrador
    const usuarioPrueba = {
      run: '765432101',
      nombre: 'Pedro',
      apellido: 'Lopez',
      correo: 'pedro@duoc.cl',
      direccion: 'Calle 123',
      region: 'Metropolitana de Santiago',
      comuna: 'Maipú',
      tipoUsuario: 'vendedor'
    }

    expect(crearUsuarioAdmin(usuarioPrueba)).toBe(true)
    expect(crearUsuarioAdmin(usuarioPrueba)).toBe(false)
    expect(crearUsuarioAdmin({
      ...usuarioPrueba,
      run: '765432102',
      correo: 'otro@duoc.cl',
      tipoUsuario: 'invitado'
    })).toBe(false)

    expect(editarUsuario(usuarioPrueba.run, {
      ...usuarioPrueba,
      correo: 'pedroactualizado@duoc.cl'
    })).toBe(true)
    expect(editarUsuario(usuarioPrueba.run, {
      ...usuarioPrueba,
      correo: base.correo
    })).toBe(false)
    expect(editarUsuario('NO-EXISTE', usuarioPrueba)).toBe(false)
    expect(eliminarUsuario(usuarioPrueba.run)).toBe(true)
    expect(eliminarUsuario(usuarioPrueba.run)).toBe(false)
  })

  // PRUEBA 2: LOGIN Y ROLES
  it('valida el Login y guarda la sesión del administrador', () => {
    const datosCorrectos = { correo: 'admin@duoc.cl', password: '1234' }
    expect(validarLogin(datosCorrectos)).toEqual({})

    comprobarErrores(validarLogin, {}, [
      [{ correo: '', password: '1234' }, 'correo'],
      [{ correo: 'correo-invalido', password: '1234' }, 'correo'],
      [{ correo: 'ana@yahoo.com', password: '1234' }, 'correo'],
      [{ correo: 'a'.repeat(101) + '@gmail.com', password: '1234' }, 'correo'],
      [{ correo: 'admin@duoc.cl', password: '' }, 'password'],
      [{ correo: 'admin@duoc.cl', password: '123' }, 'password'],
      [{ correo: 'admin@duoc.cl', password: '12345678901' }, 'password']
    ])

    const memoria = {
      tech_usuarios: JSON.stringify([{
        run: '111111111',
        nombre: 'Admin',
        correo: 'admin@duoc.cl',
        tipoUsuario: 'administrador'
      }])
    }
    const guardarSesion = simularStorage(memoria)
    vista = montar(<AuthProvider><Login /></AuthProvider>)
    expect(vista.contenedor.textContent).toContain('Iniciar sesión')

    // Sin datos
    hacerClic(vista, 'Iniciar sesión')
    expect(vista.contenedor.textContent).toContain('Debes ingresar tu correo.')
    expect(vista.contenedor.textContent).toContain('Debes ingresar tu contraseña.')

    // Contraseña incorrecta
    escribir(vista.contenedor.querySelector('#correo'), 'admin@duoc.cl')
    escribir(vista.contenedor.querySelector('#password'), '0000')
    hacerClic(vista, 'Iniciar sesión')
    expect(vista.contenedor.textContent)
      .toContain('Correo o contraseña incorrectos.')
    expect(memoria.tech_sesion).toBeUndefined()

    // Inicio válido del administrador
    escribir(vista.contenedor.querySelector('#password'), '1234')
    hacerClic(vista, 'Iniciar sesión')
    expect(guardarSesion).toHaveBeenCalledWith(
      'tech_sesion', jasmine.any(String)
    )
    const sesion = JSON.parse(memoria.tech_sesion)
    expect(sesion.correo).toBe('admin@duoc.cl')
    expect(sesion.tipoUsuario).toBe('administrador')
    expect(sesion.password).toBeUndefined()

    // Cuentas de vendedor, cliente demo y cliente registrado
    const usuariosExtras = [
      {
        run: '222222222', nombre: 'Vendedor',
        correo: 'vendedor@duoc.cl', tipoUsuario: 'vendedor'
      },
      {
        run: '123456785', nombre: 'Cliente',
        correo: 'cliente@gmail.com', tipoUsuario: 'cliente'
      },
      {
        run: '100000040', nombre: 'Ana',
        correo: 'ana@gmail.com', password: '5678', tipoUsuario: 'cliente'
      }
    ]

    const usuariosGuardados = JSON.parse(memoria.tech_usuarios)
    usuariosExtras.forEach((usuario) => {
      if (!usuariosGuardados.some((u) => u.correo === usuario.correo)) {
        usuariosGuardados.push(usuario)
      }
    })
    memoria.tech_usuarios = JSON.stringify(usuariosGuardados)

    const otrosInicios = [
      ['vendedor@duoc.cl', '1234', 'vendedor'],
      ['cliente@gmail.com', '1234', 'cliente'],
      ['ana@gmail.com', '5678', 'cliente']
    ]
    otrosInicios.forEach(([correo, clave, rol]) => {
      vista.desmontar()
      vista = null
      delete memoria.tech_sesion
      vista = montar(<AuthProvider><Login /></AuthProvider>)
      escribir(vista.contenedor.querySelector('#correo'), correo)
      escribir(vista.contenedor.querySelector('#password'), clave)
      hacerClic(vista, 'Iniciar sesión')

      const sesionNueva = JSON.parse(memoria.tech_sesion || 'null')
      expect(sesionNueva).not.toBeNull()
      expect(sesionNueva?.correo).toBe(correo)
      expect(sesionNueva?.tipoUsuario).toBe(rol)
    })
  })

  // PRUEBA 3: CONTACTO
  it('muestra errores y permite completar Contacto', () => {
    const base = {
      nombre: 'Ana', correo: 'ana@gmail.com', mensaje: 'Hola TechStore'
    }
    expect(validarContacto(base)).toEqual({})

    comprobarErrores(validarContacto, base, [
      [{ nombre: '' }, 'nombre'],
      [{ nombre: 'a'.repeat(101) }, 'nombre'],
      [{ correo: '' }, 'correo'],
      [{ correo: 'correo-invalido' }, 'correo'],
      [{ correo: 'a'.repeat(101) + '@gmail.com' }, 'correo'],
      [{ correo: 'ana@yahoo.com' }, 'correo'],
      [{ mensaje: '' }, 'mensaje'],
      [{ mensaje: 'a'.repeat(501) }, 'mensaje']
    ])

    vista = montar(<Contacto />)
    expect(vista.contenedor.textContent).toContain('Contáctanos')

    // Formulario vacío
    hacerClic(vista, 'Enviar mensaje')
    expect(vista.contenedor.textContent).toContain('Debes ingresar tu nombre.')
    expect(vista.contenedor.textContent).toContain('Debes ingresar tu correo.')
    expect(vista.contenedor.textContent).toContain('Debes escribir un mensaje.')

    // Envío válido
    escribir(vista.contenedor.querySelector('#nombre'), base.nombre)
    escribir(vista.contenedor.querySelector('#correo'), base.correo)
    escribirMensaje(vista.contenedor.querySelector('#mensaje'), base.mensaje)
    hacerClic(vista, 'Enviar mensaje')
    expect(vista.contenedor.textContent)
      .toContain('¡Formulario validado correctamente!')
    expect(vista.contenedor.querySelector('#nombre').value).toBe('')
    expect(vista.contenedor.querySelector('#correo').value).toBe('')
    expect(vista.contenedor.querySelector('#mensaje').value).toBe('')
  })
})
