'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Aarav Mehta',
    role: 'Product Designer',
    quote: 'InstantConnect fits perfectly into my daily workflow.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 2,
    name: 'Rohan Kapoor',
    role: 'Startup Founder',
    quote: 'It made sharing my details simple and professional.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 3,
    name: 'Kunal Verma',
    role: 'Content Creator',
    quote: 'My connections happen faster and more naturally now.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 4,
    name: 'Neha Sharma',
    role: 'Business Owner',
    quote: 'A small change that made a big difference for my business.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop',
  },
]

export function TestimonialsSection() {
  return (
    <section className="flex justify-center bg-zinc-100 py-8">
      <div className="w-[95%]">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm text-zinc-500">
              Hear how creators and professionals use InstantConnect in their daily work.
            </p>
            <h2 className="mt-1 text-2xl font-bold text-zinc-900 sm:text-3xl md:text-4xl">
              Loved by creators everywhere
            </h2>
          </div>
          <div className="hidden gap-2 sm:flex">
            <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-300 bg-white text-zinc-600 hover:bg-zinc-50">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-violet-500 bg-violet-500 text-white hover:bg-violet-600">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="group relative h-[350px] overflow-hidden rounded-xl sm:h-[400px] lg:h-[500px]"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url('${testimonial.image}')` }}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                {/* Quote */}
                <p className="text-sm text-white/90">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                {/* Author & Logo */}
                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <p className="text-sm text-white/70">{testimonial.role}</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-white">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white">
                      <span className="text-xs font-bold text-zinc-900">C</span>
                    </div>
                    <span className="text-sm font-semibold">Logoipsum</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
