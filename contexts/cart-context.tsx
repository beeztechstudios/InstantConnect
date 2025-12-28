'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import toast from 'react-hot-toast'
import { createClient } from '@/utils/supabase/client'

export interface CartItem {
  productId: string
  name: string
  slug: string
  price: number
  compareAtPrice: number | null
  quantity: number
  image: string
}

export interface AppliedCoupon {
  code: string
  discount: number
  type: 'percentage' | 'fixed'
  minOrderAmount?: number
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
  // Coupon functionality
  appliedCoupon: AppliedCoupon | null
  applyCoupon: (code: string) => Promise<boolean>
  removeCoupon: () => void
  discountAmount: number
  total: number
  isApplyingCoupon: boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const CART_STORAGE_KEY = 'instant-connect-cart'
const COUPON_STORAGE_KEY = 'instant-connect-coupon'

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(null)
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false)

  // Load cart and coupon from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY)
    if (storedCart) {
      try {
        setItems(JSON.parse(storedCart))
      } catch (e) {
        console.error('Failed to parse cart from localStorage', e)
      }
    }
    const storedCoupon = localStorage.getItem(COUPON_STORAGE_KEY)
    if (storedCoupon) {
      try {
        setAppliedCoupon(JSON.parse(storedCoupon))
      } catch (e) {
        console.error('Failed to parse coupon from localStorage', e)
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

  // Save coupon to localStorage whenever it changes
  useEffect(() => {
    if (isHydrated) {
      if (appliedCoupon) {
        localStorage.setItem(COUPON_STORAGE_KEY, JSON.stringify(appliedCoupon))
      } else {
        localStorage.removeItem(COUPON_STORAGE_KEY)
      }
    }
  }, [appliedCoupon, isHydrated])

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
    setAppliedCoupon(null)
    toast.success('Cart cleared')
  }, [])

  const openCart = useCallback(() => setIsOpen(true), [])
  const closeCart = useCallback(() => setIsOpen(false), [])

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  // Coupon functions
  const applyCoupon = useCallback(async (code: string): Promise<boolean> => {
    if (!code.trim()) {
      toast.error('Please enter a coupon code')
      return false
    }

    setIsApplyingCoupon(true)

    try {
      const supabase = createClient()
      const { data: coupon, error } = await supabase
        .from('coupons')
        .select('*')
        .eq('code', code.toUpperCase())
        .eq('is_active', true)
        .single()

      if (error || !coupon) {
        toast.error('Invalid coupon code')
        return false
      }

      if (coupon.min_order_amount && subtotal < coupon.min_order_amount) {
        const formatPrice = (price: number) =>
          new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(price)
        toast.error(`Minimum order amount is ${formatPrice(coupon.min_order_amount)}`)
        return false
      }

      setAppliedCoupon({
        code: coupon.code,
        discount: coupon.discount_value,
        type: coupon.discount_type,
        minOrderAmount: coupon.min_order_amount,
      })
      toast.success(`Coupon "${coupon.code}" applied!`)
      return true
    } catch {
      toast.error('Failed to apply coupon')
      return false
    } finally {
      setIsApplyingCoupon(false)
    }
  }, [subtotal])

  const removeCoupon = useCallback(() => {
    setAppliedCoupon(null)
    toast.success('Coupon removed')
  }, [])

  // Calculate discount and total
  const discountAmount = appliedCoupon
    ? appliedCoupon.type === 'percentage'
      ? (subtotal * appliedCoupon.discount) / 100
      : appliedCoupon.discount
    : 0

  const total = subtotal - discountAmount

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
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        discountAmount,
        total,
        isApplyingCoupon,
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
