import { leer, guardar } from './almacen'

const CLAVE = 'tech_usuarios'

const usuariosIniciales = [
  {
    run: '111111111',
    nombre: 'Admin',
    apellido: 'Tech Store',
    correo: 'admin@duoc.cl',
    tipoUsuario: 'administrador'
  },
  {
    run: '222222222',
    nombre: 'Vendedor',
    apellido: 'Tech Store',
    correo: 'vendedor@duoc.cl',
    tipoUsuario: 'vendedor'
  },
  {
    run: '123456785',
    nombre: 'Usuario',
    apellido: 'Ejemplo',
    correo: 'cliente@gmail.com',
    tipoUsuario: 'cliente'
  }
]

export function listarUsuarios() {
  return leer(CLAVE, [])
}


export function inicializarUsuarios() {
  const usuarios = listarUsuarios()

  if (usuarios.length === 0) {
    guardar(CLAVE, usuariosIniciales)
  }
}

export function buscarUsuarioPorCorreo(correo) {
  const usuarios = listarUsuarios()

  return usuarios.find(
    (usuario) => usuario.correo === correo
  )
}


export function registrarUsuario(nuevoUsuario) {
  const usuarios = listarUsuarios()

  const existe = usuarios.find(
    (usuario) =>
      usuario.correo.toLowerCase() === nuevoUsuario.correo.toLowerCase() ||
      usuario.run.toUpperCase() === nuevoUsuario.run.toUpperCase()
  )

  if (existe) {
    return false
  }

  const { password, confirmarPassword, ...datosUsuario } = nuevoUsuario

  usuarios.push({
    ...datosUsuario,
    tipoUsuario: 'cliente'
  })

  guardar(CLAVE, usuarios)
  return true
}


export function editarUsuario(run, datosActualizados) {
  const usuarios = listarUsuarios()

  const usuario = usuarios.find(
    (item) => item.run === run
  )

  if (!usuario) {
    return false
  }

  const correoDuplicado = usuarios.find(
    (item) =>
      item.run !== run &&
      item.correo.toLowerCase() === datosActualizados.correo.toLowerCase()
  )

  if (correoDuplicado) {
    return false
  }

  const usuariosActualizados = usuarios.map((item) => {
    if (item.run === run) {
      return {
        ...item,
        nombre: datosActualizados.nombre,
        apellido: datosActualizados.apellido,
        correo: datosActualizados.correo,
        direccion: datosActualizados.direccion,
        region: datosActualizados.region,
        comuna: datosActualizados.comuna
      }
    }

    return item
  })

  guardar(CLAVE, usuariosActualizados)
  return true
}

export function eliminarUsuario(run) {
  const usuarios = listarUsuarios()

  const usuariosActualizados = usuarios.filter(
    (usuario) => usuario.run !== run
  )

  if (usuariosActualizados.length === usuarios.length) {
    return false
  }

  guardar(CLAVE, usuariosActualizados)
  return true
}


export function crearUsuarioAdmin(nuevoUsuario) {
  const usuarios = listarUsuarios()

  const correo = nuevoUsuario.correo.trim().toLowerCase()
  const run = nuevoUsuario.run.trim().toUpperCase()

  const existe = usuarios.some(
    (usuario) =>
      usuario.correo.toLowerCase() === correo ||
      usuario.run.toUpperCase() === run
  )

  if (existe) {
    return false
  }

  const rolesPermitidos = [
    'cliente',
    'vendedor',
    'administrador'
  ]

  if (!rolesPermitidos.includes(nuevoUsuario.tipoUsuario)) {
    return false
  }

  const {
    password,
    confirmarPassword,
    ...datosUsuario
  } = nuevoUsuario

  usuarios.push({
    ...datosUsuario,
    correo,
    run
  })

  guardar(CLAVE, usuarios)
  return true
}
