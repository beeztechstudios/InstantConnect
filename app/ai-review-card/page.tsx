import { Metadata } from 'next'
import Link from 'next/link'
import { Check, X } from 'lucide-react'
import { Accordion } from '@/components/ui/accordion'
import { createClient } from '@/utils/supabase/server'
import { ProductGrid } from '@/components/products/product-grid'
import { HowItWorks } from '@/components/home/how-it-works'
import { BookDemoCTA } from '@/components/home/book-demo-cta'

export const metadata: Metadata = {
  title: 'AI Review Card',
  description:
    'Boost your Google reviews with our AI-powered NFC Review Cards. Make it easy for customers to leave positive reviews.',
}

const faqs = [
  {
    question: 'How does the AI Review Card work?',
    answer:
      'When a customer taps their phone on the card, they are taken directly to your Google Business review page. If enabled, our AI first asks them about their experience - positive experiences go to Google, while negative ones are routed to private feedback.',
  },
  {
    question: 'Is it compatible with all phones?',
    answer:
      'Yes! The card uses both NFC (tap) and QR code technology. NFC works with most modern smartphones, and the QR code provides a fallback for older devices.',
  },
  {
    question: 'Can I use it for multiple locations?',
    answer:
      'Absolutely! Each card can be linked to a specific location. We offer bulk pricing for businesses with multiple locations.',
  },
  {
    question: 'How do I set up my Google review link?',
    answer:
      'After purchase, you\'ll receive instructions to set up your card. Simply provide your Google Business profile link and we\'ll configure the card for you.',
  },
  {
    question: 'What materials are the cards made of?',
    answer:
      'Our review cards are made from premium PVC plastic with embedded NFC chip. They are waterproof, durable, and designed to withstand daily use.',
  },
]

export default async function AIReviewCardPage() {
  const supabase = await createClient()

  // Fetch NFC products (assuming they're in the nfc-cards category)
  const { data: category } = await supabase
    .from('categories')
    .select('id')
    .eq('slug', 'nfc-cards')
    .single()

  let products: any[] = []
  if (category) {
    const { data } = await supabase
      .from('products')
      .select('*')
      .eq('category_id', category.id)
      .eq('is_active', true)
      .limit(4)

    products = data || []
  }

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
              className="mt-5 sm:mt-6 md:mt-8 rounded-lg bg-white px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold text-zinc-900 hover:bg-zinc-100"
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
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 pb-5 sm:pb-6">
            <div>
              <p className="text-xs sm:text-sm text-zinc-500">
                One tap opens an AI-written review—ready to publish on Google.
              </p>
              <h2 className="mt-1 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-zinc-900">
                Designed for real interactions
              </h2>
            </div>
            <Link
              href="/shop"
              className="inline-block rounded-lg bg-zinc-900 px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-semibold text-white hover:bg-zinc-800 whitespace-nowrap w-fit"
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
                  <div className="flex items-center gap-2 sm:gap-3 rounded-full bg-white/40 px-3 sm:px-4 py-2 sm:py-2.5">
                    <div className="flex h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0 items-center justify-center rounded-full border-2 border-black/60">
                      <X className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-black/60" />
                    </div>
                    <span className="text-xs sm:text-sm text-black">Customers forget to leave reviews</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 rounded-full bg-white/40 px-3 sm:px-4 py-2 sm:py-2.5">
                    <div className="flex h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0 items-center justify-center rounded-full border-2 border-black/60">
                      <X className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-black/60" />
                    </div>
                    <span className="text-xs sm:text-sm text-black">Review links are ignored</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 rounded-full bg-white/40 px-3 sm:px-4 py-2 sm:py-2.5">
                    <div className="flex h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0 items-center justify-center rounded-full border-2 border-black/60">
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
                  <div className="flex items-center gap-2 sm:gap-3 rounded-full bg-white/40 px-3 sm:px-4 py-2 sm:py-2.5">
                    <div className="flex h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0 items-center justify-center rounded-full border-2 border-black/60">
                      <Check className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-black/60" />
                    </div>
                    <span className="text-xs sm:text-sm text-black">One tap → instant AI review</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 rounded-full bg-white/40 px-3 sm:px-4 py-2 sm:py-2.5">
                    <div className="flex h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0 items-center justify-center rounded-full border-2 border-black/60">
                      <Check className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-black/60" />
                    </div>
                    <span className="text-xs sm:text-sm text-black">Smart feedback beyond stars</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 rounded-full bg-white/40 px-3 sm:px-4 py-2 sm:py-2.5">
                    <div className="flex h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0 items-center justify-center rounded-full border-2 border-black/60">
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

      {/* Designed for Your Shop */}
      <section id="products" className="pt-10 pb-6 sm:pt-12 sm:pb-8 lg:pt-16 lg:pb-10">
        <div className="mx-auto w-[95%]">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 sm:gap-4 pb-5 sm:pb-6 lg:pb-8">
            <div>
              <p className="text-xs sm:text-sm text-zinc-500">
                Collect reviews while the experience is fresh.
              </p>
              <h2 className="mt-1 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-zinc-900">
                Designed for your shop
              </h2>
            </div>
            <Link
              href="/shop/nfc-cards"
              className="inline-block rounded-lg bg-zinc-900 px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-semibold text-white hover:bg-zinc-800 whitespace-nowrap w-fit"
            >
              Explore products
            </Link>
          </div>

          {/* Products Grid */}
          <ProductGrid products={products} categorySlug="nfc-cards" columns={4} />
        </div>
      </section>

      {/* How It Works */}
      <div className="pt-8 sm:pt-12 lg:pt-16">
        <HowItWorks />
      </div>

      {/* FAQs */}
      <section className="py-8 sm:py-12 lg:py-16">
        <div className="mx-auto w-[95%] max-w-3xl">
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-zinc-900">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="mt-6 sm:mt-8 lg:mt-12 space-y-3 sm:space-y-4">
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
