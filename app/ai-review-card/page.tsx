import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Star, Zap, TrendingUp, Shield, ArrowRight, Check, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Accordion } from '@/components/ui/accordion'
import { createClient } from '@/utils/supabase/server'
import { ProductGrid } from '@/components/products/product-grid'

export const metadata: Metadata = {
  title: 'AI Review Card',
  description:
    'Boost your Google reviews with our AI-powered NFC Review Cards. Make it easy for customers to leave positive reviews.',
}

const benefits = [
  {
    icon: Star,
    title: 'Instant Google Reviews',
    description:
      'Customers tap and instantly land on your Google review page. No searching, no typing - just tap and review.',
  },
  {
    icon: Zap,
    title: 'Boost Review Rate by 300%',
    description:
      'Businesses using our AI Review Cards see an average 300% increase in review collection.',
  },
  {
    icon: TrendingUp,
    title: 'Improve Local SEO',
    description:
      'More reviews mean better search rankings. Stand out in local searches and attract more customers.',
  },
  {
    icon: Shield,
    title: 'Smart Review Filtering',
    description:
      'Our AI helps route unhappy customers to private feedback, protecting your public reputation.',
  },
]

const problemSolutions = [
  {
    problem: 'Customers forget to leave reviews',
    solution: 'Instant tap-to-review makes it effortless in the moment',
  },
  {
    problem: 'Low review collection rate',
    solution: 'QR + NFC dual technology ensures maximum compatibility',
  },
  {
    problem: 'Negative reviews hurting business',
    solution: 'AI-powered routing sends unhappy customers to private feedback',
  },
  {
    problem: 'Competitors have more reviews',
    solution: 'Systematic review collection at every customer touchpoint',
  },
]

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
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 py-12 text-white sm:py-20">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-yellow-500/20 px-4 py-1 text-sm text-yellow-400">
                <Star className="h-4 w-4 fill-yellow-400" />
                Boost Your Google Reviews
              </div>
              <h1 className="mt-6 text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl">
                AI-Powered
                <span className="text-yellow-400"> Review Cards</span>
              </h1>
              <p className="mt-4 text-base text-zinc-300 sm:mt-6 sm:text-lg md:text-xl">
                Turn every customer into a 5-star reviewer. Our smart NFC cards make collecting
                Google reviews effortless.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:gap-4">
                <Button asChild size="lg" className="w-full bg-yellow-500 text-black hover:bg-yellow-400 sm:w-auto">
                  <Link href="#products">
                    Get Your Cards
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full border-zinc-700 text-white sm:w-auto">
                  <Link href="/book-demo">Book a Demo</Link>
                </Button>
              </div>
              <div className="mt-6 flex flex-col gap-2 text-sm text-zinc-400 sm:mt-8 sm:flex-row sm:items-center sm:gap-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="ml-2">4.9/5 rating</span>
                </div>
                <span>10,000+ cards delivered</span>
              </div>
            </div>
            <div className="relative">
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-yellow-400/20 to-transparent p-4 sm:p-8">
                <Image
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600"
                  alt="AI Review Card"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution */}
      <section className="py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-zinc-900 sm:text-3xl">
              The Review Collection Problem
            </h2>
            <p className="mt-4 text-zinc-600">
              And how AI Review Cards solve it
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:mt-12 sm:gap-6 md:grid-cols-2">
            {problemSolutions.map((item, index) => (
              <div
                key={index}
                className="rounded-xl border border-zinc-200 bg-white p-4 sm:p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-sm font-bold text-red-600">
                    X
                  </div>
                  <div>
                    <p className="font-medium text-zinc-900">{item.problem}</p>
                    <div className="mt-3 flex items-start gap-2">
                      <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                        <Check className="h-3 w-3 text-green-600" />
                      </div>
                      <p className="text-sm text-zinc-600">{item.solution}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-zinc-50 py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-zinc-900 sm:text-3xl">
              Why Businesses Love AI Review Cards
            </h2>
          </div>
          <div className="mt-8 grid gap-6 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-yellow-100">
                  <benefit.icon className="h-7 w-7 text-yellow-600" />
                </div>
                <h3 className="mt-4 font-semibold text-zinc-900">{benefit.title}</h3>
                <p className="mt-2 text-sm text-zinc-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-zinc-900 sm:text-3xl">
              Choose Your AI Review Card
            </h2>
            <p className="mt-4 text-zinc-600">
              Premium quality cards with lifetime NFC functionality
            </p>
          </div>
          <div className="mt-12">
            <ProductGrid products={products} categorySlug="nfc-cards" columns={4} />
          </div>
          <div className="mt-8 text-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/shop/nfc-cards">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="bg-zinc-900 py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <MessageSquare className="mx-auto h-10 w-10 text-yellow-400" />
          <blockquote className="mt-6 text-2xl font-medium">
            &quot;Our Google reviews went from 50 to 200+ in just 3 months after implementing AI
            Review Cards. The ROI has been incredible.&quot;
          </blockquote>
          <div className="mt-6">
            <p className="font-semibold">Rahul Sharma</p>
            <p className="text-sm text-zinc-400">Owner, Mumbai Restaurant Chain</p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-12 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-zinc-900 sm:text-3xl">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="mt-8 space-y-4 sm:mt-12">
            {faqs.map((faq, index) => (
              <Accordion key={index} title={faq.question}>
                <p className="text-zinc-600">{faq.answer}</p>
              </Accordion>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-zinc-200 bg-zinc-50 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-zinc-900 sm:text-3xl">
            Ready to Boost Your Reviews?
          </h2>
          <p className="mt-4 text-zinc-600">
            Join 1000+ businesses using AI Review Cards to grow their online reputation.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="w-full bg-yellow-500 text-black hover:bg-yellow-400 sm:w-auto">
              <Link href="/shop/nfc-cards">
                Get Started Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <Link href="/contact">Talk to Sales</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
