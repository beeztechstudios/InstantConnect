'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { Star } from 'lucide-react'

const products = [
  {
    id: 1,
    name: 'InstantConnect NFC Card',
    description: 'One-tap profile sharing',
    price: 999,
    originalPrice: 1299,
    discount: 20,
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop',
    href: '/product/nfc-card',
    isFeatured: true,
    isLarge: true,
    reviews: 420,
    rating: 4.8,
  },
  {
    id: 2,
    name: 'InstantConnect Smart Standee',
    description: 'Collect reviews & leads',
    price: 2999,
    originalPrice: 3499,
    discount: 15,
    image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop',
    href: '/product/smart-standee',
    isFeatured: false,
    isLarge: false,
    reviews: 156,
    rating: 4.6,
  },
  {
    id: 3,
    name: 'InstantConnect NFC Keychain',
    description: 'Tap to share',
    price: 499,
    originalPrice: 599,
    discount: 10,
    image: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?q=80&w=2070&auto=format&fit=crop',
    href: '/product/nfc-keychain',
    isFeatured: false,
    isLarge: false,
    reviews: 89,
    rating: 4.5,
  },
]

const announcements = [
  { text: 'AI Review QR Cards are now available', date: '2025.12.25', badge: 'New', badgeColor: 'bg-red-500' },
  { text: 'Custom profile themes just launched', date: '2025.12.28', badge: 'Update', badgeColor: 'bg-green-500' },
  { text: 'Smart Standees for cafés & stores', date: '2025.12.24', badge: 'Now Live', badgeColor: 'bg-orange-600' },
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
        <span key={index} className="mx-8 flex items-center gap-3 whitespace-nowrap">
          <span className="text-sm text-white/70">{item.date}</span>
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium text-white ${item.badgeColor}`}>
            {item.badge}
          </span>
          <span className="font-semibold text-white">
            {item.text} <span className="ml-0.5">↗</span>
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
        <Link href={products[0].href} className="group relative h-[350px] overflow-hidden rounded-[10px] sm:h-auto sm:col-span-2">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
            style={{ backgroundImage: `url('${products[0].image}')` }}
          />
          {/* Product Info Overlay */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 rounded-lg bg-white/95 p-3 shadow-lg backdrop-blur-sm sm:right-auto">
            <div
              className="hidden h-16 w-12 rounded-lg bg-cover bg-center sm:block"
              style={{ backgroundImage: `url('${products[0].image}')` }}
            />
            <div className="min-w-0 flex-1">
              <h3 className="truncate font-semibold text-zinc-900">{products[0].name}</h3>
              <p className="hidden text-xs text-zinc-500 sm:block">{products[0].description}</p>
              <div className="mt-1 flex flex-wrap items-center gap-2">
                <span className="font-bold text-zinc-900">₹{products[0].price.toLocaleString()}</span>
                <span className="text-sm text-zinc-400 line-through">₹{products[0].originalPrice.toLocaleString()}</span>
                <span className="rounded bg-violet-100 px-1.5 py-0.5 text-xs font-medium text-violet-700">
                  {products[0].discount}% Off
                </span>
              </div>
            </div>
          </div>
        </Link>

        {/* Right Side - Two Smaller Cards */}
        {products.slice(1).map((product) => (
          <Link key={product.id} href={product.href} className="group">
            <div className="overflow-hidden rounded-[10px] bg-white p-2 shadow-sm transition-shadow hover:shadow-md">
              {/* Image Container */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-zinc-200">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                {/* Badge */}
                {product.discount > 0 && (
                  <div className="absolute left-3 top-3">
                    <span className="rounded-md bg-violet-500 px-2.5 py-1 text-xs font-semibold text-white">
                      New
                    </span>
                  </div>
                )}
              </div>
              {/* Product Info */}
              <div className="mt-3">
                <h3 className="font-semibold text-zinc-900 line-clamp-1">{product.name}</h3>
                <p className="mt-0.5 text-xs text-zinc-500 line-clamp-1">{product.description}</p>
                {/* Price Row */}
                <div className="mt-2 flex items-center gap-2">
                  <span className="font-bold text-zinc-900">₹{product.price.toLocaleString()}</span>
                  <span className="text-sm text-zinc-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
                  <span className="rounded bg-violet-100 px-1.5 py-0.5 text-xs font-medium text-violet-700">
                    {product.discount}% Off
                  </span>
                </div>
                {/* Reviews Row */}
                <div className="mt-1.5 flex items-center justify-between text-xs text-zinc-500">
                  <span>({product.reviews} Reviews)</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-medium text-zinc-700">{product.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Announcement Bar */}
      <div className="mt-6 w-[95%] overflow-hidden rounded-[10px] bg-amber-400">
        <div className="flex items-center">
          <div className="flex-1 overflow-hidden py-3 sm:py-4">
            <div ref={scrollRef} className="flex items-center whitespace-nowrap">
              {renderAnnouncements()}
              {renderAnnouncements()}
              {renderAnnouncements()}
              {renderAnnouncements()}
            </div>
          </div>
          <Link
            href="/shop"
            className="flex-shrink-0 bg-white px-4 py-3 text-base font-bold text-zinc-900 hover:bg-zinc-100 sm:px-8 sm:py-4 sm:text-xl"
          >
            +More
          </Link>
        </div>
      </div>
    </section>
  )
}
