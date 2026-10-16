
import {
  validarRun,
  validarLogin,
  validarContacto
} from './validaciones'

describe('Pruebas de validaciones de TechStore', () => {

  it('rechaza un RUN incorrecto', () => {
    const resultado = validarRun('123456788')

    expect(resultado).toBe(false)
  })

  it('acepta datos de login con formato correcto', () => {
    const datos = {
      correo: 'admin@duoc.cl',
      password: '1234'
    }

    const errores = validarLogin(datos)

    expect(errores).toEqual({})
  })

  it('rechaza un mensaje de contacto muy largo', () => {
    const datos = {
      nombre: 'Ana',
      correo: 'ana@gmail.com',
      mensaje: 'a'.repeat(501)
    }

    const errores = validarContacto(datos)

    expect(errores.mensaje).toBeDefined()
  })

})
