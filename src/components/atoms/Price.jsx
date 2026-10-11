import { formatearPrecio } from '../../utils/formato'

export default function Price({ valor, original }) {
  return (
    <p>
      Precio:{' '}
      {original ? (
        <>
          <s>{formatearPrecio(original)}</s>{' '}
        </>
      ) : null}
      {formatearPrecio(valor)}
    </p>
  )
}