import { leer, guardar } from '../data/almacen'

describe('Funciones de almacenamiento', () => {

  it('leer devuelve el valor por defecto si localStorage falla', () => {
    spyOn(Storage.prototype, 'getItem').and.throwError('Error de lectura')

    const resultado = leer('clave_prueba', [])

    expect(resultado).toEqual([])
  })

  it('leer devuelve el valor por defecto cuando no existe información guardada', () => {
    spyOn(Storage.prototype, 'getItem').and.returnValue(null)

    const resultado = leer('clave_inexistente', [])

    expect(resultado).toEqual([])
  })

  it('guardar almacena el valor convertido a JSON', () => {
    const setItem = spyOn(Storage.prototype, 'setItem')

    const valor = {
      nombre: 'Mouse Gamer',
      cantidad: 2,
    }

    guardar('clave_prueba', valor)

    expect(setItem).toHaveBeenCalledWith(
      'clave_prueba',
      JSON.stringify(valor)
    )
  })

})