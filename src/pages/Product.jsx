import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProduct, formatPrice, products } from '../data/products'
import { useCart } from '../context/CartContext'
import ProductCard from '../components/ProductCard'

export default function Product() {
  const { id } = useParams()
  const product = getProduct(id)
  const { addItem } = useCart()
  const [size, setSize] = useState(product?.sizes?.[0] || 'M')

  useEffect(() => {
    if (product?.sizes?.[0]) setSize(product.sizes[0])
  }, [product])

  if (!product) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="font-display text-5xl">Piece not found</h1>
        <Link to="/shop" className="mt-6 inline-block underline">
          Back to shop
        </Link>
      </div>
    )
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <nav className="text-xs uppercase tracking-wide text-neutral-500">
        <Link to="/shop">Shop</Link> / {product.name}
      </nav>
      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <img src={product.image} alt={product.name} className="w-full bg-neutral-100 object-cover" />
        <div>
          <h1 className="font-display text-5xl tracking-wide">{product.name}</h1>
          <p className="mt-3 text-lg tabular-nums">
            {product.originalPrice && (
              <span className="mr-2 text-neutral-400 line-through">{formatPrice(product.originalPrice)}</span>
            )}
            {formatPrice(product.price)}
          </p>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-neutral-600">{product.description}</p>

          <fieldset className="mt-8">
            <legend className="text-xs font-semibold uppercase tracking-[0.16em]">Size</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  className={`h-11 min-w-11 border px-3 text-sm ${size === s ? 'border-black bg-black text-white' : 'border-neutral-300'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </fieldset>

          <button
            type="button"
            onClick={() => addItem(product, size)}
            className="mt-8 w-full max-w-sm bg-black py-3.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white hover:bg-neutral-800"
          >
            Add to cart
          </button>
          <p className="mt-4 text-xs text-neutral-500">Free shipping on orders above ₹1499. Easy 7-day returns.</p>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="mb-8 text-center text-xl font-semibold uppercase tracking-[0.16em]">You may also like</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
