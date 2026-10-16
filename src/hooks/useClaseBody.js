import { useEffect } from 'react'

// Los estilos de TechStore (estilos.css) usan clases en <body>, como body.inicio o .pagina-blog.
// Este hook pone esa clase mientras la página está abierta y la quita al salir.
export default function useClaseBody(clase) {
  useEffect(() => {
    document.body.classList.add(clase)
    return () => document.body.classList.remove(clase)
  }, [clase])
}
