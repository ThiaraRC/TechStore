
import { Link } from 'react-router-dom'

export default function TablaUsuarios({ usuarios, onEliminar }) {
  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover align-middle">
        <thead>
          <tr>
            <th>RUN</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.run}>
              <td>{usuario.run}</td>
              <td>{usuario.nombre} {usuario.apellido}</td>
              <td>{usuario.correo}</td>
              <td>{usuario.tipoUsuario}</td>

              <td>
                <div className="d-flex gap-2">
                  <Link
                    to={`/admin/usuarios/${usuario.run}/editar`}
                    className="btn btn-sm btn-outline-primary"
                  >
                    Editar
                  </Link>

                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => onEliminar(usuario.run)}
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {usuarios.length === 0 && (
        <p className="text-center mt-3">
          No se encontraron usuarios.
        </p>
      )}
    </div>
  )
}
