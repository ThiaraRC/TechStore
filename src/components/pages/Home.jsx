import { useNavigate } from 'react-router-dom'
import useClaseBody from '../../hooks/useClaseBody'
import { listarProductos } from '../../data/productos'
import { useCarrito } from '../../context/CarritoContext'
import ProductCard from '../molecules/ProductCard'
import Button from '../atoms/Button'
import HomeSection from '../organisms/HomeSection'

export default function Home() {
  useClaseBody('inicio')
  const navigate = useNavigate()
  const { agregar } = useCarrito()
  const destacados = listarProductos().slice(0, 4)

  return (
    <>
      <section className="portada-home">
        <h2>Bienvenido a Tech Store</h2>
        <p>Encuentra productos tecnológicos de calidad para tu hogar y trabajo.</p>
        <Button etiqueta="Ver productos" onClick={() => navigate('/productos')} />
        <img src="/img/inicio-tech.jpeg" alt="Tecnología Tech Store" className="imagen-portada" />
      </section>

      <HomeSection className="productos-destacados" titulo="Productos destacados">
        {destacados.map((p) => (
          <ProductCard key={p.id} producto={p} onAgregar={agregar} />
        ))}
      </HomeSection>

      <HomeSection
        className="seccion-video"
        titulo="Tecnología en acción"
        descripcion="Descubre productos tecnológicos diseñados para mejorar tu experiencia de entretenimiento y trabajo."
      >
        <video className="video-inicio" controls>
          <source src="/video/inicio-tech.mp4" type="video/mp4" />
          Tu navegador no soporta la reproducción de video.
        </video>
      </HomeSection>
    </>
  )
}
