'use client'

import { Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, Package, Truck, CreditCard, Copy, Check, ArrowRight, ChevronRight, User, Building2, Phone, Mail, Globe, MessageSquare } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import toast from 'react-hot-toast'

function OrderSuccessContent() {
  const searchParams = useSearchParams()
  const orderNumber = searchParams.get('order')
  const [copied, setCopied] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    companyName: '',
    phone: '',
    email: '',
    website: '',
    socialLinks: '',
    additionalNotes: '',
  })

  const copyOrderNumber = () => {
    if (orderNumber) {
      navigator.clipboard.writeText(orderNumber)
      setCopied(true)
      toast.success('Order number copied!')
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const supabase = createClient()

      const { data: order } = await supabase
        .from('orders')
        .select('id')
        .eq('order_number', orderNumber)
        .single()

      if (order) {
        await supabase.from('post_payment_details').insert([
          {
            order_id: order.id,
            detail_type: 'card_details',
            detail_data: formData,
          },
        ])
      }

      setSubmitted(true)
      toast.success('Details submitted successfully!')
    } catch (error) {
      console.error('Error submitting details:', error)
      toast.error('Failed to submit details. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!orderNumber) {
    return (
      <div className="min-h-screen bg-zinc-100">
        <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-zinc-200">
            <Package className="h-10 w-10 text-zinc-400" />
          </div>
          <h1 className="mt-6 text-2xl font-bold text-zinc-900">
            No order found
          </h1>
          <p className="mt-2 text-zinc-500">
            Please check your order confirmation email.
          </p>
          <Link
            href="/"
            className="mt-6 rounded-lg bg-zinc-900 px-6 py-3 text-sm font-semibold text-white hover:bg-zinc-800"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    )
  }

  const timelineSteps = [
    {
      icon: CheckCircle,
      title: 'Order Confirmed',
      description: 'Your order has been placed successfully',
      status: 'completed',
    },
    {
      icon: CreditCard,
      title: 'Processing',
      description: 'We\'ll process your order within 24 hours',
      status: 'current',
    },
    {
      icon: Truck,
      title: 'Shipped',
      description: 'You\'ll receive tracking details via email',
      status: 'pending',
    },
    {
      icon: Package,
      title: 'Delivered',
      description: 'Expected within 5-7 business days',
      status: 'pending',
    },
  ]

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
            <span className="font-medium text-zinc-900">Order Confirmed</span>
          </nav>
        </div>
      </div>

      {/* Success Header */}
      <div className="flex justify-center bg-zinc-100 py-8">
        <div className="w-[95%]">
          <div className="rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 p-8 text-center md:p-12">
            {/* Animated Checkmark */}
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white">
                <CheckCircle className="h-8 w-8 text-teal-500" />
              </div>
            </div>
            <h1 className="mt-6 text-3xl font-bold text-white md:text-4xl">
              Order Confirmed!
            </h1>
            <p className="mt-2 text-teal-100">
              Thank you for your order. We&apos;ll send you a confirmation email shortly.
            </p>

            {/* Order Number */}
            <div className="mx-auto mt-6 inline-flex items-center gap-3 rounded-lg bg-white/10 px-6 py-3 backdrop-blur-sm">
              <div className="text-left">
                <p className="text-xs text-teal-100">Order Number</p>
                <p className="font-mono text-lg font-bold text-white">{orderNumber}</p>
              </div>
              <button
                onClick={copyOrderNumber}
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 text-white hover:bg-white/30"
              >
                {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center bg-zinc-100 pb-8">
        <div className="w-[95%]">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Left Column - Timeline & Form */}
            <div className="space-y-6 lg:col-span-2">
              {/* What's Next Timeline */}
              <div className="rounded-xl bg-white p-6">
                <h2 className="text-lg font-bold text-zinc-900">What&apos;s Next?</h2>
                <div className="mt-6 space-y-0">
                  {timelineSteps.map((step, index) => {
                    const Icon = step.icon
                    const isLast = index === timelineSteps.length - 1
                    return (
                      <div key={step.title} className="relative flex gap-4">
                        {/* Line */}
                        {!isLast && (
                          <div className="absolute left-5 top-10 h-full w-0.5 bg-zinc-200" />
                        )}
                        {/* Icon */}
                        <div
                          className={`relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${
                            step.status === 'completed'
                              ? 'bg-teal-500 text-white'
                              : step.status === 'current'
                              ? 'bg-teal-100 text-teal-600'
                              : 'bg-zinc-100 text-zinc-400'
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        {/* Content */}
                        <div className={`pb-8 ${isLast ? 'pb-0' : ''}`}>
                          <h3
                            className={`font-semibold ${
                              step.status === 'completed' || step.status === 'current'
                                ? 'text-zinc-900'
                                : 'text-zinc-400'
                            }`}
                          >
                            {step.title}
                          </h3>
                          <p className="text-sm text-zinc-500">{step.description}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Post-Payment Form */}
              {!submitted ? (
                <div className="rounded-xl bg-white p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-violet-100">
                      <User className="h-5 w-5 text-violet-600" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-zinc-900">
                        Card/Product Details
                      </h2>
                      <p className="text-sm text-zinc-500">
                        Please provide the details you want printed on your NFC card or product.
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-zinc-700">
                          Full Name *
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                          <input
                            type="text"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                            className="w-full rounded-lg border border-zinc-200 py-2.5 pl-10 pr-4 text-sm focus:border-zinc-400 focus:outline-none"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-zinc-700">
                          Designation/Title
                        </label>
                        <input
                          type="text"
                          placeholder="Marketing Manager"
                          value={formData.designation}
                          onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                          className="w-full rounded-lg border border-zinc-200 px-4 py-2.5 text-sm focus:border-zinc-400 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-zinc-700">
                          Company Name
                        </label>
                        <div className="relative">
                          <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                          <input
                            type="text"
                            placeholder="Acme Inc."
                            value={formData.companyName}
                            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                            className="w-full rounded-lg border border-zinc-200 py-2.5 pl-10 pr-4 text-sm focus:border-zinc-400 focus:outline-none"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-zinc-700">
                          Phone Number
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                          <input
                            type="tel"
                            placeholder="+91 98765 43210"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full rounded-lg border border-zinc-200 py-2.5 pl-10 pr-4 text-sm focus:border-zinc-400 focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-zinc-700">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                          <input
                            type="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full rounded-lg border border-zinc-200 py-2.5 pl-10 pr-4 text-sm focus:border-zinc-400 focus:outline-none"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-zinc-700">
                          Website URL
                        </label>
                        <div className="relative">
                          <Globe className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                          <input
                            type="url"
                            placeholder="https://yourwebsite.com"
                            value={formData.website}
                            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                            className="w-full rounded-lg border border-zinc-200 py-2.5 pl-10 pr-4 text-sm focus:border-zinc-400 focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-zinc-700">
                        Social Media Links
                      </label>
                      <textarea
                        placeholder="LinkedIn: linkedin.com/in/johndoe&#10;Instagram: @johndoe&#10;Twitter: @johndoe"
                        value={formData.socialLinks}
                        onChange={(e) => setFormData({ ...formData, socialLinks: e.target.value })}
                        rows={3}
                        className="w-full rounded-lg border border-zinc-200 px-4 py-2.5 text-sm focus:border-zinc-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-zinc-700">
                        Additional Notes
                      </label>
                      <div className="relative">
                        <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                        <textarea
                          placeholder="Any specific requests or instructions..."
                          value={formData.additionalNotes}
                          onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                          rows={2}
                          className="w-full rounded-lg border border-zinc-200 py-2.5 pl-10 pr-4 text-sm focus:border-zinc-400 focus:outline-none"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full rounded-lg bg-zinc-900 py-3 text-sm font-semibold text-white hover:bg-zinc-800 disabled:opacity-50"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Details'}
                    </button>
                  </form>
                </div>
              ) : (
                <div className="rounded-xl border-2 border-teal-200 bg-teal-50 p-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-100">
                      <CheckCircle className="h-6 w-6 text-teal-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-teal-800">Details Submitted Successfully</h3>
                      <p className="text-sm text-teal-600">
                        We&apos;ll use these details to personalize your order.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Actions */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-4">
                {/* Quick Actions */}
                <div className="rounded-xl bg-white p-6">
                  <h3 className="font-bold text-zinc-900">Quick Actions</h3>
                  <div className="mt-4 space-y-3">
                    <Link
                      href={`/track-order?order=${orderNumber}`}
                      className="flex w-full items-center justify-between rounded-lg bg-zinc-900 px-4 py-3 text-sm font-semibold text-white hover:bg-zinc-800"
                    >
                      Track Order
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href="/shop"
                      className="flex w-full items-center justify-center rounded-lg border border-zinc-200 px-4 py-3 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
                    >
                      Continue Shopping
                    </Link>
                  </div>
                </div>

                {/* Need Help */}
                <div className="rounded-xl bg-white p-6">
                  <h3 className="font-bold text-zinc-900">Need Help?</h3>
                  <p className="mt-2 text-sm text-zinc-500">
                    Our support team is here to assist you with any questions.
                  </p>
                  <div className="mt-4 space-y-3">
                    <a
                      href="mailto:support@instantconnect.com"
                      className="flex items-center gap-3 text-sm text-zinc-600 hover:text-zinc-900"
                    >
                      <Mail className="h-4 w-4" />
                      support@instantconnect.com
                    </a>
                    <a
                      href="tel:+919876543210"
                      className="flex items-center gap-3 text-sm text-zinc-600 hover:text-zinc-900"
                    >
                      <Phone className="h-4 w-4" />
                      +91 98765 43210
                    </a>
                  </div>
                  <Link
                    href="/contact"
                    className="mt-4 inline-block text-sm font-medium text-teal-600 hover:text-teal-700"
                  >
                    Contact Support →
                  </Link>
                </div>

                {/* Share */}
                <div className="rounded-xl bg-gradient-to-br from-violet-500 to-violet-600 p-6 text-white">
                  <h3 className="font-bold">Love Instant Connect?</h3>
                  <p className="mt-2 text-sm text-violet-100">
                    Share your experience with friends and get 10% off on your next order!
                  </p>
                  <button className="mt-4 w-full rounded-lg bg-white/20 px-4 py-2.5 text-sm font-semibold backdrop-blur-sm hover:bg-white/30">
                    Share & Earn
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-zinc-100">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-300 border-t-zinc-900" />
        </div>
      }
    >
      <OrderSuccessContent />
    </Suspense>
  )
}
