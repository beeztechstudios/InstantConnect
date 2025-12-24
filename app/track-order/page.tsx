'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Package, Truck, CheckCircle, Clock, ChevronRight, MapPin, Calendar, ArrowRight } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import { formatPrice, formatDate } from '@/lib/utils'
import toast from 'react-hot-toast'

interface OrderDetails {
  id: string
  order_number: string
  status: string
  total: number
  created_at: string
  shipping_address: {
    address: string
    city: string
    state: string
    pincode: string
  }
  items: Array<{
    product_name: string
    quantity: number
    unit_price: number
  }>
}

const statusSteps = [
  { key: 'confirmed', label: 'Confirmed', icon: CheckCircle, description: 'Order placed successfully' },
  { key: 'processing', label: 'Processing', icon: Clock, description: 'Preparing your order' },
  { key: 'shipped', label: 'Shipped', icon: Truck, description: 'On the way to you' },
  { key: 'delivered', label: 'Delivered', icon: Package, description: 'Order delivered' },
]

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState('')
  const [order, setOrder] = useState<OrderDetails | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!orderNumber.trim()) {
      toast.error('Please enter an order number')
      return
    }

    setIsLoading(true)
    setSearched(true)

    try {
      const supabase = createClient()

      const { data, error } = await supabase
        .from('orders')
        .select(`
          id,
          order_number,
          status,
          total,
          created_at,
          shipping_address,
          order_items (
            product_name,
            quantity,
            unit_price
          )
        `)
        .eq('order_number', orderNumber.trim().toUpperCase())
        .single()

      if (error || !data) {
        setOrder(null)
        toast.error('Order not found')
      } else {
        setOrder({
          ...data,
          shipping_address: data.shipping_address as OrderDetails['shipping_address'],
          items: data.order_items,
        })
      }
    } catch (error) {
      console.error('Error fetching order:', error)
      toast.error('Failed to fetch order. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusIndex = (status: string) => {
    const index = statusSteps.findIndex((s) => s.key === status)
    return index >= 0 ? index : 0
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
            <span className="font-medium text-zinc-900">Track Order</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="flex justify-center bg-zinc-100 py-6">
        <div className="w-[95%]">
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-violet-600 to-violet-700 px-8 py-12 md:py-16">
            <div className="relative z-10 mx-auto max-w-2xl text-center">
              <h1 className="text-3xl font-bold text-white md:text-4xl">
                Track Your Order
              </h1>
              <p className="mt-3 text-violet-100">
                Enter your order number to check the status of your order.
              </p>

              {/* Search Form */}
              <form onSubmit={handleSearch} className="mt-8">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />
                    <input
                      type="text"
                      placeholder="Enter order number (e.g., IC-XXXX-XXXX)"
                      value={orderNumber}
                      onChange={(e) => setOrderNumber(e.target.value)}
                      className="w-full rounded-xl border-0 py-4 pl-12 pr-4 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-4 text-sm font-semibold text-violet-600 hover:bg-violet-50 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-violet-200 border-t-violet-600" />
                    ) : (
                      <>
                        <Search className="h-4 w-4" />
                        Track
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
            {/* Decorative elements */}
            <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-violet-500/30 blur-3xl" />
            <div className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-violet-400/30 blur-3xl" />
          </div>
        </div>
      </section>

      {/* Order Details */}
      {searched && (
        <section className="flex justify-center bg-zinc-100 pb-8">
          <div className="w-[95%]">
            {order ? (
              <div className="space-y-6">
                {/* Order Header */}
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-xl bg-white p-6">
                    <p className="text-sm text-zinc-500">Order Number</p>
                    <p className="mt-1 text-xl font-bold text-zinc-900">{order.order_number}</p>
                  </div>
                  <div className="rounded-xl bg-white p-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-zinc-400" />
                      <p className="text-sm text-zinc-500">Order Date</p>
                    </div>
                    <p className="mt-1 text-xl font-bold text-zinc-900">{formatDate(order.created_at)}</p>
                  </div>
                  <div className="rounded-xl bg-white p-6">
                    <p className="text-sm text-zinc-500">Order Total</p>
                    <p className="mt-1 text-xl font-bold text-teal-600">{formatPrice(order.total)}</p>
                  </div>
                </div>

                {/* Status Timeline */}
                <div className="rounded-xl bg-white p-6 md:p-8">
                  <h3 className="text-lg font-bold text-zinc-900">Order Status</h3>
                  <div className="mt-8">
                    {/* Timeline */}
                    <div className="relative">
                      {/* Progress Line */}
                      <div className="absolute left-5 top-0 h-full w-0.5 bg-zinc-200" />
                      <div
                        className="absolute left-5 top-0 w-0.5 bg-teal-500 transition-all duration-500"
                        style={{
                          height: `${(getStatusIndex(order.status) / (statusSteps.length - 1)) * 100}%`,
                        }}
                      />

                      {/* Steps */}
                      <div className="space-y-8">
                        {statusSteps.map((step, index) => {
                          const StatusIcon = step.icon
                          const currentIndex = getStatusIndex(order.status)
                          const isCompleted = index <= currentIndex
                          const isCurrent = index === currentIndex

                          return (
                            <div key={step.key} className="relative flex gap-4">
                              <div
                                className={`relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${
                                  isCompleted
                                    ? 'bg-teal-500 text-white'
                                    : 'bg-zinc-100 text-zinc-400'
                                } ${isCurrent ? 'ring-4 ring-teal-100' : ''}`}
                              >
                                <StatusIcon className="h-5 w-5" />
                              </div>
                              <div className="flex-1 pt-1">
                                <h4
                                  className={`font-semibold ${
                                    isCompleted ? 'text-zinc-900' : 'text-zinc-400'
                                  }`}
                                >
                                  {step.label}
                                </h4>
                                <p className="text-sm text-zinc-500">{step.description}</p>
                              </div>
                              {isCurrent && (
                                <span className="rounded-full bg-teal-100 px-3 py-1 text-xs font-medium text-teal-700">
                                  Current
                                </span>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                  {/* Order Items */}
                  <div className="rounded-xl bg-white p-6">
                    <h3 className="font-bold text-zinc-900">Order Items</h3>
                    <div className="mt-4 space-y-3">
                      {order.items.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between rounded-lg bg-zinc-50 p-4"
                        >
                          <div>
                            <p className="font-medium text-zinc-900">{item.product_name}</p>
                            <p className="text-sm text-zinc-500">
                              Qty: {item.quantity} × {formatPrice(item.unit_price)}
                            </p>
                          </div>
                          <p className="font-semibold text-zinc-900">
                            {formatPrice(item.quantity * item.unit_price)}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex justify-between border-t border-zinc-100 pt-4">
                      <span className="font-semibold text-zinc-900">Total</span>
                      <span className="text-lg font-bold text-zinc-900">{formatPrice(order.total)}</span>
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div className="rounded-xl bg-white p-6">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-zinc-400" />
                      <h3 className="font-bold text-zinc-900">Shipping Address</h3>
                    </div>
                    <div className="mt-4 rounded-lg bg-zinc-50 p-4">
                      <p className="text-zinc-600">
                        {order.shipping_address.address}
                        <br />
                        {order.shipping_address.city}, {order.shipping_address.state}{' '}
                        {order.shipping_address.pincode}
                      </p>
                    </div>

                    {/* Need Help */}
                    <div className="mt-6 rounded-lg border border-zinc-200 p-4">
                      <h4 className="font-medium text-zinc-900">Need Help?</h4>
                      <p className="mt-1 text-sm text-zinc-500">
                        If you have any questions about your order, please contact our support team.
                      </p>
                      <Link
                        href="/contact"
                        className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-teal-600 hover:text-teal-700"
                      >
                        Contact Support
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-xl bg-white p-12 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100">
                  <Package className="h-8 w-8 text-zinc-400" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-zinc-900">Order Not Found</h3>
                <p className="mt-2 text-zinc-500">
                  We couldn&apos;t find an order with that number. Please check and try again.
                </p>
                <Link
                  href="/contact"
                  className="mt-6 inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-6 py-3 text-sm font-semibold text-white hover:bg-zinc-800"
                >
                  Contact Support
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Help Section */}
      {!searched && (
        <section className="flex justify-center bg-zinc-100 pb-8">
          <div className="w-[95%]">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-xl bg-white p-6 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100">
                  <Package className="h-6 w-6 text-violet-600" />
                </div>
                <h3 className="mt-4 font-bold text-zinc-900">Find Order Number</h3>
                <p className="mt-2 text-sm text-zinc-500">
                  Check your order confirmation email for your order number starting with &quot;IC-&quot;
                </p>
              </div>
              <div className="rounded-xl bg-white p-6 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100">
                  <Truck className="h-6 w-6 text-teal-600" />
                </div>
                <h3 className="mt-4 font-bold text-zinc-900">Shipping Updates</h3>
                <p className="mt-2 text-sm text-zinc-500">
                  Get real-time shipping updates via email and SMS once your order is shipped
                </p>
              </div>
              <div className="rounded-xl bg-white p-6 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="mt-4 font-bold text-zinc-900">Delivery Time</h3>
                <p className="mt-2 text-sm text-zinc-500">
                  Standard delivery takes 5-7 business days. Express options available at checkout
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
