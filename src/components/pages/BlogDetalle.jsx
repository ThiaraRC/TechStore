import { Link, useParams } from 'react-router-dom'
import useClaseBody from '../../hooks/useClaseBody'
import { obtenerBlog } from '../../data/blogs'
import ProductImage from '../atoms/ProductImage'

export default function BlogDetalle() {
  useClaseBody('detalle-blog')
  const { id } = useParams()
  const blog = obtenerBlog(id)

  if (!blog) {
    return (
      <section>
        <h2>Artículo no encontrado</h2>
        <p>El artículo que buscas no existe.</p>
        <Link to="/blog">Volver al Blog</Link>
      </section>
    )
  }

  return (
    <section>
      <h2>{blog.titulo}</h2>
      <ProductImage src={blog.imagen} alt={blog.titulo} />
      {blog.parrafos.map((texto) => (
        <p key={texto}>{texto}</p>
      ))}
      <Link to="/blog">Volver al Blog</Link>
    </section>
  )
}
