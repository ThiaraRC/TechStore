import {
  listarProductos,
  obtenerProducto,
  productosCriticos,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} from './productos'
import { validarProducto } from '../utils/validaciones'

const CLAVE = 'tech_productos'

describe('Productos - operaciones CRUD', () => {
  beforeEach(() => {
    localStorage.removeItem(CLAVE)
  })

  afterEach(() => {
    localStorage.removeItem(CLAVE)
  })

  it('lista los ocho productos iniciales si no hay datos guardados', () => {
    const productos = listarProductos()
    expect(productos.length).toBe(8)
    expect(productos[0].nombre).toBe('Mouse Gamer RGB')
  })

  it('busca un producto por ID, acepta un ID de texto y maneja IDs inexistentes', () => {
    expect(obtenerProducto('2').nombre).toBe('Teclado Mecánico')
    expect(obtenerProducto(999)).toBeUndefined()
  })

  it('identifica los productos bajo el stock crítico o exactamente en el límite', () => {
    localStorage.setItem(CLAVE, JSON.stringify([
      { id: 1, stock: 2, stockCritico: 5 },
      { id: 2, stock: 5, stockCritico: 5 },
      { id: 3, stock: 10, stockCritico: 5 },
    ]))

    expect(productosCriticos().map((producto) => producto.id)).toEqual([1, 2])
  })

  it('crea un producto con un ID nuevo y lo guarda', () => {
    const nuevo = crearProducto({ codigo: 'PRO009', nombre: 'Cámara web', stock: 4 })
    expect(nuevo.id).toBe(9)
    expect(obtenerProducto(9).nombre).toBe('Cámara web')
    expect(listarProductos().length).toBe(9)
    
    // Comprobar las validaciones del producto
    const productoValido = {
      codigo: 'PRO009',
      nombre: 'Cámara web',
      descripcion: 'Cámara para computador',
      precio: 10000,
      stock: 4,
      stockCritico: 2,
      categoria: 'Accesorios'
    }

    // Producto correcto
    expect(validarProducto(productoValido)).toEqual({})

    // Campos obligatorios vacíos
    const vacios = validarProducto({})
    expect(vacios.codigo).toBeDefined()
    expect(vacios.nombre).toBeDefined()
    expect(vacios.precio).toBeDefined()
    expect(vacios.stock).toBeDefined()
    expect(vacios.categoria).toBeDefined()

    // Datos que no cumplen las reglas
    const errores = validarProducto({
      ...productoValido,
      codigo: 'AB',
      nombre: 'A'.repeat(101),
      descripcion: 'B'.repeat(501),
      precio: -100,
      stock: -2,
      stockCritico: -1
    })

    expect(errores.codigo).toBeDefined()
    expect(errores.nombre).toBeDefined()
    expect(errores.descripcion).toBeDefined()
    expect(errores.precio).toBeDefined()
    expect(errores.stock).toBeDefined()
    expect(errores.stockCritico).toBeDefined()
    // Stock con decimales
    const decimales = validarProducto({
      ...productoValido,
      stock: 2.5,
      stockCritico: 1.5
    })

    expect(decimales.stock).toBeDefined()
    expect(decimales.stockCritico).toBeDefined()

  })

  it('crea el primer producto con ID 1 si la lista está vacía', () => {
    localStorage.setItem(CLAVE, JSON.stringify([]))
    expect(crearProducto({ nombre: 'Primer producto' }).id).toBe(1)
  })

  it('actualiza solo el producto indicado y mantiene los demás', () => {
    actualizarProducto('1', { nombre: 'Mouse actualizado', precio: 25000 })
    expect(obtenerProducto(1).nombre).toBe('Mouse actualizado')
    expect(obtenerProducto(1).precio).toBe(25000)
    expect(obtenerProducto(2).nombre).toBe('Teclado Mecánico')
  })

  it('no cambia productos al intentar actualizar un ID inexistente', () => {
    const originales = listarProductos()
    actualizarProducto(999, { nombre: 'Inexistente' })
    expect(listarProductos()).toEqual(originales)
  })

  it('elimina el producto indicado sin borrar los restantes', () => {
    eliminarProducto('1')
    expect(obtenerProducto(1)).toBeUndefined()
    expect(listarProductos().length).toBe(7)
    expect(obtenerProducto(2).nombre).toBe('Teclado Mecánico')
  })

  it('deja intacta la lista cuando se elimina un ID inexistente', () => {
    const originales = listarProductos()
    eliminarProducto(999)
    expect(listarProductos()).toEqual(originales)
  })
})
