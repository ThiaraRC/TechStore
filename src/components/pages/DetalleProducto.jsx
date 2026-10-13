import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { obtenerProducto } from '../../data/productos'
import { useCarrito } from '../../context/CarritoContext'
import ProductImage from '../atoms/ProductImage'
import Price from '../atoms/Price'
import Button from '../atoms/Button'

export default function DetalleProducto() {
  const { id } = useParams()
  const { agregar } = useCarrito()
  const [cantidad, setCantidad] = useState(1)
  const [aviso, setAviso] = useState('')

  const producto = obtenerProducto(id)

  if (!producto) {
    return (
      <section>
        <h2>Producto no encontrado</h2>
        <p>El producto que buscas no existe.</p>
        <Link to="/productos">Volver al catálogo</Link>
      </section>
    )
  }

  const tieneOferta = producto.oferta && producto.precioOferta > 0
  const precioFinal = tieneOferta ? producto.precioOferta : producto.precio
  const agotado = producto.stock <= 0
  const pocasUnidades = !agotado && producto.stock <= producto.stockCritico

  const cambiar = (delta) => {
    setCantidad((actual) => Math.min(Math.max(1, actual + delta), producto.stock))
  }

  const agregarAlCarrito = () => {
    for (let i = 0; i < cantidad; i++) agregar(producto)
    setAviso('Agregaste ' + cantidad + ' unidad(es) de ' + producto.nombre + ' al carrito.')
  }

  return (
    <section>
      <Link to="/productos">← Volver a productos</Link>

      <div className="row g-4 mt-2 align-items-center">
        <div className="col-12 col-md-5 text-center">
          <ProductImage src={producto.imagen} alt={producto.nombre} />
        </div>

        <div className="col-12 col-md-7">
          <h2>{producto.nombre}</h2>
          <p>
            Código: {producto.codigo} | Categoría: {producto.categoria}
          </p>
          <p>{producto.descripcion}</p>

          <Price valor={precioFinal} original={tieneOferta ? producto.precio : null} />
          {tieneOferta && <p className="text-danger fw-bold">¡Producto en oferta!</p>}

          <p>
            <strong>Stock disponible:</strong> {producto.stock}
          </p>

          {agotado && <p className="text-danger">Producto agotado</p>}
          {pocasUnidades && <p className="text-warning">¡Últimas unidades disponibles!</p>}
          {!agotado && !pocasUnidades && <p className="text-success">Producto disponible</p>}

          {!agotado && (
            <>
              <div className="d-flex align-items-center gap-2 mb-3">
                <Button etiqueta="-" onClick={() => cambiar(-1)} />
                <span>{cantidad}</span>
                <Button etiqueta="+" onClick={() => cambiar(1)} />
              </div>
              <Button etiqueta="Agregar al carrito" onClick={agregarAlCarrito} />
            </>
          )}

          {aviso && <p role="status">{aviso}</p>}
        </div>
      </div>
    </section>
  )
}