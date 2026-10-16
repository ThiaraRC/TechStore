export function validarProducto(datos) {
  const e = {}
  const codigo = String(datos.codigo ?? '').trim()
  const nombre = String(datos.nombre ?? '').trim()
  const descripcion = String(datos.descripcion ?? '').trim()
  const precio = String(datos.precio ?? '')
  const stock = String(datos.stock ?? '')
  const stockCritico = String(datos.stockCritico ?? '')

  if (codigo === '') e.codigo = 'Debes ingresar el código del producto.'
  else if (codigo.length < 3) e.codigo = 'El código debe tener al menos 3 caracteres.'

  if (nombre === '') e.nombre = 'Debes ingresar el nombre del producto.'
  else if (nombre.length > 100) e.nombre = 'El nombre no puede superar los 100 caracteres.'

  if (descripcion.length > 500) e.descripcion = 'La descripción no puede superar los 500 caracteres.'

  if (precio === '') e.precio = 'Debes ingresar el precio del producto.'
  else if (Number(precio) < 0) e.precio = 'El precio no puede ser menor que 0.'

  if (stock === '') e.stock = 'Debes ingresar el stock del producto.'
  else if (Number(stock) < 0) e.stock = 'El stock no puede ser menor que 0.'
  else if (!Number.isInteger(Number(stock))) e.stock = 'El stock debe ser un número entero.'

  if (stockCritico !== '') {
    if (Number(stockCritico) < 0) e.stockCritico = 'El stock crítico no puede ser menor que 0.'
    else if (!Number.isInteger(Number(stockCritico)))
      e.stockCritico = 'El stock crítico debe ser un número entero.'
  }

  if (!datos.categoria) e.categoria = 'Debes seleccionar una categoría.'
  return e
}