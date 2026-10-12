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
    <section>
      <h2>Finalizar compra</h2>

      <div className="row g-4">

        <div className="col-md-7">
          <form onSubmit={pagar}>

            <div className="row g-3">

              <div className="col-md-6">
                <label htmlFor="nombre">Nombre</label>

                <input
                  id="nombre"
                  name="nombre"
                  value={form.nombre}
                  onChange={cambiar}
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="apellidos">Apellidos</label>

                <input
                  id="apellidos"
                  name="apellidos"
                  value={form.apellidos}
                  onChange={cambiar}
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="correo">Correo</label>

                <input
                  id="correo"
                  name="correo"
                  type="email"
                  value={form.correo}
                  onChange={cambiar}
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="calle">Calle</label>

                <input
                  id="calle"
                  name="calle"
                  value={form.calle}
                  onChange={cambiar}
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="departamento">
                  Departamento
                </label>

                <input
                  id="departamento"
                  name="departamento"
                  value={form.departamento}
                  onChange={cambiar}
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="region">Región</label>

                <input
                  id="region"
                  name="region"
                  value={form.region}
                  onChange={cambiar}
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="comuna">Comuna</label>

                <input
                  id="comuna"
                  name="comuna"
                  value={form.comuna}
                  onChange={cambiar}
                />
              </div>

              <div className="col-12">
                <label htmlFor="indicaciones">
                  Indicaciones
                </label>

                <textarea
                  id="indicaciones"
                  name="indicaciones"
                  value={form.indicaciones}
                  onChange={cambiar}
                />
              </div>

            </div>

            <button type="submit">
              Pagar
            </button>

          </form>
        </div>

        <div className="col-md-5">
          <h3>Resumen de compra</h3>

          {items.map((item) => (
            <p key={item.id}>
              {item.nombre} x {item.cantidad}
            </p>
          ))}

          <h4>
            Total: <Price valor={total} />
          </h4>
        </div>

      </div>
    </section>
  );
}