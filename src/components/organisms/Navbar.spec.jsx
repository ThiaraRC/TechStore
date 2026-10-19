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

    
    // Comprobar que el menú se abre
    act(() => {
      contenedor.querySelector('.navbar-toggle').click()
    })

    expect(
      contenedor.querySelector('nav').classList.contains('navbar-menu-abierto')
    ).toBe(true)

    // Comprobar que el menú se cierra al entrar a Productos
    act(() => {
      contenedor.querySelector('a[href="/productos"]').click()
    })

    expect(
      contenedor.querySelector('nav').classList.contains('navbar-menu-abierto')
    ).toBe(false)

    
    // Comprobar acceso del administrador
    const admin = montar(
      <Navbar usuario={{ nombre: 'Admin', tipoUsuario: 'administrador' }} />
    )

    expect(
      admin.contenedor.querySelector('a[href="/admin"]')
    ).not.toBeNull()

    admin.desmontar()

    // Comprobar acceso del vendedor
    const vendedor = montar(
      <Navbar usuario={{ nombre: 'Vendedor', tipoUsuario: 'vendedor' }} />
    )

    expect(
      vendedor.contenedor.querySelector('a[href="/admin/productos"]')
    ).not.toBeNull()

    vendedor.desmontar()

    // Comprobar que aparecen Login y Registro sin iniciar sesion
    const visitante = montar(<Navbar />)

    expect(
      visitante.contenedor.querySelector('a[href="/login"]')
    ).not.toBeNull()

    expect(
      visitante.contenedor.querySelector('a[href="/registro"]')
    ).not.toBeNull()

    visitante.desmontar()

    desmontar()
  })
})
