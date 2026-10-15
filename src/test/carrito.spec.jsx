import {
  agregarItem,
  aumentarItem,
  disminuirItem,
  quitarItem,
  calcularTotal,
  contarItems,
} from '../utils/carrito'

describe('Funciones del carrito', () => {

  const mouse = {
    id: 1,
    nombre: 'Mouse Gamer RGB',
    imagen: '/img/mouse.jpg',
    precio: 20000,
    oferta: false,
  }

  const tecladoOferta = {
    id: 2,
    nombre: 'Teclado Mecánico',
    imagen: '/img/teclado.jpg',
    precio: 50000,
    oferta: true,
    precioOferta: 45000,
  }

  it('agrega un producto nuevo al carrito', () => {
    const resultado = agregarItem([], mouse)

    expect(resultado.length).toBe(1)
    expect(resultado[0].id).toBe(1)
    expect(resultado[0].cantidad).toBe(1)
    expect(resultado[0].precio).toBe(20000)
  })

  it('usa el precio de oferta cuando el producto está en oferta', () => {
    const resultado = agregarItem([], tecladoOferta)

    expect(resultado[0].precio).toBe(45000)
  })

  it('aumenta la cantidad si el producto ya existe', () => {
    const items = [
      {
        id: 1,
        nombre: 'Mouse Gamer RGB',
        imagen: '/img/mouse.jpg',
        precio: 20000,
        cantidad: 1,
      },
      {
        id: 3,
        nombre: 'Audífonos',
        imagen: '/img/audifonos.jpg',
        precio: 35000,
        cantidad: 1,
      },
    ]

    const resultado = agregarItem(items, mouse)

    expect(resultado[0].cantidad).toBe(2)
    expect(resultado[1].cantidad).toBe(1)
  })

  it('aumentarItem aumenta solo el producto indicado', () => {
    const items = [
      { id: 1, precio: 20000, cantidad: 1 },
      { id: 2, precio: 45000, cantidad: 2 },
    ]

    const resultado = aumentarItem(items, 1)

    expect(resultado[0].cantidad).toBe(2)
    expect(resultado[1].cantidad).toBe(2)
  })

  it('disminuirItem disminuye la cantidad cuando es mayor que uno', () => {
    const items = [
      { id: 1, precio: 20000, cantidad: 3 },
      { id: 2, precio: 45000, cantidad: 1 },
    ]

    const resultado = disminuirItem(items, 1)

    expect(resultado[0].cantidad).toBe(2)
    expect(resultado[1].cantidad).toBe(1)
  })

  it('disminuirItem elimina el producto cuando la cantidad llega a cero', () => {
    const items = [
      { id: 1, precio: 20000, cantidad: 1 },
      { id: 2, precio: 45000, cantidad: 1 },
    ]

    const resultado = disminuirItem(items, 1)

    expect(resultado.length).toBe(1)
    expect(resultado[0].id).toBe(2)
  })

  it('quitarItem elimina solamente el producto indicado', () => {
    const items = [
      { id: 1, precio: 20000, cantidad: 1 },
      { id: 2, precio: 45000, cantidad: 1 },
    ]

    const resultado = quitarItem(items, 1)

    expect(resultado.length).toBe(1)
    expect(resultado[0].id).toBe(2)
  })

  it('calcularTotal suma precio por cantidad de todos los productos', () => {
    const items = [
      { id: 1, precio: 20000, cantidad: 2 },
      { id: 2, precio: 45000, cantidad: 1 },
    ]

    expect(calcularTotal(items)).toBe(85000)
  })

  it('contarItems suma todas las cantidades del carrito', () => {
    const items = [
      { id: 1, precio: 20000, cantidad: 2 },
      { id: 2, precio: 45000, cantidad: 3 },
    ]

    expect(contarItems(items)).toBe(5)
  })

})