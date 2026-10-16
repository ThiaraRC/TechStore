import { formatearPrecio } from '../../utils/formato'

export default function Price({ valor, original }) {
  return (
    <p className="precio-producto">
      <span className="precio-etiqueta">Precio:</span>{' '}

      {original ? (
        <s className="precio-original">
          {formatearPrecio(original)}
        </s>
      ) : null}

      <span className="precio-actual">
        {formatearPrecio(valor)}
      </span>
    </p>
  )
}