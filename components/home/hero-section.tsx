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
            src="https://res.cloudinary.com/dem0bqs8e/video/upload/v1767860757/copy_8DF5DC17-E994-4E9C-95EC-99E54FA834B7_pxcxtl.mov"
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
