import { formatearPrecio } from './formato'

describe('formatearPrecio', () => {
  it('da formato chileno a un precio', () => {
    expect(formatearPrecio(20000)).toBe('$20.000')
  })
})