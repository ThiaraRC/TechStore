export function leer(clave, porDefecto) {
  try {
    const valor = localStorage.getItem(clave)
    return valor ? JSON.parse(valor) : porDefecto
  } catch {
    return porDefecto
  }
}

export function guardar(clave, valor) {
  localStorage.setItem(clave, JSON.stringify(valor))
}