import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { categories, collections, filterProducts } from '../data/products'
import ProductCard from '../components/ProductCard'

export default function Shop() {
  const [params, setParams] = useSearchParams()
  const category = params.get('category') || ''
  const collection = params.get('collection') || ''
  const q = params.get('q') || ''

  const list = useMemo(
    () => filterProducts({ category, collection, q }),
    [category, collection, q],
  )

  const setFilter = (key, value) => {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    setParams(next)
  }

  const title = category
    ? categories.find((c) => c.slug === category)?.name || 'Shop'
    : collection
      ? collections.find((c) => c.slug === collection)?.name || 'Shop'
      : q
        ? `Results for “${q}”`
        : 'All products'

  return (
    <div className="wrap py-12">
      <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">Shop</p>
      <h1 className="mt-2 font-display text-5xl tracking-wide">{title}</h1>
      <p className="mt-3 text-sm text-neutral-500">{list.length} {list.length === 1 ? 'product' : 'products'}</p>

      <div className="mt-8 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => {
            setParams({})
          }}
          className={`border px-3 py-2 text-xs uppercase tracking-wide ${!category && !collection ? 'border-black bg-black text-white' : 'border-neutral-300'}`}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            key={c.slug}
            type="button"
            onClick={() => setFilter('category', category === c.slug ? '' : c.slug)}
            className={`border px-3 py-2 text-xs uppercase tracking-wide ${category === c.slug ? 'border-black bg-black text-white' : 'border-neutral-300'}`}
          >
            {c.name}
          </button>
        ))}
      </div>

      {list.length === 0 ? (
        <p className="py-20 text-center text-neutral-500">No products match that filter.</p>
      ) : (
        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
          {list.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  )
}
