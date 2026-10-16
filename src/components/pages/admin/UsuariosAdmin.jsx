
import { useState } from 'react'
import { Link } from 'react-router-dom'

import {
  listarUsuarios,
  eliminarUsuario
} from '../../../data/usuarios'

import ResumenUsuarios from '../../molecules/ResumenUsuarios'
import TablaUsuarios from '../../organisms/TablaUsuarios'

export default function UsuariosAdmin() {
  const [usuarios, setUsuarios] = useState(() => listarUsuarios())
  const [busqueda, setBusqueda] = useState('')

  const usuariosFiltrados = usuarios.filter((usuario) => {
    const texto = busqueda.toLowerCase()

    return (
      usuario.nombre.toLowerCase().includes(texto) ||
      usuario.apellido.toLowerCase().includes(texto) ||
      usuario.correo.toLowerCase().includes(texto) ||
      usuario.run.includes(texto) ||
      usuario.tipoUsuario.toLowerCase().includes(texto)
    )
  })

  function manejarEliminar(run) {
    const confirmar = window.confirm(
      '¿Estás segura de que quieres eliminar este usuario?'
    )

    if (!confirmar) return

    const eliminado = eliminarUsuario(run)

    if (eliminado) {
      setUsuarios(listarUsuarios())
    }
  }

  return (
    <section
      className="container"
      style={{
        width: '95%',
        maxWidth: '1100px',
        margin: '30px auto',
        padding: '30px',
        backgroundColor: '#f4eef9',
        borderRadius: '25px'
      }}
    >
      <h2 className="text-center">
        Administración de usuarios
      </h2>

      <p className="text-center mb-4">
        Gestiona los usuarios registrados en TechStore.
      </p>

      <ResumenUsuarios usuarios={usuarios} />

      <div className="mt-4">
        <div className="d-flex flex-wrap gap-3 justify-content-between align-items-center mb-3">
          <h3 className="m-0">Usuarios registrados</h3>

          <Link
            to="/admin/usuarios/nuevo"
            className="btn btn-primary"
          >
            + Nuevo usuario
          </Link>
        </div>

        <div className="mb-3">
          <label htmlFor="buscarUsuario" className="form-label">
            Buscar usuario
          </label>

          <input
            id="buscarUsuario"
            type="text"
            className="form-control"
            placeholder="Buscar por nombre, correo, RUN o rol..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>

        <TablaUsuarios
          usuarios={usuariosFiltrados}
          onEliminar={manejarEliminar}
        />
      </div>
    </section>
  )
}
