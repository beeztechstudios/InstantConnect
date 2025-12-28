"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, Heart } from "lucide-react";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import type { Product } from "@/types/database";

interface ProductCardProps {
  product: Product;
  categorySlug?: string;
}

export function ProductCard({ product, categorySlug }: ProductCardProps) {
  const discount = calculateDiscount(product.price, product.compare_at_price);

  const productUrl = categorySlug
    ? `/shop/${categorySlug}/${product.slug}`
    : `/product/${product.slug}`;

  // Mock review data (replace later)
  const reviewCount = 349;
  const rating = 4.1;

  return (
    <Link href={productUrl}>
      <div className="group rounded-2xl bg-white p-4 shadow-sm transition hover:shadow-md">
        {/* IMAGE */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-white">
          <Image
            src={product.images[0] || "/placeholder-product.jpg"}
            alt={product.name}
            fill
            className="object-contain transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />

          {/* BADGE */}
          <div className="absolute left-3 top-3">
            <span className="rounded-md bg-red-500 px-3 py-1 text-xs font-semibold text-white">
              {product.is_featured ? "Bestseller" : "New"}
            </span>
          </div>

          
        </div>

        {/* INFO */}
        <div className="mt-4 space-y-1.5">
          {/* TITLE */}
          <h3 className="text-lg font-bold leading-snug text-zinc-900 line-clamp-2">
            {product.name}
          </h3>

          {/* DESCRIPTION */}
          {product.short_description && (
            <p className="text-sm text-zinc-500 max-w-[150px] line-clamp-2">
              {product.short_description}
            </p>
          )}

          {/* PRICE */}
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="text-xl font-extrabold text-zinc-900">
              {formatPrice(product.price)}
            </span>

            {product.compare_at_price && (
              <span className="text-md text-zinc-600 line-through">
                {formatPrice(product.compare_at_price)}
              </span>
            )}

            {discount > 0 && (
              <span className="rounded-md bg-emerald-500 px-2 py-0.5 text-[14px] font-semibold text-white">
                {discount}% OFF
              </span>
            )}
          </div>

          {/* REVIEWS */}
          <div className="mt-1.5 flex items-center gap-3 text-sm text-zinc-500">
            <span>({reviewCount} Reviews)</span>

            <div className="flex items-center gap-1 rounded-md bg-sky-100 px-2 py-0.5">
              <Star className="h-4 w-4 fill-sky-400 text-sky-400" />
              <span className="font-semibold text-sky-600">{rating}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
