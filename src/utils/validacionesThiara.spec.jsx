
import { act } from 'react'
import { montar, escribir, boton } from '../test/montar'
import Registro from '../components/pages/Registro'
import Login from '../components/pages/Login'
import Contacto from '../components/pages/Contacto'
import { AuthProvider } from '../context/AuthContext'

import {
  validarRun,
  validarRegistro,
  validarLogin,
  validarContacto
} from './validaciones'

import {
  crearUsuarioAdmin,
  editarUsuario,
  eliminarUsuario
} from '../data/usuarios.js'

import { comunasPorRegion } from '../data/regiones.js'

// Ayudante para cambiar región y comuna
function seleccionar(elemento, valor) {
  act(() => {
    elemento.value = valor
    elemento.dispatchEvent(new Event('change', { bubbles: true }))
  })
}

// Ayudante para escribir en el mensaje de Contacto
function escribirTexto(elemento, valor) {
  const cambiarValor = Object.getOwnPropertyDescriptor(
    HTMLTextAreaElement.prototype, 'value'
  ).set

  act(() => {
    cambiarValor.call(elemento, valor)
    elemento.dispatchEvent(new Event('input', { bubbles: true }))
  })
}

describe('Pruebas de Thiara - TechStore', () => {
  let vista

  afterEach(() => {
    if (vista) {
      vista.desmontar()
      vista = null
    }
  })

  // PRUEBA 1: REGISTRO
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

    // RUN y registro correctos
    expect(validarRun(base.run)).toBe(true)
    expect(validarRun('123456788')).toBe(false)
    expect(validarRun('10000013K')).toBe(true)
    expect(validarRegistro(base)).toEqual({})

    // Comprobar una región existente
    expect(
      comunasPorRegion('Metropolitana de Santiago')
    ).toContain('Maipú')

    // Comprobar una región inexistente
    expect(
      comunasPorRegion('Región inventada')
    ).toEqual([])

    // Persona mayor de edad que todavía no cumple años este año
    const personaSinCumple = {
      ...base,
      fechaNacimiento: '2007-12-01'
    }

    expect(validarRegistro(personaSinCumple)).toEqual({})

    // Persona que cumple años este mismo mes, pero aún no llega su día
    const cumpleEsteMes = {
      ...base,
      fechaNacimiento: '2007-10-25'
    }

    expect(validarRegistro(cumpleEsteMes)).toEqual({})

    // Casos incorrectos
    const casosInvalidos = [
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
    ]

    casosInvalidos.forEach(([cambio, campo]) => {
      const errores = validarRegistro({
        ...base,
        ...cambio
      })

      expect(errores[campo]).toBeDefined()
    })

    // Simulación del almacenamiento
    const memoria = {}

    spyOn(Storage.prototype, 'getItem').and.callFake(
      (clave) => memoria[clave] ?? null
    )

    spyOn(Storage.prototype, 'setItem').and.callFake(
      (clave, valor) => {
        memoria[clave] = valor
      }
    )

    // Mostrar el formulario
    vista = montar(<Registro />)

    expect(vista.contenedor.textContent)
      .toContain('Crear cuenta')

    // Intentar enviar el formulario vacío
    act(() => {
      boton(vista.contenedor, 'Crear cuenta').click()
    })

    expect(vista.contenedor.textContent)
      .toContain('Debes ingresar tu nombre.')

    // Completar los campos
    for (const campo of [
      'nombre',
      'apellido',
      'run',
      'fechaNacimiento',
      'direccion',
      'correo',
      'password',
      'confirmarPassword'
    ]) {
      escribir(
        vista.contenedor.querySelector(`#${campo}`),
        base[campo]
      )
    }

    seleccionar(
      vista.contenedor.querySelector('#region'),
      base.region
    )

    seleccionar(
      vista.contenedor.querySelector('#comuna'),
      base.comuna
    )

    // Registrar correctamente
    act(() => {
      boton(vista.contenedor, 'Crear cuenta').click()
    })

    expect(vista.contenedor.textContent)
      .toContain('¡Cuenta registrada correctamente!')

    // Verificar el usuario guardado
    const usuarios = JSON.parse(memoria.tech_usuarios)

    const registrado = usuarios.find(
      (usuario) => usuario.correo === base.correo
    )

    expect(registrado).toBeDefined()
    expect(registrado.tipoUsuario).toBe('cliente')

    // No debe permitir duplicados
    act(() => {
      boton(vista.contenedor, 'Crear cuenta').click()
    })

    expect(vista.contenedor.textContent)
      .toContain('El correo o RUN ya está registrado.')
  

  // Comprobar la creación de usuarios por el administrador
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

// Crear usuario
expect(crearUsuarioAdmin(usuarioPrueba)).toBe(true)

// No permitir usuarios duplicados
expect(crearUsuarioAdmin(usuarioPrueba)).toBe(false)

// No permitir roles inexistentes
expect(crearUsuarioAdmin({
  ...usuarioPrueba,
  run: '765432102',
  correo: 'otro@duoc.cl',
  tipoUsuario: 'invitado'
})).toBe(false)

// Editar usuario
expect(editarUsuario(usuarioPrueba.run, {
  ...usuarioPrueba,
  correo: 'pedroactualizado@duoc.cl'
})).toBe(true)

// No permitir cambiar el correo por uno que ya existe
expect(editarUsuario(usuarioPrueba.run, {
  ...usuarioPrueba,
  correo: base.correo
})).toBe(false)

// No editar un usuario inexistente
expect(editarUsuario('NO-EXISTE', usuarioPrueba)).toBe(false)

// Eliminar usuario
expect(eliminarUsuario(usuarioPrueba.run)).toBe(true)

// No eliminar dos veces el mismo usuario
expect(eliminarUsuario(usuarioPrueba.run)).toBe(false)

})

  // PRUEBA 2: LOGIN
  it('valida el Login y guarda la sesión del administrador', () => {
    const datosCorrectos = {
      correo: 'admin@duoc.cl',
      password: '1234'
    }

    expect(validarLogin(datosCorrectos)).toEqual({})

    const casosInvalidos = [
      [{ correo: '', password: '1234' }, 'correo'],
      [{ correo: 'correo-invalido', password: '1234' }, 'correo'],
      [{ correo: 'ana@yahoo.com', password: '1234' }, 'correo'],
      [{ correo: 'a'.repeat(101) + '@gmail.com', password: '1234' }, 'correo'],
      [{ correo: 'admin@duoc.cl', password: '' }, 'password'],
      [{ correo: 'admin@duoc.cl', password: '123' }, 'password'],
      [{ correo: 'admin@duoc.cl', password: '12345678901' }, 'password']
    ]

    casosInvalidos.forEach(([datos, campo]) => {
      expect(validarLogin(datos)[campo]).toBeDefined()
    })

    // Cuenta ficticia de administrador
    const memoria = {
      tech_usuarios: JSON.stringify([
        {
          run: '111111111',
          nombre: 'Admin',
          correo: 'admin@duoc.cl',
          tipoUsuario: 'administrador'
        }
      ])
    }

    // Simular localStorage
    spyOn(Storage.prototype, 'getItem').and.callFake(
      (clave) => memoria[clave] ?? null
    )

    const guardarSesion = spyOn(
      Storage.prototype,
      'setItem'
    ).and.callFake((clave, valor) => {
      memoria[clave] = valor
    })

    // Mostrar el Login con su contexto
    vista = montar(
      <AuthProvider>
        <Login />
      </AuthProvider>
    )

    expect(vista.contenedor.textContent)
      .toContain('Iniciar sesión')

    // Probar Login con campos vacíos
    act(() => {
      boton(vista.contenedor, 'Iniciar sesión').click()
    })

    expect(vista.contenedor.textContent)
      .toContain('Debes ingresar tu correo.')

    expect(vista.contenedor.textContent)
      .toContain('Debes ingresar tu contraseña.')

    // Primero probar contraseña incorrecta
    escribir(
      vista.contenedor.querySelector('#correo'),
      'admin@duoc.cl'
    )

    escribir(
      vista.contenedor.querySelector('#password'),
      '0000'
    )

    act(() => {
      boton(vista.contenedor, 'Iniciar sesión').click()
    })

    expect(vista.contenedor.textContent)
      .toContain('Correo o contraseña incorrectos.')

    expect(memoria.tech_sesion).toBeUndefined()

    // Ahora contraseña correcta
    escribir(
      vista.contenedor.querySelector('#password'),
      '1234'
    )

    act(() => {
      boton(vista.contenedor, 'Iniciar sesión').click()
    })

    // Verificar que guardó la sesión
    expect(guardarSesion).toHaveBeenCalledWith(
      'tech_sesion',
      jasmine.any(String)
    )

    const sesion = JSON.parse(memoria.tech_sesion)

    expect(sesion.correo).toBe('admin@duoc.cl')
    expect(sesion.tipoUsuario).toBe('administrador')

    // La sesión no debe incluir contraseña
    expect(sesion.password).toBeUndefined()
  })

  // PRUEBA 3: CONTACTO
  it('muestra errores y permite completar Contacto', () => {
    const base = {
      nombre: 'Ana',
      correo: 'ana@gmail.com',
      mensaje: 'Hola TechStore'
    }

    expect(validarContacto(base)).toEqual({})

    const casosInvalidos = [
      [{ nombre: '' }, 'nombre'],
      [{ nombre: 'a'.repeat(101) }, 'nombre'],
      [{ correo: '' }, 'correo'],
      [{ correo: 'correo-invalido' }, 'correo'],
      [{ correo: 'a'.repeat(101) + '@gmail.com' }, 'correo'],
      [{ correo: 'ana@yahoo.com' }, 'correo'],
      [{ mensaje: '' }, 'mensaje'],
      [{ mensaje: 'a'.repeat(501) }, 'mensaje']
    ]

    casosInvalidos.forEach(([cambio, campo]) => {
      expect(
        validarContacto({ ...base, ...cambio })[campo]
      ).toBeDefined()
    })

    // Mostrar el formulario de Contacto
    vista = montar(<Contacto />)

    expect(vista.contenedor.textContent)
      .toContain('Contáctanos')

    // Enviar sin completar campos
    act(() => {
      boton(vista.contenedor, 'Enviar mensaje').click()
    })

    expect(vista.contenedor.textContent)
      .toContain('Debes ingresar tu nombre.')

    expect(vista.contenedor.textContent)
      .toContain('Debes ingresar tu correo.')

    expect(vista.contenedor.textContent)
      .toContain('Debes escribir un mensaje.')

    // Completar el formulario
    escribir(
      vista.contenedor.querySelector('#nombre'),
      base.nombre
    )

    escribir(
      vista.contenedor.querySelector('#correo'),
      base.correo
    )

    escribirTexto(
      vista.contenedor.querySelector('#mensaje'),
      base.mensaje
    )

    // Enviar formulario correcto
    act(() => {
      boton(vista.contenedor, 'Enviar mensaje').click()
    })

    expect(vista.contenedor.textContent)
      .toContain('¡Formulario validado correctamente!')

    // Comprobar que se limpiaron los campos
    expect(
      vista.contenedor.querySelector('#nombre').value
    ).toBe('')

    expect(
      vista.contenedor.querySelector('#correo').value
    ).toBe('')

    expect(
      vista.contenedor.querySelector('#mensaje').value
    ).toBe('')
  })
})
