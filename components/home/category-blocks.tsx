

"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    id: 1,
    name: "NFC Cards",
    tagline: "Tap once. Share everything.",
    href: "/shop?category=nfc-cards",
    cta: "Explore All",
    bgColor: "bg-[#6243CC]",
    image: "/card1.png",
  },
  {
    id: 2,
    name: "AI Review QR & Cards",
    tagline: "More reviews. More trust.",
    href: "/ai-review-card",
    cta: "Boost Reviews",
    bgColor: "bg-[#FF8026]",
    image: "/card2.png",
  },
  {
    id: 3,
    name: "The Smart Standees",
    tagline: "Turn footfall into connections.",
    href: "/shop?category=standees",
    cta: "View Designs",
    bgColor: "bg-[#FFBD40]",
    image: "/card3.png",
    textDark: true,
  },
  {
    id: 4,
    name: "Keychains",
    tagline: "Ultimate networking tool on your keys.",
    href: "/shop?category=keychains",
    cta: "Shop Now",
    bgColor: "bg-[#01A48D]",
    image: "/card4.png",
  },
];

export function CategoryBlocks() {
  return (
    <section className="py-12 md:py-20 w-full bg-zinc-100 flex justify-center">
      {/* 95% Width matches your premium "Just Dropped" and "Testimonials" sections */}
      <div className="w-[95%]">
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-5 gap-4 md:gap-6">
          {/* Item 1: NFC Cards */}
          <Link
            href={categories[0].href}
            className={`group relative col-span-1 md:col-span-3 lg:col-span-3 flex items-center overflow-hidden rounded-[2rem] ${categories[0].bgColor} p-8 md:p-10 lg:p-12 min-h-[320px] md:min-h-[380px] lg:min-h-[400px] transition-all hover:shadow-2xl hover:shadow-indigo-500/20`}
          >
            <div className="relative z-10 max-w-[240px] md:max-w-[280px]">
              <p className="text-white/90 font-black text-[10px] md:text-xs uppercase tracking-[0.2em] mb-3">
                {categories[0].tagline}
              </p>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-[0.9] tracking-tighter ">
                {categories[0].name}
              </h3>
              <div className="mt-8 flex items-center gap-2 text-white font-black group-hover:gap-4 transition-all uppercase text-sm tracking-widest">
                {categories[0].cta}{" "}
                <ArrowRight size={20} className="text-sky-400" />
              </div>
            </div>
            <div
              className="absolute right-0 bottom-0 w-1/2 h-4/5 bg-contain bg-right-bottom bg-no-repeat transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-2"
              style={{ backgroundImage: `url('${categories[0].image}')` }}
            />
          </Link>

          {/* Item 2: AI Review */}
          <Link
            href={categories[1].href}
            className={`group relative col-span-1 md:col-span-3 lg:col-span-2 flex flex-col justify-between overflow-hidden rounded-[2rem] ${categories[1].bgColor} p-8 md:p-10 transition-all hover:shadow-2xl hover:shadow-orange-500/20`}
          >
            <div className="relative z-10">
              <p className="text-white/90 font-black text-[10px] md:text-xs uppercase tracking-[0.2em] mb-3">
                {categories[1].tagline}
              </p>
              <h3 className="text-3xl md:text-4xl font-black text-white leading-[0.9] tracking-tighter ">
                AI Review <br /> QR & Cards
              </h3>
            </div>
            <div
              className="absolute right-4 bottom-16 w-3/4 h-1/2 bg-contain bg-right bg-no-repeat transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url('${categories[1].image}')` }}
            />
            <div className="relative z-10 mt-20 md:mt-0">
              <span className="inline-block bg-white text-black px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg transition-all group-hover:bg-black group-hover:text-white">
                {categories[1].cta}
              </span>
            </div>
          </Link>

          {/* Item 3: Standees */}
          <Link
            href={categories[2].href}
            className={`group relative col-span-1 md:col-span-3 lg:col-span-2 flex flex-col justify-between overflow-hidden rounded-[2rem] ${categories[2].bgColor} p-8 md:p-10 transition-all hover:shadow-2xl hover:shadow-yellow-500/20`}
          >
            <div className="relative z-10">
              <p className="text-black/60 font-black text-[10px] md:text-xs uppercase tracking-[0.2em] mb-3">
                {categories[2].tagline}
              </p>
              <h3 className="text-3xl md:text-4xl font-black text-black leading-[0.9] tracking-tighter ">
                {categories[2].name}
              </h3>
            </div>
            <div
              className="absolute right-4 bottom-12 w-2/3 h-1/2 bg-contain bg-right bg-no-repeat transition-transform duration-700 group-hover:rotate-6 group-hover:scale-110"
              style={{ backgroundImage: `url('${categories[2].image}')` }}
            />
            <div className="relative z-10 mt-20 md:mt-0">
              <span className="inline-block bg-black text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg transition-all group-hover:bg-white group-hover:text-black">
                {categories[2].cta}
              </span>
            </div>
          </Link>

          {/* Item 4: Keychains */}
          <Link
            href={categories[3].href}
            className={`group relative col-span-1 md:col-span-3 lg:col-span-3 flex items-center overflow-hidden rounded-[2rem] ${categories[3].bgColor} p-8 md:p-10 lg:p-12 min-h-[320px] md:min-h-[380px] lg:min-h-[400px] transition-all hover:shadow-2xl hover:shadow-teal-500/20`}
          >
            <div className="relative z-10 max-w-[260px] md:max-w-[300px]">
              <p className="text-white/90 font-black text-[10px] md:text-xs uppercase tracking-[0.2em] mb-3">
                Fast Networking
              </p>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-[0.9] tracking-tighter ">
                {categories[3].name}
              </h3>
              <div className="mt-8">
                <span className="inline-block bg-white text-black px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg transition-all group-hover:bg-black group-hover:text-white">
                  {categories[3].cta}
                </span>
              </div>
            </div>
            <div
              className="absolute right-0 bottom-4 w-1/2 h-3/5 bg-contain bg-right-bottom bg-no-repeat transition-transform duration-700 group-hover:scale-125"
              style={{ backgroundImage: `url('${categories[3].image}')` }}
            />
          </Link>
        </div>
      </div>
    </section>
  );
}


