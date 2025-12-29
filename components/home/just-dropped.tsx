"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { Star, ArrowRight, Sparkles } from "lucide-react";

// --- MOCK DATA (Matches your Database Schema) ---
const products = [
  {
    id: 1,
    name: "InstantConnect NFC Pro Card",
    short_description: "The elite choice for modern networking.",
    price: 999,
    compare_at_price: 1299,
    images: [
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070",
    ],
    slug: "nfc-card",
    is_featured: true,
  },
  {
    id: 2,
    name: "Smart Review Standee",
    short_description: "Collect 5-star reviews instantly.",
    price: 2999,
    compare_at_price: 3499,
    images: ["/PROMOCARDBG.png"],
    slug: "smart-standee",
    is_featured: false,
  },
  {
    id: 3,
    name: "NFC Smart Keychain",
    short_description: "Always ready to connect.",
    price: 499,
    compare_at_price: 599,
    images: ["/PROMOCARDBG.png"],
    slug: "nfc-keychain",
    is_featured: false,
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
              Just <span className=" font-black text-zinc-400">dropped.</span>
            </h2>
          </div>
          <Link
            href="/shop"
            className="group flex items-center gap-3 rounded-2xl bg-black px-8 py-4  text-sm font-black text-white transition-all hover:bg-sky-500 hover:scale-105"
          >
            Explore all products{" "}
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Large Featured Card (Customized Version of your Card) */}
          <Link
            href={`/product/${products[0].slug}`}
            className="group relative h-[400px] lg:h-auto lg:col-span-2 overflow-hidden rounded-xl bg-zinc-900"
          >
            <Image
              src={products[0].images[0]}
              alt={products[0].name}
              fill
              className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

            <div className="absolute bottom-8 left-8 right-8 flex flex-col items-start">
              <span className="mb-4 rounded-full bg-sky-500 px-4 py-1 text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-sky-500/40">
                Featured Product
              </span>
              <h3 className="text-3xl font-black text-white tracking-tighter mb-2">
                {products[0].name}
              </h3>
              <p className="text-zinc-400 text-sm mb-6 max-w-sm">
                {products[0].short_description}
              </p>
              <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-2 pr-6 rounded-full border border-white/10">
                <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-black font-black text-xs">
                  ₹
                </div>
                <span className="text-white font-bold">
                  Start at ₹{products[0].price}
                </span>
              </div>
            </div>
          </Link>

          {/* Standard Product Cards (Using your Exact UI Logic) */}
          {products.slice(1).map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="group rounded-2xl bg-white  shadow-2xl p-4 transition-all hover:bg-white hover:shadow-2xl hover:shadow-sky-500/5 border border-transparent hover:border-zinc-100"
            >
              {/* IMAGE */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-white shadow-inner">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-contain scale-110  transition-transform duration-500 group-hover:scale-115"
                />
                <div className="absolute left-3 top-3">
                  <span className="rounded-lg bg-zinc-900 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white">
                    {product.is_featured ? "Bestseller" : "New Arrival"}
                  </span>
                </div>
              </div>

              {/* INFO */}
              <div className="mt-6 px-2 pb-2  space-y-2">
                <h3 className="text-xl font-black leading-tight text-black line-clamp-1 ">
                  {product.name}
                </h3>
                <p className="text-xs font-medium text-zinc-400 line-clamp-1">
                  {product.short_description}
                </p>

                {/* PRICE */}
                <div className="mt-4 flex items-center gap-3">
                  <span className="text-xl font-black text-black">
                    ₹{product.price.toLocaleString()}
                  </span>
                  <span className="text-sm text-zinc-400 line-through font-medium">
                    ₹{product.compare_at_price.toLocaleString()}
                  </span>
                  <div className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[13px] font-black text-emerald-600 uppercase">
                    20% OFF
                  </div>
                </div>

                {/* REVIEWS */}
                <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-4">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                    (349 Reviews)
                  </span>
                  <div className="flex items-center gap-1.5 rounded-full bg-sky-50 px-3 py-1">
                    <Star className="h-3 w-3 fill-sky-400 text-sky-400" />
                    <span className="text-xs font-black text-sky-600">4.1</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* --- PREMIUM TICKER (Replacing Amber Bar) --- */}
        <div className="mt-12 relative h-16 w-full overflow-hidden rounded-2xl bg-[#e62e39] border border-none flex items-center shadow-2xl">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#e62e39] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#e62e39] to-transparent z-10" />

          <div ref={scrollRef} className="flex items-center whitespace-nowrap">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center">
                {announcements.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 mx-12">
                    <Sparkles size={16} className="text-white" />
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
