import { createContext, useContext, useEffect, useState } from 'react'
import { guardar } from '../data/almacen'
import {
  leerCarrito,
  agregarItem,
  aumentarItem,
  disminuirItem,
  quitarItem,
  calcularTotal,
  contarItems,
} from '../utils/carrito'

const CarritoContext = createContext(null)

export function CarritoProvider({ children }) {
  const [items, setItems] = useState(() => leerCarrito())

  useEffect(() => {
    guardar('tech_carrito', items)
  }, [items])

  const valor = {
    items,
    total: calcularTotal(items),
    cantidad: contarItems(items),
    agregar: (producto) => setItems((actual) => agregarItem(actual, producto)),
    aumentar: (id) => setItems((actual) => aumentarItem(actual, id)),
    disminuir: (id) => setItems((actual) => disminuirItem(actual, id)),
    quitar: (id) => setItems((actual) => quitarItem(actual, id)),
    vaciar: () => setItems([]),
  }

  return <CarritoContext.Provider value={valor}>{children}</CarritoContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCarrito = () => useContext(CarritoContext)