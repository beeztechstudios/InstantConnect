"use client";
import Link from "next/link";
import Image from "next/image";
import { Smartphone, MessageSquare, Share2, ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { useRef } from "react";

// Replace paths with your actual logo paths
const LogoVector = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="50"
      cy="50"
      r="40"
      stroke="currentColor"
      strokeWidth="2"
      strokeDasharray="4 4"
    />
    <path d="M50 20V80M20 50H80" stroke="currentColor" strokeWidth="1" />
  </svg>
);

const steps = [
  { icon: Smartphone, label: "Tap the smart card" },
  { icon: MessageSquare, label: "AI writes the review" },
  { icon: Share2, label: "Publish on google" },
];

export function HeroBanner() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax effects
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

  return (
    <section
      ref={containerRef}
      className="relative flex justify-center bg-white overflow-hidden"
    >
      <motion.div className="relative w-[98%] min-h-[600px] md:min-h-[750px] rounded-2xl overflow-hidden bg-sky-950">
        {/* --- PREMIUM MESH BACKGROUND --- */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-sky-400/30 rounded-full blur-[190px] animate-pulse" />
          <div className="absolute bottom-[30%] right-[-10%] w-[60%] h-[60%] bg-blue-400/70 rounded-full blur-[100px] animate-pulse" />

          {/* Parallax Floating Logos */}
          <motion.div
            style={{ y: y1, rotate }}
            className="absolute top-20 right-[15%] text-sky-500/10"
          >
            {/* <img src="/Group.svg" alt="" className="w-64 h-64 opacity-20" /> */}
          </motion.div>
          <motion.div
            style={{ y: y2 }}
            className="absolute bottom-20 left-[10%] text-white/5"
          >
            <img
              src="/Group.svg"
              alt=""
              className="w-96 h-96 opacity-20 blur-xs"
            />
          </motion.div>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-center h-full">
          {/* --- LEFT CONTENT: MINIMALIST & BOLD --- */}
          <div className="flex-[1.2] p-4 sm:p-8 lg:p-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 mb-8"
            >
              <span className="w-12 h-[1px] bg-sky-400" />
              <span className="text-sky-400 font-bold tracking-[0.3em] text-lg uppercase">
                Future of Reviews
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-6xl sm:text-7xl lg:text-8xl font-black text-white tracking-tighter"
            >
              instant{" "}
              <span className="italic font-light text-sky-200">UP!</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-8 text-xl sm:text-xl text-white max-w-lg leading-relaxed font-medium"
            >
              The AI review engine that turns a{" "}
              <span className="text-white">simple tap</span> into a{" "}
              <span className="text-sky-400">digital legacy.</span>
            </motion.p>

            {/* Steps: New Icon-Only Premium Look */}
            <div className="mt-12 flex gap-10">
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="group flex flex-col items-center gap-3"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-sky-400 blur-lg opacity-0 group-hover:opacity-40 transition-opacity" />
                    <div className="relative h-18 w-18 rounded-full  border-sky-400 flex items-center justify-center bg-white backdrop-blur-sm text-black border border-4 group-hover:border-sky-400 transition-colors">
                      <step.icon size={22} />
                    </div>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-white">
                    {step.label}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* CTA: Apple Style Glass Button */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-16"
            >
              <Link
                href="/ai-review-card"
                className="group relative inline-flex items-center gap-4 bg-white text-black px-10 py-5 rounded-full font-black text-sm uppercase tracking-widest transition-all hover:pr-12 hover:bg-sky-400 hover:text-white"
              >
                Start Growing
                <ArrowRight className="absolute right-4 opacity-0 group-hover:opacity-100 transition-all" />
              </Link>
            </motion.div>
          </div>

          {/* --- RIGHT CONTENT: THE HERO IMAGE --- */}
          <motion.div
            className="flex-1 relative flex justify-center items-center p-10 md:p-0"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 50 }}
          >
            <div className="relative w-full max-w-[500px] aspect-square">
              {/* Image Background Glow */}
              <div className="absolute inset-0 bg-sky-500/20 blur-[150px] rounded-full" />

              <Image
                src="/hero-mockup.png"
                alt="AI Review Mockup"
                fill
                className="object-contain z-10  drop-shadow-[0_40px_60px_rgba(0,0,0,0.8)]"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
