import { Suspense } from 'react'
import {
  HeroSection,
  HashtagSlider,
  CategoryBlocks,
  FeaturedProducts,
  HeroBanner,
  JustDropped,
  TestimonialsSection,
  HowItWorks,
  BookDemoCTA,
} from '@/components/home'
import { ProductCardSkeleton } from '@/components/ui/skeleton'

function FeaturedProductsSkeleton() {
  return (
    <section className="py-16 bg-zinc-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HashtagSlider />

      <Suspense fallback={<FeaturedProductsSkeleton />}>
        <FeaturedProducts />
      </Suspense>

      <CategoryBlocks />
      <HeroBanner />
      <JustDropped />
      {/* <HowItWorks /> */}
      <TestimonialsSection />
      <BookDemoCTA />
    </>
  )
}
