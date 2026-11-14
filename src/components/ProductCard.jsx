import { Link } from 'react-router-dom'
import { formatPrice } from '../data/products'
import { useCart } from '../context/CartContext'
import Photo from './Photo'

export default function ProductCard({ product }) {
  const { addItem } = useCart()

  return (
    <article className="group flex h-full flex-col">
      <Link to={`/product/${product.id}`} className="relative block overflow-hidden bg-sand">
        <Photo
          src={product.image}
          alt={product.name}
          width={600}
          height={750}
          className="aspect-[4/5] w-full object-cover mix-blend-multiply transition duration-500 group-hover:scale-[1.03]"
        />
        {product.sale && (
          <span className="absolute left-3 top-3 rounded-full bg-black px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
            Sale
          </span>
        )}
      </Link>
      <div className="mt-3 flex items-baseline justify-between gap-3 text-xs uppercase tracking-[0.06em]">
        <Link to={`/product/${product.id}`} className="font-semibold text-neutral-900">
          {product.name}
        </Link>
        <p className="shrink-0 tabular-nums text-neutral-600">
          {product.originalPrice && (
            <span className="mr-2 text-neutral-400 line-through">{formatPrice(product.originalPrice)}</span>
          )}
          {formatPrice(product.price)}
        </p>
      </div>
      <button
        type="button"
        onClick={() => addItem(product)}
        className="mt-3 w-full rounded-full border border-black/70 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] transition hover:bg-black hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
      >
        Add to cart
      </button>
    </article>
  )
}
