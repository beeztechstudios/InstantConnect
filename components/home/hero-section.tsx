'use client'

export function HeroSection() {
  return (
    <section className="mx-1 mt-1 sm:mx-1.5 sm:mt-1.5">
      <div className="relative h-[500px] w-full overflow-hidden rounded-xl sm:h-[600px] md:h-[750px]">
        {/* Background Image - Person holding phone with card */}
        <div
          className="absolute inset-0 h-full w-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/heroimage.png')`,
          }}
        />

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Hero Text - positioned in upper half */}
        <div className="absolute inset-x-0 top-[20%] flex items-center justify-center sm:top-[25%]">
          <h1 className="text-center text-3xl font-bold text-white sm:text-4xl md:text-5xl lg:text-6xl">
            Tap Once, Connect Instantly
          </h1>
        </div>
      </div>
    </section>
  )
}
