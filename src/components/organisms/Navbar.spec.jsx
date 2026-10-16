import { act } from 'react'
import { montar } from '../../test/montar'
import Navbar from './Navbar'

describe('Navbar', () => {
  it('muestra el contador del carrito y avisa al cerrar sesión', () => {
    const cerrar = jasmine.createSpy('onCerrarSesion')
    const { contenedor, desmontar } = montar(
      <Navbar cantidadCarrito={3} usuario={{ nombre: 'Ana' }} onCerrarSesion={cerrar} />,
    )

    expect(contenedor.querySelector('.carrito span').textContent).toBe('3')
    expect(contenedor.textContent).toContain('Hola, Ana')

    act(() => {
      contenedor.querySelector('.cerrar-sesion').click()
    })
    expect(cerrar).toHaveBeenCalledTimes(1)

    desmontar()
  })
})
