import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ProductCard } from '@/components/products/product-card'
import { createClient } from '@/utils/supabase/server'

export async function FeaturedProducts() {
  const supabase = await createClient()

  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('is_featured', true)
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(3)

  if (!products || products.length === 0) {
    return null
  }

  return (
    <div className="flex justify-center">
      <section className="relative z-20 mt-6 w-[95%] rounded-t-xl bg-zinc-100 p-6">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-zinc-500">
              Discover our most popular smart products
            </p>
            <h2 className="text-xl font-bold text-zinc-900 sm:text-2xl">
              This week&apos;s steal deals
            </h2>
          </div>
          <Link
            href="/shop"
            className="inline-flex w-fit items-center gap-2 rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-800"
          >
            Explore all products
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}

          {/* Promo Banner Card */}
          <Link href="/shop/qr-cards" className="group">
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop')`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

              {/* Promo Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white">
                <div className="text-6xl font-bold leading-none">25<sup className="text-2xl">%</sup></div>
                <div className="text-2xl font-bold">OFF</div>
                <p className="mt-2 text-lg">On smart QR Cards</p>
                <span className="mt-4 rounded-lg bg-white px-6 py-2 text-sm font-semibold text-zinc-900 transition-colors group-hover:bg-zinc-100">
                  Shop now
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>
    </div>
  )
}
