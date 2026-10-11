import { Routes, Route } from 'react-router-dom'
import MainLayout from './components/templates/MainLayout'
import AdminLayout from './components/templates/AdminLayout'
import { CarritoProvider } from './context/CarritoContext'

import Home from './components/pages/Home'
import Productos from './components/pages/Productos'
import DetalleProducto from './components/pages/DetalleProducto'
import Categorias from './components/pages/Categorias'
import Ofertas from './components/pages/Ofertas'
import Nosotros from './components/pages/Nosotros'
import Blog from './components/pages/Blog'
import BlogDetalle from './components/pages/BlogDetalle'
import Contacto from './components/pages/Contacto'
import Login from './components/pages/Login'
import Registro from './components/pages/Registro'
import Carrito from './components/pages/Carrito'
import Checkout from './components/pages/Checkout'
import CompraExitosa from './components/pages/CompraExitosa'
import PagoError from './components/pages/PagoError'

import Dashboard from './components/pages/admin/Dashboard'
import OrdenesAdmin from './components/pages/admin/OrdenesAdmin'
import BoletaAdmin from './components/pages/admin/BoletaAdmin'
import ProductosAdmin from './components/pages/admin/ProductosAdmin'
import NuevoProducto from './components/pages/admin/NuevoProducto'
import EditarProducto from './components/pages/admin/EditarProducto'
import UsuariosAdmin from './components/pages/admin/UsuariosAdmin'
import NuevoUsuario from './components/pages/admin/NuevoUsuario'
import EditarUsuario from './components/pages/admin/EditarUsuario'

export default function App() {
  return (
    <CarritoProvider>
      <Routes>

        {/* RUTAS DE LA TIENDA */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/productos/:id" element={<DetalleProducto />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/ofertas" element={<Ofertas />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetalle />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/compra-exitosa/:id" element={<CompraExitosa />} />
          <Route path="/pago-error" element={<PagoError />} />
        </Route>

        {/* RUTAS DE ADMINISTRACIÓN */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="ordenes" element={<OrdenesAdmin />} />
          <Route path="ordenes/:id" element={<BoletaAdmin />} />
          <Route path="productos" element={<ProductosAdmin />} />
          <Route path="productos/nuevo" element={<NuevoProducto />} />
          <Route path="productos/:id/editar" element={<EditarProducto />} />
          <Route path="usuarios" element={<UsuariosAdmin />} />
          <Route path="usuarios/nuevo" element={<NuevoUsuario />} />
          <Route path="usuarios/:run/editar" element={<EditarUsuario />} />
        </Route>

      </Routes>
    </CarritoProvider>
  )
}