'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChevronRight, Lock, CreditCard, Smartphone, Building, Check } from 'lucide-react'
import { useCart } from '@/contexts/cart-context'
import { formatPrice, generateOrderNumber } from '@/lib/utils'
import { createClient } from '@/utils/supabase/client'
import toast from 'react-hot-toast'

const steps = [
  { id: 1, name: 'Contact' },
  { id: 2, name: 'Shipping' },
  { id: 3, name: 'Payment' },
]

export default function CheckoutPage() {
  const router = useRouter()
  const { items, subtotal, clearCart } = useCart()
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [sameAsShipping, setSameAsShipping] = useState(true)

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const supabase = createClient()

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

      if (customerError) throw customerError

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
          status: 'confirmed',
          subtotal: subtotal,
          discount: 0,
          shipping: 0,
          total: subtotal,
          shipping_address: shippingAddress,
          billing_address: billingAddress,
          notes: formData.notes,
        }])
        .select()
        .single()

      if (orderError) throw orderError

      const orderItems = items.map((item) => ({
        order_id: order.id,
        product_id: item.productId,
        product_name: item.name,
        product_image: item.image,
        quantity: item.quantity,
        unit_price: item.price,
        total_price: item.price * item.quantity,
      }))

      await supabase.from('order_items').insert(orderItems)
      await supabase.from('payments').insert([{
        order_id: order.id,
        amount: subtotal,
        status: 'completed',
        method: 'cod',
      }])

      clearCart()
      toast.success('Order placed successfully!')
      router.push(`/order-success?order=${orderNumber}`)
    } catch (error) {
      console.error('Checkout error:', error)
      toast.error('Failed to place order. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-zinc-100">
        <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
          <h1 className="text-2xl font-bold text-zinc-900">Your cart is empty</h1>
          <p className="mt-2 text-zinc-500">Add some products to checkout.</p>
          <Link href="/shop" className="mt-6 rounded-lg bg-zinc-900 px-6 py-3 text-sm font-semibold text-white hover:bg-zinc-800">
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
            <Link href="/" className="text-zinc-500 hover:text-zinc-700">Home</Link>
            <ChevronRight className="h-4 w-4 text-zinc-400" />
            <Link href="/cart" className="text-zinc-500 hover:text-zinc-700">Cart</Link>
            <ChevronRight className="h-4 w-4 text-zinc-400" />
            <span className="font-medium text-zinc-900">Checkout</span>
          </nav>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="flex justify-center bg-zinc-100 py-6">
        <div className="w-[95%]">
          <div className="flex items-center justify-center">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center gap-2 ${currentStep >= step.id ? 'text-zinc-900' : 'text-zinc-400'}`}>
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                    currentStep > step.id ? 'bg-teal-500 text-white' : currentStep === step.id ? 'bg-zinc-900 text-white' : 'bg-zinc-200 text-zinc-500'
                  }`}>
                    {currentStep > step.id ? <Check className="h-4 w-4" /> : step.id}
                  </div>
                  <span className="hidden text-sm font-medium sm:inline">{step.name}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`mx-4 h-px w-12 sm:w-24 ${currentStep > step.id ? 'bg-teal-500' : 'bg-zinc-200'}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Checkout Content */}
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center bg-zinc-100 pb-8">
          <div className="w-[95%]">
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Form Sections */}
              <div className="space-y-4 lg:col-span-2">
                {/* Contact Information */}
                <div className="rounded-xl bg-white p-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-zinc-900">Contact Information</h2>
                    {currentStep > 1 && (
                      <button type="button" onClick={() => setCurrentStep(1)} className="text-sm text-teal-600 hover:text-teal-700">Edit</button>
                    )}
                  </div>
                  {currentStep === 1 ? (
                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium text-zinc-700">Email Address</label>
                        <input type="email" placeholder="john@example.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2.5 text-sm focus:border-zinc-400 focus:outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-zinc-700">Phone Number</label>
                        <input type="tel" placeholder="+91 98765 43210" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2.5 text-sm focus:border-zinc-400 focus:outline-none" />
                      </div>
                      <div className="sm:col-span-2">
                        <button type="button" onClick={() => setCurrentStep(2)} className="w-full rounded-lg bg-zinc-900 py-3 text-sm font-semibold text-white hover:bg-zinc-800">Continue to Shipping</button>
                      </div>
                    </div>
                  ) : (
                    <p className="mt-2 text-sm text-zinc-500">{formData.email} • {formData.phone}</p>
                  )}
                </div>

                {/* Shipping Address */}
                {currentStep >= 2 && (
                  <div className="rounded-xl bg-white p-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-bold text-zinc-900">Shipping Address</h2>
                      {currentStep > 2 && (
                        <button type="button" onClick={() => setCurrentStep(2)} className="text-sm text-teal-600 hover:text-teal-700">Edit</button>
                      )}
                    </div>
                    {currentStep === 2 ? (
                      <div className="mt-4 grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="block text-sm font-medium text-zinc-700">First Name</label>
                          <input type="text" placeholder="John" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} required className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2.5 text-sm focus:border-zinc-400 focus:outline-none" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-zinc-700">Last Name</label>
                          <input type="text" placeholder="Doe" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} required className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2.5 text-sm focus:border-zinc-400 focus:outline-none" />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-sm font-medium text-zinc-700">Address</label>
                          <textarea placeholder="House/Flat No., Street, Landmark" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} required className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2.5 text-sm focus:border-zinc-400 focus:outline-none" rows={2} />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-zinc-700">City</label>
                          <input type="text" placeholder="Mumbai" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} required className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2.5 text-sm focus:border-zinc-400 focus:outline-none" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-zinc-700">State</label>
                          <input type="text" placeholder="Maharashtra" value={formData.state} onChange={(e) => setFormData({ ...formData, state: e.target.value })} required className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2.5 text-sm focus:border-zinc-400 focus:outline-none" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-zinc-700">PIN Code</label>
                          <input type="text" placeholder="400001" value={formData.pincode} onChange={(e) => setFormData({ ...formData, pincode: e.target.value })} required className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2.5 text-sm focus:border-zinc-400 focus:outline-none" />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" checked={sameAsShipping} onChange={(e) => setSameAsShipping(e.target.checked)} className="h-4 w-4 rounded border-zinc-300" />
                            <span className="text-sm text-zinc-600">Billing address same as shipping</span>
                          </label>
                        </div>
                        <div className="sm:col-span-2">
                          <button type="button" onClick={() => setCurrentStep(3)} className="w-full rounded-lg bg-zinc-900 py-3 text-sm font-semibold text-white hover:bg-zinc-800">Continue to Payment</button>
                        </div>
                      </div>
                    ) : (
                      <p className="mt-2 text-sm text-zinc-500">{formData.firstName} {formData.lastName}, {formData.address}, {formData.city}, {formData.state} - {formData.pincode}</p>
                    )}
                  </div>
                )}

                {/* Payment */}
                {currentStep >= 3 && (
                  <div className="rounded-xl bg-white p-6">
                    <h2 className="text-lg font-bold text-zinc-900">Payment Method</h2>
                    <p className="mt-2 text-sm text-zinc-500">Payment integration coming soon. Orders will be placed as COD.</p>
                    <div className="mt-4 grid grid-cols-3 gap-3">
                      <div className="flex flex-col items-center gap-2 rounded-lg border border-zinc-200 p-4 opacity-50">
                        <Smartphone className="h-6 w-6 text-zinc-400" />
                        <span className="text-xs text-zinc-500">UPI</span>
                      </div>
                      <div className="flex flex-col items-center gap-2 rounded-lg border border-zinc-200 p-4 opacity-50">
                        <CreditCard className="h-6 w-6 text-zinc-400" />
                        <span className="text-xs text-zinc-500">Card</span>
                      </div>
                      <div className="flex flex-col items-center gap-2 rounded-lg border-2 border-teal-500 bg-teal-50 p-4">
                        <Building className="h-6 w-6 text-teal-600" />
                        <span className="text-xs font-medium text-teal-700">COD</span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-zinc-700">Order Notes (Optional)</label>
                      <textarea placeholder="Any special instructions..." value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2.5 text-sm focus:border-zinc-400 focus:outline-none" rows={2} />
                    </div>
                  </div>
                )}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 rounded-xl bg-white p-6">
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
                  <div className="mt-4 space-y-2 border-t border-zinc-100 pt-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-500">Subtotal</span>
                      <span className="text-zinc-900">{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-500">Shipping</span>
                      <span className="text-teal-600">Free</span>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between border-t border-zinc-100 pt-4">
                    <span className="text-lg font-semibold text-zinc-900">Total</span>
                    <span className="text-lg font-bold text-zinc-900">{formatPrice(subtotal)}</span>
                  </div>
                  {currentStep === 3 && (
                    <button type="submit" disabled={isLoading} className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-zinc-900 py-3 text-sm font-semibold text-white hover:bg-zinc-800 disabled:opacity-50">
                      <Lock className="h-4 w-4" />
                      {isLoading ? 'Processing...' : 'Place Order'}
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
  )
}
