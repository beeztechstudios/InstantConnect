import Link from 'next/link'
import Image from 'next/image'
import { Smartphone, MessageSquare, Share2 } from 'lucide-react'

const steps = [
  { icon: Smartphone, label: 'Tap the smart card' },
  { icon: MessageSquare, label: 'AI writes the review' },
  { icon: Share2, label: 'Publish on Google' },
]

export function HeroBanner() {
  return (
    <section className="flex justify-center bg-zinc-100 py-6 sm:py-8">
      <div className="w-[95%] overflow-hidden rounded-[10px]" style={{ backgroundColor: '#6D2FF4' }}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          {/* Left Content */}
          <div className="flex-1 p-6 sm:p-8 md:p-12 md:pl-20 lg:p-16 lg:pl-28">
            <p className="text-xs sm:text-sm text-white/80">
              The smart way to collect real customer reviews
            </p>
            <h2 className="mt-2 sm:mt-3 text-3xl font-bold text-white sm:text-4xl md:text-5xl lg:text-6xl">
              instant UP!<sup className="text-sm sm:text-lg">™</sup>
            </h2>
            <p className="mt-3 sm:mt-4 text-lg text-white/90 sm:text-xl md:text-2xl">
              Turn interactions into<br />
              Google reviews. Instantly.
            </p>

            {/* Steps */}
            <div className="mt-6 sm:mt-8 flex flex-wrap gap-4 sm:gap-6 md:gap-8">
              {steps.map((step, index) => (
                <div key={index} className="flex flex-col items-center gap-1.5 sm:gap-2">
                  <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border-2 border-white/30">
                    <step.icon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                  <span className="text-[10px] sm:text-xs text-white/80 text-center max-w-[70px] sm:max-w-[80px]">
                    {step.label}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <Link
              href="/ai-review-card"
              className="mt-6 sm:mt-8 inline-block rounded-lg bg-white px-5 py-2.5 sm:px-6 sm:py-3 text-sm font-semibold text-violet-600 transition-colors hover:bg-zinc-100"
            >
              Learn More
            </Link>
          </div>

          {/* Right Side - Hero Mockup */}
          <div className="relative flex-1 min-h-[280px] sm:min-h-[350px] md:min-h-[560px] lg:min-h-[630px]">
            <div className="absolute inset-0 flex items-center justify-center p-2 sm:p-4">
              <Image
                src="/hero-mockup.png"
                alt="AI Review Cards and Phone"
                width={600}
                height={630}
                className="h-full w-auto object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
