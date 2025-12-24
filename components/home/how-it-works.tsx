import { Wifi, Link2, Sparkles } from 'lucide-react'

const steps = [
  {
    step: 'STEP 1',
    icon: Wifi,
    title: 'Tap or Scan',
    description: 'Tap your phone on the card or scan the QR to get started.',
  },
  {
    step: 'STEP 2',
    icon: Link2,
    title: 'Open Instantly',
    description: 'Your digital profile or review page opens in seconds.',
  },
  {
    step: 'STEP 3',
    icon: Sparkles,
    title: 'Connect & Grow',
    description: 'Share details, collect reviews, and build trust effortlessly.',
  },
]

export function HowItWorks() {
  return (
    <section className="flex justify-center bg-zinc-100 py-8">
      <div className="w-[95%] overflow-hidden rounded-xl bg-violet-500">
        {/* Header */}
        <div className="px-4 pt-8 text-center sm:px-8 sm:pt-12">
          <p className="text-sm text-white/80">
            Connect, share, and collect—instantly.
          </p>
          <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            How it works
          </h2>
        </div>

        {/* Steps */}
        <div className="grid gap-6 px-4 py-8 sm:gap-8 sm:px-8 sm:py-10 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={index}>
              <p className="text-sm font-medium text-white/60">{step.step}</p>
              <div className="mt-3 flex items-start gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-amber-300">
                  <step.icon className="h-5 w-5 text-violet-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{step.title}</h3>
                  <p className="mt-1 text-sm text-white/80">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Image */}
        <div className="px-4 pb-4">
          <div
            className="h-[250px] w-full rounded-xl bg-cover bg-center sm:h-[350px] md:h-[500px]"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop')`,
            }}
          />
        </div>
      </div>
    </section>
  )
}
