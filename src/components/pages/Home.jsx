import { Link } from 'react-router-dom';
import ProductCard from '../molecules/ProductCard';
import { listarProductos } from '../../data/productos';
import { useCarrito } from '../../context/CarritoContext';

export default function Home() {
  const { agregar } = useCarrito();
  const productosDestacados = listarProductos().slice(0, 4);

  return (
    <div className="home-definitivo">

      {/* HERO */}
      <section className="home-definitivo-hero">
        <div className="home-definitivo-hero-texto">
          <span className="home-definitivo-badge">
            BIENVENIDO A TECH STORE
          </span>

          <h1>
            <span className="home-definitivo-titulo-blanco">Tecnología</span>
            <span className="home-definitivo-titulo-blanco">para</span>
            <span className="home-definitivo-titulo-lila">tu día a día</span>
          </h1>

          <p>
            Tecnología moderna, accesible y confiable para el estudio,
            el trabajo y el entretenimiento.
          </p>

          <Link
            to="/productos"
            className="home-definitivo-btn-principal"
          >
            Ver productos <span>→</span>
          </Link>
        </div>

        <div className="home-definitivo-hero-imagen">
          <img
            src="/img/inicio-tech.jpeg"
            alt="Tecnología Tech Store"
          />

          <div className="home-definitivo-hero-mini-card">
            <div className="home-definitivo-mini-icono">🎧</div>

            <div>
              <strong>Tecnología</strong>
              <p>
                que te acompaña
                <br />
                en cada momento
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTOS DESTACADOS */}
      <section className="home-definitivo-productos">
        <div className="home-definitivo-productos-header">
          <div>
            <span className="home-definitivo-etiqueta">
              PRODUCTOS DESTACADOS
            </span>

            <h2>
              Lo más popular en <span>Tech Store</span>
            </h2>
          </div>

          <Link
            to="/productos"
            className="home-definitivo-ver-todos"
          >
            Ver todos los productos <span>→</span>
          </Link>
        </div>

        <div className="home-definitivo-productos-caja">
          <div className="row g-3">
            {productosDestacados.map((producto) => (
              <div
                key={producto.id}
                className="col-12 col-sm-6 col-lg-3"
              >
                <ProductCard
                  producto={producto}
                  onAgregar={agregar}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HISTORIA / VIDEO */}
      <section className="home-definitivo-historia">
        <div className="home-definitivo-historia-texto">
          <span className="home-definitivo-etiqueta-clara">
            NUESTRA HISTORIA
          </span>

          <h2>
            Conoce <span>Tech Store</span>
          </h2>

          <p>
            Descubre quiénes somos, qué nos motiva y cómo trabajamos
            para acercarte tecnología moderna, accesible y confiable.
          </p>

          <div className="home-definitivo-beneficios">
            <div>
              <span className="home-definitivo-beneficio-icono">✓</span>
              <strong>Calidad garantizada</strong>
            </div>

            <div>
              <span className="home-definitivo-beneficio-icono">🚚</span>
              <strong>Compra fácil</strong>
            </div>

            <div>
              <span className="home-definitivo-beneficio-icono">🎧</span>
              <strong>Soporte personalizado</strong>
            </div>
          </div>

          <Link
            to="/nosotros"
            className="home-definitivo-mas"
          >
            Más sobre nosotros <span>→</span>
          </Link>
        </div>

        <div className="home-definitivo-video">
          <video
            controls
            preload="metadata"
          >
            <source
              src="/video/inicio-tech.mp4"
              type="video/mp4"
            />
            Tu navegador no puede reproducir este video.
          </video>
        </div>
      </section>

    </div>
  );
}
