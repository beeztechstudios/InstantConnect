"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import type { Product } from "@/types/database";

interface ProductCardProps {
    product: Product;
    categorySlug?: string;
    noBg?: boolean;
    tag?: "Featured" | "Popular" | "New" | "Bestseller";
}

export function ProductCard({ product, categorySlug, noBg, tag }: ProductCardProps) {
    const discount = calculateDiscount(product.price, product.compare_at_price);
    const [isHovered, setIsHovered] = useState(false);

    const productUrl = `/product/${product.slug}`;

    // Get primary and hover images
    const primaryImage = product.images[0] || "/placeholder-product.jpg";
    const hoverImage = product.images[1] || primaryImage;
    const hasMultipleImages = product.images.length > 1;

    // Determine tag to display
    const displayTag = tag || (product.is_featured ? "Bestseller" : "New");

    // Tag colors based on type
    const tagColors: Record<string, string> = {
        Featured: "bg-sky-500",
        Popular: "bg-purple-500",
        New: "bg-emerald-500",
        Bestseller: "bg-red-500",
    };

    return (
        <Link href={productUrl}>
            <div
                className="group rounded-[10px] p-4 transition"
                style={noBg ? undefined : { background: "#ebebeb" }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* IMAGE */}
                <div className="relative aspect-[4/5] overflow-hidden rounded-[10px] bg-white">
                    {/* Primary Image */}
                    <Image
                        src={primaryImage}
                        alt={product.name}
                        fill
                        className={`object-cover transition-all duration-500 ${
                            hasMultipleImages && isHovered
                                ? "opacity-0 scale-105"
                                : "opacity-100 scale-100"
                        }`}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />

                    {/* Hover Image (only if multiple images exist) */}
                    {hasMultipleImages && (
                        <Image
                            src={hoverImage}
                            alt={`${product.name} - alternate view`}
                            fill
                            className={`object-cover transition-all duration-500 ${
                                isHovered
                                    ? "opacity-100 scale-100"
                                    : "opacity-0 scale-95"
                            }`}
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                    )}

                    {/* BADGE */}
                    <div className="absolute left-3 top-3 z-10">
                        <span className={`rounded-md ${tagColors[displayTag] || "bg-red-500"} px-3 py-1 text-xs font-semibold text-white`}>
                            {displayTag}
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

                </div>
            </div>
        </Link>
    );
}
