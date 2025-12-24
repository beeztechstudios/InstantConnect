import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { createClient } from '@/utils/supabase/server'
import { ProductCard } from '@/components/products/product-card'
import { SortDropdown } from '@/components/shop/sort-dropdown'

// Category color mapping
const categoryColors: Record<string, string> = {
  'nfc-cards': 'bg-violet-500',
  'qr-cards': 'bg-orange-500',
  'standees': 'bg-amber-500',
  'keychains': 'bg-teal-500',
  'table-tents': 'bg-rose-500',
}

interface PageProps {
  params: Promise<{ category: string }>
  searchParams: Promise<{ sort?: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params
  const supabase = await createClient()

  const { data: categoryData } = await supabase
    .from('categories')
    .select('name, description')
    .eq('slug', category)
    .single()

  if (!categoryData) {
    return { title: 'Category Not Found' }
  }

  return {
    title: categoryData.name,
    description: categoryData.description || `Shop ${categoryData.name} at Instant Connect`,
  }
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const { category } = await params
  const { sort } = await searchParams
  const supabase = await createClient()

  // Fetch category
  const { data: categoryData } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', category)
    .eq('is_active', true)
    .single()

  if (!categoryData) {
    notFound()
  }

  // Build products query
  let query = supabase
    .from('products')
    .select('*')
    .eq('category_id', categoryData.id)
    .eq('is_active', true)

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

  const bgColor = categoryColors[category] || 'bg-zinc-800'

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
            <Link href="/shop" className="text-zinc-500 hover:text-zinc-700">
              Shop
            </Link>
            <ChevronRight className="h-4 w-4 text-zinc-400" />
            <span className="font-medium text-zinc-900">{categoryData.name}</span>
          </nav>
        </div>
      </div>

      {/* Category Hero */}
      <section className="flex justify-center bg-zinc-100 py-6">
        <div className={`relative w-[95%] overflow-hidden rounded-xl ${bgColor} px-8 py-12 md:py-16`}>
          <div className="relative z-10">
            <p className="text-sm font-medium text-white/70">
              {categoryData.description?.split('.')[0] || 'Explore our collection'}
            </p>
            <h1 className="mt-2 text-3xl font-bold text-white md:text-4xl">
              {categoryData.name}
            </h1>
            {categoryData.description && (
              <p className="mt-3 max-w-xl text-white/80">
                {categoryData.description}
              </p>
            )}
          </div>
          {/* Decorative elements */}
          <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-white/10 to-transparent" />
        </div>
      </section>

      {/* Filter Bar */}
      <section className="flex justify-center bg-zinc-100 pb-4">
        <div className="w-[95%]">
          <div className="flex items-center justify-between rounded-xl bg-white p-4">
            <span className="text-sm text-zinc-500">
              {products?.length || 0} products in {categoryData.name}
            </span>
            <SortDropdown />
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="flex justify-center bg-zinc-100 pb-8">
        <div className="w-[95%]">
          {products && products.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} categorySlug={category} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl bg-white py-16 text-center">
              <p className="text-zinc-500">No products found in this category</p>
              <Link
                href="/shop"
                className="mt-4 inline-block text-sm font-medium text-teal-600 hover:text-teal-700"
              >
                Browse all products
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="flex justify-center bg-zinc-100 pb-8">
        <div className="w-[95%] rounded-xl bg-zinc-900 px-8 py-12 text-center">
          <h2 className="text-2xl font-bold text-white">
            Need help choosing the right product?
          </h2>
          <p className="mt-2 text-zinc-400">
            Our team is here to help you find the perfect solution for your business.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-100"
            >
              Contact Us
            </Link>
            <Link
              href="/book-demo"
              className="rounded-lg border border-zinc-700 px-6 py-3 text-sm font-semibold text-white hover:bg-zinc-800"
            >
              Book a Demo
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
