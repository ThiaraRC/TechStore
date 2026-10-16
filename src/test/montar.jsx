import { act } from 'react'
import { createRoot } from 'react-dom/client'
import { MemoryRouter } from 'react-router-dom'

globalThis.IS_REACT_ACT_ENVIRONMENT = true

export function montar(ui) {
  const contenedor = document.createElement('div')
  document.body.appendChild(contenedor)
  const root = createRoot(contenedor)
  act(() => {
    root.render(<MemoryRouter>{ui}</MemoryRouter>)
  })
  return {
    contenedor,
    desmontar() {
      act(() => {
        root.unmount()
      })
      contenedor.remove()
    },
  }
}

export function escribir(input, valor) {
  const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set
  act(() => {
    setter.call(input, valor)
    input.dispatchEvent(new Event('input', { bubbles: true }))
  })
}

export const boton = (contenedor, texto) =>
  [...contenedor.querySelectorAll('button')].find((b) => b.textContent.includes(texto))