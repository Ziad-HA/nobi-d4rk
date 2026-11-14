import { Link } from 'react-router-dom'
import { Minus, Plus, X } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../data/products'

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, updateQty, removeItem, subtotal, shipping, count } = useCart()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        className="absolute inset-0 bg-black/50"
        aria-label="Close cart"
        onClick={() => setIsOpen(false)}
      />
      <aside
        className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
      >
        <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-4">
          <h2 id="cart-title" className="text-sm font-semibold uppercase tracking-[0.16em]">
            Your bag ({count})
          </h2>
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center"
            aria-label="Close cart"
            onClick={() => setIsOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <p className="py-16 text-center text-neutral-500">Your bag is empty.</p>
          ) : (
            <ul className="space-y-5">
              {items.map((item) => (
                <li key={`${item.id}-${item.size}`} className="flex gap-4">
                  <img src={item.image} alt="" className="h-24 w-20 object-cover" />
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between gap-3">
                      <p className="text-sm">{item.name}</p>
                      <p className="text-sm tabular-nums">{formatPrice(item.price * item.qty)}</p>
                    </div>
                    <p className="mt-1 text-xs text-neutral-500">Size {item.size}</p>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex items-center border border-neutral-300">
                        <button
                          type="button"
                          className="flex h-9 w-9 items-center justify-center"
                          aria-label="Decrease quantity"
                          onClick={() => updateQty(item.id, item.size, item.qty - 1)}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-6 text-center text-sm tabular-nums">{item.qty}</span>
                        <button
                          type="button"
                          className="flex h-9 w-9 items-center justify-center"
                          aria-label="Increase quantity"
                          onClick={() => updateQty(item.id, item.size, item.qty + 1)}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button
                        type="button"
                        className="text-xs uppercase tracking-wide text-neutral-500 underline"
                        onClick={() => removeItem(item.id, item.size)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-neutral-200 px-5 py-4">
          <div className="mb-1 flex justify-between text-sm">
            <span>Subtotal</span>
            <span className="tabular-nums">{formatPrice(subtotal)}</span>
          </div>
          <p className="mb-4 text-xs text-neutral-500">
            {shipping === 0
              ? 'Free shipping unlocked.'
              : `Add ${formatPrice(1499 - subtotal)} for free shipping.`}
          </p>
          <Link
            to="/cart"
            onClick={() => setIsOpen(false)}
            className="mb-2 block bg-black py-3 text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-white"
          >
            View bag
          </Link>
          <Link
            to="/checkout"
            onClick={() => setIsOpen(false)}
            className="block border border-black py-3 text-center text-[11px] font-semibold uppercase tracking-[0.16em]"
          >
            Checkout
          </Link>
        </div>
      </aside>
    </div>
  )
}
