"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { ProductCard } from "@/components/products/product-card";
import { calculateDiscount } from "@/lib/utils";
import type { Product } from "@/types/database";

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 },
    },
};

interface JustDroppedClientProps {
    products: Product[];
}

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

export function JustDroppedClient({ products }: JustDroppedClientProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const scroll = scrollRef.current;
        if (!scroll) return;
        let animationId: number;
        let position = 0;
        const animate = () => {
            position -= 0.8;
            if (position <= -scroll.scrollWidth / 2) position = 0;
            scroll.style.transform = `translateX(${position}px)`;
            animationId = requestAnimationFrame(animate);
        };
        animationId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationId);
    }, []);

    if (!products || products.length === 0) {
        return null;
    }

    // Make sure we have at least 3 products for the layout
    const displayProducts = products.slice(0, 3);
    const mainProduct = displayProducts[0];
    const sideProducts = displayProducts.slice(1);

    const discount = calculateDiscount(mainProduct.price, mainProduct.compare_at_price);

    return (
        <section className="bg-slate-100 py-16">
            <div className="mx-auto w-[95%]">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-12 flex flex-col gap-6 md:flex-row items-center md:items-end md:justify-between"
                >
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="md:block hidden h-px w-8 bg-sky-400" />
                            <span className="md:block hidden text-md font-black uppercase tracking-[0.2em] text-sky-400">
                                Inventory Update
                            </span>
                        </div>
                        <h2 className="text-4xl font-black text-black tracking-tighter leading-[0.9] sm:text-6xl">
                            Just{" "}
                            <span className="font-black text-zinc-400">
                                dropped.
                            </span>
                        </h2>
                    </div>
                    <Link
                        href="/shop"
                        className="group flex items-center gap-3 rounded-[10px] bg-black px-8 py-4 text-sm font-black text-white transition-all hover:bg-sky-500 hover:scale-105"
                    >
                        Explore all products{" "}
                        <ArrowRight
                            size={18}
                            className="group-hover:translate-x-1 transition-transform"
                        />
                    </Link>
                </motion.div>

                {/* Products Grid */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={staggerContainer}
                    className="grid gap-4 sm:grid-cols-2 md:grid-cols-4"
                >
                    {/* Large Product Card */}
                    <motion.div variants={fadeInUp} transition={{ duration: 0.5 }} className="sm:col-span-2">
                    <Link
                        href={`/product/${mainProduct.slug}`}
                        className="group relative block h-[350px] overflow-hidden rounded-[10px] sm:h-[500px]"
                    >
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                            style={{
                                backgroundImage: `url('${mainProduct.images[0] || "/placeholder-product.jpg"}')`,
                            }}
                        />
                        {/* Product Info Overlay */}
                        <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 rounded-[10px] bg-white/95 p-3 shadow-lg backdrop-blur-sm sm:right-auto">
                            <div className="min-w-0 flex-1">
                                <h3 className="truncate font-semibold text-zinc-900">
                                    {mainProduct.name}
                                </h3>
                                <p className="hidden text-xs text-zinc-500 sm:block">
                                    {mainProduct.short_description}
                                </p>
                                <div className="mt-1 flex flex-wrap items-center gap-2">
                                    <span className="font-bold text-zinc-900">
                                        ₹{mainProduct.price.toLocaleString()}
                                    </span>
                                    {mainProduct.compare_at_price && (
                                        <span className="text-sm text-zinc-400 line-through">
                                            ₹{mainProduct.compare_at_price.toLocaleString()}
                                        </span>
                                    )}
                                    {discount > 0 && (
                                        <span className="rounded bg-teal-500 px-2 py-0.5 text-xs font-semibold text-white">
                                            {discount}% OFF
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Link>
                    </motion.div>

                    {/* Right Side - Smaller Cards using ProductCard */}
                    {sideProducts.map((product) => (
                        <motion.div key={product.id} variants={fadeInUp} transition={{ duration: 0.5 }}>
                            <ProductCard product={product} tag="New" />
                        </motion.div>
                    ))}
                </motion.div>

                {/* Premium Ticker */}
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
                                        <span className="text-[14px] font-black uppercase tracking-[0.2em] text-white">
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
                        className="absolute right-0 z-20 h-full flex items-center bg-[#e62e39] px-8 text-sm font-black text-white hover:bg-white hover:text-black transition-all"
                    >
                        VIEW ALL
                    </Link>
                </div>
            </div>
        </section>
    );
}
