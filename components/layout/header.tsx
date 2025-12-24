'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, ShoppingCart, Menu, X, ChevronDown, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useCart } from '@/contexts/cart-context'
import { SearchModal } from './search-modal'

const categories = [
  { name: 'NFC Cards', slug: 'nfc-cards' },
  { name: 'QR Cards', slug: 'qr-cards' },
  { name: 'Standees', slug: 'standees' },
  { name: 'KeyChains', slug: 'keychains' },
  { name: 'Table Tents', slug: 'table-tents' },
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
  const isHomePage = pathname === '/'

  return (
    <header className={cn(
      "z-50 w-full",
      isHomePage ? "absolute top-0 left-0 right-0" : "sticky top-0 bg-white shadow-sm"
    )}>
      <div className={cn(
        "mx-auto",
        isHomePage ? "max-w-6xl px-4 pt-6" : "max-w-7xl px-4 sm:px-6 lg:px-8"
      )}>
        <div className={cn(
          "flex h-14 items-center justify-between",
          isHomePage && "rounded-xl bg-white px-4 shadow-md"
        )}>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-zinc-800">
              <span className="text-[10px] font-bold text-zinc-800">IC</span>
            </div>
            <div className="hidden flex-col sm:flex">
              <span className="text-sm font-bold leading-none text-zinc-900">Instant</span>
              <span className="text-sm font-bold leading-none text-zinc-900">Connect</span>
            </div>
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
                {link.featured && <Sparkles className="h-4 w-4 text-amber-500" />}
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
                  'flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors',
                  pathname.startsWith('/shop')
                    ? 'text-zinc-900'
                    : 'text-zinc-600 hover:text-zinc-900'
                )}
              >
                Shop
                <ChevronDown className={cn('h-4 w-4 transition-transform', isShopDropdownOpen && 'rotate-180')} />
              </button>

              {/* Dropdown Menu */}
              <div
                className={cn(
                  'absolute left-0 top-full z-50 w-48 rounded-xl border border-zinc-200 bg-white p-2 shadow-lg transition-all',
                  isShopDropdownOpen
                    ? 'visible opacity-100 translate-y-1'
                    : 'invisible opacity-0 translate-y-3'
                )}
              >
                {categories.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/shop/${category.slug}`}
                    className="block rounded-lg px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-100"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-1">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Cart */}
            <button
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
              onClick={openCart}
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                {itemCount}
              </span>
            </button>

            {/* Mobile Menu Button */}
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className={cn(
            'mt-2 rounded-xl bg-white p-4 shadow-lg lg:hidden',
            isHomePage ? '' : 'border border-zinc-200'
          )}>
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    'flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                    link.featured
                      ? 'text-zinc-700'
                      : pathname === link.href
                      ? 'bg-zinc-100 text-zinc-900'
                      : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'
                  )}
                >
                  {link.featured && <Sparkles className="h-4 w-4 text-amber-500" />}
                  {link.name}
                </Link>
              ))}

              {/* Mobile Shop Links */}
              <div className="mt-2 border-t border-zinc-200 pt-2">
                <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Shop
                </p>
                {categories.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/shop/${category.slug}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-sm text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        )}
      </div>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  )
}
