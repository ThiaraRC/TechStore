import { useState } from 'react'
import FormField from '../molecules/FormField'
import Button from '../atoms/Button'
import { validarProducto } from '../../utils/validaciones'

const vacio = {
  codigo: '',
  nombre: '',
  descripcion: '',
  precio: '',
  stock: '',
  stockCritico: '',
  categoria: '',
  imagen: '/img/logo.png',
}

export default function ProductoForm({ inicial, categorias, soloLecturaCodigo = false, onGuardar }) {
  const [form, setForm] = useState({ ...vacio, ...inicial })
  const [errores, setErrores] = useState({})

  const cambiar = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const enviar = (e) => {
    e.preventDefault()
    const err = validarProducto(form)
    setErrores(err)
    if (Object.keys(err).length > 0) return
    onGuardar({
      ...form,
      precio: Number(form.precio),
      stock: Number(form.stock),
      stockCritico: form.stockCritico === '' ? 0 : Number(form.stockCritico),
    })
  }

  return (
    <form noValidate onSubmit={enviar}>
      <div className="row">
        <div className="col-12 col-md-6">
          <FormField id="codigo" name="codigo" etiqueta="Código" value={form.codigo} onChange={cambiar} error={errores.codigo} readOnly={soloLecturaCodigo} />
        </div>
        <div className="col-12 col-md-6">
          <FormField id="nombre" name="nombre" etiqueta="Nombre" value={form.nombre} onChange={cambiar} error={errores.nombre} />
        </div>
      </div>

      <FormField id="descripcion" name="descripcion" etiqueta="Descripción" value={form.descripcion} onChange={cambiar} error={errores.descripcion} />

      <div className="row">
        <div className="col-12 col-md-4">
          <FormField id="precio" name="precio" type="number" etiqueta="Precio" value={form.precio} onChange={cambiar} error={errores.precio} />
        </div>
        <div className="col-6 col-md-4">
          <FormField id="stock" name="stock" type="number" etiqueta="Stock" value={form.stock} onChange={cambiar} error={errores.stock} />
        </div>
        <div className="col-6 col-md-4">
          <FormField id="stockCritico" name="stockCritico" type="number" etiqueta="Stock crítico (opcional)" value={form.stockCritico} onChange={cambiar} error={errores.stockCritico} />
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="categoria">Categoría</label>
        <select id="categoria" name="categoria" className="form-select" value={form.categoria} onChange={cambiar}>
          <option value="">Selecciona una categoría</option>
          {categorias.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        {errores.categoria && <div className="invalid-feedback d-block">{errores.categoria}</div>}
      </div>

      <Button tipo="submit" etiqueta="Guardar producto" />
    </form>
  )
}