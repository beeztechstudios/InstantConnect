'use client'

export function HeroSection() {
  return (
    <section className="mx-[1%]">
      <div className="relative h-[400px] w-full overflow-hidden rounded-b-xl sm:h-[500px] md:h-[715px]">
        {/* Background Image */}
        <div
          className="absolute inset-0 h-full w-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop')`,
          }}
        />
      </div>
    </section>
  )
}
