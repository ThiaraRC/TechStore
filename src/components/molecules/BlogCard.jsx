import { Link } from 'react-router-dom'
import ProductImage from '../atoms/ProductImage'

export default function BlogCard({ blog }) {
  return (
    <article>
      <ProductImage src={blog.imagen} alt={blog.titulo} />
      <h3>{blog.titulo}</h3>
      <p>{blog.resumen}</p>
      <Link to={'/blog/' + blog.id}>Leer más</Link>
    </article>
  )
}
