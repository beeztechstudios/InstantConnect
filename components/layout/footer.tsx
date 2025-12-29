"use client";

import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Truck,
  ShieldCheck,
  Gift,
  Star,
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  ExternalLink,
} from "lucide-react";

const productLinks = [
  { name: "NFC Cards", href: "/shop?category=nfc-cards" },
  { name: "QR Cards", href: "/shop?category=qr-cards" },
  { name: "Standees", href: "/shop?category=standees" },
  { name: "Key Chain", href: "/shop?category=keychains" },
  { name: "Table Tents", href: "/shop?category=table-tents" },
];

const exploreLinks = [
  { name: "About Us", href: "/about" },
  { name: "Shop All", href: "/shop" },
  { name: "How It Works", href: "/how-it-works" },
  { name: "AI Review Card", href: "/ai-review-card", featured: true },
  { name: "Blogs / Articles", href: "/blog" },
];

const socialLinks = [
  { name: "Instagram", icon: Instagram, href: "https://instagram.com" },
  { name: "Facebook", icon: Facebook, href: "https://facebook.com" },
  { name: "Linkedin", icon: Linkedin, href: "https://linkedin.com" },
  { name: "Youtube", icon: Youtube, href: "https://youtube.com" },
];

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/5 text-white">
      <div className="mx-auto max-w-[95%] px-4 pt-16 pb-8">
        {/* Main Navigation Grid */}
        <div className="grid gap-12 md:grid-cols-12 mb-20">
          {/* Brand & Contact */}
          <div className="col-span-full lg:col-span-4">
            <Link href="/" className="inline-block">
              <Image
                src="/Logo_1.svg"
                alt="Instant Connect"
                width={220}
                height={50}
                className="h-18  w-auto "
              />
            </Link>
            <p className="mt-6 text-white text-sm max-w-xs leading-relaxed">
              Transforming physical networking into digital growth with smart
              NFC technology. Designed in Udaipur.
            </p>
            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-sky-400 mt-0.5" />
                <span className="text-sm text-white">
                  New Bhupalpura, Udaipur, RJ 313001
                </span>
              </div>
              <a
                href="mailto:support@instantconnect.in"
                className="block text-lg font-black text-white hover:text-sky-400 transition-colors"
              >
                support@instantconnect.in
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 col-span-full lg:col-span-5 gap-8">
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-6">
                Product
              </h3>
              <ul className="space-y-4">
                {productLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm font-medium text-zinc-400 hover:text-sky-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-6">
                Explore
              </h3>
              <ul className="space-y-4">
                {exploreLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-sky-400 transition-colors"
                    >
                      {link.featured && (
                        <Star size={12} className="fill-sky-400 text-sky-400" />
                      )}
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-6">
                Support
              </h3>
              <ul className="space-y-4">
                {["Track Order", "FAQs", "Privacy Policy", "Refund Policy"].map(
                  (name) => (
                    <li key={name}>
                      <Link
                        href="#"
                        className="text-sm font-medium text-zinc-400 hover:text-sky-400 transition-colors"
                      >
                        {name}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>

          {/* Trust Badges Sidebar */}
          <div className="col-span-full lg:col-span-3 flex lg:flex-col justify-between lg:justify-start gap-6 border-t lg:border-t-0 lg:border-l border-white/5 pt-8 lg:pt-0 lg:pl-10">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-sky-400 border border-white/5">
                <Truck size={20} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-white">
                Free <br />
                Shipping
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-sky-400 border border-white/5">
                <ShieldCheck size={20} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-white">
                Secure <br />
                Payments
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-sky-400 border border-white/5">
                <Gift size={20} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-white">
                Corporate <br />
                Gifting
              </span>
            </div>
          </div>
        </div>

        {/* --- BOTTOM BAR: BEEZTECH PARTNERSHIP --- */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
          {/* Copyright Section */}
          <div className="order-3 md:order-1 text-center md:text-left space-y-1">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">
              The Standard of Excellence
            </p>
            <p className="text-[12px] font-medium text-zinc-400">
              © 2025{" "}
              <span className="text-white font-bold">Instant Connect</span>.
              <span className="mx-2 text-zinc-800">|</span>
              Crafted in <span className="text-zinc-200">Udaipur</span>
            </p>
          </div>

          {/* Socials - Premium Floating Style */}
          <div className="order-1 md:order-2 flex gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                className="group w-11 h-11 rounded-2xl bg-zinc-900/50 flex items-center justify-center  hover:text-sky-400 transition-all duration-500 border border-sky-400 text-sky-400 hover:border-sky-400/30 hover:shadow-[0_0_20px_rgba(56,189,248,0.1)]"
              >
                <social.icon
                  size={18}
                  className="group-hover:scale-110 transition-transform"
                />
              </a>
            ))}
          </div>

          {/* BEEZTECH ADVERTISEMENT - PREMIUM CARD */}
          <Link
            href="https://www.beeztech.studio/"
            target="_blank"
            className="order-2 md:order-3 group relative overflow-hidden"
          >
            {/* Background Glow Effect on Hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/0 via-orange-500/0 to-red-500/0 group-hover:via-orange-500/5 transition-all duration-700" />

            <div className="flex flex-col items-center md:items-end gap-1 px-5 py-3 rounded-2xl border border-white/5 bg-zinc-900/30 backdrop-blur-sm group-hover:border-orange-500/30 group-hover:bg-zinc-900/50 transition-all duration-500">
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500 group-hover:text-orange-400 transition-colors">
                Developed by
              </span>
              <div className="relative h-10 w-auto transition-transform duration-500 group-hover:scale-105">
                {/* Your BeezTech Logo */}
                <img
                  src="/Logo_White.svg"
                  className="h-full w-auto  opacity-80 group-hover:opacity-100 transition-opacity"
                  alt="BeezTech Studio"
                />
              </div>
            </div>

            {/* Subtle underline animation */}
            <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-yellow-400 to-orange-600 group-hover:w-full transition-all duration-700" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
