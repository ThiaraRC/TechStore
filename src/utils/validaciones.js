export function validarProducto(datos) {
  const e = {}
  const codigo = String(datos.codigo ?? '').trim()
  const nombre = String(datos.nombre ?? '').trim()
  const descripcion = String(datos.descripcion ?? '').trim()
  const precio = String(datos.precio ?? '')
  const stock = String(datos.stock ?? '')
  const stockCritico = String(datos.stockCritico ?? '')

  if (codigo === '') e.codigo = 'Debes ingresar el código del producto.'
  else if (codigo.length < 3) e.codigo = 'El código debe tener al menos 3 caracteres.'

  if (nombre === '') e.nombre = 'Debes ingresar el nombre del producto.'
  else if (nombre.length > 100) e.nombre = 'El nombre no puede superar los 100 caracteres.'

  if (descripcion.length > 500) e.descripcion = 'La descripción no puede superar los 500 caracteres.'

  if (precio === '') e.precio = 'Debes ingresar el precio del producto.'
  else if (Number(precio) < 0) e.precio = 'El precio no puede ser menor que 0.'

  if (stock === '') e.stock = 'Debes ingresar el stock del producto.'
  else if (Number(stock) < 0) e.stock = 'El stock no puede ser menor que 0.'
  else if (!Number.isInteger(Number(stock))) e.stock = 'El stock debe ser un número entero.'

  if (stockCritico !== '') {
    if (Number(stockCritico) < 0) e.stockCritico = 'El stock crítico no puede ser menor que 0.'
    else if (!Number.isInteger(Number(stockCritico)))
      e.stockCritico = 'El stock crítico debe ser un número entero.'
  }

  if (!datos.categoria) e.categoria = 'Debes seleccionar una categoría.'
  return e
}


export function validarRegistro(datos) {
  const errores = {}
  const run = datos.run.trim().toUpperCase()
  const correo = datos.correo.trim().toLowerCase()

  if (!datos.nombre.trim()) {
    errores.nombre = 'Debes ingresar tu nombre.'
  } else if (datos.nombre.trim().length > 50) {
    errores.nombre = 'El nombre no puede superar los 50 caracteres.'
  }

  if (!datos.apellido.trim()) {
    errores.apellido = 'Debes ingresar tu apellido.'
  } else if (datos.apellido.trim().length > 100) {
    errores.apellido = 'El apellido no puede superar los 100 caracteres.'
  }

  if (!run) {
    errores.run = 'Debes ingresar tu RUN.'
  } else if (run.length < 7 || run.length > 9) {
    errores.run = 'El RUN debe tener entre 7 y 9 caracteres.'
  } else if (!/^[0-9]{6,8}[0-9K]$/.test(run)) {
    errores.run = 'Ingresa el RUN sin puntos ni guion.'
  } else if (!validarRun(run)) {
    errores.run = 'El RUN ingresado no es válido.'
  }


if (!datos.fechaNacimiento) {
  errores.fechaNacimiento = 'Debes ingresar tu fecha de nacimiento.'
} else {
  const nacimiento = new Date(datos.fechaNacimiento + 'T00:00:00')
  const hoy = new Date()

  let edad = hoy.getFullYear() - nacimiento.getFullYear()

  if (
    hoy.getMonth() < nacimiento.getMonth() ||
    (hoy.getMonth() === nacimiento.getMonth() &&
      hoy.getDate() < nacimiento.getDate())
  ) {
    edad--
  }

  if (isNaN(nacimiento.getTime()) || nacimiento > hoy) {
    errores.fechaNacimiento = 'Ingresa una fecha válida.'
  } else if (edad < 18) {
    errores.fechaNacimiento = 'Debes ser mayor de 18 años para registrarte.'
  }
}


  if (!datos.direccion.trim()) {
    errores.direccion = 'Debes ingresar tu dirección.'
  } else if (datos.direccion.trim().length > 300) {
    errores.direccion = 'La dirección no puede superar los 300 caracteres.'
  }

  if (!datos.region) {
    errores.region = 'Debes seleccionar tu región.'
  }

  if (!datos.comuna) {
    errores.comuna = 'Debes seleccionar tu comuna.'
  }

  if (!correo) {
    errores.correo = 'Debes ingresar tu correo.'
  } else if (!correo.includes('@') || !correo.includes('.')) {
    errores.correo = 'Correo inválido.'
  } else if (correo.length > 100) {
    errores.correo = 'El correo no puede superar los 100 caracteres.'
  } else if (
    !correo.endsWith('@duoc.cl') &&
    !correo.endsWith('@profesor.duoc.cl') &&
    !correo.endsWith('@gmail.com')
  ) {
    errores.correo = 'Correo no permitido.'
  }

  if (!datos.password) {
    errores.password = 'Debes crear una contraseña.'
  } else if (datos.password.length < 4 || datos.password.length > 10) {
    errores.password = 'La contraseña debe tener entre 4 y 10 caracteres.'
  }

  if (!datos.confirmarPassword) {
    errores.confirmarPassword = 'Debes confirmar tu contraseña.'
  } else if (datos.password !== datos.confirmarPassword) {
    errores.confirmarPassword = 'Las contraseñas no coinciden.'
  }

  return errores
}


export function validarLogin(datos) {
  const errores = {}

  if (!datos.correo.trim()) {
  errores.correo = 'Debes ingresar tu correo.'
} else if (!datos.correo.includes('@')) {
  errores.correo = 'Correo inválido.'
} else if (
  !datos.correo.endsWith('@duoc.cl') &&
  !datos.correo.endsWith('@profesor.duoc.cl') &&
  !datos.correo.endsWith('@gmail.com')
) {
  errores.correo = 'Correo no permitido.'
} else if (datos.correo.length > 100) {
  errores.correo = 'El correo no puede superar los 100 caracteres.'
}

  if (!datos.password) {
    errores.password = 'Debes ingresar tu contraseña.'
  }

console.log('Errores del registro:', errores)
return errores
}


export function validarRun(run) {
  const cuerpo = run.slice(0, -1)
  const digitoIngresado = run.slice(-1)

  let suma = 0
  let multiplicador = 2

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma = suma + Number(cuerpo[i]) * multiplicador
    multiplicador++

    if (multiplicador > 7) {
      multiplicador = 2
    }
  }

  const resto = 11 - (suma % 11)

  let digitoCorrecto

  if (resto === 11) {
    digitoCorrecto = '0'
  } else if (resto === 10) {
    digitoCorrecto = 'K'
  } else {
    digitoCorrecto = resto.toString()
  }

  return digitoIngresado === digitoCorrecto
}


export function validarContacto(datos) {
  const errores = {}

  const nombre = datos.nombre.trim()
  const correo = datos.correo.trim().toLowerCase()
  const mensaje = datos.mensaje.trim()

  if (nombre === '') {
    errores.nombre = 'Debes ingresar tu nombre.'
  } else if (nombre.length > 100) {
    errores.nombre = 'El nombre no puede superar los 100 caracteres.'
  }

  if (correo === '') {
    errores.correo = 'Debes ingresar tu correo.'
  } else if (
    !correo.includes('@') ||
    !correo.includes('.')
  ) {
    errores.correo = 'Ingresa un correo válido.'
  } else if (correo.length > 100) {
    errores.correo = 'El correo no puede superar los 100 caracteres.'
  } else if (
    !correo.endsWith('@gmail.com') &&
    !correo.endsWith('@duoc.cl') &&
    !correo.endsWith('@profesor.duoc.cl')
  ) {
    errores.correo = 'El dominio del correo no está permitido.'
  }

  if (mensaje === '') {
    errores.mensaje = 'Debes escribir un mensaje.'
  } else if (mensaje.length > 500) {
    errores.mensaje = 'El mensaje no puede superar los 500 caracteres.'
  }

  return errores
}
