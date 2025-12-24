'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import toast from 'react-hot-toast'

export interface CartItem {
  productId: string
  name: string
  slug: string
  price: number
  compareAtPrice: number | null
  quantity: number
  image: string
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  itemCount: number
  subtotal: number
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const CART_STORAGE_KEY = 'instant-connect-cart'

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(CART_STORAGE_KEY)
    if (stored) {
      try {
        setItems(JSON.parse(stored))
      } catch (e) {
        console.error('Failed to parse cart from localStorage', e)
      }
    }
    setIsHydrated(true)
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
    }
  }, [items, isHydrated])

  const addItem = useCallback((item: Omit<CartItem, 'quantity'>, quantity = 1) => {
    let isUpdate = false

    setItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.productId === item.productId)

      if (existingIndex > -1) {
        isUpdate = true
        const updated = [...prev]
        updated[existingIndex].quantity += quantity
        return updated
      }

      return [...prev, { ...item, quantity }]
    })

    // Toast outside of setState to avoid render-during-render
    setTimeout(() => {
      toast.success(isUpdate ? `Updated ${item.name} quantity` : `Added ${item.name} to cart`)
    }, 0)

    setIsOpen(true)
  }, [])

  const removeItem = useCallback((productId: string) => {
    let removedItemName: string | null = null

    setItems((prev) => {
      const item = prev.find((i) => i.productId === productId)
      if (item) {
        removedItemName = item.name
      }
      return prev.filter((i) => i.productId !== productId)
    })

    // Toast outside of setState to avoid render-during-render
    setTimeout(() => {
      if (removedItemName) {
        toast.success(`Removed ${removedItemName} from cart`)
      }
    }, 0)
  }, [])

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(productId)
      return
    }

    setItems((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    )
  }, [removeItem])

  const clearCart = useCallback(() => {
    setItems([])
    toast.success('Cart cleared')
  }, [])

  const openCart = useCallback(() => setIsOpen(true), [])
  const closeCart = useCallback(() => setIsOpen(false), [])

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
        isOpen,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
