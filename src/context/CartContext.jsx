import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { FREE_SHIPPING_FROM, SHIPPING_FEE } from "../data/brand";

const CartContext = createContext(null);
const STORAGE_KEY = "common-cart";

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch {
      return [];
    }
  });
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // storage unavailable (private mode) — cart still works in memory
    }
  }, [items]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 2800);
    return () => clearTimeout(t);
  }, [toast]);

  const addItem = (product, size = product.sizes?.[0] || "OS", qty = 1) => {
    setItems((prev) => {
      const i = prev.findIndex((x) => x.id === product.id && x.size === size);
      if (i >= 0) {
        const next = [...prev];
        next[i] = { ...next[i], qty: next[i].qty + qty };
        return next;
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          size,
          qty,
        },
      ];
    });
    setIsOpen(true);
    setToast(`${product.name} added to cart`);
  };

  const updateQty = (id, size, qty) => {
    setItems((prev) =>
      prev
        .map((x) => (x.id === id && x.size === size ? { ...x, qty } : x))
        .filter((x) => x.qty > 0),
    );
  };

  const removeItem = (id, size) => {
    setItems((prev) => prev.filter((x) => !(x.id === id && x.size === size)));
  };

  const clear = () => setItems([]);

  const count = items.reduce((n, x) => n + x.qty, 0);
  const subtotal = items.reduce((n, x) => n + x.price * x.qty, 0);
  const shipping =
    subtotal >= FREE_SHIPPING_FROM || subtotal === 0 ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;

  const value = useMemo(
    () => ({
      items,
      isOpen,
      setIsOpen,
      searchOpen,
      setSearchOpen,
      toast,
      addItem,
      updateQty,
      removeItem,
      clear,
      count,
      subtotal,
      shipping,
      total,
    }),
    [items, isOpen, searchOpen, toast, count, subtotal, shipping, total],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
