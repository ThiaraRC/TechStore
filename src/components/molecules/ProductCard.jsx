import { Link } from 'react-router-dom'
import ProductImage from '../atoms/ProductImage'
import Price from '../atoms/Price'
import Button from '../atoms/Button'

export default function ProductCard({ producto, onAgregar }) {
  return (
    <article>
      <ProductImage src={producto.imagen} alt={producto.nombre} />
      <h3>{producto.nombre}</h3>
      <p>{producto.descripcion}</p>
      <Price
        valor={producto.oferta ? producto.precioOferta : producto.precio}
        original={producto.oferta ? producto.precio : null}
      />
      <Link to={'/productos/' + producto.id}>Ver detalle</Link>
      <Button etiqueta="Agregar al carrito" onClick={() => onAgregar(producto)} />
    </article>
  )
}