import { act } from 'react'
import { montar, boton } from '../../test/montar'
import ProductCard from './ProductCard'

describe('ProductCard', () => {
  const producto = {
    id: 1,
    nombre: 'Mouse Gamer RGB',
    descripcion: 'Mouse profesional con iluminación RGB.',
    precio: 20000,
    imagen: '/img/mouse.jpg',
    oferta: false,
    precioOferta: 0,
  }

  let vista

  afterEach(() => {
    vista.desmontar()
  })

  it('muestra el nombre, el precio y la imagen recibidos por props', () => {
    vista = montar(<ProductCard producto={producto} onAgregar={() => {}} />)

    expect(vista.contenedor.textContent).toContain('Mouse Gamer RGB')
    expect(vista.contenedor.textContent).toContain('$20.000')
    expect(vista.contenedor.querySelector('img').getAttribute('src')).toBe('/img/mouse.jpg')
  })

  it('llama a onAgregar con el producto al hacer clic en Agregar al carrito', () => {
    const onAgregar = jasmine.createSpy('onAgregar')
    vista = montar(<ProductCard producto={producto} onAgregar={onAgregar} />)

    act(() => {
      boton(vista.contenedor, 'Agregar').click()
    })

    expect(onAgregar).toHaveBeenCalledOnceWith(producto)
  })

  it('muestra el precio de oferta y el original tachado cuando el producto está en oferta', () => {
    const enOferta = { ...producto, oferta: true, precioOferta: 16000 }
    vista = montar(<ProductCard producto={enOferta} onAgregar={() => {}} />)

    expect(vista.contenedor.textContent).toContain('$16.000')
    expect(vista.contenedor.querySelector('s').textContent).toBe('$20.000')
  })
})