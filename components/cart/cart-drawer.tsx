'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { X, Plus, Minus, ShoppingBag, Trash2, ArrowRight, Truck, Tag, Sparkles } from 'lucide-react'
import { cn, formatPrice } from '@/lib/utils'
import { useCart } from '@/contexts/cart-context'

const FREE_SHIPPING_THRESHOLD = 999

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal, itemCount } = useCart()

  const shippingProgress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100)
  const amountToFreeShipping = FREE_SHIPPING_THRESHOLD - subtotal

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className={cn(
          'fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-zinc-50 shadow-2xl transition-transform duration-300 ease-out',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Header */}
        <div className="bg-white px-5 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900">
                <ShoppingBag className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-zinc-900">Your Cart</h2>
                <p className="text-xs text-zinc-500">
                  {itemCount} {itemCount === 1 ? 'item' : 'items'}
                </p>
              </div>
            </div>
            <button
              onClick={closeCart}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 text-zinc-500 hover:bg-zinc-200 hover:text-zinc-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Free Shipping Progress */}
          {items.length > 0 && (
            <div className="mt-4">
              {subtotal >= FREE_SHIPPING_THRESHOLD ? (
                <div className="flex items-center gap-2 rounded-xl bg-teal-50 px-4 py-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-500">
                    <Truck className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-teal-700">Free shipping unlocked!</p>
                    <p className="text-xs text-teal-600">Your order qualifies for free delivery</p>
                  </div>
                </div>
              ) : (
                <div className="rounded-xl bg-zinc-100 px-4 py-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-600">Add {formatPrice(amountToFreeShipping)} for free shipping</span>
                    <Truck className="h-4 w-4 text-zinc-400" />
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-zinc-200">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-teal-400 to-teal-500 transition-all duration-500"
                      style={{ width: `${shippingProgress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-zinc-200">
                <ShoppingBag className="h-10 w-10 text-zinc-400" />
              </div>
              <h3 className="mt-6 text-lg font-bold text-zinc-900">Your cart is empty</h3>
              <p className="mt-2 text-sm text-zinc-500">
                Looks like you haven&apos;t added anything yet
              </p>
              <button
                onClick={closeCart}
                className="mt-6 flex items-center gap-2 rounded-xl bg-zinc-900 px-6 py-3 text-sm font-semibold text-white hover:bg-zinc-800"
              >
                Start Shopping
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.productId}
                  className="group overflow-hidden rounded-2xl bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <Link
                      href={`/product/${item.slug}`}
                      onClick={closeCart}
                      className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-zinc-100"
                    >
                      <Image
                        src={item.image || '/placeholder-product.jpg'}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                    </Link>

                    {/* Product Info */}
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/product/${item.slug}`}
                          onClick={closeCart}
                          className="font-semibold text-zinc-900 hover:text-zinc-700 line-clamp-2"
                        >
                          {item.name}
                        </Link>
                        <button
                          onClick={() => removeItem(item.productId)}
                          className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-red-50 hover:text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <p className="mt-1 text-sm text-zinc-500">
                        {formatPrice(item.price)} each
                      </p>

                      <div className="mt-auto flex items-center justify-between pt-3">
                        {/* Quantity Controls */}
                        <div className="flex items-center rounded-xl bg-zinc-100">
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            className="flex h-8 w-8 items-center justify-center rounded-l-xl text-zinc-600 hover:bg-zinc-200"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-10 text-center text-sm font-semibold text-zinc-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            className="flex h-8 w-8 items-center justify-center rounded-r-xl text-zinc-600 hover:bg-zinc-200"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <p className="text-lg font-bold text-zinc-900">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="bg-white px-5 py-5">
            {/* Promo Banner */}
            <div className="mb-4 flex items-center gap-3 rounded-xl bg-gradient-to-r from-violet-500 to-violet-600 px-4 py-3 text-white">
              <Sparkles className="h-5 w-5 flex-shrink-0" />
              <p className="text-sm">
                <span className="font-semibold">10% OFF</span> on your first order! Use code{' '}
                <span className="font-mono font-bold">WELCOME10</span>
              </p>
            </div>

            {/* Summary */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-500">Subtotal</span>
                <span className="font-medium text-zinc-900">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-500">Shipping</span>
                <span className={subtotal >= FREE_SHIPPING_THRESHOLD ? 'font-medium text-teal-600' : 'text-zinc-900'}>
                  {subtotal >= FREE_SHIPPING_THRESHOLD ? 'FREE' : 'Calculated at checkout'}
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-zinc-100 pt-3">
                <span className="font-semibold text-zinc-900">Estimated Total</span>
                <span className="text-xl font-bold text-zinc-900">{formatPrice(subtotal)}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-5 space-y-3">
              <Link
                href="/checkout"
                onClick={closeCart}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-900 py-4 text-sm font-semibold text-white hover:bg-zinc-800"
              >
                Checkout
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/cart"
                onClick={closeCart}
                className="flex w-full items-center justify-center rounded-xl border border-zinc-200 py-3 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
              >
                View Full Cart
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="mt-4 flex items-center justify-center gap-4 text-xs text-zinc-400">
              <div className="flex items-center gap-1">
                <Tag className="h-3 w-3" />
                <span>Secure Checkout</span>
              </div>
              <div className="flex items-center gap-1">
                <Truck className="h-3 w-3" />
                <span>Fast Delivery</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
