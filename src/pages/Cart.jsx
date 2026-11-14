import { Link } from 'react-router-dom'
import { Minus, Plus } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../data/products'

export default function Cart() {
  const { items, updateQty, removeItem, subtotal, shipping, total } = useCart()

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="font-display text-5xl tracking-wide">Your bag is empty</h1>
        <Link to="/shop" className="mt-8 inline-block bg-black px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
          Shop now
        </Link>
      </div>
    )
  }

  return (
    <div className="wrap grid gap-12 py-12 lg:grid-cols-[1fr_360px]">
      <div>
        <h1 className="font-display text-5xl tracking-wide">Your bag</h1>
        <ul className="mt-8 divide-y divide-neutral-200 border-y border-neutral-200">
          {items.map((item) => (
            <li key={`${item.id}-${item.size}`} className="flex gap-4 py-6">
              <img src={item.image} alt="" className="h-28 w-24 object-cover" />
              <div className="flex flex-1 flex-col">
                <div className="flex justify-between gap-4">
                  <div>
                    <p>{item.name}</p>
                    <p className="mt-1 text-sm text-neutral-500">Size {item.size}</p>
                  </div>
                  <p className="tabular-nums">{formatPrice(item.price * item.qty)}</p>
                </div>
                <div className="mt-auto flex items-center justify-between pt-3">
                  <div className="flex items-center border border-neutral-300">
                    <button type="button" className="flex h-9 w-9 items-center justify-center" aria-label="Decrease quantity" onClick={() => updateQty(item.id, item.size, item.qty - 1)}>
                      <Minus size={14} />
                    </button>
                    <span className="w-6 text-center text-sm tabular-nums">{item.qty}</span>
                    <button type="button" className="flex h-9 w-9 items-center justify-center" aria-label="Increase quantity" onClick={() => updateQty(item.id, item.size, item.qty + 1)}>
                      <Plus size={14} />
                    </button>
                  </div>
                  <button type="button" className="text-xs uppercase tracking-wide underline" onClick={() => removeItem(item.id, item.size)}>
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <aside className="h-fit border border-neutral-200 p-6">
        <h2 className="text-sm font-semibold uppercase tracking-[0.16em]">Summary</h2>
        <div className="mt-4 flex justify-between text-sm">
          <span>Subtotal</span>
          <span className="tabular-nums">{formatPrice(subtotal)}</span>
        </div>
        <div className="mt-2 flex justify-between text-sm">
          <span>Shipping</span>
          <span className="tabular-nums">{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
        </div>
        <div className="mt-4 flex justify-between border-t border-neutral-200 pt-4 text-sm font-medium">
          <span>Total</span>
          <span className="tabular-nums">{formatPrice(total)}</span>
        </div>
        <Link to="/checkout" className="mt-6 block bg-black py-3 text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
          Checkout
        </Link>
      </aside>
    </div>
  )
}
