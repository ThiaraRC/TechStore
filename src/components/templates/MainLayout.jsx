import { Outlet } from 'react-router-dom'
import Navbar from '../organisms/Navbar'
import Footer from '../organisms/Footer'
import { useCarrito } from '../../context/CarritoContext'
import { useAuth } from '../../context/AuthContext'

export default function MainLayout() {
  const { cantidad } = useCarrito()
  const { usuario, cerrarSesion } = useAuth()
  return (
    <>
      <Navbar cantidadCarrito={cantidad} usuario={usuario} onCerrarSesion={cerrarSesion} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}