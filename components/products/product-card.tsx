"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import type { Product } from "@/types/database";

interface ProductCardProps {
    product: Product;
    categorySlug?: string;
    noBg?: boolean;
    tag?: "Featured" | "Popular" | "New" | "Bestseller";
}

export function ProductCard({ product, categorySlug, noBg, tag }: ProductCardProps) {
    const { addItem } = useCart();
    const discount = calculateDiscount(product.price, product.compare_at_price);
    const [isHovered, setIsHovered] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const productUrl = `/product/${product.slug}`;

    const images = product.images.length > 0 ? product.images : ["/placeholder-product.jpg"];
    const hasMultipleImages = images.length > 1;

    // Cycle through images on hover
    useEffect(() => {
        if (isHovered && hasMultipleImages) {
            intervalRef.current = setInterval(() => {
                setCurrentImageIndex((prev) => (prev + 1) % images.length);
            }, 1000);
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            setCurrentImageIndex(0);
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isHovered, hasMultipleImages, images.length]);

    // Determine tag to display
    const displayTag = tag || (product.is_featured ? "Bestseller" : "New");

    // Tag colors based on type
    const tagColors: Record<string, string> = {
        Featured: "bg-sky-500",
        Popular: "bg-purple-500",
        New: "bg-emerald-500",
        Bestseller: "bg-red-500",
    };

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addItem({
            productId: product.id,
            name: product.name,
            slug: product.slug,
            price: product.price,
            compareAtPrice: product.compare_at_price,
            image: images[0],
        });
    };

    return (
        <Link href={productUrl} className="block lg:h-full">
            <div
                className="group rounded-[10px] p-3 sm:p-4 transition lg:h-full lg:flex lg:flex-col"
                style={{ background: noBg ? "#f4f4f4" : "#ebebeb" }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* IMAGE */}
                <div className="relative aspect-square sm:aspect-[4/5] overflow-hidden rounded-[10px] bg-white">
                    {/* All Images - stacked, only current one visible */}
                    {images.map((image, index) => (
                        <Image
                            key={index}
                            src={image}
                            alt={`${product.name}${index > 0 ? ` - view ${index + 1}` : ""}`}
                            fill
                            className={`object-cover transition-all duration-500 ${
                                index === currentImageIndex
                                    ? "opacity-100 scale-100"
                                    : "opacity-0 scale-105"
                            }`}
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            priority={index === 0}
                        />
                    ))}

                    {/* BADGE */}
                    <div className="absolute left-3 top-3 z-10">
                        <span className={`rounded-md ${tagColors[displayTag] || "bg-red-500"} px-3 py-1 text-xs font-semibold text-white`}>
                            {displayTag}
                        </span>
                    </div>

                    {/* Mobile: Cart Icon Button (always visible) */}
                    <button
                        onClick={handleAddToCart}
                        className="sm:hidden absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-black text-white z-10 active:scale-95 transition-transform shadow-lg"
                    >
                        <ShoppingCart className="h-4 w-4" />
                    </button>

                    {/* Desktop: Hover Add to Cart */}
                    <div
                        className={`hidden sm:flex absolute inset-x-0 bottom-0 justify-center pb-4 transition-all duration-300 ${
                            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                        }`}
                    >
                        <button
                            onClick={handleAddToCart}
                            className="flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white shadow-lg hover:bg-zinc-800 transition-colors"
                        >
                            <ShoppingCart className="h-4 w-4" />
                            Add to Cart
                        </button>
                    </div>
                </div>

                {/* INFO */}
                <div className="mt-3 sm:mt-4 lg:flex lg:flex-col lg:flex-grow">
                    {/* TITLE */}
                    <h3 className="text-lg font-bold leading-snug text-zinc-900 line-clamp-2">
                        {product.name}
                    </h3>

                    {/* DESCRIPTION */}
                    {product.short_description && (
                        <p className="text-sm text-zinc-500 max-w-[150px] line-clamp-2 mt-1.5">
                            {product.short_description}
                        </p>
                    )}

                    {/* PRICE */}
                    <div className="mt-2 lg:mt-auto lg:pt-3 flex flex-wrap items-center gap-2">
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
