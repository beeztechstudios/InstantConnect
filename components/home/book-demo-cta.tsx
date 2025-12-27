import Link from 'next/link'
import { Mail } from 'lucide-react'

export function BookDemoCTA() {
  return (
    <section className="flex flex-col items-center bg-zinc-100 py-6 sm:py-8">
      {/* Main CTA Banner */}
      <div
        className="relative w-[95%] overflow-hidden rounded-[10px] bg-cover bg-center"
        style={{ backgroundImage: `url('/footerheroctabg.png')` }}
      >
        {/* Content */}
        <div className="relative z-10 px-4 py-16 text-center sm:px-8 sm:py-32 md:py-44 lg:py-52">
          <p className="text-xs sm:text-sm text-white/80 md:text-base">
            Share your profile, collect reviews, and build trust with one smart tap.
          </p>
          <h2 className="mt-2 sm:mt-3 text-xl font-bold text-white sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
            One tap is all it takes
          </h2>
          <div className="mt-5 flex flex-col items-center justify-center gap-2.5 sm:mt-8 sm:flex-row sm:gap-4">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-zinc-900 hover:bg-zinc-100 sm:px-6 sm:py-3"
            >
              Get your smart card
              <Mail className="h-4 w-4" />
            </Link>
            <Link
              href="/book-demo"
              className="rounded-lg bg-white/20 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/30 sm:px-6 sm:py-3"
            >
              Book a demo
            </Link>
          </div>
        </div>
      </div>

      {/* Three Cards Grid */}
      <div className="mt-3 sm:mt-4 grid w-[95%] gap-3 sm:gap-4 sm:grid-cols-2 md:grid-cols-3">
        {/* Red Text Card */}
        <div className="flex h-[240px] sm:h-[280px] md:h-[350px] flex-col justify-end rounded-[10px] p-4 sm:p-5 md:p-6" style={{ backgroundColor: '#FF4D33' }}>
          <p className="text-xs sm:text-sm font-medium text-white/80">Smart connections</p>
          <h3 className="mt-1.5 sm:mt-2 text-xl sm:text-2xl font-bold leading-tight text-white md:text-3xl">
            Designed for<br />modern networking
          </h3>
          <Link
            href="/shop"
            className="mt-4 sm:mt-6 inline-block w-fit rounded-lg bg-white px-4 py-2 sm:px-5 sm:py-2.5 text-sm font-semibold text-zinc-900 hover:bg-zinc-100"
          >
            Explore products
          </Link>
        </div>

        {/* Image Card 1 */}
        <Link href="/shop" className="group relative h-[240px] sm:h-[280px] md:h-[350px] overflow-hidden rounded-[10px]">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
            style={{
              backgroundImage: `url('/footercta1.png')`,
            }}
          />
          {/* Glassmorphic Text Overlay */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-center p-3 sm:p-4">
            <div className="rounded-lg bg-white/20 px-3 py-2 sm:px-4 sm:py-3 backdrop-blur-md">
              <p className="text-xs sm:text-sm font-medium text-white">
                Discover the power of instant connections
              </p>
            </div>
          </div>
        </Link>

        {/* Image Card 2 */}
        <Link href="/shop" className="group relative h-[240px] sm:h-[280px] md:h-[350px] overflow-hidden rounded-[10px] sm:col-span-2 md:col-span-1">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
            style={{
              backgroundImage: `url('/footercta2.png')`,
            }}
          />
          {/* Glassmorphic Text Overlay */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-center p-3 sm:p-4">
            <div className="rounded-lg bg-white/20 px-3 py-2 sm:px-4 sm:py-3 backdrop-blur-md">
              <p className="text-xs sm:text-sm font-medium text-white">
                One tap. Real connections.
              </p>
            </div>
          </div>
        </Link>
      </div>
    </section>
  )
}
