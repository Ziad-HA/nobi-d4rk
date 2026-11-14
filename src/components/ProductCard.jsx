import { Link } from 'react-router-dom'
import { formatPrice } from '../data/products'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product }) {
  const { addItem } = useCart()

  return (
    <article className="group flex flex-col">
      <Link to={`/product/${product.id}`} className="relative block overflow-hidden bg-sand">
        <img
          src={product.image}
          alt={product.name}
          width={600}
          height={750}
          className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        />
        {product.sale && (
          <span className="absolute left-3 top-3 bg-black px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
            Sale
          </span>
        )}
      </Link>
      <div className="mt-3 flex flex-1 flex-col">
        <Link to={`/product/${product.id}`} className="text-[15px] text-neutral-900">
          {product.name}
        </Link>
        <p className="mt-1 text-sm tabular-nums text-neutral-700">
          {product.originalPrice ? (
            <>
              <span className="mr-2 text-neutral-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
              {formatPrice(product.price)}
            </>
          ) : (
            formatPrice(product.price)
          )}
        </p>
        <button
          type="button"
          onClick={() => addItem(product)}
          className="mt-3 w-full bg-black px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          Add to cart
        </button>
      </div>
    </article>
  )
}
