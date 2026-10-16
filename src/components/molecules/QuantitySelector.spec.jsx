import { act } from 'react'
import { montar, boton } from '../../test/montar'
import QuantitySelector from './QuantitySelector'

describe('QuantitySelector', () => {
  let vista

  afterEach(() => {
    vista.desmontar()
  })

  it('8. los botones + y - llaman a sus funciones y muestran la cantidad', () => {
    const onAumentar = jasmine.createSpy('onAumentar')
    const onDisminuir = jasmine.createSpy('onDisminuir')

    vista = montar(
      <QuantitySelector
        cantidad={2}
        onAumentar={onAumentar}
        onDisminuir={onDisminuir}
      />
    )

    act(() => {
      boton(vista.contenedor, '+').click()
    })

    act(() => {
      boton(vista.contenedor, '-').click()
    })

    expect(onAumentar).toHaveBeenCalledTimes(1)
    expect(onDisminuir).toHaveBeenCalledTimes(1)
    expect(vista.contenedor.textContent).toContain('2')
  })
})