"use client";
import Link from "next/link";
import { ArrowRight, Calendar, Sparkles } from "lucide-react";
import { motion, Variants } from "framer-motion";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export function BookDemoCTA() {
  return (
    <section className="bg-white  py-10 sm:py-24 sm:pt-0">
      <div className="container mx-auto px-4 w-[93%]">
        {/* --- MAIN HERO CTA --- */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={cardVariants}
          className="relative group w-full overflow-hidden rounded-2xl bg-sky-900 px-6 py-20 sm:py-32 md:py-40 text-center border border-white/5 shadow-2xl"
        >
          {/* Creative Background: Mesh + Logo Glow */}
          <div className="absolute inset-0 z-0">
            {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-sky-500/80 blur-[10px] rounded-full group-hover:bg-sky-500/20 transition-colors duration-700" /> */}
            <div className="absolute inset-0 bg-[url('/footerheroctabg.png')] bg-cover bg-center opacity-40 mix-blend-overlay" />
            <div className="absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-blue-400/40 rounded-full blur-[100px] animate-pulse" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-sky-400 text-white text-md font-black uppercase tracking-widest mb-6"
            >
              <Sparkles size={14} className="" /> Ready to scale?
            </motion.div>

            <h2 className="text-4xl sm:text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.9] mb-8">
              One tap is <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-sky-200 to-sky-500 italic font-light">
                all it takes
              </span>
            </h2>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <Link
                href="/shop"
                className="group w-full sm:w-auto flex items-center justify-center gap-3 rounded-2xl bg-white px-10 py-5 text-md font-black text-black transition-all hover:scale-105 active:scale-95 shadow-xl shadow-white/5"
              >
                Get Started{" "}
                <ArrowRight
                  size={20}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
              <Link
                href="/book-demo"
                className="group w-full sm:w-auto flex items-center justify-center gap-3 rounded-2xl bg-black backdrop-blur-md border border-white/10 px-10 py-5 text-md font-bold text-white transition-all hover:bg-white/10"
              >
                <Calendar size={18} className="text-sky-400 " /> Book a Demo
              </Link>
            </div>
          </div>
        </motion.div>

        {/* --- CREATIVE THREE CARD GRID --- */}
       
      </div>
    </section>
  );
}
