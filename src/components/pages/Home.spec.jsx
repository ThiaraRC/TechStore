import { act } from 'react'
import { Routes, Route } from 'react-router-dom'
import { montar } from '../../test/montar'
import { CarritoProvider } from '../../context/CarritoContext'
import Home from './Home'

describe('Home', () => {
  it('muestra la portada y el enlace "Ver productos" lleva al catálogo', () => {
    const { contenedor, desmontar } = montar(
      <CarritoProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<p>Pagina catalogo</p>} />
        </Routes>
      </CarritoProvider>,
    )

    expect(contenedor.querySelector('h1').textContent).toContain('tu día a día')

    const enlace = [...contenedor.querySelectorAll('a')].find((a) =>
      a.textContent.includes('Ver productos'),
    )
    act(() => {
      enlace.click()
    })
    expect(contenedor.textContent).toContain('Pagina catalogo')

    desmontar()
  })
})