import { leer, guardar } from './almacen'

const CLAVE = 'tech_productos'

const semilla = [
  { id: 1, codigo: 'PRO001', nombre: 'Mouse Gamer RGB', descripcion: 'Mouse profesional con iluminación RGB.', precio: 20000, stock: 18, stockCritico: 5, categoria: 'accesorios', imagen: '/img/mouse.jpg', oferta: true, precioOferta: 16000 },
  { id: 2, codigo: 'PRO002', nombre: 'Teclado Mecánico', descripcion: 'Teclado mecánico con iluminación RGB.', precio: 45000, stock: 12, stockCritico: 4, categoria: 'computacion', imagen: '/img/teclado.jpg', oferta: false, precioOferta: 0 },
  { id: 3, codigo: 'PRO003', nombre: 'Audífonos Bluetooth', descripcion: 'Audífonos inalámbricos de alta calidad.', precio: 35000, stock: 25, stockCritico: 6, categoria: 'audio', imagen: '/img/audifonos.jpg', oferta: false, precioOferta: 0 },
  { id: 4, codigo: 'PRO004', nombre: 'Monitor Gamer 27 pulgadas', descripcion: 'Monitor gamer Full HD de 27 pulgadas con 165Hz.', precio: 129990, stock: 8, stockCritico: 3, categoria: 'computacion', imagen: '/img/monitor.jpeg', oferta: false, precioOferta: 0 },
  { id: 5, codigo: 'PRO005', nombre: 'Webcam Full HD', descripcion: 'Webcam Full HD ideal para videollamadas, clases y reuniones online.', precio: 29990, stock: 14, stockCritico: 4, categoria: 'computacion', imagen: '/img/webcam.jpeg', oferta: true, precioOferta: 24990 },
  { id: 6, codigo: 'PRO006', nombre: 'Smartwatch Deportivo', descripcion: 'Reloj inteligente deportivo ideal para actividad física y uso diario.', precio: 59990, stock: 10, stockCritico: 3, categoria: 'accesorios', imagen: '/img/smartwatch.jpeg', oferta: false, precioOferta: 0 },
  { id: 7, codigo: 'PRO007', nombre: 'Mouse Pad RGB', descripcion: 'Mouse pad gamer con iluminación RGB, ideal para escritorio y juegos.', precio: 19990, stock: 30, stockCritico: 8, categoria: 'accesorios', imagen: '/img/mousepad.jpeg', oferta: false, precioOferta: 0 },
  { id: 8, codigo: 'PRO008', nombre: 'Parlante Bluetooth', descripcion: 'Parlante Bluetooth portátil con sonido potente, ideal para música y entretenimiento.', precio: 39990, stock: 16, stockCritico: 5, categoria: 'audio', imagen: '/img/parlante.jpeg', oferta: true, precioOferta: 32990 },
]

// READ
export const listarProductos = () => leer(CLAVE, semilla)

export const obtenerProducto = (id) =>
  listarProductos().find((p) => p.id === Number(id))

export const productosCriticos = () =>
  listarProductos().filter((p) => p.stock <= p.stockCritico)

// CREATE
export function crearProducto(datos) {
  const lista = listarProductos()
  const nuevo = { ...datos, id: Math.max(0, ...lista.map((p) => p.id)) + 1 }
  guardar(CLAVE, [...lista, nuevo])
  return nuevo
}

// UPDATE
export function actualizarProducto(id, cambios) {
  guardar(
    CLAVE,
    listarProductos().map((p) => (p.id === Number(id) ? { ...p, ...cambios } : p)),
  )
}

// DELETE
export function eliminarProducto(id) {
  guardar(CLAVE, listarProductos().filter((p) => p.id !== Number(id)))
}