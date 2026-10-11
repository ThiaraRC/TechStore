import { leer } from '../data/almacen'

export const leerCarrito = () => leer('tech_carrito', [])

export function agregarItem(items, producto) {
  const existe = items.find((i) => i.id === producto.id)
  const precio = producto.oferta ? producto.precioOferta : producto.precio
  if (existe) {
    return items.map((i) => (i.id === producto.id ? { ...i, cantidad: i.cantidad + 1 } : i))
  }
  return [...items, { id: producto.id, nombre: producto.nombre, imagen: producto.imagen, precio, cantidad: 1 }]
}

export const aumentarItem = (items, id) =>
  items.map((i) => (i.id === id ? { ...i, cantidad: i.cantidad + 1 } : i))

export const disminuirItem = (items, id) =>
  items.map((i) => (i.id === id ? { ...i, cantidad: i.cantidad - 1 } : i)).filter((i) => i.cantidad > 0)

export const quitarItem = (items, id) => items.filter((i) => i.id !== id)

export const calcularTotal = (items) => items.reduce((total, i) => total + i.precio * i.cantidad, 0)

export const contarItems = (items) => items.reduce((total, i) => total + i.cantidad, 0)