import Link from 'next/link'
import { Mail } from 'lucide-react'

export function BookDemoCTA() {
  return (
    <section className="flex flex-col items-center bg-zinc-100 py-8">
      {/* Main CTA Banner */}
      <div className="relative w-[95%] overflow-hidden rounded-xl bg-teal-600">
        {/* Left Wave Decoration */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 opacity-20">
          <svg width="200" height="400" viewBox="0 0 200 400" fill="none">
            <path d="M0 100 Q100 200 0 300" stroke="currentColor" strokeWidth="40" fill="none" className="text-teal-800" />
            <path d="M60 100 Q160 200 60 300" stroke="currentColor" strokeWidth="40" fill="none" className="text-teal-800" />
          </svg>
        </div>

        {/* Right Wave Decoration */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-20">
          <svg width="200" height="400" viewBox="0 0 200 400" fill="none">
            <path d="M200 100 Q100 200 200 300" stroke="currentColor" strokeWidth="40" fill="none" className="text-teal-800" />
            <path d="M140 100 Q40 200 140 300" stroke="currentColor" strokeWidth="40" fill="none" className="text-teal-800" />
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-10 px-4 py-16 text-center sm:px-8 sm:py-28 md:py-36">
          <p className="text-sm text-white/80 md:text-base">
            Share your profile, collect reviews, and build trust with one smart tap.
          </p>
          <h2 className="mt-3 text-2xl font-bold text-white sm:text-4xl md:text-5xl lg:text-6xl">
            One tap is all it takes
          </h2>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:mt-8 sm:flex-row sm:gap-4">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-100"
            >
              Get your smart card
              <Mail className="h-4 w-4" />
            </Link>
            <Link
              href="/book-demo"
              className="rounded-lg bg-teal-700 px-6 py-3 text-sm font-semibold text-white hover:bg-teal-800"
            >
              Book a demo
            </Link>
          </div>
        </div>
      </div>

      {/* Three Cards Grid */}
      <div className="mt-4 grid w-[95%] gap-4 sm:grid-cols-2 md:grid-cols-3">
        {/* Orange Text Card */}
        <div className="flex h-[280px] flex-col justify-end rounded-xl bg-orange-500 p-4 sm:h-[350px] sm:p-6">
          <p className="text-sm font-medium text-white/80">Smart connections</p>
          <h3 className="mt-2 text-2xl font-bold leading-tight text-white md:text-3xl">
            Designed for<br />modern networking
          </h3>
          <Link
            href="/shop"
            className="mt-6 inline-block w-fit rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-zinc-900 hover:bg-zinc-100"
          >
            Explore products
          </Link>
        </div>

        {/* Image Card 1 */}
        <Link href="/shop" className="group relative h-[280px] overflow-hidden rounded-xl sm:h-[350px]">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1000&auto=format&fit=crop')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <p className="text-sm text-white/90">
              Discover the power of instant connections
            </p>
          </div>
        </Link>

        {/* Image Card 2 */}
        <Link href="/shop" className="group relative h-[280px] overflow-hidden rounded-xl sm:col-span-2 sm:h-[350px] md:col-span-1">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1000&auto=format&fit=crop')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <p className="text-sm text-white/90">
              One tap. Real connections.
            </p>
          </div>
        </Link>
      </div>
    </section>
  )
}
