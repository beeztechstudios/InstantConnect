'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, MapPin, Phone, Mail, Clock, Send, MessageSquare, Users, Building2 } from 'lucide-react'
import toast from 'react-hot-toast'

const contactInfo = [
  {
    icon: MapPin,
    title: 'Visit Us',
    details: ['Siddharth Nagar, Opp. Miraj Malhar Apt.', 'New Bhupalpura, Udaipur', 'Rajasthan 313001, India'],
    color: 'bg-violet-100 text-violet-600',
  },
  {
    icon: Phone,
    title: 'Call Us',
    details: ['+91 98765 43210', '+91 98765 43211'],
    color: 'bg-teal-100 text-teal-600',
  },
  {
    icon: Mail,
    title: 'Email Us',
    details: ['hello@instantconnect.in', 'support@instantconnect.in'],
    color: 'bg-orange-100 text-orange-600',
  },
  {
    icon: Clock,
    title: 'Business Hours',
    details: ['Monday - Friday: 9 AM - 6 PM', 'Saturday: 10 AM - 4 PM'],
    color: 'bg-rose-100 text-rose-600',
  },
]

const inquiryTypes = [
  { value: 'general', label: 'General Inquiry', icon: MessageSquare },
  { value: 'bulk', label: 'Bulk Order Inquiry', icon: Users },
  { value: 'support', label: 'Technical Support', icon: Building2 },
]

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedType, setSelectedType] = useState('general')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    await new Promise((r) => setTimeout(r, 1500))

    toast.success('Message sent successfully! We\'ll get back to you soon.')
    setFormData({ name: '', email: '', phone: '', company: '', subject: '', message: '' })
    setIsSubmitting(false)
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
            <span className="font-medium text-zinc-900">Contact</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="flex justify-center bg-zinc-100 py-6">
        <div className="w-[95%]">
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 px-8 py-16 text-center md:py-20">
            <div className="relative z-10">
              <span className="inline-block rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
                We&apos;re Here to Help
              </span>
              <h1 className="mt-6 text-4xl font-bold text-white md:text-5xl">
                Get in Touch
              </h1>
              <p className="mx-auto mt-4 max-w-xl text-lg text-orange-100">
                Have a question or need help? We&apos;re here to assist you. Reach out and
                we&apos;ll respond as soon as we can.
              </p>
            </div>
            {/* Decorative elements */}
            <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-orange-400/30 blur-3xl" />
            <div className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-orange-400/30 blur-3xl" />
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="flex justify-center bg-zinc-100 py-6">
        <div className="w-[95%]">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {contactInfo.map((info) => (
              <div key={info.title} className="rounded-xl bg-white p-6">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${info.color}`}>
                  <info.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-bold text-zinc-900">{info.title}</h3>
                <div className="mt-2 space-y-1">
                  {info.details.map((detail, i) => (
                    <p key={i} className="text-sm text-zinc-500">{detail}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="flex justify-center bg-zinc-100 py-8">
        <div className="w-[95%]">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Form */}
            <div className="lg:col-span-2">
              <div className="rounded-xl bg-white p-6 md:p-8">
                <h2 className="text-2xl font-bold text-zinc-900">Send us a Message</h2>
                <p className="mt-2 text-zinc-500">
                  Fill out the form below and we&apos;ll get back to you within 24 hours.
                </p>

                {/* Inquiry Type Selection */}
                <div className="mt-6">
                  <label className="mb-3 block text-sm font-medium text-zinc-700">
                    What can we help you with?
                  </label>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    {inquiryTypes.map((type) => (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => setSelectedType(type.value)}
                        className={`flex items-center gap-3 rounded-xl border-2 p-4 transition-all sm:flex-col sm:gap-2 ${
                          selectedType === type.value
                            ? 'border-teal-500 bg-teal-50'
                            : 'border-zinc-200 hover:border-zinc-300'
                        }`}
                      >
                        <type.icon className={`h-5 w-5 ${
                          selectedType === type.value ? 'text-teal-600' : 'text-zinc-400'
                        }`} />
                        <span className={`text-sm font-medium sm:text-xs ${
                          selectedType === type.value ? 'text-teal-700' : 'text-zinc-600'
                        }`}>
                          {type.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-zinc-700">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="w-full rounded-lg border border-zinc-200 px-4 py-2.5 text-sm focus:border-zinc-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-zinc-700">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="w-full rounded-lg border border-zinc-200 px-4 py-2.5 text-sm focus:border-zinc-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-zinc-700">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full rounded-lg border border-zinc-200 px-4 py-2.5 text-sm focus:border-zinc-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-zinc-700">
                        Company Name
                      </label>
                      <input
                        type="text"
                        placeholder="Acme Inc."
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full rounded-lg border border-zinc-200 px-4 py-2.5 text-sm focus:border-zinc-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-zinc-700">
                      Subject *
                    </label>
                    <input
                      type="text"
                      placeholder="How can we help you?"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                      className="w-full rounded-lg border border-zinc-200 px-4 py-2.5 text-sm focus:border-zinc-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-zinc-700">
                      Message *
                    </label>
                    <textarea
                      placeholder="Tell us more about your inquiry..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={5}
                      className="w-full rounded-lg border border-zinc-200 px-4 py-2.5 text-sm focus:border-zinc-400 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-zinc-900 px-6 py-3 text-sm font-semibold text-white hover:bg-zinc-800 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      'Sending...'
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Links */}
              <div className="rounded-xl bg-white p-6">
                <h3 className="font-bold text-zinc-900">Quick Links</h3>
                <div className="mt-4 space-y-3">
                  <Link
                    href="/faqs"
                    className="flex items-center gap-3 rounded-lg bg-zinc-50 p-3 text-sm font-medium text-zinc-700 hover:bg-zinc-100"
                  >
                    <MessageSquare className="h-4 w-4 text-zinc-400" />
                    Browse FAQs
                  </Link>
                  <Link
                    href="/track-order"
                    className="flex items-center gap-3 rounded-lg bg-zinc-50 p-3 text-sm font-medium text-zinc-700 hover:bg-zinc-100"
                  >
                    <MapPin className="h-4 w-4 text-zinc-400" />
                    Track Your Order
                  </Link>
                  <Link
                    href="/book-demo"
                    className="flex items-center gap-3 rounded-lg bg-zinc-50 p-3 text-sm font-medium text-zinc-700 hover:bg-zinc-100"
                  >
                    <Users className="h-4 w-4 text-zinc-400" />
                    Book a Demo
                  </Link>
                </div>
              </div>

              {/* Bulk Orders */}
              <div className="rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 p-6 text-white">
                <h3 className="font-bold">Need Bulk Orders?</h3>
                <p className="mt-2 text-sm text-teal-100">
                  Get special pricing for orders of 50+ units. Our team will create a custom quote for your needs.
                </p>
                <button
                  onClick={() => setSelectedType('bulk')}
                  className="mt-4 w-full rounded-lg bg-white/20 px-4 py-2.5 text-sm font-semibold backdrop-blur-sm hover:bg-white/30"
                >
                  Get Bulk Quote
                </button>
              </div>

              {/* Response Time */}
              <div className="rounded-xl bg-zinc-900 p-6 text-white">
                <h3 className="font-bold">Response Time</h3>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-zinc-400">Email</span>
                    <span className="text-sm font-medium">Within 24 hrs</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-zinc-400">Phone</span>
                    <span className="text-sm font-medium">Instant</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-zinc-400">WhatsApp</span>
                    <span className="text-sm font-medium">Within 2 hrs</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="flex justify-center bg-zinc-100 pb-8">
        <div className="w-[95%]">
          <div className="overflow-hidden rounded-xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d906.9171317887766!2d73.70457195584814!3d24.60063329914682!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sSiddharth%20nagar%2C%20%20opposite%20of%20Miraj%20Malhar%20appartment%2C%20%20New%20Bhupalpura%2C%20Udaipur%2C%20Rajasthan%20313001!5e0!3m2!1sen!2sin!4v1766568498695!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            />
          </div>
        </div>
      </section>
    </div>
  )
}
