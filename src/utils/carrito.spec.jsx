import {
  agregarItem,
  aumentarItem,
  disminuirItem,
  quitarItem,
  calcularTotal,
  contarItems,
  leerCarrito
} from './carrito'

import { guardar } from '../data/almacen'

describe('Funciones del carrito', () => {

  it('10. agrega, aumenta, disminuye, elimina y cuenta items (producto normal, en oferta y repetido)', () => {

    const mouse = {
      id: 1,
      nombre: 'Mouse Gamer',
      imagen: '/img/mouse.jpg',
      precio: 20000,
      oferta: false
    }

    const teclado = {
      id: 2,
      nombre: 'Teclado Mecánico',
      imagen: '/img/teclado.jpg',
      precio: 50000,
      precioOferta: 45000,
      oferta: true
    }

    // Agregar producto nuevo sin oferta
    let carrito = agregarItem([], mouse)

    expect(carrito.length).toBe(1)
    expect(carrito[0].precio).toBe(20000)
    expect(carrito[0].cantidad).toBe(1)

    // Agregar producto con oferta
    carrito = agregarItem(carrito, teclado)

    expect(carrito.length).toBe(2)
    expect(carrito[1].precio).toBe(45000)

    // Agregar nuevamente un producto existente
    carrito = agregarItem(carrito, mouse)

    expect(carrito[0].cantidad).toBe(2)
    expect(carrito[1].cantidad).toBe(1)

    // Aumentar solo el producto seleccionado
    carrito = aumentarItem(carrito, 2)

    expect(carrito[0].cantidad).toBe(2)
    expect(carrito[1].cantidad).toBe(2)

    // Disminuir de 2 a 1
    carrito = disminuirItem(carrito, 1)

    expect(carrito[0].cantidad).toBe(1)

    // Disminuir nuevamente y eliminar al llegar a 0
    carrito = disminuirItem(carrito, 1)

    expect(carrito.length).toBe(1)
    expect(carrito[0].id).toBe(2)

    // Quitar producto directamente
    carrito = quitarItem(carrito, 2)

    expect(carrito).toEqual([])

    // Contar cantidades
    const carritoCantidades = [
      { id: 1, precio: 20000, cantidad: 2 },
      { id: 2, precio: 45000, cantidad: 3 }
    ]

    expect(contarItems(carritoCantidades)).toBe(5)
  })


  it('11. calcula el total desde un localStorage simulado y maneja carrito ausente, error de lectura y guardado', () => {

    const guardado = [
      { id: 1, precio: 20000, cantidad: 2 },
      { id: 2, precio: 45000, cantidad: 1 }
    ]

    // Simular localStorage con información guardada
    const getItem = spyOn(
      Storage.prototype,
      'getItem'
    ).and.returnValue(JSON.stringify(guardado))

    expect(
      calcularTotal(leerCarrito())
    ).toBe(85000)

    expect(getItem).toHaveBeenCalledWith('tech_carrito')

    // Probar el camino cuando NO existe información
    getItem.and.returnValue(null)

    expect(leerCarrito()).toEqual([])

    // Probar el camino cuando localStorage falla
    getItem.and.throwError('Error de lectura')

    expect(leerCarrito()).toEqual([])

    // Probar guardar en localStorage
    const setItem = spyOn(
      Storage.prototype,
      'setItem'
    )

    const datos = {
      nombre: 'Mouse Gamer',
      cantidad: 2
    }

    guardar('clave_prueba', datos)

    expect(setItem).toHaveBeenCalledWith(
      'clave_prueba',
      JSON.stringify(datos)
    )
  })

})