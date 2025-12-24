'use client'

import Link from 'next/link'
import { MapPin, Truck, ShieldCheck, Gift } from 'lucide-react'
import { useState } from 'react'

const productLinks = [
  { name: 'NFC Cards', href: '/shop/nfc-cards' },
  { name: 'QR Cards', href: '/shop/qr-cards', highlight: true },
  { name: 'Standees', href: '/shop/standees' },
  { name: 'Key Chain', href: '/shop/keychains' },
  { name: 'Table Tents', href: '/shop/table-tents' },
]

const exploreLinks = [
  { name: 'About Us', href: '/about' },
  { name: 'Shop All', href: '/shop' },
  { name: 'How It Works', href: '/how-it-works' },
  { name: 'AI Review Card', href: '/ai-review-card' },
  { name: 'Blogs / Articles', href: '/blog' },
]

const supportLinks = [
  { name: 'Track Order', href: '/track-order' },
  { name: 'FAQs', href: '/faqs' },
  { name: 'Contact Support', href: '/contact' },
  { name: 'Bulk / Corporate Enquiry', href: '/contact?type=bulk' },
]

const socialLinks = [
  { name: 'Instagram', href: 'https://instagram.com' },
  { name: 'Facebook', href: 'https://facebook.com' },
  { name: 'Twitter', href: 'https://twitter.com' },
  { name: 'Linkedin', href: 'https://linkedin.com' },
  { name: 'Youtube', href: 'https://youtube.com' },
]

const policyLinks = [
  { name: 'Fraudulent Websites', href: '/fraudulent-websites' },
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Terms of Service', href: '/terms' },
  { name: 'Refund policy', href: '/refund' },
  { name: 'Delivery Policy', href: '/delivery' },
]

export function Footer() {
  const [email, setEmail] = useState('')

  return (
    <footer className="bg-zinc-200">
      {/* Main Footer */}
      <div className="mx-auto max-w-[95%] px-4 py-12">
        <div className="grid gap-8 md:grid-cols-12">
          {/* Address & Email */}
          <div className="md:col-span-3">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-zinc-400">
                <MapPin className="h-5 w-5 text-zinc-600" />
              </div>
              <div className="text-sm text-zinc-600">
                <p>Siddharth nagar,</p>
                <p>opposite of Miraj Malhar appartment,</p>
                <p>New Bhupalpura, Udaipur, Rajasthan 313001</p>
              </div>
            </div>
            <a
              href="mailto:support@instantconnect.in"
              className="mt-4 block text-xl font-semibold text-zinc-900 underline decoration-zinc-400 underline-offset-4 hover:decoration-zinc-900"
            >
              support@instantconnect.in
            </a>
          </div>

          {/* Product Links */}
          <div className="md:col-span-2">
            <h3 className="text-sm text-zinc-500">Product</h3>
            <ul className="mt-3 space-y-2">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-sm text-zinc-900 hover:underline ${
                      link.highlight ? 'inline-block rounded border border-zinc-400 px-2 py-0.5' : ''
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore Links */}
          <div className="md:col-span-2">
            <h3 className="text-sm text-zinc-500">Explore</h3>
            <ul className="mt-3 space-y-2">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-900 hover:underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="md:col-span-2">
            <h3 className="text-sm text-zinc-500">Support</h3>
            <ul className="mt-3 space-y-2">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-900 hover:underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="md:col-span-1">
            <h3 className="text-sm text-zinc-500">Social</h3>
            <ul className="mt-3 space-y-2">
              {socialLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-zinc-900 hover:underline"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Badges */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2 text-sm text-zinc-600">
              <Truck className="h-5 w-5" />
              <span>Free Shipping*</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-zinc-600">
              <ShieldCheck className="h-5 w-5" />
              <span>Secured Payments</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-zinc-600">
              <Gift className="h-5 w-5" />
              <span>Surprises</span>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 grid items-end gap-8 md:grid-cols-12">
          {/* Logo */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-3">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-violet-500">
                <span className="text-3xl font-bold text-violet-500">IC</span>
              </div>
              <div>
                <span className="text-3xl font-bold text-zinc-400">Instant</span>
                <br />
                <span className="text-3xl font-bold text-zinc-400">Connect</span>
              </div>
            </div>
            <p className="mt-4 text-sm text-zinc-600">
              Copyright &copy; 2025 <span className="text-violet-600">Instant Connect</span> All Rights Reserved.
            </p>
          </div>

          {/* Spacer */}
          <div className="md:col-span-2" />

          {/* Newsletter Card */}
          <div className="md:col-span-6">
            <div className="flex flex-col overflow-hidden rounded-xl bg-orange-500 sm:flex-row">
              {/* Image */}
              <div
                className="hidden h-32 bg-cover bg-center sm:block sm:h-auto sm:w-1/3"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=500&auto=format&fit=crop')`,
                }}
              />
              {/* Form */}
              <div className="flex-1 p-4 sm:p-6">
                <h3 className="text-lg font-semibold text-white sm:text-xl">Newsletter signup</h3>
                <p className="mt-1 text-sm text-white/80">
                  Sign up to receive more information about our products
                </p>
                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@gmail.com"
                    className="w-full rounded-lg bg-orange-400/50 px-4 py-2.5 text-sm text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-white/50 sm:flex-1"
                  />
                  <button className="w-full rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-zinc-900 hover:bg-zinc-100 sm:w-auto">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Policy Links */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 border-t border-zinc-300 pt-6">
          {policyLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-zinc-600 hover:text-zinc-900"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
