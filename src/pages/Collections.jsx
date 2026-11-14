import { Link, useParams } from 'react-router-dom'
import { collections, filterProducts } from '../data/products'
import ProductCard from '../components/ProductCard'

export default function Collections() {
  const { slug } = useParams()
  const current = collections.find((c) => c.slug === slug)

  if (slug && !current) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="font-display text-5xl">Collection not found</h1>
        <Link to="/collections" className="mt-6 inline-block underline">
          All collections
        </Link>
      </div>
    )
  }

  if (current) {
    const list = filterProducts({ collection: current.slug })
    const saleList = current.slug === 'sale' ? filterProducts({}).filter((p) => p.sale) : list
    const shown = current.slug === 'sale' ? saleList : list

    return (
      <div>
        <section className="relative min-h-[40vh] bg-black text-white">
          <img src={current.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-60" />
          <div className="relative mx-auto flex min-h-[40vh] max-w-7xl items-end px-4 py-12 sm:px-6 lg:px-8">
            <div>
              <p className="text-xs uppercase tracking-[0.24em]">{current.tagline}</p>
              <h1 className="mt-2 font-display text-6xl tracking-wide">{current.name}</h1>
            </div>
          </div>
        </section>
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {shown.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-display text-5xl tracking-wide">Collections</h1>
      <p className="mt-3 max-w-xl text-sm text-neutral-600">
        Weekly drops, premium thrift, and limited-time cuts — all quality-checked before they hit the rack.
      </p>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {collections.map((c) => (
          <Link key={c.slug} to={`/collections/${c.slug}`} className="group relative min-h-[320px] overflow-hidden bg-black">
            <img
              src={c.image}
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-105"
            />
            <div className="relative flex h-full min-h-[320px] flex-col justify-end p-6 text-white">
              <h2 className="font-display text-4xl tracking-wide">{c.name}</h2>
              <p className="mt-1 text-sm">{c.tagline}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
