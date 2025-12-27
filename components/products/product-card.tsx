'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Star } from 'lucide-react'
import { formatPrice, calculateDiscount } from '@/lib/utils'
import type { Product } from '@/types/database'

interface ProductCardProps {
  product: Product
  categorySlug?: string
}

export function ProductCard({ product, categorySlug }: ProductCardProps) {
  const discount = calculateDiscount(product.price, product.compare_at_price)

  const productUrl = categorySlug
    ? `/shop/${categorySlug}/${product.slug}`
    : `/product/${product.slug}`

  // Mock review data (can be replaced with actual data)
  const reviewCount = 420
  const rating = 4.8

  return (
    <Link href={productUrl}>
      <div className="group overflow-hidden rounded-[10px] bg-white p-2 shadow-sm transition-shadow hover:shadow-md">
        {/* Image Container */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-zinc-200">
          <Image
            src={product.images[0] || '/placeholder-product.jpg'}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />

          {/* Badge - Top Left */}
          {product.is_featured && (
            <div className="absolute left-3 top-3">
              <span className="rounded-md bg-violet-600 px-2.5 py-1 text-xs font-semibold text-white">
                Bestsellers
              </span>
            </div>
          )}

          {/* New Badge */}
          {!product.is_featured && discount > 0 && (
            <div className="absolute left-3 top-3">
              <span className="rounded-md bg-violet-500 px-2.5 py-1 text-xs font-semibold text-white">
                New
              </span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="mt-3">
          {/* Product Name */}
          <h3 className="font-semibold text-zinc-900 line-clamp-1">
            {product.name}
          </h3>

          {/* Short Description */}
          {product.short_description && (
            <p className="mt-0.5 text-xs text-zinc-500 line-clamp-1">
              {product.short_description}
            </p>
          )}

          {/* Price Row */}
          <div className="mt-2 flex items-center gap-2">
            <span className="font-bold text-zinc-900">
              {formatPrice(product.price)}
            </span>
            {product.compare_at_price && product.compare_at_price > product.price && (
              <span className="text-sm text-zinc-400 line-through">
                {formatPrice(product.compare_at_price)}
              </span>
            )}
            {discount > 0 && (
              <span className="rounded bg-violet-100 px-1.5 py-0.5 text-xs font-medium text-violet-700">
                {discount}% Off
              </span>
            )}
          </div>

          {/* Reviews Row */}
          <div className="mt-1.5 flex items-center justify-between text-xs text-zinc-500">
            <span>({reviewCount} Reviews)</span>
            <div className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              <span className="font-medium text-zinc-700">{rating}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
