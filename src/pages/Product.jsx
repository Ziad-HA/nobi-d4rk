
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getProduct, formatPrice, products } from '../data/products'
import { useCart } from '../context/CartContext'
import { FREE_SHIPPING_FROM, RETURN_DAYS } from '../data/brand'
import Photo from '../components/Photo'
import ProductCard from '../components/ProductCard'

export default function Product() {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = getProduct(id)
  const { addItem } = useCart()

  const [size, setSize] = useState(product?.sizes?.[0] || 'M')

  useEffect(() => {
    if (product?.sizes?.[0]) setSize(product.sizes[0])
  }, [product])

  if (!product) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="font-display uppercase text-3xl sm:text-4xl">
          Product not found
        </h1>
        <Link to="/shop" className="mt-6 inline-block underline">
          Back to shop
        </Link>
      </div>
    )
  }

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  const handleBuyNow = () => {
    addItem(product, size, 1, { openCart: false })
    navigate('/checkout')
  }

  return (
    <div className="wrap py-12">
      <nav className="text-xs uppercase tracking-wide text-neutral-500">
        <Link to="/shop">Shop</Link> / {product.name}
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <Photo
          src={product.image}
          alt={product.name}
          className="aspect-square w-full bg-slate object-cover"
        />

        <div>
          <h1 className="font-display uppercase text-3xl tracking-tight sm:text-4xl">
            {product.name}
          </h1>

          <p className="mt-3 text-lg tabular-nums">
            {product.originalPrice && (
              <span className="mr-2 text-neutral-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            {formatPrice(product.price)}
          </p>

          <p className="mt-6 max-w-md text-sm leading-relaxed text-neutral-600">
            {product.description}
          </p>

          {product.sizes.length > 1 && (
            <fieldset className="mt-8">
              <legend className="text-xs font-semibold uppercase tracking-[0.16em]">
                Size
              </legend>

              <div className="mt-3 flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    className={`h-11 min-w-11 border px-3 text-sm ${
                      size === s
                        ? 'border-black bg-black text-white'
                        : 'border-neutral-300'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </fieldset>
          )}

          <div className="mt-8 grid max-w-sm grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => addItem(product, size)}
              className="w-full border border-black py-3.5 text-[11px] font-semibold uppercase tracking-[0.12em] transition hover:bg-neutral-100"
            >
              Add to cart
            </button>

            <button
              type="button"
              onClick={handleBuyNow}
              className="w-full bg-black py-3.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-neutral-800"
            >
              Buy now
            </button>
          </div>

          {/* Trust badges */}
          <div className="mt-8 max-w-sm divide-y divide-neutral-200 border-y border-neutral-200">
            <div className="flex items-center gap-3 py-4">
              <span className="text-lg">🚚</span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide">
                  Fast shipping
                </p>
                <p className="mt-1 text-xs text-neutral-500">
                  Delivery in 2–4 days across Egypt
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 py-4">
              <span className="text-lg">📦</span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide">
                  Inspect before payment
                </p>
                <p className="mt-1 text-xs text-neutral-500">
                  Cash on delivery available
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 py-4">
              <span className="text-lg">↩</span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide">
                  Easy exchange
                </p>
                <p className="mt-1 text-xs text-neutral-500">
                  Exchange within 14 days
                </p>
              </div>
            </div>
          </div>

          <p className="mt-4 text-xs text-neutral-500">
            Free shipping on orders above {formatPrice(FREE_SHIPPING_FROM)}.
            Easy {RETURN_DAYS}-day exchange.
          </p>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="mb-8 text-center text-xl font-semibold uppercase tracking-[0.16em]">
            You may also like
          </h2>

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
