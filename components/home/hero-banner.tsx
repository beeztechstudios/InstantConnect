import Link from 'next/link'

export function HeroBanner() {
  return (
    <section className="flex justify-center bg-zinc-100 py-6 sm:py-8">
      <Link href="/shop" className="group w-[95%]">
        <div className="relative h-[350px] overflow-hidden rounded-xl sm:h-[450px] md:h-[625px]">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2076&auto=format&fit=crop')`,
            }}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />

          {/* Content - Bottom Left */}
          <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 md:bottom-12 md:left-12">
            <p className="text-xs font-medium text-white/90 sm:text-sm md:text-base">
              Start connecting instantly
            </p>
            <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl md:text-5xl lg:text-6xl">
              Tap. Share. Grow.
            </h2>
          </div>
        </div>
      </Link>
    </section>
  )
}
