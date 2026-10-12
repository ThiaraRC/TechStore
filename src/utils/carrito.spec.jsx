import {
  disminuirItem,
  calcularTotal,
  leerCarrito
} from './carrito';

describe('Funciones del carrito', () => {

  it('9. disminuir resta 1 y elimina el item cuando llega a 0', () => {
    const carritoConDos = [
      { id: 1, precio: 100, cantidad: 2 }
    ];

    const resultadoUno = disminuirItem(carritoConDos, 1);

    expect(resultadoUno[0].cantidad).toBe(1);

    const carritoConUno = [
      { id: 1, precio: 100, cantidad: 1 }
    ];

    const resultadoDos = disminuirItem(carritoConUno, 1);

    expect(resultadoDos).toEqual([]);
  });

  it('10. calcula el total leyendo el carrito desde localStorage simulado', () => {
    const guardado = [
      { id: 1, precio: 20000, cantidad: 2 },
      { id: 2, precio: 45000, cantidad: 1 }
    ];

    const getItem = spyOn(
      Storage.prototype,
      'getItem'
    ).and.returnValue(JSON.stringify(guardado));

    expect(
      calcularTotal(leerCarrito())
    ).toBe(85000);

    expect(getItem).toHaveBeenCalledWith('tech_carrito');
  });

});