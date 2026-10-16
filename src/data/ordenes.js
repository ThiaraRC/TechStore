import { leer, guardar } from './almacen';

const CLAVE_ORDENES = 'tech_ordenes';

export function listarOrdenes() {
  return leer(CLAVE_ORDENES, []);
}

export function obtenerOrden(id) {
  return listarOrdenes().find(
    (orden) => orden.id === Number(id)
  );
}

export function crearOrden(datos) {
  const ordenes = listarOrdenes();

  const nuevaOrden = {
    ...datos,
    id: Math.max(0, ...ordenes.map((orden) => orden.id)) + 1,
    fecha: new Date().toLocaleString('es-CL'),
    estado: 'Pagada'
  };

  guardar(CLAVE_ORDENES, [...ordenes, nuevaOrden]);

  return nuevaOrden;
}