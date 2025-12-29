

"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ShoppingCart,
  Menu,
  X,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/contexts/cart-context";
import { SearchModal } from "./search-modal";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "How It Works", href: "/how-it-works" },
  { name: "AI Review Card", href: "/ai-review-card", featured: true },
];

const categories = [
  {
    name: "NFC-Cards",
    slug: "nfc-cards",
    image: "/DropDownImgNFC.png",
    description: "View the collection",
  },
  {
    name: "Standees",
    slug: "standees",
    image:
      "https://i.pinimg.com/1200x/1e/72/fa/1e72fa2fa2fad834e94d250f19e3b769.jpg",
    description: "View the collection",
  },
  {
    name: "Custom Products",
    slug: "review-cards",
    image: "/card1.png",
    description: "View the collection",
  },
  {
    name: "All Products",
    slug: "",
    image:
      "https://i.pinimg.com/736x/d9/70/2d/d9702dcefc32cb5357f35070a1bfb4d5.jpg",
    description: "Browse everything",
    isAllProducts: true,
  },
];

export function Header() {
  const pathname = usePathname();
  const { itemCount, openCart } = useCart();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileShopOpen, setMobileShopOpen] = useState(false);


  return (
    <>
      <header className="absolute top-4 left-0 right-0 z-50">
        <div className="mx-auto max-w-5xl px-3">
          {/* ================= DESKTOP ================= */}
          <div className="hidden lg:flex h-20 items-center justify-between rounded-xl bg-white px-5 shadow-md">
            {/* Logo */}
            <Link href="/">
              <Image
                src="/Logo_3.svg"
                alt="Instant Connect"
                width={130}
                height={50}
                priority
              />
            </Link>

            {/* Nav */}
            <nav className="flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-1.5 px-4 py-2 rounded-lg text-md font-medium transition",
                    "text-black hover:bg-white hover:text-black",
                    pathname === link.href && "bg-white text-black"
                  )}
                >
                  {link.featured && (
                    <Sparkles className="h-5 w-5 text-sky-400" />
                  )}
                  {link.name}
                </Link>
              ))}

              {/* Shop */}
              <div
                className="relative"
                onMouseEnter={() => setShopOpen(true)}
                onMouseLeave={() => setShopOpen(false)}
              >
                <button
                  onClick={() => setShopOpen((v) => !v)}
                  onMouseEnter={() => setShopOpen(true)}
                  className="flex items-center gap-1 px-4 py-2 text-md font-medium text-black hover:bg-white hover:text-black rounded-lg"
                >
                  Shop
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 text-sky-400 transition-transform duration-300",
                      shopOpen && "rotate-180"
                    )}
                  />
                </button>
                {/* Invisible bridge */}
                <div className="absolute left-0 right-0 h-4 top-full" />
              </div>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button onClick={() => setSearchOpen(true)} className="icon-btn">
                <Search className="text-black" />
              </button>
              <button onClick={openCart} className="relative icon-btn">
                <ShoppingCart className="text-black" />
                {itemCount > 0 && <span className="badge">{itemCount}</span>}
              </button>
            </div>
          </div>

          {/* ================= MEGA MENU (ORIGINAL DESIGN) ================= */}
          <AnimatePresence>
            {shopOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                onMouseEnter={() => setShopOpen(true)}
                onMouseLeave={() => setShopOpen(false)}
                className="absolute left-0 right-0 top-[calc(100%+8px)] mx-auto max-w-7xl rounded-xl bg-white p-6 shadow-2xl border-none"
              >
                <div className="grid grid-cols-4 gap-6">
                  {categories.map((category, index) => (
                    <motion.div
                      key={category.name}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: index * 0.15,
                        duration: 0.3,
                        ease: "easeOut",
                      }}
                    >
                      <Link
                        href={
                          category.slug ? `/shop/${category.slug}` : "/shop"
                        }
                        className={cn(
                          "group block rounded-xl p-4 transition hover:shadow-lg",
                          category.isAllProducts
                            ? "bg-black text-white"
                            : "bg-zinc-100"
                        )}
                      >
                        {/* Image */}
                        <div className="overflow-hidden rounded-xl">
                          <div
                            className="aspect-[1/1] bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                            style={{
                              backgroundImage: `url(${category.image})`,
                            }}
                          />
                        </div>

                        {/* Content */}
                        <div className="mt-4 flex items-center justify-between">
                          <div>
                            <h3
                              className={cn(
                                "text-2xl font-extrabold",
                                category.isAllProducts
                                  ? "text-white"
                                  : "text-zinc-900"
                              )}
                            >
                              {category.name}
                            </h3>
                            <p
                              className={cn(
                                "text-sm",
                                category.isAllProducts
                                  ? "text-zinc-300"
                                  : "text-zinc-500"
                              )}
                            >
                              View the collection
                            </p>
                          </div>

                          <span
                            className={cn(
                              "text-2xl transition-transform group-hover:translate-x-1",
                              category.isAllProducts
                                ? "text-white"
                                : "text-zinc-400"
                            )}
                          >
                            →
                          </span>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ================= MOBILE / TABLET ================= */}
          <div className="lg:hidden flex items-center justify-between rounded-xl bg-white px-4 py-3 shadow-md">
            <button onClick={() => setMobileOpen(true)}>
              <Menu className="h-6 w-6 text-black" />
            </button>

            <Link href="/">
              <Image
                src="/Logo_3.svg"
                alt="Instant Connect"
                width={110}
                height={40}
              />
            </Link>

            <div className="flex items-center gap-3">
              <button onClick={() => setSearchOpen(true)}>
                <Search className="h-6 w-6 text-black" />
              </button>
              <button onClick={openCart} className="relative">
                <ShoppingCart className="h-6 w-6 text-black" />
                {itemCount > 0 && <span className="badge-sm">{itemCount}</span>}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER (UNCHANGED) */}
      {/* MOBILE DRAWER */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-white"
            onClick={() => setMobileOpen(false)}
          />

          <div className="absolute left-0 top-0 h-full w-[320px] bg-white shadow-xl flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center px-4 py-4 border-b border-gray-400">
              <Image src="/Logo_3.svg" alt="Logo" width={100} height={35} />
              <button onClick={() => setMobileOpen(false)}>
                <X className="h-6 w-6 text-black" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {/* Nav Links */}
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-4 py-3 text-black font-medium hover:bg-zinc-800"
                >
                  {link.name}
                </Link>
              ))}

              {/* SHOP ACCORDION */}
              <button
                onClick={() => setMobileShopOpen((v) => !v)}
                className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-black font-medium hover:bg-zinc-400"
              >
                Shop
                <ChevronDown
                  className={cn(
                    "h-5 w-5 transition-transform",
                    mobileShopOpen && "rotate-180"
                  )}
                />
              </button>

              <AnimatePresence>
                {mobileShopOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden pl-4 space-y-2"
                  >
                    {categories.map((category) => (
                      <Link
                        key={category.name}
                        href={
                          category.slug ? `/shop/${category.slug}` : "/shop"
                        }
                        onClick={() => setMobileOpen(false)}
                        className="block rounded-lg px-4 py-2 text-sm text-black hover:bg-zinc-800"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      )}

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* UTILITIES */}
      <style jsx>{`
        .icon-btn {
          height: 36px;
          width: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          color: white;
        }
        .icon-btn:hover {
          background: white;
          color: black;
        }
        .badge {
          position: absolute;
          top: -6px;
          right: -6px;
          height: 20px;
          width: 20px;
          border-radius: 999px;
          background: #38bdf8;
          color: white;
          font-size: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .badge-sm {
          position: absolute;
          top: -6px;
          right: -6px;
          height: 18px;
          width: 18px;
          border-radius: 999px;
          background: #38bdf8;
          color: white;
          font-size: 11px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </>
  );
}
