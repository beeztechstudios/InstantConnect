'use client'

import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Truck, ShieldCheck, Gift, Star } from 'lucide-react'
import { useState } from 'react'

const productLinks = [
  { name: 'NFC Cards', href: '/shop?category=nfc-cards' },
  { name: 'QR Cards', href: '/shop?category=qr-cards', highlight: true },
  { name: 'Standees', href: '/shop?category=standees' },
  { name: 'Key Chain', href: '/shop?category=keychains' },
  { name: 'Table Tents', href: '/shop?category=table-tents' },
]

const exploreLinks = [
  { name: 'About Us', href: '/about' },
  { name: 'Shop All', href: '/shop' },
  { name: 'How It Works', href: '/how-it-works' },
  { name: 'AI Review Card', href: '/ai-review-card', featured: true },
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
      <div className="mx-auto max-w-[95%] px-4 py-8 sm:py-12">
        <div className="grid gap-6 sm:gap-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-12">
          {/* Address & Email */}
          <div className="col-span-2 sm:col-span-3 md:col-span-3">
            <div className="flex items-start gap-2 sm:gap-3">
              <div className="flex h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0 items-center justify-center rounded-full border border-zinc-400">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-zinc-600" />
              </div>
              <div className="text-xs sm:text-sm text-zinc-600">
                <p>Siddharth nagar,</p>
                <p>opposite of Miraj Malhar appartment,</p>
                <p>New Bhupalpura, Udaipur, Rajasthan 313001</p>
              </div>
            </div>
            <a
              href="mailto:support@instantconnect.in"
              className="mt-3 sm:mt-4 block text-base sm:text-xl font-semibold text-zinc-900 underline decoration-zinc-400 underline-offset-4 hover:decoration-zinc-900 break-all sm:break-normal"
            >
              support@instantconnect.in
            </a>
          </div>

          {/* Product Links */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xs sm:text-sm text-zinc-500">Product</h3>
            <ul className="mt-2 sm:mt-3 space-y-1.5 sm:space-y-2">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-xs sm:text-sm text-zinc-900 hover:underline ${
                      link.highlight ? 'inline-block rounded border border-zinc-400 px-1.5 sm:px-2 py-0.5' : ''
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore Links */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xs sm:text-sm text-zinc-500">Explore</h3>
            <ul className="mt-2 sm:mt-3 space-y-1.5 sm:space-y-2">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-1 text-xs sm:text-sm text-zinc-900 hover:underline"
                  >
                    {link.featured && <Star className="h-2.5 w-2.5 sm:h-3 sm:w-3 fill-violet-500 text-violet-500" />}
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xs sm:text-sm text-zinc-500">Support</h3>
            <ul className="mt-2 sm:mt-3 space-y-1.5 sm:space-y-2">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-zinc-900 hover:underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-xs sm:text-sm text-zinc-500">Social</h3>
            <ul className="mt-2 sm:mt-3 space-y-1.5 sm:space-y-2">
              {socialLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs sm:text-sm text-zinc-900 hover:underline"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Badges */}
          <div className="col-span-2 sm:col-span-3 md:col-span-2 space-y-2 sm:space-y-3 mt-4 sm:mt-0">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-zinc-600">
              <Truck className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>Free Shipping*</span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-zinc-600">
              <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>Secured Payments</span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-zinc-600">
              <Gift className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>Surprises</span>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 sm:mt-12 grid items-end gap-6 sm:gap-8 md:grid-cols-12">
          {/* Logo */}
          <div className="md:col-span-4">
            <Link href="/">
              <Image
                src="/logo.svg"
                alt="Instant Connect"
                width={180}
                height={63}
                className="h-10 sm:h-14 w-auto"
              />
            </Link>
            <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-zinc-600">
              Copyright &copy; 2025 <span className="text-violet-600">Instant Connect</span> All Rights Reserved.
            </p>
          </div>

          {/* Spacer */}
          <div className="hidden md:block md:col-span-2" />

          {/* Newsletter Card */}
          <div className="md:col-span-6">
            <div className="flex flex-col overflow-hidden rounded-xl bg-violet-600 sm:flex-row">
              {/* Image */}
              <div
                className="hidden h-32 bg-cover bg-center sm:block sm:h-auto sm:w-1/3"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=500&auto=format&fit=crop')`,
                }}
              />
              {/* Form */}
              <div className="flex-1 p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-white md:text-xl">Newsletter signup</h3>
                <p className="mt-1 text-xs sm:text-sm text-white/80">
                  Sign up to receive more information about our products
                </p>
                <div className="mt-3 sm:mt-4 flex flex-col gap-2 sm:flex-row">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@gmail.com"
                    className="w-full rounded-lg bg-violet-500/50 px-3 py-2 sm:px-4 sm:py-2.5 text-sm text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-white/50 sm:flex-1"
                  />
                  <button className="w-full rounded-lg bg-white px-4 py-2 sm:px-5 sm:py-2.5 text-sm font-semibold text-zinc-900 hover:bg-zinc-100 sm:w-auto">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Policy Links */}
        <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-6 border-t border-zinc-300 pt-4 sm:pt-6">
          {policyLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs sm:text-sm text-zinc-600 hover:text-zinc-900"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
