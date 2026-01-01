"use client";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRef } from "react";

const testimonials = [
  {
    id: 1,
    name: "Aarav Mehta",
    role: "Product Designer",
    quote: "InstantConnect fits perfectly into my daily workflow.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Rohan Kapoor",
    role: "Startup Founder",
    quote: "It made sharing my details simple and professional.",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Kunal Verma",
    role: "Content Creator",
    quote: "My connections happen faster and more naturally now.",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Neha Sharma",
    role: "Business Owner",
    quote: "A small change that made a big difference for my business.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop",
  },
];

export function TestimonialsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <section className="bg-white py-12 sm:py-14 pb-0 md:pb-12 overflow-hidden">
      <div className="mx-auto w-[95%]">
        {/* Header Section */}
        <div className="mb-10 flex flex-col items-center text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className=" text-[10px] md:text-[12px] font-black uppercase tracking-[0.2em] text-sky-400 mb-3"
            >
              The Trust Network
            </motion.p>
            <h2 className="text-4xl font-black text-black tracking-tighter leading-[0.9] sm:text-5xl md:text-6xl">
              Loved by creators <br className="hidden sm:block" />
              <span className="text-zinc-300">everywhere.</span>
            </h2>
          </div>

          {/* Navigation Controls */}
          <div className="mt-8 flex gap-3 sm:mt-0">
            <button
              onClick={() => scroll("left")}
              className="group flex h-14 w-14 items-center justify-center rounded-[10px] border border-zinc-100 bg-white hover:border-sky-400 transition-all"
            >
              <ChevronLeft className="h-6 w-6 text-zinc-400 group-hover:text-sky-400" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="group flex h-14 w-14 items-center justify-center rounded-[10px] bg-black hover:bg-sky-400 transition-all shadow-xl shadow-sky-400/10"
            >
              <ChevronRight className="h-6 w-6 text-white" />
            </button>
          </div>
        </div>

        {/* Testimonials Slider */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-10"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              className="relative flex-none w-[85%] sm:w-[45%] lg:w-[30.5%] aspect-square snap-center overflow-hidden rounded-[10px] group"
            >
              {/* Image with Darkening Overlay */}
              <Image
                src={testimonial.image}
                alt={testimonial.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Sophisticated Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />

              {/* Content Overlay */}
              <div className="absolute  inset-0 p-6 flex flex-col justify-between z-10">
                <div className="flex justify-between items-start">
                  <div className="bg-sky-400 p-2 rounded-[10px]">
                    <Quote size={16} className="text-white fill-white" />
                  </div>
                  {/* Floating Brand Mark */}
                  
                </div>

                <div>
                  <p className="text-lg sm:text-xl font-medium text-white leading-snug tracking-tight mb-4">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>

                  <div className="pt-4 border-t backdrop-blur-xl border-none rounded-[10px] pb-2 flex items-center gap-3">
                    <div className="w-1 h-8 bg-sky-400 rounded-[10px]" />
                    <div>
                      <p className="text-sm font-bold text-white uppercase tracking-widest">
                        {testimonial.name}
                      </p>
                      <p className="text-xs text-zinc-400">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
