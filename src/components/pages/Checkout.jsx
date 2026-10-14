import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCarrito } from '../../context/CarritoContext';
import { useAuth } from '../../context/AuthContext';
import { crearOrden } from '../../data/ordenes';
import Price from '../atoms/Price';

export default function Checkout() {
  const navigate = useNavigate();

  const {
    items,
    total,
    vaciar
  } = useCarrito();

  const { usuario } = useAuth();

  const [form, setForm] = useState({
    nombre: usuario?.nombre || '',
    apellidos: usuario?.apellido || '',
    correo: usuario?.correo || '',
    calle: '',
    departamento: '',
    region: '',
    comuna: '',
    indicaciones: ''
  });

  const cambiar = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const pagar = (e) => {
    e.preventDefault();

    if (
      !form.nombre ||
      !form.apellidos ||
      !form.correo ||
      !form.calle ||
      !form.region ||
      !form.comuna ||
      total <= 0
    ) {
      navigate('/pago-error');
      return;
    }

    const nuevaOrden = crearOrden({
      cliente: {
        nombre: form.nombre,
        apellidos: form.apellidos,
        correo: form.correo
      },

      direccion: {
        calle: form.calle,
        departamento: form.departamento,
        region: form.region,
        comuna: form.comuna,
        indicaciones: form.indicaciones
      },

      items,
      total
    });

    vaciar();

    navigate(`/compra-exitosa/${nuevaOrden.id}`);
  };

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

        {/* DATOS DE ENTREGA */}
        <div className="col-12 col-lg-7">

          <div className="checkout-tarjeta">

            <div className="checkout-titulo-seccion">
              <div className="checkout-icono">
                📦
              </div>

              <div>
                <h3>Datos de entrega</h3>
                <p>Ingresa la información para recibir tu compra.</p>
              </div>
            </div>

            <form
              className="checkout-formulario"
              onSubmit={pagar}
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
                  />
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
                  />
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
                  />
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
                  />
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

                  <input
                    id="region"
                    name="region"
                    value={form.region}
                    onChange={cambiar}
                    placeholder="Ej: Metropolitana"
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label htmlFor="comuna">
                    Comuna
                  </label>

                  <input
                    id="comuna"
                    name="comuna"
                    value={form.comuna}
                    onChange={cambiar}
                    placeholder="Ej: Independencia"
                  />
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


        {/* RESUMEN DE COMPRA */}
        <div className="col-12 col-lg-5">

          <div className="checkout-resumen">

            <div className="checkout-resumen-titulo">
              <span>🛒</span>
              <h3>Resumen de compra</h3>
            </div>

            <div className="checkout-productos">

              {items.map((item) => (
                <div
                  className="checkout-producto"
                  key={item.id}
                >
                  <div>
                    <strong>{item.nombre}</strong>

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
              <span>Total</span>

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
  );
}