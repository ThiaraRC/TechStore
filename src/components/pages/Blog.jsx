import useClaseBody from '../../hooks/useClaseBody'
import { listarBlogs } from '../../data/blogs'
import BlogCard from '../molecules/BlogCard'

export default function Blog() {
  useClaseBody('pagina-blog')

  return (
    <section>
      <h2>Blog tecnológico</h2>
      {listarBlogs().map((b) => (
        <BlogCard key={b.id} blog={b} />
      ))}
    </section>
  )
}
