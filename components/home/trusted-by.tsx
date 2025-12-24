const brands = [
  'Coca-Cola',
  'Adani Realty',
  'HDFC Bank',
  'JK Tyre',
  'Monin',
  'Mamaearth',
  'Sugar',
  'Hamleys',
  'Amazon',
  'Axis Bank',
  'boAt',
]

export function TrustedBy() {
  return (
    <section className="border-y border-zinc-200 bg-zinc-50 py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-zinc-900 sm:text-lg">
            Trusted by 25,000+ Brands and Professionals
          </p>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:mt-8 sm:gap-8 md:gap-12">
          {brands.map((brand) => (
            <div
              key={brand}
              className="flex h-10 items-center justify-center text-sm font-medium text-zinc-400 sm:h-12 sm:text-lg"
            >
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
