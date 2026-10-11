import { Outlet } from 'react-router-dom'
import Navbar from '../organisms/Navbar'
import Footer from '../organisms/Footer'

export default function MainLayout() {
  return (
    <>
      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  )
}