import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCarrito } from '../../context/CarritoContext'
import { useAuth } from '../../context/AuthContext'
import { crearOrden } from '../../data/ordenes'
import { regionesComunas, comunasPorRegion } from '../../data/regiones'
import Price from '../atoms/Price'

export default function Checkout() {
  const navigate = useNavigate()
  const { items, total, vaciar } = useCarrito()
  const { usuario } = useAuth()

  const [form, setForm] = useState({
    nombre: usuario?.nombre || '',
    apellidos: usuario?.apellido || '',
    correo: usuario?.correo || '',
    calle: '',
    departamento: '',
    region: '',
    comuna: '',
    indicaciones: ''
  })

  const [errores, setErrores] = useState({})

  const comunasDisponibles = comunasPorRegion(form.region)

  const cambiar = (e) => {
    const { name, value } = e.target

    setForm((anterior) => ({
      ...anterior,
      [name]: value,
      ...(name === 'region' ? { comuna: '' } : {})
    }))

    setErrores((anterior) => ({
      ...anterior,
      [name]: ''
    }))
  }

  const validar = () => {
    const nuevosErrores = {}

    if (!form.nombre.trim()) {
      nuevosErrores.nombre = 'Ingresa tu nombre.'
    }

    if (!form.apellidos.trim()) {
      nuevosErrores.apellidos = 'Ingresa tus apellidos.'
    }

    if (!form.correo.trim()) {
      nuevosErrores.correo = 'Ingresa tu correo electrónico.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo)) {
      nuevosErrores.correo = 'Ingresa un correo electrónico válido.'
    }

    if (!form.calle.trim()) {
      nuevosErrores.calle = 'Ingresa tu dirección.'
    }

    if (!form.region) {
      nuevosErrores.region = 'Selecciona una región.'
    }

    if (!form.comuna) {
      nuevosErrores.comuna = 'Selecciona una comuna.'
    }

    setErrores(nuevosErrores)

    return Object.keys(nuevosErrores).length === 0
  }

  const pagar = (e) => {
    e.preventDefault()

    const formularioValido = validar()

    // Primero mostramos los errores del formulario
    if (!formularioValido) {
      return
    }

    // Si el formulario está correcto, revisamos el carrito
    if (total <= 0) {
      navigate('/pago-error')
      return
    }

    const nuevaOrden = crearOrden({
      cliente: {
        nombre: form.nombre.trim(),
        apellidos: form.apellidos.trim(),
        correo: form.correo.trim()
      },

      direccion: {
        calle: form.calle.trim(),
        departamento: form.departamento.trim(),
        region: form.region,
        comuna: form.comuna,
        indicaciones: form.indicaciones.trim()
      },

      items,
      total
    })

    vaciar()

    navigate(`/compra-exitosa/${nuevaOrden.id}`)
  }

  return (
    <section className="checkout-contenedor">

      <div className="checkout-encabezado">
        <span>COMPRA SEGURA</span>

        <h2>Finalizar compra</h2>

        <p>
          Completa tus datos de entrega y revisa tu pedido antes de continuar.
        </p>
      </div>

      <div className="row g-4 align-items-start">

        <div className="col-12 col-lg-7">
          <div className="checkout-tarjeta">

            <div className="checkout-titulo-seccion">
              <div className="checkout-icono">📦</div>

              <div>
                <h3>Datos de entrega</h3>
                <p>Ingresa la información para recibir tu compra.</p>
              </div>
            </div>

            <form
              className="checkout-formulario"
              onSubmit={pagar}
              noValidate
            >
              <div className="row g-3">

                <div className="col-12 col-md-6">
                  <label htmlFor="nombre">
                    Nombre
                  </label>

                  <input
                    id="nombre"
                    name="nombre"
                    value={form.nombre}
                    onChange={cambiar}
                    placeholder="Tu nombre"
                    className={errores.nombre ? 'is-invalid' : ''}
                  />

                  {errores.nombre && (
                    <div className="checkout-error">
                      {errores.nombre}
                    </div>
                  )}
                </div>

                <div className="col-12 col-md-6">
                  <label htmlFor="apellidos">
                    Apellidos
                  </label>

                  <input
                    id="apellidos"
                    name="apellidos"
                    value={form.apellidos}
                    onChange={cambiar}
                    placeholder="Tus apellidos"
                    className={errores.apellidos ? 'is-invalid' : ''}
                  />

                  {errores.apellidos && (
                    <div className="checkout-error">
                      {errores.apellidos}
                    </div>
                  )}
                </div>

                <div className="col-12 col-md-6">
                  <label htmlFor="correo">
                    Correo electrónico
                  </label>

                  <input
                    id="correo"
                    name="correo"
                    type="email"
                    value={form.correo}
                    onChange={cambiar}
                    placeholder="correo@ejemplo.cl"
                    className={errores.correo ? 'is-invalid' : ''}
                  />

                  {errores.correo && (
                    <div className="checkout-error">
                      {errores.correo}
                    </div>
                  )}
                </div>

                <div className="col-12 col-md-6">
                  <label htmlFor="calle">
                    Calle
                  </label>

                  <input
                    id="calle"
                    name="calle"
                    value={form.calle}
                    onChange={cambiar}
                    placeholder="Nombre de calle y número"
                    className={errores.calle ? 'is-invalid' : ''}
                  />

                  {errores.calle && (
                    <div className="checkout-error">
                      {errores.calle}
                    </div>
                  )}
                </div>

                <div className="col-12 col-md-6">
                  <label htmlFor="departamento">
                    Departamento
                  </label>

                  <input
                    id="departamento"
                    name="departamento"
                    value={form.departamento}
                    onChange={cambiar}
                    placeholder="Opcional"
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label htmlFor="region">
                    Región
                  </label>

                  <select
                    id="region"
                    name="region"
                    value={form.region}
                    onChange={cambiar}
                    className={errores.region ? 'is-invalid' : ''}
                  >
                    <option value="">
                      Seleccione una región
                    </option>

                    {regionesComunas.map((item) => (
                      <option
                        key={item.region}
                        value={item.region}
                      >
                        {item.region}
                      </option>
                    ))}
                  </select>

                  {errores.region && (
                    <div className="checkout-error">
                      {errores.region}
                    </div>
                  )}
                </div>

                <div className="col-12 col-md-6">
                  <label htmlFor="comuna">
                    Comuna
                  </label>

                  <select
                    id="comuna"
                    name="comuna"
                    value={form.comuna}
                    onChange={cambiar}
                    disabled={!form.region}
                    className={errores.comuna ? 'is-invalid' : ''}
                  >
                    <option value="">
                      {form.region
                        ? 'Seleccione una comuna'
                        : 'Primero seleccione una región'}
                    </option>

                    {comunasDisponibles.map((comuna) => (
                      <option
                        key={comuna}
                        value={comuna}
                      >
                        {comuna}
                      </option>
                    ))}
                  </select>

                  {errores.comuna && (
                    <div className="checkout-error">
                      {errores.comuna}
                    </div>
                  )}
                </div>

                <div className="col-12">
                  <label htmlFor="indicaciones">
                    Indicaciones de entrega
                  </label>

                  <textarea
                    id="indicaciones"
                    name="indicaciones"
                    value={form.indicaciones}
                    onChange={cambiar}
                    placeholder="Ej: llamar al llegar, dejar en conserjería..."
                    rows="4"
                  />
                </div>

              </div>

              <button
                type="submit"
                className="checkout-boton-pagar checkout-boton-movil"
              >
                Finalizar compra
              </button>
            </form>

          </div>
        </div>

        <div className="col-12 col-lg-5">
          <div className="checkout-resumen">

            <div className="checkout-resumen-titulo">
              <span>🛒</span>

              <h3>
                Resumen de compra
              </h3>
            </div>

            <div className="checkout-productos">
              {items.map((item) => (
                <div
                  className="checkout-producto"
                  key={item.id}
                >
                  <div>
                    <strong>
                      {item.nombre}
                    </strong>

                    <span>
                      Cantidad: {item.cantidad}
                    </span>
                  </div>

                  <Price
                    valor={item.precio * item.cantidad}
                  />
                </div>
              ))}
            </div>

            <div className="checkout-linea" />

            <div className="checkout-total">
              <span>
                Total
              </span>

              <strong>
                <Price valor={total} />
              </strong>
            </div>

            <div className="checkout-seguridad">
              🔒 Compra segura y protegida
            </div>

            <button
              type="button"
              className="checkout-boton-pagar checkout-boton-escritorio"
              onClick={pagar}
            >
              Finalizar compra
            </button>

          </div>
        </div>

      </div>

    </section>
  )
}