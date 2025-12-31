"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard } from "@/components/products/product-card";
import type { Product } from "@/types/database";

interface FeaturedProductsClientProps {
  products: Product[];
}

export function FeaturedProductsClient({ products }: FeaturedProductsClientProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const mobileSliderRef = useRef<HTMLDivElement>(null);

  const showArrows = products.length > 3;
  const maxIndex = Math.max(0, products.length - 3);

  const scrollToIndex = (index: number) => {
    if (sliderRef.current) {
      const cardWidth = sliderRef.current.scrollWidth / (products.length + 1); // +1 for promo card
      sliderRef.current.scrollTo({
        left: cardWidth * index,
        behavior: "smooth",
      });
    }
    setCurrentIndex(index);
  };

  const handlePrev = () => {
    const newIndex = Math.max(0, currentIndex - 1);
    scrollToIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = Math.min(maxIndex, currentIndex + 1);
    scrollToIndex(newIndex);
  };

  // Mobile slider navigation
  const scrollMobile = (direction: "left" | "right") => {
    if (mobileSliderRef.current) {
      const scrollAmount = mobileSliderRef.current.clientWidth * 0.85;
      mobileSliderRef.current.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="bg-white -mt-24 sm:-mt-24">
      <div className="flex justify-center">
        <section className="relative z-10 w-[95%] rounded-t-[12px] bg-white px-4 py-6 sm:px-6 sm:py-8">
          {/* HEADER */}
          <div className="mb-6 flex flex-col text-center gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] md:text-[12px] font-black uppercase tracking-[0.2em] text-sky-400 mb-3">
                Our most popular smart products
              </p>
              <h2 className="text-3xl font-extrabold text-black tracking-tighter leading-[0.9] sm:text-4xl">
                This week&apos;s steal deals
              </h2>
            </div>

            <div className="hidden sm:flex items-center gap-3">
              {/* Arrow Navigation (Desktop) */}
              {showArrows && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300 bg-white text-zinc-700 transition hover:bg-zinc-100 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={currentIndex >= maxIndex}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300 bg-white text-zinc-700 transition hover:bg-zinc-100 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              )}

              {/* Desktop button */}
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-5 py-2.5 text-lg md:text-lg font-medium text-white hover:bg-zinc-800"
              >
                Explore all products
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* ================= DESKTOP SLIDER ================= */}
          <div className="hidden sm:block relative">
            <div
              ref={sliderRef}
              className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar"
              style={{ scrollSnapType: showArrows ? "none" : "x mandatory" }}
            >
              {products.map((product) => (
                <div
                  key={product.id}
                  className="min-w-[calc(25%-12px)] flex-shrink-0"
                  style={{ scrollSnapAlign: "start" }}
                >
                  <ProductCard product={product} />
                </div>
              ))}

              {/* Promo Banner */}
              <div className="min-w-[calc(25%-12px)] flex-shrink-0">
                <Link href="/shop?category=qr-cards" className="group h-full block">
                  <PromoCard />
                </Link>
              </div>
            </div>
          </div>

          {/* ================= MOBILE SLIDER ================= */}
          <div className="sm:hidden relative">
            {/* Mobile Arrow Buttons */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => scrollMobile("left")}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-300 bg-white text-zinc-700 transition active:bg-zinc-100"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() => scrollMobile("right")}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-300 bg-white text-zinc-700 transition active:bg-zinc-100"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
              <span className="text-xs text-zinc-500">
                Swipe or use arrows
              </span>
            </div>

            <div
              ref={mobileSliderRef}
              className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 no-scrollbar"
            >
              {products.map((product) => (
                <div key={product.id} className="min-w-[85%] snap-center flex-shrink-0">
                  <ProductCard product={product} />
                </div>
              ))}

              {/* Promo slide */}
              <div className="min-w-[85%] snap-center flex-shrink-0">
                <PromoCard />
              </div>
            </div>

            {/* Mobile CTA */}
            <div className="mt-6 flex justify-center">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-6 py-3 text-base font-medium text-white"
              >
                Explore all products
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function PromoCard() {
  return (
    <div className="relative h-full min-h-[420px] overflow-hidden rounded-[20px]">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/PROMOCARDBG.png')" }}
      />

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
        {/* Discount */}
        <div className="leading-none flex justify-end items-end ">
          <span className="text-[86px] font-extrabold tracking-tight ">
            33
          </span>
          <div className="flex flex-col items-start  mb-2">
            <span className="align-top text-3xl font-bold">%</span>
            <div className="-mt-2 text-4xl font-extrabold">OFF</div>
          </div>
        </div>

        {/* Product Name */}
        <h3 className="mt-6 text-4xl font-extrabold">Instant </h3>
        <h3 className="mt-1 text-4xl font-extrabold">Discount </h3>

        {/* CTA */}
        <button className="mt-8 rounded-full bg-white px-10 py-3 text-lg font-semibold text-zinc-900 transition hover:bg-zinc-100">
          Shop now
        </button>
      </div>
    </div>
  );
}
