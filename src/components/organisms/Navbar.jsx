import { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../atoms/Logo'

export default function Navbar({
  cantidadCarrito = 0,
  usuario = null,
  onCerrarSesion
}) {
  const [menuAbierto, setMenuAbierto] = useState(false)

  const cerrarMenu = () => {
    setMenuAbierto(false)
  }

  return (
    <header className="navbar-tech">

      <div className="navbar-marca">
        <Logo />
        <h1>Tech Store</h1>
      </div>

      <button
        type="button"
        className="navbar-toggle"
        onClick={() => setMenuAbierto(!menuAbierto)}
        aria-label="Abrir menú"
      >
        ☰
      </button>

      <nav
        className={
          menuAbierto
            ? 'navbar-menu navbar-menu-abierto'
            : 'navbar-menu'
        }
      >

        <Link to="/" onClick={cerrarMenu}>
          Inicio
        </Link>

        <Link to="/productos" onClick={cerrarMenu}>
          Productos
        </Link>

        <Link to="/categorias" onClick={cerrarMenu}>
          Categorías
        </Link>

        <Link to="/ofertas" onClick={cerrarMenu}>
          Ofertas
        </Link>

        <Link to="/nosotros" onClick={cerrarMenu}>
          Nosotros
        </Link>

        <Link to="/blog" onClick={cerrarMenu}>
          Blog
        </Link>

        <Link to="/contacto" onClick={cerrarMenu}>
          Contacto
        </Link>

        {usuario ? (
          <>
            {usuario.tipoUsuario === 'administrador' ? (
              <Link
                to="/admin"
                className="saludo-sesion"
                onClick={cerrarMenu}
              >
                Hola, {usuario.nombre}
              </Link>
            ) : usuario.tipoUsuario === 'vendedor' ? (
              <Link
                to="/admin/productos"
                className="saludo-sesion"
                onClick={cerrarMenu}
              >
                Hola, {usuario.nombre}
              </Link>
            ) : (
              <span className="saludo-sesion">
                Hola, {usuario.nombre}
              </span>
            )}

            <a
              href="/"
              className="cerrar-sesion"
              onClick={(e) => {
                e.preventDefault()

                if (onCerrarSesion) {
                  onCerrarSesion()
                }

                cerrarMenu()
              }}
            >
              Cerrar sesión
            </a>
          </>
        ) : (
          <>
            <Link
              to="/registro"
              onClick={cerrarMenu}
            >
              Registro
            </Link>

            <Link
              to="/login"
              onClick={cerrarMenu}
            >
              Login
            </Link>
          </>
        )}

        <Link
          to="/carrito"
          className="carrito"
          onClick={cerrarMenu}
        >
          🛒 Carrito: <span>{cantidadCarrito}</span>
        </Link>

      </nav>

    </header>
  )
}