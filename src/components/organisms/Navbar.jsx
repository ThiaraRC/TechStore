import { Link } from 'react-router-dom'
import Logo from '../atoms/Logo'

export default function Navbar({ cantidadCarrito = 0, usuario = null, onCerrarSesion }) {
  return (
    <header>
      <Logo />
      <h1>Tech Store</h1>
      <nav>
        <Link to="/">Inicio</Link>
        <Link to="/productos">Productos</Link>
        <Link to="/categorias">Categorías</Link>
        <Link to="/ofertas">Ofertas</Link>
        <Link to="/nosotros">Nosotros</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/contacto">Contacto</Link>
        {usuario ? (
          <>
            <span className="saludo-sesion">Hola, {usuario.nombre}</span>
            <a
              href="/"
              className="cerrar-sesion"
              onClick={(e) => {
                e.preventDefault()
                onCerrarSesion()
              }}
            >
              Cerrar sesión
            </a>
          </>
        ) : (
          <>
            <Link to="/registro">Registro</Link>
            <Link to="/login">Login</Link>
          </>
        )}
        <Link to="/carrito" className="carrito">
          🛒 Carrito: <span>{cantidadCarrito}</span>
        </Link>
      </nav>
    </header>
  )
}