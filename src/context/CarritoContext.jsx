import { createContext, useContext, useEffect, useState } from 'react'
import { obtenerProducto } from '../data/productos'

const CarritoContext = createContext(null)

export function CarritoProvider({ children }) {

  const [carrito, setCarrito] = useState(() => {
    try {
      const guardado = localStorage.getItem('tech_carrito')
      const datos = guardado ? JSON.parse(guardado) : []

      return Array.isArray(datos) ? datos : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('tech_carrito', JSON.stringify(carrito))
  }, [carrito])

  // AGREGAR PRODUCTO
  function agregarProducto(producto) {

    if (!producto || producto.stock <= 0) return

    setCarrito((actual) => {

      const existente = actual.find(
        (item) => item.id === producto.id
      )

      if (existente) {
        return actual.map((item) =>
          item.id === producto.id
            ? {
                ...item,
                cantidad: Math.min(
                  item.cantidad + 1,
                  producto.stock
                ),
              }
            : item
        )
      }

      return [
        ...actual,
        {
          id: producto.id,
          cantidad: 1,
        },
      ]
    })
  }

  // ELIMINAR PRODUCTO
  function eliminarDelCarrito(id) {
    setCarrito((actual) =>
      actual.filter((item) => item.id !== id)
    )
  }

  // CAMBIAR CANTIDAD
  function cambiarCantidad(id, cantidad) {

    const producto = obtenerProducto(id)

    if (!producto) return

    if (cantidad <= 0) {
      eliminarDelCarrito(id)
      return
    }

    setCarrito((actual) =>
      actual.map((item) =>
        item.id === id
          ? {
              ...item,
              cantidad: Math.min(
                Math.floor(cantidad),
                producto.stock
              ),
            }
          : item
      )
    )
  }

  // OBTENER INFORMACIÓN ACTUALIZADA
  const articulos = carrito
    .map((item) => {

      const producto = obtenerProducto(item.id)

      if (!producto || producto.stock <= 0) return null

      const cantidad = Math.min(
        item.cantidad,
        producto.stock
      )

      const precioUnitario =
        producto.oferta && producto.precioOferta > 0
          ? producto.precioOferta
          : producto.precio

      return {
        ...producto,
        cantidad,
        precioUnitario,
        subtotal: precioUnitario * cantidad,
      }
    })
    .filter(Boolean)

  // CONTADOR DEL CARRITO
  const cantidadCarrito = articulos.reduce(
    (total, item) => total + item.cantidad,
    0
  )

  // TOTAL DE LA COMPRA
  const totalCarrito = articulos.reduce(
    (total, item) => total + item.subtotal,
    0
  )

  return (
    <CarritoContext.Provider
      value={{
        articulos,
        cantidadCarrito,
        totalCarrito,
        agregarProducto,
        eliminarDelCarrito,
        cambiarCantidad,
      }}
    >
      {children}
    </CarritoContext.Provider>
  )
}

export function useCarrito() {
  const contexto = useContext(CarritoContext)

  if (!contexto) {
    throw new Error('useCarrito debe utilizarse dentro de CarritoProvider')
  }

  return contexto
}