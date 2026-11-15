import { Link, useParams } from 'react-router-dom'
import { collections, filterProducts } from '../data/products'
import Photo from '../components/Photo'
import ProductCard from '../components/ProductCard'

export default function Collections() {
  const { slug } = useParams()
  const current = collections.find((c) => c.slug === slug)

  if (slug && !current) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="font-display uppercase text-3xl sm:text-4xl">Collection not found</h1>
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
        <section className="relative min-h-[40vh] bg-pure-black text-pure-white">
          <Photo src={current.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-60" />
          <div className="wrap relative flex min-h-[40vh] items-end py-12">
            <div>
              <p className="text-xs uppercase tracking-[0.24em]">{current.tagline}</p>
              <h1 className="mt-2 font-display uppercase text-4xl sm:text-5xl tracking-tight">{current.name}</h1>
            </div>
          </div>
        </section>
        <div className="wrap py-12">
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
    <div className="wrap py-12">
      <h1 className="font-display uppercase text-3xl sm:text-4xl tracking-tight">Collections</h1>
      <p className="mt-3 max-w-xl text-sm text-neutral-600">
        Monthly drops, everyday essentials, and limited-time offers — all made in small runs and checked before they ship.
      </p>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {collections.map((c) => (
          <Link key={c.slug} to={`/collections/${c.slug}`} className="group relative min-h-[320px] overflow-hidden bg-pure-black">
            <Photo
              src={c.image}
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-105"
            />
            <div className="relative flex h-full min-h-[320px] flex-col justify-end p-6 text-pure-white">
              <h2 className="font-display uppercase text-2xl sm:text-3xl tracking-tight">{c.name}</h2>
              <p className="mt-1 text-sm">{c.tagline}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
