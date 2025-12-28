'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import { useRouter } from 'next/navigation'
import { Home, Lock, CreditCard, Smartphone, Building, Check, ChevronDown, ChevronUp, ShoppingBag, Tag } from 'lucide-react'
import { useCart } from '@/contexts/cart-context'
import { formatPrice, generateOrderNumber } from '@/lib/utils'
import { createClient } from '@/utils/supabase/client'
import toast from 'react-hot-toast'

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance
  }
}

interface RazorpayOptions {
  key: string
  amount: number
  currency: string
  name: string
  description: string
  order_id: string
  handler: (response: RazorpayResponse) => void
  prefill: {
    name: string
    email: string
    contact: string
  }
  theme: {
    color: string
  }
  modal?: {
    ondismiss?: () => void
  }
}

interface RazorpayInstance {
  open: () => void
  close: () => void
}

interface RazorpayResponse {
  razorpay_payment_id: string
  razorpay_order_id: string
  razorpay_signature: string
}

const steps = [
  { id: 1, name: 'Contact' },
  { id: 2, name: 'Shipping' },
  { id: 3, name: 'Payment' },
]

export default function CheckoutPage() {
  const router = useRouter()
  const {
    items,
    subtotal,
    clearCart,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    discountAmount,
    total,
    isApplyingCoupon
  } = useCart()
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [sameAsShipping, setSameAsShipping] = useState(true)
  const [showOrderSummary, setShowOrderSummary] = useState(false)
  const [couponCode, setCouponCode] = useState('')
  const [paymentMethod, setPaymentMethod] = useState<'online' | 'cod'>('online')
  const [razorpayLoaded, setRazorpayLoaded] = useState(false)

  const handleApplyCoupon = async () => {
    const success = await applyCoupon(couponCode)
    if (success) {
      setCouponCode('')
    }
  }

  const handleRemoveCoupon = () => {
    removeCoupon()
    setCouponCode('')
  }

  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    billingAddress: '',
    billingCity: '',
    billingState: '',
    billingPincode: '',
    notes: '',
  })

  const createOrder = async () => {
    const supabase = createClient()

    // Create or find customer
    const { data: customer, error: customerError } = await supabase
      .from('customers')
      .insert([{
        email: formData.email,
        phone: formData.phone,
        first_name: formData.firstName,
        last_name: formData.lastName,
      }])
      .select()
      .single()

    if (customerError) {
      console.error('Customer creation error:', customerError)
      throw new Error(`Customer creation failed: ${customerError.message}`)
    }

    const orderNumber = generateOrderNumber()
    const shippingAddress = {
      address: formData.address,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode,
    }
    const billingAddress = sameAsShipping ? shippingAddress : {
      address: formData.billingAddress,
      city: formData.billingCity,
      state: formData.billingState,
      pincode: formData.billingPincode,
    }

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert([{
        order_number: orderNumber,
        customer_id: customer.id,
        status: paymentMethod === 'cod' ? 'confirmed' : 'pending',
        subtotal: subtotal,
        discount: discountAmount,
        coupon_code: appliedCoupon?.code || null,
        shipping: 0,
        total: total,
        shipping_address: shippingAddress,
        billing_address: billingAddress,
        notes: formData.notes,
      }])
      .select()
      .single()

    if (orderError) {
      console.error('Order creation error:', orderError)
      throw new Error(`Order creation failed: ${orderError.message}`)
    }

    const orderItems = items.map((item) => ({
      order_id: order.id,
      product_id: item.productId,
      product_name: item.name,
      product_image: item.image,
      quantity: item.quantity,
      unit_price: item.price,
      total_price: item.price * item.quantity,
    }))

    const { error: itemsError } = await supabase.from('order_items').insert(orderItems)
    if (itemsError) {
      console.error('Order items error:', itemsError)
      throw new Error(`Order items failed: ${itemsError.message}`)
    }

    return { order, orderNumber, customer }
  }

  const handleRazorpayPayment = async (orderId: string, orderNumber: string) => {
    try {
      // Create Razorpay order
      const response = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: total,
          currency: 'INR',
          receipt: orderNumber,
          notes: { order_id: orderId },
        }),
      })

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.error || 'Failed to create payment order')
      }

      // Initialize Razorpay
      const options: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: data.order.amount,
        currency: data.order.currency,
        name: 'Instant Connect',
        description: `Order ${orderNumber}`,
        order_id: data.order.id,
        handler: async (response: RazorpayResponse) => {
          try {
            // Verify payment
            const verifyResponse = await fetch('/api/razorpay/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                order_id: orderId,
              }),
            })

            const verifyData = await verifyResponse.json()

            if (verifyData.success) {
              clearCart()
              toast.success('Payment successful!')
              router.push(`/order-success?order=${orderNumber}`)
            } else {
              toast.error('Payment verification failed. Please contact support.')
            }
          } catch {
            toast.error('Payment verification failed. Please contact support.')
          }
        },
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: '#685BC7',
        },
        modal: {
          ondismiss: () => {
            setIsLoading(false)
            toast.error('Payment cancelled')
          },
        },
      }

      const razorpay = new window.Razorpay(options)
      razorpay.open()
    } catch (error) {
      console.error('Razorpay error:', error)
      toast.error('Failed to initiate payment. Please try again.')
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const supabase = createClient()
      const { order, orderNumber } = await createOrder()

      if (paymentMethod === 'cod') {
        // COD payment
        const { error: paymentError } = await supabase.from('payments').insert([{
          order_id: order.id,
          amount: total,
          status: 'pending',
          method: 'cod',
        }])

        if (paymentError) {
          console.error('Payment record error:', paymentError)
          throw new Error(`Payment record failed: ${paymentError.message}`)
        }

        clearCart()
        toast.success('Order placed successfully!')
        router.push(`/order-success?order=${orderNumber}`)
      } else {
        // Online payment via Razorpay
        const { error: paymentError } = await supabase.from('payments').insert([{
          order_id: order.id,
          amount: total,
          status: 'pending',
          method: 'razorpay',
        }])

        if (paymentError) {
          console.error('Payment record error:', paymentError)
          throw new Error(`Payment record failed: ${paymentError.message}`)
        }

        await handleRazorpayPayment(order.id, orderNumber)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      console.error('Checkout error:', errorMessage, error)
      toast.error(errorMessage || 'Failed to place order. Please try again.')
      setIsLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-20 sm:pt-28 lg:pt-36" style={{ backgroundColor: '#F4F4F4' }}>
        <div className="flex min-h-[50vh] flex-col items-center justify-center px-4 text-center">
          <div className="flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full bg-zinc-200">
            <ShoppingBag className="h-10 w-10 sm:h-12 sm:w-12 text-zinc-400" />
          </div>
          <h1 className="mt-6 text-xl sm:text-2xl font-bold text-zinc-900">Your cart is empty</h1>
          <p className="mt-2 text-sm sm:text-base text-zinc-500">Add some products to checkout.</p>
          <Link
            href="/shop"
            className="mt-6 rounded-full px-6 py-3 text-sm font-semibold text-white"
            style={{ backgroundColor: '#685BC7' }}
          >
            Start Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        onLoad={() => setRazorpayLoaded(true)}
      />
      <div className="min-h-screen" style={{ backgroundColor: '#F4F4F4' }}>
      {/* Header */}
      <div className="pt-20 sm:pt-28 lg:pt-36 pb-4 sm:pb-6">
        <div className="mx-auto w-[95%]">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-zinc-500 mb-4 sm:mb-6">
            <Link href="/" className="hover:text-zinc-700">
              <Home className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </Link>
            <span>/</span>
            <Link href="/cart" className="hover:text-zinc-700">Cart</Link>
            <span>/</span>
            <span className="font-medium text-zinc-900">Checkout</span>
          </nav>

          {/* Step Indicator */}
          <div className="flex items-center justify-center">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center gap-1.5 sm:gap-2 ${currentStep >= step.id ? 'text-zinc-900' : 'text-zinc-400'}`}>
                  <div
                    className={`flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full text-xs sm:text-sm font-medium ${
                      currentStep > step.id
                        ? 'text-white'
                        : currentStep === step.id
                        ? 'text-white'
                        : 'bg-zinc-200 text-zinc-500'
                    }`}
                    style={{
                      backgroundColor: currentStep > step.id ? '#10B981' : currentStep === step.id ? '#685BC7' : undefined
                    }}
                  >
                    {currentStep > step.id ? <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> : step.id}
                  </div>
                  <span className="hidden sm:inline text-sm font-medium">{step.name}</span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`mx-2 sm:mx-4 h-px w-8 sm:w-16 lg:w-24 ${currentStep > step.id ? 'bg-emerald-500' : 'bg-zinc-200'}`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Order Summary Toggle */}
      <div className="lg:hidden mx-auto w-[95%] mb-4">
        <button
          type="button"
          onClick={() => setShowOrderSummary(!showOrderSummary)}
          className="w-full flex items-center justify-between rounded-[10px] bg-white px-4 py-3"
        >
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-zinc-500" />
            <span className="font-medium text-zinc-900">Order Summary</span>
            <span className="text-xs text-zinc-500">({items.length} items)</span>
            {appliedCoupon && (
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium" style={{ backgroundColor: 'rgba(104, 91, 199, 0.1)', color: '#685BC7' }}>
                <Tag className="h-3 w-3" />
                {appliedCoupon.code}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-zinc-900">{formatPrice(total)}</span>
            {showOrderSummary ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </div>
        </button>

        {/* Collapsible Order Summary */}
        {showOrderSummary && (
          <div className="mt-2 rounded-[10px] bg-white p-4">
            <div className="max-h-48 space-y-3 overflow-y-auto">
              {items.map((item) => (
                <div key={item.productId} className="flex gap-3">
                  <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg bg-zinc-100">
                    <Image src={item.image || '/placeholder-product.jpg'} alt={item.name} fill className="object-cover" />
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-zinc-900 text-xs text-white">{item.quantity}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-zinc-900 truncate">{item.name}</p>
                    <p className="text-sm text-zinc-500">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Coupon Code - Mobile */}
            <div className="mt-3 pt-3 border-t border-zinc-100">
              <label className="text-xs font-medium text-zinc-700">Coupon Code</label>
              {appliedCoupon ? (
                <div className="mt-2 flex items-center justify-between rounded-[10px] px-3 py-2.5" style={{ backgroundColor: 'rgba(104, 91, 199, 0.1)' }}>
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4" style={{ color: '#685BC7' }} />
                    <span className="text-sm font-medium" style={{ color: '#685BC7' }}>{appliedCoupon.code}</span>
                  </div>
                  <button onClick={handleRemoveCoupon} className="text-xs hover:underline" style={{ color: '#685BC7' }}>Remove</button>
                </div>
              ) : (
                <div className="mt-2 flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 rounded-[10px] border border-zinc-200 px-3 py-2 text-sm focus:border-zinc-400 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    disabled={isApplyingCoupon}
                    className="rounded-[10px] border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 disabled:opacity-50"
                  >
                    {isApplyingCoupon ? '...' : 'Apply'}
                  </button>
                </div>
              )}
            </div>

            <div className="mt-3 pt-3 border-t border-zinc-100 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500">Subtotal</span>
                <span className="text-zinc-900">{formatPrice(subtotal)}</span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between text-sm" style={{ color: '#685BC7' }}>
                  <span>Discount ({appliedCoupon.code})</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500">Shipping</span>
                <span style={{ color: '#685BC7' }}>Free</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Checkout Content */}
      <form onSubmit={handleSubmit}>
        <div className="pb-8">
          <div className="mx-auto w-[95%]">
            <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
              {/* Form Sections */}
              <div className="space-y-3 sm:space-y-4 lg:col-span-2">
                {/* Contact Information */}
                <div className="rounded-[10px] bg-white p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-base sm:text-lg font-bold text-zinc-900">Contact Information</h2>
                    {currentStep > 1 && (
                      <button type="button" onClick={() => setCurrentStep(1)} className="text-xs sm:text-sm font-medium" style={{ color: '#685BC7' }}>Edit</button>
                    )}
                  </div>
                  {currentStep === 1 ? (
                    <div className="mt-4 grid gap-3 sm:gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-zinc-700">Email Address</label>
                        <input
                          type="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                          className="mt-1.5 w-full rounded-[10px] border border-zinc-200 px-3 py-2.5 sm:py-3 text-sm focus:border-zinc-400 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-zinc-700">Phone Number</label>
                        <input
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          required
                          className="mt-1.5 w-full rounded-[10px] border border-zinc-200 px-3 py-2.5 sm:py-3 text-sm focus:border-zinc-400 focus:outline-none"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <button
                          type="button"
                          onClick={() => setCurrentStep(2)}
                          className="w-full rounded-full py-3 sm:py-3.5 text-sm font-semibold text-white"
                          style={{ backgroundColor: '#685BC7' }}
                        >
                          Continue to Shipping
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="mt-2 text-xs sm:text-sm text-zinc-500">{formData.email} • {formData.phone}</p>
                  )}
                </div>

                {/* Shipping Address */}
                {currentStep >= 2 && (
                  <div className="rounded-[10px] bg-white p-4 sm:p-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-base sm:text-lg font-bold text-zinc-900">Shipping Address</h2>
                      {currentStep > 2 && (
                        <button type="button" onClick={() => setCurrentStep(2)} className="text-xs sm:text-sm font-medium" style={{ color: '#685BC7' }}>Edit</button>
                      )}
                    </div>
                    {currentStep === 2 ? (
                      <div className="mt-4 grid gap-3 sm:gap-4 sm:grid-cols-2">
                        <div>
                          <label className="block text-xs sm:text-sm font-medium text-zinc-700">First Name</label>
                          <input
                            type="text"
                            placeholder="John"
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            required
                            className="mt-1.5 w-full rounded-[10px] border border-zinc-200 px-3 py-2.5 sm:py-3 text-sm focus:border-zinc-400 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs sm:text-sm font-medium text-zinc-700">Last Name</label>
                          <input
                            type="text"
                            placeholder="Doe"
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            required
                            className="mt-1.5 w-full rounded-[10px] border border-zinc-200 px-3 py-2.5 sm:py-3 text-sm focus:border-zinc-400 focus:outline-none"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-xs sm:text-sm font-medium text-zinc-700">Address</label>
                          <textarea
                            placeholder="House/Flat No., Street, Landmark"
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            required
                            className="mt-1.5 w-full rounded-[10px] border border-zinc-200 px-3 py-2.5 sm:py-3 text-sm focus:border-zinc-400 focus:outline-none resize-none"
                            rows={2}
                          />
                        </div>
                        <div>
                          <label className="block text-xs sm:text-sm font-medium text-zinc-700">City</label>
                          <input
                            type="text"
                            placeholder="Mumbai"
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            required
                            className="mt-1.5 w-full rounded-[10px] border border-zinc-200 px-3 py-2.5 sm:py-3 text-sm focus:border-zinc-400 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs sm:text-sm font-medium text-zinc-700">State</label>
                          <input
                            type="text"
                            placeholder="Maharashtra"
                            value={formData.state}
                            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                            required
                            className="mt-1.5 w-full rounded-[10px] border border-zinc-200 px-3 py-2.5 sm:py-3 text-sm focus:border-zinc-400 focus:outline-none"
                          />
                        </div>
                        <div className="sm:col-span-2 sm:w-1/2">
                          <label className="block text-xs sm:text-sm font-medium text-zinc-700">PIN Code</label>
                          <input
                            type="text"
                            placeholder="400001"
                            value={formData.pincode}
                            onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                            required
                            className="mt-1.5 w-full rounded-[10px] border border-zinc-200 px-3 py-2.5 sm:py-3 text-sm focus:border-zinc-400 focus:outline-none"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="flex items-center gap-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={sameAsShipping}
                              onChange={(e) => setSameAsShipping(e.target.checked)}
                              className="h-4 w-4 rounded border-zinc-300"
                              style={{ accentColor: '#685BC7' }}
                            />
                            <span className="text-xs sm:text-sm text-zinc-600">Billing address same as shipping</span>
                          </label>
                        </div>
                        <div className="sm:col-span-2">
                          <button
                            type="button"
                            onClick={() => setCurrentStep(3)}
                            className="w-full rounded-full py-3 sm:py-3.5 text-sm font-semibold text-white"
                            style={{ backgroundColor: '#685BC7' }}
                          >
                            Continue to Payment
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="mt-2 text-xs sm:text-sm text-zinc-500">{formData.firstName} {formData.lastName}, {formData.address}, {formData.city}, {formData.state} - {formData.pincode}</p>
                    )}
                  </div>
                )}

                {/* Payment */}
                {currentStep >= 3 && (
                  <div className="rounded-[10px] bg-white p-4 sm:p-6">
                    <h2 className="text-base sm:text-lg font-bold text-zinc-900">Payment Method</h2>
                    <p className="mt-2 text-xs sm:text-sm text-zinc-500">Choose your preferred payment method</p>
                    <div className="mt-4 grid grid-cols-2 gap-2 sm:gap-3">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('online')}
                        className={`flex flex-col items-center gap-1.5 sm:gap-2 rounded-[10px] border-2 p-3 sm:p-4 transition-all ${
                          paymentMethod === 'online'
                            ? ''
                            : 'border-zinc-200 hover:border-zinc-300'
                        }`}
                        style={paymentMethod === 'online' ? { borderColor: '#685BC7', backgroundColor: 'rgba(104, 91, 199, 0.05)' } : {}}
                      >
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-5 w-5 sm:h-6 sm:w-6" style={{ color: paymentMethod === 'online' ? '#685BC7' : '#71717a' }} />
                          <Smartphone className="h-5 w-5 sm:h-6 sm:w-6" style={{ color: paymentMethod === 'online' ? '#685BC7' : '#71717a' }} />
                        </div>
                        <span className={`text-[10px] sm:text-xs font-medium ${paymentMethod === 'online' ? '' : 'text-zinc-500'}`} style={paymentMethod === 'online' ? { color: '#685BC7' } : {}}>
                          Pay Online
                        </span>
                        <span className="text-[9px] sm:text-[10px] text-zinc-400">UPI / Card / Netbanking</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('cod')}
                        className={`flex flex-col items-center gap-1.5 sm:gap-2 rounded-[10px] border-2 p-3 sm:p-4 transition-all ${
                          paymentMethod === 'cod'
                            ? ''
                            : 'border-zinc-200 hover:border-zinc-300'
                        }`}
                        style={paymentMethod === 'cod' ? { borderColor: '#685BC7', backgroundColor: 'rgba(104, 91, 199, 0.05)' } : {}}
                      >
                        <Building className="h-5 w-5 sm:h-6 sm:w-6" style={{ color: paymentMethod === 'cod' ? '#685BC7' : '#71717a' }} />
                        <span className={`text-[10px] sm:text-xs font-medium ${paymentMethod === 'cod' ? '' : 'text-zinc-500'}`} style={paymentMethod === 'cod' ? { color: '#685BC7' } : {}}>
                          Cash on Delivery
                        </span>
                        <span className="text-[9px] sm:text-[10px] text-zinc-400">Pay when delivered</span>
                      </button>
                    </div>
                    <div className="mt-4">
                      <label className="block text-xs sm:text-sm font-medium text-zinc-700">Order Notes (Optional)</label>
                      <textarea
                        placeholder="Any special instructions..."
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        className="mt-1.5 w-full rounded-[10px] border border-zinc-200 px-3 py-2.5 sm:py-3 text-sm focus:border-zinc-400 focus:outline-none resize-none"
                        rows={2}
                      />
                    </div>

                    {/* Mobile Place Order Button */}
                    <button
                      type="submit"
                      disabled={isLoading || (paymentMethod === 'online' && !razorpayLoaded)}
                      className="lg:hidden mt-4 flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold text-white disabled:opacity-50"
                      style={{ backgroundColor: '#685BC7' }}
                    >
                      <Lock className="h-4 w-4" />
                      {isLoading ? 'Processing...' : paymentMethod === 'online' ? `Pay Now • ${formatPrice(total)}` : `Place Order (COD) • ${formatPrice(total)}`}
                    </button>
                  </div>
                )}
              </div>

              {/* Order Summary - Desktop */}
              <div className="hidden lg:block lg:col-span-1">
                <div className="sticky top-24 rounded-[10px] bg-white p-6">
                  <h2 className="text-lg font-bold text-zinc-900">Order Summary</h2>
                  <div className="mt-4 max-h-48 space-y-3 overflow-y-auto">
                    {items.map((item) => (
                      <div key={item.productId} className="flex gap-3">
                        <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg bg-zinc-100">
                          <Image src={item.image || '/placeholder-product.jpg'} alt={item.name} fill className="object-cover" />
                          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-zinc-900 text-xs text-white">{item.quantity}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-zinc-900 truncate">{item.name}</p>
                          <p className="text-sm text-zinc-500">{formatPrice(item.price * item.quantity)}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Coupon Code - Desktop */}
                  <div className="mt-4 pt-4 border-t border-zinc-100">
                    <label className="text-sm font-medium text-zinc-700">Coupon Code</label>
                    {appliedCoupon ? (
                      <div className="mt-2 flex items-center justify-between rounded-[10px] px-4 py-3" style={{ backgroundColor: 'rgba(104, 91, 199, 0.1)' }}>
                        <div className="flex items-center gap-2">
                          <Tag className="h-4 w-4" style={{ color: '#685BC7' }} />
                          <span className="font-medium" style={{ color: '#685BC7' }}>{appliedCoupon.code}</span>
                        </div>
                        <button type="button" onClick={handleRemoveCoupon} className="text-sm hover:underline" style={{ color: '#685BC7' }}>Remove</button>
                      </div>
                    ) : (
                      <div className="mt-2 flex gap-2">
                        <input
                          type="text"
                          placeholder="Enter code"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          className="flex-1 rounded-[10px] border border-zinc-200 px-3 py-2.5 text-sm focus:border-zinc-400 focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={handleApplyCoupon}
                          disabled={isApplyingCoupon}
                          className="rounded-[10px] border border-zinc-200 px-4 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50 disabled:opacity-50"
                        >
                          {isApplyingCoupon ? '...' : 'Apply'}
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 space-y-2 border-t border-zinc-100 pt-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-500">Subtotal</span>
                      <span className="text-zinc-900">{formatPrice(subtotal)}</span>
                    </div>
                    {appliedCoupon && (
                      <div className="flex justify-between text-sm" style={{ color: '#685BC7' }}>
                        <span>Discount ({appliedCoupon.code})</span>
                        <span>-{formatPrice(discountAmount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-500">Shipping</span>
                      <span style={{ color: '#685BC7' }}>Free</span>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between border-t border-zinc-100 pt-4">
                    <span className="text-lg font-semibold text-zinc-900">Total</span>
                    <span className="text-lg font-bold text-zinc-900">{formatPrice(total)}</span>
                  </div>
                  {currentStep === 3 && (
                    <button
                      type="submit"
                      disabled={isLoading || (paymentMethod === 'online' && !razorpayLoaded)}
                      className="mt-5 flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold text-white disabled:opacity-50"
                      style={{ backgroundColor: '#685BC7' }}
                    >
                      <Lock className="h-4 w-4" />
                      {isLoading ? 'Processing...' : paymentMethod === 'online' ? 'Pay Now' : 'Place Order (COD)'}
                    </button>
                  )}
                  <p className="mt-4 text-center text-xs text-zinc-500">By placing this order, you agree to our Terms of Service.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
    </>
  )
}
