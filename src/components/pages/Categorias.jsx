import { useState } from 'react'
import { listarProductos } from '../../data/productos'
import { useCarrito } from '../../context/CarritoContext'
import ProductCard from '../molecules/ProductCard'
import Button from '../atoms/Button'

const nombres = { accesorios: 'Accesorios', computacion: 'Computación', audio: 'Audio' }
const nombreCategoria = (c) => nombres[c] || c

export default function Categorias() {
  const productos = listarProductos()
  const categorias = [...new Set(productos.map((p) => p.categoria))]
  const [seleccionada, setSeleccionada] = useState('todas')
  const { agregar } = useCarrito()

  const visibles =
    seleccionada === 'todas' ? productos : productos.filter((p) => p.categoria === seleccionada)

  return (
    <section>
      <h2>Categorías</h2>
      <div>
        <Button etiqueta="Todas" onClick={() => setSeleccionada('todas')} />
        {categorias.map((c) => (
          <Button key={c} etiqueta={nombreCategoria(c)} onClick={() => setSeleccionada(c)} />
        ))}
      </div>
      {visibles.map((p) => (
        <ProductCard key={p.id} producto={p} onAgregar={agregar} />
      ))}
    </section>
  )
}
