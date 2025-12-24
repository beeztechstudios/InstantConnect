'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'

const products = [
  {
    id: 1,
    name: 'InstantConnect NFC Card',
    description: 'One-tap profile sharing | No app needed | Instant access',
    price: 999,
    originalPrice: 1299,
    discount: 20,
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?q=80&w=200&auto=format&fit=crop',
    href: '/product/nfc-card',
    isNew: false,
    isLarge: true,
  },
  {
    id: 2,
    name: 'InstantConnect Smart Standee',
    description: 'Collect reviews & leads | Perfect for cafés & stores',
    price: 2999,
    originalPrice: 3499,
    discount: 15,
    image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=200&auto=format&fit=crop',
    href: '/product/smart-standee',
    isNew: true,
    isLarge: false,
  },
  {
    id: 3,
    name: 'InstantConnect NFC Keychain',
    description: 'Tap to share | Compact & durable | Everyday use',
    price: 499,
    originalPrice: 599,
    discount: 10,
    image: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?q=80&w=2070&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?q=80&w=200&auto=format&fit=crop',
    href: '/product/nfc-keychain',
    isNew: true,
    isLarge: false,
  },
]

const announcements = [
  { text: 'profile themes just launched', date: null, badge: null, hasArrow: true },
  { text: 'Smart Standees for cafés & stores', date: '2025.12.24', badge: 'Now Live', hasArrow: true },
  { text: 'instax mini LiPlay+™ was announced', date: '2025.10.14', badge: 'New', hasArrow: false },
]

export function JustDropped() {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scroll = scrollRef.current
    if (!scroll) return

    let animationId: number
    let position = 0

    const animate = () => {
      position -= 0.5
      if (position <= -scroll.scrollWidth / 2) {
        position = 0
      }
      scroll.style.transform = `translateX(${position}px)`
      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationId)
  }, [])

  const renderAnnouncements = () => (
    <>
      {announcements.map((item, index) => (
        <span key={index} className="mx-6 flex items-center gap-2 whitespace-nowrap">
          {item.date && (
            <span className="text-sm text-pink-900/70">{item.date}</span>
          )}
          {item.badge && (
            <span className={`rounded px-2 py-0.5 text-xs font-medium text-white ${
              item.badge === 'Now Live' ? 'bg-teal-500' : 'bg-red-500'
            }`}>
              {item.badge}
            </span>
          )}
          <span className="font-semibold text-pink-900">
            {item.text}
            {item.hasArrow && <span className="ml-1">↗</span>}
          </span>
        </span>
      ))}
    </>
  )

  return (
    <section className="flex flex-col items-center bg-zinc-100 py-8">
      {/* Header */}
      <div className="mb-6 flex w-[95%] flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-zinc-900 sm:text-3xl">Just dropped</h2>
        <Link
          href="/shop"
          className="w-fit rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-800"
        >
          Explore all products
        </Link>
      </div>

      {/* Products Grid */}
      <div className="w-[95%] grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        {/* Large Product Card */}
        <Link href={products[0].href} className="group relative h-[350px] overflow-hidden rounded-xl sm:h-[500px] sm:col-span-2">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
            style={{ backgroundImage: `url('${products[0].image}')` }}
          />
          {/* Product Info Overlay */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 rounded-lg bg-white/95 p-3 shadow-lg backdrop-blur-sm sm:right-auto">
            <div
              className="hidden h-16 w-12 rounded-lg bg-cover bg-center sm:block"
              style={{ backgroundImage: `url('${products[0].thumbnail}')` }}
            />
            <div className="min-w-0 flex-1">
              <h3 className="truncate font-semibold text-zinc-900">{products[0].name}</h3>
              <p className="hidden text-xs text-zinc-500 sm:block">{products[0].description}</p>
              <div className="mt-1 flex flex-wrap items-center gap-2">
                <span className="font-bold text-zinc-900">₹{products[0].price.toLocaleString()}</span>
                <span className="text-sm text-zinc-400 line-through">₹{products[0].originalPrice.toLocaleString()}</span>
                <span className="rounded bg-teal-500 px-2 py-0.5 text-xs font-semibold text-white">
                  {products[0].discount}% OFF
                </span>
              </div>
            </div>
          </div>
        </Link>

        {/* Right Side - Two Smaller Cards Side by Side */}
        {products.slice(1).map((product) => (
          <Link key={product.id} href={product.href} className="group">
            {/* Image Container */}
            <div className="relative h-[300px] overflow-hidden rounded-xl sm:h-[400px]">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url('${product.image}')` }}
              />
              {/* New Badge */}
              {product.isNew && (
                <span className="absolute top-3 left-3 rounded bg-red-500 px-2.5 py-1 text-xs font-semibold text-white">
                  New
                </span>
              )}
            </div>
            {/* Product Info Below Image */}
            <div className="mt-3">
              <h3 className="font-semibold text-zinc-900">{product.name}</h3>
              <p className="text-sm text-zinc-500">{product.description}</p>
              <div className="mt-2 flex items-center gap-2">
                <span className="font-bold text-zinc-900">₹{product.price.toLocaleString()}</span>
                <span className="text-sm text-zinc-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
                <span className="rounded bg-teal-500 px-2 py-0.5 text-xs font-semibold text-white">
                  {product.discount}% OFF
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pink Announcement Bar */}
      <div className="mt-6 w-[95%] overflow-hidden rounded-xl bg-pink-400">
        <div className="flex items-center">
          <div className="flex-1 overflow-hidden py-4">
            <div ref={scrollRef} className="flex items-center whitespace-nowrap">
              {renderAnnouncements()}
              {renderAnnouncements()}
              {renderAnnouncements()}
              {renderAnnouncements()}
            </div>
          </div>
          <Link
            href="/shop"
            className="flex-shrink-0 bg-pink-500 px-6 py-4 text-xl font-bold text-white hover:bg-pink-600"
          >
            +More
          </Link>
        </div>
      </div>
    </section>
  )
}
