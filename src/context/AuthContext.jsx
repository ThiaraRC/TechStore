import { createContext, useContext, useState } from 'react'
import { leer, guardar } from '../data/almacen'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => leer('tech_sesion', null))

  const iniciarSesion = (datos) => {
    guardar('tech_sesion', datos)
    setUsuario(datos)
  }

  const cerrarSesion = () => {
    localStorage.removeItem('tech_sesion')
    setUsuario(null)
  }

  return (
    <AuthContext.Provider value={{ usuario, iniciarSesion, cerrarSesion }}>
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext)