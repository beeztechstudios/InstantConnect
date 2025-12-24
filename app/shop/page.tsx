import { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { createClient } from '@/utils/supabase/server'
import { ProductCard } from '@/components/products/product-card'
import { SortDropdown } from '@/components/shop/sort-dropdown'

export const metadata: Metadata = {
  title: 'Shop All Products',
  description: 'Browse our complete collection of NFC cards, QR cards, standees, keychains and more.',
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; sort?: string }>
}) {
  const { category, sort } = await searchParams
  const supabase = await createClient()

  // Fetch all categories
  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true })

  // Build products query
  let query = supabase
    .from('products')
    .select('*')
    .eq('is_active', true)

  // Filter by category if selected
  if (category && categories) {
    const selectedCategory = categories.find(c => c.slug === category)
    if (selectedCategory) {
      query = query.eq('category_id', selectedCategory.id)
    }
  }

  // Apply sorting
  switch (sort) {
    case 'price-low':
      query = query.order('price', { ascending: true })
      break
    case 'price-high':
      query = query.order('price', { ascending: false })
      break
    case 'newest':
      query = query.order('created_at', { ascending: false })
      break
    case 'featured':
      query = query.order('is_featured', { ascending: false })
      break
    default:
      query = query.order('created_at', { ascending: false })
  }

  const { data: products } = await query

  return (
    <div className="min-h-screen bg-zinc-100">
      {/* Breadcrumb */}
      <div className="flex justify-center bg-zinc-100 pt-6">
        <div className="w-[95%]">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-zinc-500 hover:text-zinc-700">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 text-zinc-400" />
            <span className="font-medium text-zinc-900">Shop</span>
          </nav>
        </div>
      </div>

      {/* Hero Banner */}
      <section className="flex justify-center bg-zinc-100 py-6">
        <div className="relative w-[95%] overflow-hidden rounded-xl bg-gradient-to-r from-zinc-900 to-zinc-700 px-8 py-12 md:py-16">
          <div className="relative z-10">
            <p className="text-sm font-medium text-zinc-400">
              Browse our complete collection
            </p>
            <h1 className="mt-2 text-3xl font-bold text-white md:text-4xl">
              Shop All Products
            </h1>
            <p className="mt-3 max-w-xl text-zinc-300">
              Discover NFC cards, QR cards, smart standees, keychains and more.
              Everything you need for modern networking.
            </p>
          </div>
          {/* Decorative elements */}
          <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-white/5 to-transparent" />
        </div>
      </section>

      {/* Filter Bar */}
      <section className="flex justify-center bg-zinc-100 pb-4">
        <div className="w-[95%]">
          <div className="flex flex-col gap-4 rounded-xl bg-white p-4 md:flex-row md:items-center md:justify-between">
            {/* Category Chips */}
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href="/shop"
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  !category
                    ? 'bg-zinc-900 text-white'
                    : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                }`}
              >
                All
              </Link>
              {categories?.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/shop?category=${cat.slug}${sort ? `&sort=${sort}` : ''}`}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    category === cat.slug
                      ? 'bg-zinc-900 text-white'
                      : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                  }`}
                >
                  {cat.name}
                </Link>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-zinc-500">{products?.length || 0} products</span>
              <SortDropdown />
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="flex justify-center bg-zinc-100 pb-8">
        <div className="w-[95%]">
          {products && products.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl bg-white py-16 text-center">
              <p className="text-zinc-500">No products found</p>
              <Link
                href="/shop"
                className="mt-4 inline-block text-sm font-medium text-teal-600 hover:text-teal-700"
              >
                Clear filters
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
