import Link from 'next/link'

const categories = [
  {
    id: 1,
    name: 'NFC Cards',
    tagline: 'Tap once. Share everything.',
    href: '/shop/nfc-cards',
    cta: 'Explore',
    bgColor: 'bg-violet-600',
    image: '/card1.png',
  },
  {
    id: 2,
    name: 'AI Review\nQR & Cards',
    tagline: 'More reviews. More trust.',
    href: '/ai-review-card',
    cta: 'Explore AI Review',
    bgColor: 'bg-orange-500',
    image: '/card2.png',
  },
  {
    id: 3,
    name: 'Smart\nStandees',
    tagline: 'Turn footfall into connections.',
    href: '/shop/standees',
    cta: 'Explore Standees',
    bgColor: 'bg-amber-400',
    image: '/card3.png',
    textDark: true,
  },
  {
    id: 4,
    name: 'Keychains',
    tagline: 'Perfect for cafes, events & everyday use.',
    href: '/shop/keychains',
    cta: 'Shop Display Products',
    bgColor: 'bg-teal-500',
    image: '/card4.png',
  },
]

export function CategoryBlocks() {
  return (
    <section className="flex justify-center bg-zinc-100 py-8">
      <div className="w-[95%]">
        <div className="grid gap-4">
          {/* Row 1: Larger left, smaller right */}
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-5">
            {/* NFC Cards - Larger */}
            <Link
              href={categories[0].href}
              className={`group relative flex flex-col sm:flex-row min-h-[320px] sm:min-h-[420px] md:min-h-[480px] overflow-hidden rounded-[10px] ${categories[0].bgColor} md:col-span-3`}
            >
              <div className="relative h-48 sm:h-auto sm:w-1/2">
                <div
                  className="absolute inset-0 bg-contain bg-center bg-no-repeat transition-transform duration-300 group-hover:scale-105"
                  style={{ backgroundImage: `url('${categories[0].image}')` }}
                />
              </div>
              <div className="flex flex-1 sm:w-1/2 flex-col justify-center p-5 sm:p-6">
                <p className="text-xs sm:text-sm text-white/80">{categories[0].tagline}</p>
                <h3 className="mt-1.5 sm:mt-2 whitespace-pre-line text-xl font-bold leading-tight text-white sm:text-2xl md:text-3xl">
                  {categories[0].name}
                </h3>
                <div className="mt-3 sm:mt-4">
                  <span className="inline-block rounded-lg bg-zinc-900 px-4 py-2 sm:px-5 sm:py-2.5 text-sm font-semibold text-white transition-colors group-hover:bg-zinc-800">
                    {categories[0].cta}
                  </span>
                </div>
              </div>
            </Link>

            {/* AI Review - Smaller */}
            <Link
              href={categories[1].href}
              className={`group relative flex flex-col sm:flex-row min-h-[320px] sm:min-h-[420px] md:min-h-[480px] overflow-hidden rounded-[10px] ${categories[1].bgColor} md:col-span-2`}
            >
              <div className="relative h-48 sm:h-auto sm:w-1/2">
                <div
                  className="absolute inset-0 bg-contain bg-center bg-no-repeat transition-transform duration-300 group-hover:scale-105"
                  style={{ backgroundImage: `url('${categories[1].image}')` }}
                />
              </div>
              <div className="flex flex-1 sm:w-1/2 flex-col justify-center p-5 sm:p-6">
                <p className="text-xs sm:text-sm text-white/80">{categories[1].tagline}</p>
                <h3 className="mt-1.5 sm:mt-2 whitespace-pre-line text-xl font-bold leading-tight text-white sm:text-2xl">
                  {categories[1].name}
                </h3>
                <div className="mt-3 sm:mt-4">
                  <span className="inline-block rounded-lg bg-zinc-900 px-4 py-2 sm:px-5 sm:py-2.5 text-sm font-semibold text-white transition-colors group-hover:bg-zinc-800">
                    {categories[1].cta}
                  </span>
                </div>
              </div>
            </Link>
          </div>

          {/* Row 2: Smaller left, larger right */}
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-5">
            {/* Standees - Smaller */}
            <Link
              href={categories[2].href}
              className={`group relative flex flex-col sm:flex-row min-h-[320px] sm:min-h-[420px] md:min-h-[480px] overflow-hidden rounded-[10px] ${categories[2].bgColor} md:col-span-2`}
            >
              <div className="relative h-48 sm:h-auto sm:w-1/2">
                <div
                  className="absolute inset-0 bg-contain bg-center bg-no-repeat transition-transform duration-300 group-hover:scale-105"
                  style={{ backgroundImage: `url('${categories[2].image}')` }}
                />
              </div>
              <div className="flex flex-1 sm:w-1/2 flex-col justify-center p-5 sm:p-6">
                <p className="text-xs sm:text-sm text-zinc-800/70">{categories[2].tagline}</p>
                <h3 className="mt-1.5 sm:mt-2 whitespace-pre-line text-xl font-bold leading-tight text-zinc-900 sm:text-2xl">
                  {categories[2].name}
                </h3>
                <div className="mt-3 sm:mt-4">
                  <span className="inline-block rounded-lg bg-zinc-900 px-4 py-2 sm:px-5 sm:py-2.5 text-sm font-semibold text-white transition-colors group-hover:bg-zinc-800">
                    {categories[2].cta}
                  </span>
                </div>
              </div>
            </Link>

            {/* Keychains - Larger */}
            <Link
              href={categories[3].href}
              className={`group relative flex flex-col sm:flex-row min-h-[320px] sm:min-h-[420px] md:min-h-[480px] overflow-hidden rounded-[10px] ${categories[3].bgColor} md:col-span-3`}
            >
              <div className="relative h-48 sm:h-auto sm:w-1/2">
                <div
                  className="absolute inset-0 bg-contain bg-center bg-no-repeat transition-transform duration-300 group-hover:scale-105"
                  style={{ backgroundImage: `url('${categories[3].image}')` }}
                />
              </div>
              <div className="flex flex-1 sm:w-1/2 flex-col justify-center p-5 sm:p-6">
                <p className="text-xs sm:text-sm text-white/80">{categories[3].tagline}</p>
                <h3 className="mt-1.5 sm:mt-2 whitespace-pre-line text-xl font-bold leading-tight text-white sm:text-2xl md:text-3xl">
                  {categories[3].name}
                </h3>
                <div className="mt-3 sm:mt-4">
                  <span className="inline-block rounded-lg bg-zinc-900 px-4 py-2 sm:px-5 sm:py-2.5 text-sm font-semibold text-white transition-colors group-hover:bg-zinc-800">
                    {categories[3].cta}
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
