'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag, ChevronRight } from 'lucide-react'
import { useCart } from '@/contexts/cart-context'
import { formatPrice } from '@/lib/utils'
import { createClient } from '@/utils/supabase/client'
import toast from 'react-hot-toast'

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal, clearCart } = useCart()
  const [couponCode, setCouponCode] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string
    discount: number
    type: 'percentage' | 'fixed'
  } | null>(null)
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false)

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      toast.error('Please enter a coupon code')
      return
    }

    setIsApplyingCoupon(true)

    try {
      const supabase = createClient()
      const { data: coupon, error } = await supabase
        .from('coupons')
        .select('*')
        .eq('code', couponCode.toUpperCase())
        .eq('is_active', true)
        .single()

      if (error || !coupon) {
        toast.error('Invalid coupon code')
        return
      }

      if (coupon.min_order_amount && subtotal < coupon.min_order_amount) {
        toast.error(`Minimum order amount is ${formatPrice(coupon.min_order_amount)}`)
        return
      }

      setAppliedCoupon({
        code: coupon.code,
        discount: coupon.discount_value,
        type: coupon.discount_type,
      })
      toast.success(`Coupon "${coupon.code}" applied!`)
    } catch {
      toast.error('Failed to apply coupon')
    } finally {
      setIsApplyingCoupon(false)
    }
  }

  const removeCoupon = () => {
    setAppliedCoupon(null)
    setCouponCode('')
    toast.success('Coupon removed')
  }

  const discountAmount = appliedCoupon
    ? appliedCoupon.type === 'percentage'
      ? (subtotal * appliedCoupon.discount) / 100
      : appliedCoupon.discount
    : 0

  const total = subtotal - discountAmount

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-zinc-100">
        <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-zinc-200">
            <ShoppingBag className="h-12 w-12 text-zinc-400" />
          </div>
          <h1 className="mt-6 text-2xl font-bold text-zinc-900">
            Your cart is empty
          </h1>
          <p className="mt-2 text-zinc-500">
            Looks like you haven&apos;t added anything to your cart yet.
          </p>
          <Link
            href="/shop"
            className="mt-6 rounded-lg bg-zinc-900 px-6 py-3 text-sm font-semibold text-white hover:bg-zinc-800"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-100">
      {/* Breadcrumb */}
      <div className="flex justify-center bg-zinc-100 pt-6">
        <div className="w-[95%]">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-zinc-500 hover:text-zinc-700">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 text-zinc-400" />
            <span className="font-medium text-zinc-900">Cart</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <div className="flex justify-center bg-zinc-100 py-6">
        <div className="w-[95%]">
          <h1 className="text-2xl font-bold text-zinc-900 md:text-3xl">Shopping Cart</h1>
          <p className="mt-1 text-zinc-500">
            {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>
      </div>

      {/* Cart Content */}
      <div className="flex justify-center bg-zinc-100 pb-8">
        <div className="w-[95%]">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div key={item.productId} className="flex gap-4 rounded-xl bg-white p-4 sm:p-6">
                  {/* Product Image */}
                  <Link href={`/product/${item.slug}`} className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-zinc-100 sm:h-32 sm:w-32">
                    <Image
                      src={item.image || '/placeholder-product.jpg'}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </Link>

                  {/* Product Info */}
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between">
                      <div>
                        <Link href={`/product/${item.slug}`} className="font-semibold text-zinc-900 hover:text-zinc-700">
                          {item.name}
                        </Link>
                        <p className="mt-1 text-sm text-zinc-500">
                          {formatPrice(item.price)} each
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.productId)}
                        className="text-zinc-400 hover:text-red-500"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-4">
                      {/* Quantity */}
                      <div className="flex items-center rounded-lg border border-zinc-200">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="p-2 hover:bg-zinc-50"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-10 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="p-2 hover:bg-zinc-50"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Item Total */}
                      <p className="font-bold text-zinc-900">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Clear Cart */}
              <div className="flex justify-end">
                <button
                  onClick={clearCart}
                  className="text-sm text-red-500 hover:text-red-600"
                >
                  Clear Cart
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-xl bg-white p-6">
                <h2 className="text-lg font-bold text-zinc-900">
                  Order Summary
                </h2>

                {/* Coupon Code */}
                <div className="mt-6">
                  <label className="text-sm font-medium text-zinc-700">
                    Coupon Code
                  </label>
                  {appliedCoupon ? (
                    <div className="mt-2 flex items-center justify-between rounded-lg bg-teal-50 p-3">
                      <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4 text-teal-600" />
                        <span className="font-medium text-teal-700">
                          {appliedCoupon.code}
                        </span>
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-sm text-teal-600 hover:text-teal-700"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="mt-2 flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="flex-1 rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:border-zinc-400 focus:outline-none"
                      />
                      <button
                        onClick={handleApplyCoupon}
                        disabled={isApplyingCoupon}
                        className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 disabled:opacity-50"
                      >
                        {isApplyingCoupon ? '...' : 'Apply'}
                      </button>
                    </div>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="mt-6 space-y-3 border-t border-zinc-100 pt-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-500">Subtotal</span>
                    <span className="font-medium text-zinc-900">{formatPrice(subtotal)}</span>
                  </div>
                  {appliedCoupon && (
                    <div className="flex justify-between text-sm text-teal-600">
                      <span>Discount ({appliedCoupon.code})</span>
                      <span>-{formatPrice(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-500">Shipping</span>
                    <span className="text-teal-600">Free</span>
                  </div>
                </div>

                {/* Total */}
                <div className="mt-6 border-t border-zinc-100 pt-6">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-zinc-900">Total</span>
                    <span className="text-lg font-bold text-zinc-900">{formatPrice(total)}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <Link
                  href="/checkout"
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-zinc-900 px-6 py-3 text-sm font-semibold text-white hover:bg-zinc-800"
                >
                  Proceed to Checkout
                  <ArrowRight className="h-4 w-4" />
                </Link>

                {/* Continue Shopping */}
                <Link
                  href="/shop"
                  className="mt-3 flex w-full items-center justify-center rounded-lg border border-zinc-200 px-6 py-3 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
