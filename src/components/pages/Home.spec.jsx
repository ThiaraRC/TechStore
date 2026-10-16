import { act } from 'react'
import { Routes, Route } from 'react-router-dom'
import { montar, boton } from '../../test/montar'
import { CarritoProvider } from '../../context/CarritoContext'
import Home from './Home'

describe('Home', () => {
  it('muestra la portada y el botón "Ver productos" lleva al catálogo', () => {
    const { contenedor, desmontar } = montar(
      <CarritoProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<p>Pagina catalogo</p>} />
        </Routes>
      </CarritoProvider>,
    )

    expect(contenedor.querySelector('h2').textContent).toBe('Bienvenido a Tech Store')

    act(() => {
      boton(contenedor, 'Ver productos').click()
    })
    expect(contenedor.textContent).toContain('Pagina catalogo')

    desmontar()
  })
})
