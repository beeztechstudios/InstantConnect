import { ProductCard } from './product-card'
import { ProductCardSkeleton } from '@/components/ui/skeleton'
import type { Product } from '@/types/database'

interface ProductGridProps {
  products: Product[]
  categorySlug?: string
  isLoading?: boolean
  columns?: 2 | 3 | 4
}

export function ProductGrid({
  products,
  categorySlug,
  isLoading = false,
  columns = 4
}: ProductGridProps) {
  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  }

  if (isLoading) {
    return (
      <div className={`grid gap-6 ${gridCols[columns]}`}>
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-lg font-medium text-zinc-900">
          No products found
        </p>
        <p className="mt-1 text-sm text-zinc-500">
          Check back later for new arrivals
        </p>
      </div>
    )
  }

  return (
    <div className={`grid gap-6 ${gridCols[columns]}`}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          categorySlug={categorySlug}
        />
      ))}
    </div>
  )
}
