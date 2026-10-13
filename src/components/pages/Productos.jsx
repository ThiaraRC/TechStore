import { useMemo, useState } from 'react'
import { listarProductos } from '../../data/productos'
import ProductCard from '../molecules/ProductCard'
import Input from '../atoms/Input'
import Button from '../atoms/Button'
import { useCarrito } from '../../context/CarritoContext'

export default function Productos() {
  const { agregar } = useCarrito()
  const [productos] = useState(() => listarProductos())
  const [busqueda, setBusqueda] = useState('')
  const [categoria, setCategoria] = useState('todas')

  const categorias = useMemo(() => [...new Set(productos.map((p) => p.categoria))], [productos])

  const visibles = useMemo(
    () =>
      productos.filter((p) => {
        const coincideTexto = p.nombre.toLowerCase().includes(busqueda.trim().toLowerCase())
        const coincideCategoria = categoria === 'todas' || p.categoria === categoria
        return coincideTexto && coincideCategoria
      }),
    [productos, busqueda, categoria],
  )

  const limpiar = () => {
    setBusqueda('')
    setCategoria('todas')
  }

  return (
    <section>
      <h2>Catálogo de productos</h2>

      <div className="row g-2 mb-3">
        <div className="col-12 col-md-6">
          <Input
            id="busqueda"
            type="search"
            placeholder="Buscar producto..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
        <div className="col-8 col-md-4">
          <select
            id="categoria"
            className="form-select"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="todas">Todas las categorías</option>
            {categorias.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className="col-4 col-md-2">
          <Button etiqueta="Limpiar" onClick={limpiar} />
        </div>
      </div>

      <p>{visibles.length} producto(s) encontrados</p>

      {visibles.length === 0 ? (
        <p>No hay productos que coincidan con tu búsqueda.</p>
      ) : (
        visibles.map((p) => <ProductCard key={p.id} producto={p} onAgregar={agregar} />)
      )}
    </section>
  )
}