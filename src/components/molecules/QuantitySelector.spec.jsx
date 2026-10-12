import { act } from 'react';
import { montar, boton } from '../../test/montar';
import QuantitySelector from './QuantitySelector';

describe('QuantitySelector', () => {
  let vista;

  afterEach(() => {
    vista.desmontar();
  });

  it('8. el botón + llama a onAumentar y muestra la cantidad', () => {
    const onAumentar = jasmine.createSpy('onAumentar');

    vista = montar(
      <QuantitySelector
        cantidad={2}
        onAumentar={onAumentar}
        onDisminuir={() => {}}
      />
    );

    act(() => {
      boton(vista.contenedor, '+').click();
    });

    expect(onAumentar).toHaveBeenCalledTimes(1);
    expect(vista.contenedor.textContent).toContain('2');
  });
});