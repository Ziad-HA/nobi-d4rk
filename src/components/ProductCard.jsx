import { Link } from 'react-router-dom'
import { formatPrice } from '../data/products'
import { useCart } from '../context/CartContext'
import Photo from './Photo'
import Tilt from './Tilt'

// bare = tile + name/price only (home page); otherwise also shows a quick "Add to cart" button
export default function ProductCard({ product, bare = false }) {
  const { addItem } = useCart()

  return (
    <Tilt className="h-full">
    <article className="group flex h-full flex-col">
      <Link to={`/product/${product.id}`} className="relative block overflow-hidden bg-slate">
        <Photo
          src={product.image}
          alt={product.name}
          width={600}
          height={750}
          className={`aspect-square w-full object-cover transition duration-500 ${
            product.image2 ? 'group-hover:opacity-0' : 'group-hover:scale-[1.04]'
          }`}
        />
        {product.image2 && (
          <Photo
            src={product.image2}
            alt=""
            width={600}
            height={750}
            className="absolute inset-0 aspect-square w-full object-cover opacity-0 transition duration-500 group-hover:opacity-100"
          />
        )}
        {product.sale && (
          <span className="absolute left-2 top-2 bg-pure-black px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-pure-white">
            Sale
          </span>
        )}
      </Link>
      <div className="mt-2 flex items-start justify-between gap-3 font-display text-[9px] font-bold uppercase leading-tight sm:text-[10px]">
        <Link to={`/product/${product.id}`}>{product.name}</Link>
        <p className="shrink-0 tabular-nums">
          {product.originalPrice && (
            <span className="mr-2 text-neutral-400 line-through">{formatPrice(product.originalPrice)}</span>
          )}
          {formatPrice(product.price)}
        </p>
      </div>
      {!bare && (
        <button
          type="button"
          onClick={() => addItem(product)}
          className="mt-3 w-full rounded-md border border-pure-white/25 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] transition hover:bg-pure-white hover:text-pure-black focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          Add to cart
        </button>
      )}
    </article>
    </Tilt>
  )
}
