"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { ProductCard } from "@/components/products/product-card";
import type { Product } from "@/types/database";

// --- MOCK DATA (Matches your Database Schema) ---
const products: Product[] = [
    {
        id: "1",
        name: "InstantConnect NFC Pro Card",
        short_description: "The elite choice for modern networking.",
        price: 999,
        compare_at_price: 1299,
        images: [
            "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070",
        ],
        slug: "nfc-card",
        is_featured: true,
        is_active: true,
        category_id: "1",
        description: "",
        best_for: null,
        features: [],
        specifications: {},
        stock_quantity: 100,
        created_at: "",
        updated_at: "",
    },
    {
        id: "2",
        name: "Smart Review Standee",
        short_description: "Collect 5-star reviews instantly.",
        price: 2999,
        compare_at_price: 3499,
        images: ["/PROMOCARDBG.png"],
        slug: "smart-standee",
        is_featured: false,
        is_active: true,
        category_id: "1",
        description: "",
        best_for: null,
        features: [],
        specifications: {},
        stock_quantity: 100,
        created_at: "",
        updated_at: "",
    },
    {
        id: "3",
        name: "NFC Smart Keychain",
        short_description: "Always ready to connect.",
        price: 499,
        compare_at_price: 599,
        images: ["/PROMOCARDBG.png"],
        slug: "nfc-keychain",
        is_featured: false,
        is_active: true,
        category_id: "1",
        description: "",
        best_for: null,
        features: [],
        specifications: {},
        stock_quantity: 100,
        created_at: "",
        updated_at: "",
    },
];

const announcements = [
    {
        text: "AI Review QR Cards now live in Udaipur",
        badge: "New",
        color: "text-sky-400",
    },
    {
        text: "Custom business profiles updated",
        badge: "Update",
        color: "text-emerald-400",
    },
    {
        text: "NFC Standees shipping nationwide",
        badge: "Live",
        color: "text-sky-400",
    },
];

export function JustDropped() {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const scroll = scrollRef.current;
        if (!scroll) return;
        let animationId: number;
        let position = 0;
        const animate = () => {
            position -= 0.8; // Slightly faster for premium feel
            if (position <= -scroll.scrollWidth / 2) position = 0;
            scroll.style.transform = `translateX(${position}px)`;
            animationId = requestAnimationFrame(animate);
        };
        animationId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationId);
    }, []);

    return (
        <section className="bg-slate-100 py-16 ">
            <div className="mx-auto w-[95%]">
                {/* Header: Premium Centered/Split Style */}
                <div className="mb-12 flex flex-col gap-6 md:flex-row  items-center md:items-end md:justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="md:block hidden h-px w-8 bg-sky-400" />
                            <span className="md:block hidden text-md font-black uppercase tracking-[0.2em] text-sky-400">
                                Inventory Update
                            </span>
                        </div>
                        <h2 className="text-4xl font-black text-black tracking-tighter leading-[0.9] sm:text-6xl">
                            Just{" "}
                            <span className=" font-black text-zinc-400">
                                dropped.
                            </span>
                        </h2>
                    </div>
                    <Link
                        href="/shop"
                        className="group flex items-center gap-3 rounded-[10px] bg-black px-8 py-4  text-sm font-black text-white transition-all hover:bg-sky-500 hover:scale-105"
                    >
                        Explore all products{" "}
                        <ArrowRight
                            size={18}
                            className="group-hover:translate-x-1 transition-transform"
                        />
                    </Link>
                </div>

                {/* Products Grid */}
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                    {/* Large Product Card */}
                    <Link
                        href={`/product/${products[0].slug}`}
                        className="group relative h-[350px] overflow-hidden rounded-[10px] sm:h-[500px] sm:col-span-2"
                    >
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                            style={{
                                backgroundImage: `url('${products[0].images[0]}')`,
                            }}
                        />
                        {/* Product Info Overlay */}
                        <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 rounded-[10px] bg-white/95 p-3 shadow-lg backdrop-blur-sm sm:right-auto">
                            <div className="min-w-0 flex-1">
                                <h3 className="truncate font-semibold text-zinc-900">
                                    {products[0].name}
                                </h3>
                                <p className="hidden text-xs text-zinc-500 sm:block">
                                    {products[0].short_description}
                                </p>
                                <div className="mt-1 flex flex-wrap items-center gap-2">
                                    <span className="font-bold text-zinc-900">
                                        ₹{products[0].price.toLocaleString()}
                                    </span>
                                    <span className="text-sm text-zinc-400 line-through">
                                        ₹
                                        {products[0].compare_at_price?.toLocaleString()}
                                    </span>
                                    <span className="rounded bg-teal-500 px-2 py-0.5 text-xs font-semibold text-white">
                                        20% OFF
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Link>

                    {/* Right Side - Two Smaller Cards using ProductCard */}
                    {products.slice(1).map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {/* --- PREMIUM TICKER (Replacing Amber Bar) --- */}
                <div className="mt-12 relative h-16 w-full overflow-hidden rounded-[10px] bg-[#e62e39] border border-none flex items-center shadow-2xl">
                    <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#e62e39] to-transparent z-10" />
                    <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#e62e39] to-transparent z-10" />

                    <div
                        ref={scrollRef}
                        className="flex items-center whitespace-nowrap"
                    >
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="flex items-center">
                                {announcements.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center gap-4 mx-12"
                                    >
                                        <Sparkles
                                            size={16}
                                            className="text-white"
                                        />
                                        <span
                                            className={`text-[14px] font-black uppercase tracking-[0.2em] text-white`}
                                        >
                                            [{item.badge}]
                                        </span>
                                        <span className="text-md font-black text-white/90 tracking-tight">
                                            {item.text}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>

                    <Link
                        href="/shop"
                        className="absolute right-0 z-20 h-full flex items-center bg-[#e62e39]  px-8 text-sm font-black text-white hover:bg-white hover:text-black transition-all"
                    >
                        VIEW ALL
                    </Link>
                </div>
            </div>
        </section>
    );
}
