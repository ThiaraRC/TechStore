import Label from '../atoms/Label'
import Input from '../atoms/Input'

export default function FormField({ id, etiqueta, error, ...inputProps }) {
  return (
    <div className="mb-3">
      <Label htmlFor={id} texto={etiqueta} />
      <Input id={id} invalido={!!error} {...inputProps} />
      {error && <div className="invalid-feedback d-block">{error}</div>}
    </div>
  )
}