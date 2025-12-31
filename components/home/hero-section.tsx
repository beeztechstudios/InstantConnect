"use client";

export function HeroSection() {
  return (
    <section className="mx-3 mt-0 sm:mx-1.5 sm:mt-0 md:mb-0 mb-58">
      <div className="relative md:mt-0 mt-21 h-[290px] w-full overflow-hidden rounded-b-xl md:rounded-b-2xl sm:h-[600px] md:h-[750px]">
        {/* Background Video */}
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        >
          <source
            src="https://cdn.prod.website-files.com/692fdf1af547dec7a0d29950%2F692fe974875d60f098fedeb7_Instax%20_%20hero_mp4.mp4"
            type="video/mp4"
          />
          {/* Fallback image */}
        </video>

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/30" />

        
        
      </div>
    </section>
  );
}
