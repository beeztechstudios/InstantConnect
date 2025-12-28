'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { Search, ShoppingCart, Menu, X, ChevronDown, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useCart } from '@/contexts/cart-context'
import { SearchModal } from './search-modal'

const categories = [
  {
    name: 'Cards',
    slug: 'nfc-cards',
    image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?q=80&w=400&auto=format&fit=crop',
    description: 'View the collection'
  },
  {
    name: 'Stands',
    slug: 'standees',
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?q=80&w=400&auto=format&fit=crop',
    description: 'View the collection'
  },
  {
    name: 'Custom Products',
    slug: 'review-cards',
    image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?q=80&w=400&auto=format&fit=crop',
    description: 'View the collection'
  },
  {
    name: 'All Products',
    slug: '',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400&auto=format&fit=crop',
    description: 'Browse everything',
    isAllProducts: true
  },
]

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'How It Works', href: '/how-it-works' },
  { name: 'AI Review Card', href: '/ai-review-card', featured: true },
]

export function Header() {
  const pathname = usePathname()
  const { itemCount, openCart } = useCart()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <header className="absolute top-0 left-0 right-0 z-50 w-full">
      <div className="mx-auto w-[95%] sm:w-auto sm:max-w-3xl px-0 sm:px-4 pt-3 sm:pt-4">
        <div className="flex h-12 items-center justify-between rounded-xl bg-white px-4 shadow-md">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.svg"
              alt="Instant Connect"
              width={120}
              height={42}
              className="h-8 w-auto sm:h-9"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'flex items-center gap-1.5 px-4 py-2 text-sm font-medium transition-colors',
                  link.featured
                    ? 'text-zinc-700 hover:text-zinc-900'
                    : pathname === link.href
                    ? 'text-zinc-900'
                    : 'text-zinc-600 hover:text-zinc-900'
                )}
              >
                {link.featured && <Sparkles className="h-4 w-4 text-violet-600" />}
                {link.name}
              </Link>
            ))}

            {/* Shop Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsShopDropdownOpen(true)}
              onMouseLeave={() => setIsShopDropdownOpen(false)}
            >
              <button
                className={cn(
                  'flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
                  isShopDropdownOpen
                    ? 'bg-zinc-100 text-zinc-900'
                    : pathname.startsWith('/shop')
                    ? 'text-zinc-900'
                    : 'text-zinc-600 hover:text-zinc-900'
                )}
              >
                Shop
                <ChevronDown className={cn('h-4 w-4 transition-transform', isShopDropdownOpen && 'rotate-180')} />
              </button>
              {/* Invisible bridge to connect button and dropdown */}
              <div className="absolute left-0 right-0 h-4 top-full" />
            </div>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-1">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
            >
              <Search className="h-4 w-4" />
            </button>

            {/* Cart */}
            <button
              className="relative flex h-9 w-9 items-center justify-center rounded-full text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
              onClick={openCart}
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-violet-600 text-[9px] font-bold text-white">
                {itemCount}
              </span>
            </button>

            {/* Mobile Menu Button */}
            <button
              className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* Mega Menu Dropdown - Full width below navbar */}
        <div
          onMouseEnter={() => setIsShopDropdownOpen(true)}
          onMouseLeave={() => setIsShopDropdownOpen(false)}
          className={cn(
            'mt-1 rounded-xl border border-zinc-200 bg-white p-5 shadow-xl transition-all duration-200',
            isShopDropdownOpen
              ? 'block opacity-100'
              : 'hidden opacity-0 pointer-events-none'
          )}
        >
          {/* Invisible bridge at top to connect with navbar */}
          <div className="absolute -top-3 left-0 right-0 h-4" />
          <div className="flex items-start gap-4">
            {/* Category Cards */}
            {categories.map((category) => (
              <Link
                key={category.slug || 'all'}
                href={category.slug ? `/shop/${category.slug}` : '/shop'}
                className="group flex-1"
              >
                <div className="overflow-hidden rounded-lg bg-zinc-100">
                  <div
                    className="aspect-square bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                    style={{ backgroundImage: `url('${category.image}')` }}
                  />
                </div>
                <div className="mt-2 flex items-center gap-1">
                  <h3 className={cn(
                    "text-sm font-semibold",
                    (category as { isAllProducts?: boolean }).isAllProducts ? "text-violet-600" : "text-zinc-900"
                  )}>{category.name}</h3>
                  <ChevronDown className={cn(
                    "h-3 w-3 -rotate-90 transition-transform group-hover:translate-x-0.5",
                    (category as { isAllProducts?: boolean }).isAllProducts ? "text-violet-600" : "text-zinc-400"
                  )} />
                </div>
                <p className="text-xs text-zinc-500">{category.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Navigation - Off-canvas Sheet */}
      <div
        className={cn(
          'fixed inset-0 z-50 lg:hidden transition-opacity duration-300',
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Sheet */}
        <div
          className={cn(
            'absolute top-0 right-0 h-full w-[320px] max-w-[90vw] bg-[#F4F4F4] shadow-2xl transition-transform duration-300 ease-out flex flex-col',
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          )}
        >
          {/* Sheet Header */}
          <div className="flex items-center justify-between px-5 py-4 bg-white">
            <Image
              src="/logo.svg"
              alt="Instant Connect"
              width={100}
              height={35}
              className="h-7 w-auto"
            />
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 hover:bg-zinc-200 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Sheet Content */}
          <div className="flex-1 overflow-y-auto px-4 py-5">
            {/* Navigation Links */}
            <div className="bg-white rounded-[10px] p-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-4 py-3.5 text-[15px] font-medium transition-colors',
                    pathname === link.href
                      ? 'bg-zinc-900 text-white'
                      : 'text-zinc-700 hover:bg-zinc-100'
                  )}
                >
                  {link.featured && <Sparkles className="h-4 w-4 text-violet-500" />}
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Shop Categories */}
            <div className="mt-4">
              <p className="px-2 mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Shop by Category
              </p>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category) => (
                  <Link
                    key={category.slug || 'all'}
                    href={category.slug ? `/shop?category=${category.slug}` : '/shop'}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="group relative overflow-hidden rounded-[10px] bg-white"
                  >
                    <div
                      className="aspect-square bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                      style={{ backgroundImage: `url('${category.image}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <span className="text-sm font-semibold text-white">{category.name}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Sheet Footer */}
          <div className="px-4 py-4 bg-white border-t border-zinc-200">
            <Link
              href="/shop"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full rounded-lg py-3 text-sm font-semibold text-white transition-colors"
              style={{ backgroundColor: '#685BC7' }}
            >
              Browse All Products
              <ChevronDown className="h-4 w-4 -rotate-90" />
            </Link>
          </div>
        </div>
      </div>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  )
}
