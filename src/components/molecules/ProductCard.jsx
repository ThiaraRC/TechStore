import { Link } from 'react-router-dom'
import ProductImage from '../atoms/ProductImage'
import Price from '../atoms/Price'
import Button from '../atoms/Button'

export default function ProductCard({ producto, onAgregar }) {
  return (
    <article>
      <ProductImage
        src={producto.imagen}
        alt={producto.nombre}
      />

      <h3>{producto.nombre}</h3>

      <p>{producto.descripcion}</p>

      <Price
        valor={producto.oferta ? producto.precioOferta : producto.precio}
        original={producto.oferta ? producto.precio : null}
      />

      <Link to={'/productos/' + producto.id}>
        Ver detalle
      </Link>

      <Button
        etiqueta={
          <span className="home-carrito-boton-contenido">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                d="M4 5h2l1.5 9h10.8l1.7-6H8"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <path
                d="M9 14h9"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              />

              <circle
                cx="10"
                cy="18.5"
                r="1.7"
                fill="currentColor"
              />

              <circle
                cx="17.5"
                cy="18.5"
                r="1.7"
                fill="currentColor"
              />
            </svg>

            <span>Agregar al carrito</span>
          </span>
        }
        onClick={() => onAgregar(producto)}
      />
    </article>
  )
}