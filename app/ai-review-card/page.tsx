import { Metadata } from 'next'
import Link from 'next/link'
import { Check, X } from 'lucide-react'
import { Accordion } from '@/components/ui/accordion'
import { createClient } from '@/utils/supabase/server'
import { ProductCard } from '@/components/products/product-card'
import { HowItWorks } from '@/components/home/how-it-works'
import { BookDemoCTA } from '@/components/home/book-demo-cta'
import type { Product } from '@/types/database'

export const metadata: Metadata = {
  title: 'AI Review Card',
  description:
    'Boost your Google reviews with our AI-powered NFC Review Cards. Make it easy for customers to leave positive reviews.',
}

const faqs = [
  {
    question: 'What is Instant Connect?',
    answer:
      'Instant Connect is an NFC-based digital solution that allows you to instantly share your business details, contact information, social media links, payment links, and more by simply tapping the card or scanning a QR code.',
  },
  {
    question: 'Which devices support Instant Connect?',
    answer:
      'Instant Connect works on all NFC-enabled Android phones and iPhones (XR and above). For devices without NFC, the QR code on the product can be scanned to access the details.',
  },
  {
    question: 'Can I update my information after purchase?',
    answer:
      'Yes, your digital information can be updated even after purchase. Updates depend on the plan selected and may be free or chargeable as per the service terms.',
  },
  {
    question: 'Do I need an internet connection to use Instant Connect?',
    answer:
      'Internet is required only to open the digital profile. The NFC card itself does not require charging, battery, or any app installation.',
  },
  {
    question: 'Is the NFC card reusable and shareable?',
    answer:
      'Yes, the NFC card is reusable and long-lasting. You can tap it unlimited times and share your details with anyone without any physical wear for digital data.',
  },
  {
    question: 'What happens if my card gets damaged or lost?',
    answer:
      'Physical damage or loss is not covered under warranty. However, you can reorder a replacement card and link it to your existing digital profile.',
  },
]

export default async function AIReviewCardPage() {
  const supabase = await createClient()

  // Fetch all featured products
  const { data: featuredProducts } = await supabase
    .from('products')
    .select('*')
    .eq('is_featured', true)
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  const products: Product[] = featuredProducts || []

  return (
    <div className="overflow-x-hidden" style={{ backgroundColor: '#F4F4F4' }}>
      {/* Hero */}
      <section className="pt-[6px] px-[6px] pb-0">
        {/* Hero Content */}
        <div className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh] overflow-hidden rounded-[10px]">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('/aireviewhero.png')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

          {/* Content */}
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 sm:px-6">
            {/* Tagline */}
            <p className="text-center text-xs sm:text-sm md:text-base text-white/70 max-w-xs sm:max-w-md md:max-w-2xl">
              AI-powered review cards that help businesses collect better reviews, understand feedback, and grow trust — instantly.
            </p>

            {/* Heading */}
            <h1 className="mt-3 sm:mt-4 text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white max-w-xs sm:max-w-lg md:max-w-2xl">
              Turn customer visits into powerful reviews.
            </h1>

            {/* CTA Button */}
            <Link
              href="#products"
              className="mt-5 sm:mt-6 md:mt-8 rounded-[10px] bg-white px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold text-zinc-900 hover:bg-zinc-100"
            >
              See How It Works
            </Link>
          </div>
        </div>
      </section>

      {/* Designed for Real Interactions */}
      <section className="pt-10 pb-12 sm:pt-12 sm:pb-16 lg:pt-16 lg:pb-20">
        <div className="mx-auto w-[95%]">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-6 pb-6 sm:pb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="hidden sm:block h-px w-8 bg-sky-400" />
                <span className="text-xs sm:text-sm font-black uppercase tracking-[0.2em] text-sky-400">
                  One tap opens an AI-written review
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black tracking-tighter leading-[0.9]">
                Designed for{" "}
                <span className="text-zinc-400">real interactions.</span>
              </h2>
            </div>
            <Link
              href="/shop?category=nfc-cards"
              className="group flex items-center gap-3 rounded-[10px] bg-black px-6 py-3 sm:px-8 sm:py-4 text-sm font-black text-white transition-all hover:bg-sky-500 hover:scale-105 w-fit"
            >
              Try Instant Connect
            </Link>
          </div>

          {/* Content */}
          <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 lg:gap-6">
            {/* Left - Yellow Section (40%) */}
            <div className="w-full lg:w-[40%] p-4 sm:p-6 lg:p-8 rounded-[10px]" style={{ backgroundColor: '#F5A623' }}>
              {/* The problem */}
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-black">The problem with reviews today</h3>
                <div className="mt-3 sm:mt-4 space-y-2 sm:space-y-3">
                  <div className="flex items-center gap-2 sm:gap-3 rounded-[10px] bg-white/40 px-3 sm:px-4 py-2 sm:py-2.5">
                    <div className="flex h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0 items-center justify-center rounded-[10px] border-2 border-black/60">
                      <X className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-black/60" />
                    </div>
                    <span className="text-xs sm:text-sm text-black">Customers forget to leave reviews</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 rounded-[10px] bg-white/40 px-3 sm:px-4 py-2 sm:py-2.5">
                    <div className="flex h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0 items-center justify-center rounded-[10px] border-2 border-black/60">
                      <X className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-black/60" />
                    </div>
                    <span className="text-xs sm:text-sm text-black">Review links are ignored</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 rounded-[10px] bg-white/40 px-3 sm:px-4 py-2 sm:py-2.5">
                    <div className="flex h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0 items-center justify-center rounded-[10px] border-2 border-black/60">
                      <X className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-black/60" />
                    </div>
                    <span className="text-xs sm:text-sm text-black">Feedback is short or low quality</span>
                  </div>
                </div>
              </div>

              {/* The solution */}
              <div className="mt-5 sm:mt-6 lg:mt-8">
                <h3 className="text-base sm:text-lg font-semibold text-black">The AI Review Card fixes this</h3>
                <div className="mt-3 sm:mt-4 space-y-2 sm:space-y-3">
                  <div className="flex items-center gap-2 sm:gap-3 rounded-[10px] bg-white/40 px-3 sm:px-4 py-2 sm:py-2.5">
                    <div className="flex h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0 items-center justify-center rounded-[10px] border-2 border-black/60">
                      <Check className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-black/60" />
                    </div>
                    <span className="text-xs sm:text-sm text-black">One tap → instant AI review</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 rounded-[10px] bg-white/40 px-3 sm:px-4 py-2 sm:py-2.5">
                    <div className="flex h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0 items-center justify-center rounded-[10px] border-2 border-black/60">
                      <Check className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-black/60" />
                    </div>
                    <span className="text-xs sm:text-sm text-black">Smart feedback beyond stars</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 rounded-[10px] bg-white/40 px-3 sm:px-4 py-2 sm:py-2.5">
                    <div className="flex h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0 items-center justify-center rounded-[10px] border-2 border-black/60">
                      <Check className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-black/60" />
                    </div>
                    <span className="text-xs sm:text-sm text-black">Actionable business insights</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Image (60%) */}
            <div className="w-full lg:w-[60%] relative min-h-[250px] sm:min-h-[350px] lg:min-h-[500px] rounded-[10px] overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url('/aireviewsection.png')` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* You Might Also Like */}
      {products.length > 0 && (
        <section id="products" className="pt-10 pb-6 sm:pt-12 sm:pb-8 lg:pt-16 lg:pb-10">
          <div className="mx-auto w-[95%]">
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-6 mb-6 sm:mb-8">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="hidden sm:block h-px w-8 bg-sky-400" />
                  <span className="text-xs sm:text-sm font-black uppercase tracking-[0.2em] text-sky-400">
                    Featured products
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black tracking-tighter leading-[0.9]">
                  You might{" "}
                  <span className="text-zinc-400">also like.</span>
                </h2>
              </div>
              <Link
                href="/shop"
                className="group flex items-center gap-3 rounded-[10px] bg-black px-6 py-3 sm:px-8 sm:py-4 text-sm font-black text-white transition-all hover:bg-sky-500 hover:scale-105 w-fit"
              >
                View all
              </Link>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 lg:gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} noBg tag="Featured" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* How It Works */}
      <div className="pt-8 sm:pt-12 lg:pt-16">
        <HowItWorks />
      </div>

      {/* FAQs */}
      <section className="py-8 sm:py-12 lg:py-16">
        <div className="mx-auto w-[95%] max-w-3xl">
          <div className="text-center mb-8 sm:mb-10 lg:mb-12">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="h-px w-8 bg-sky-400" />
              <span className="text-xs sm:text-sm font-black uppercase tracking-[0.2em] text-sky-400">
                Got questions?
              </span>
              <span className="h-px w-8 bg-sky-400" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black tracking-tighter leading-[0.9]">
              Frequently{" "}
              <span className="text-zinc-400">asked questions.</span>
            </h2>
          </div>
          <div className="space-y-3 sm:space-y-4">
            {faqs.map((faq, index) => (
              <Accordion key={index} title={faq.question}>
                <p className="text-sm sm:text-base text-zinc-600">{faq.answer}</p>
              </Accordion>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <BookDemoCTA />
    </div>
  )
}
