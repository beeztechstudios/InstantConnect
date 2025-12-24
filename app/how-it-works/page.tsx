import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight, Smartphone, CreditCard, Share2, Check, Zap, Users, BarChart3, Leaf, Play, ChevronDown } from 'lucide-react'

export const metadata: Metadata = {
  title: 'How It Works',
  description: 'Learn how Instant Connect NFC cards work and how to set them up.',
}

const steps = [
  {
    number: '01',
    icon: CreditCard,
    title: 'Choose Your Product',
    description: 'Select from our range of NFC cards, QR codes, standees, keychains, or table tents. Customize the design to match your brand.',
    color: 'bg-violet-500',
  },
  {
    number: '02',
    icon: Smartphone,
    title: 'Set Up Your Profile',
    description: 'After receiving your product, set up your digital profile with contact details, social links, portfolio, and more.',
    color: 'bg-teal-500',
  },
  {
    number: '03',
    icon: Share2,
    title: 'Share Instantly',
    description: 'Tap your NFC product against any smartphone to instantly share your profile. No app needed - it just works!',
    color: 'bg-orange-500',
  },
]

const features = [
  {
    icon: Zap,
    title: 'Instant Sharing',
    description: 'Share your contact in under a second with a simple tap.',
  },
  {
    icon: Smartphone,
    title: 'No App Required',
    description: 'Works with all modern smartphones out of the box.',
  },
  {
    icon: Users,
    title: 'Unlimited Contacts',
    description: 'Share with as many people as you want, no limits.',
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description: 'Track views, taps, and engagement with detailed analytics.',
  },
  {
    icon: Leaf,
    title: 'Eco-Friendly',
    description: 'Replace hundreds of paper cards with one NFC card.',
  },
  {
    icon: Check,
    title: 'Always Updated',
    description: 'Update your profile anytime without reprinting.',
  },
]

const faqs = [
  {
    question: 'What devices are compatible with NFC cards?',
    answer: 'Our NFC cards work with all modern smartphones including iPhone (XR and newer) and most Android devices from 2018 onwards. The cards use NFC technology which is built into these devices.',
  },
  {
    question: 'Do I need to install an app?',
    answer: 'No! That\'s the beauty of Instant Connect. When someone taps your NFC card with their phone, it automatically opens your digital profile in their web browser. No app installation needed for you or your contacts.',
  },
  {
    question: 'Can I update my profile after receiving my card?',
    answer: 'Yes, you can update your digital profile as many times as you want. Your NFC card links to your online profile, so any changes you make are instantly reflected when someone taps your card.',
  },
  {
    question: 'How long do NFC cards last?',
    answer: 'Our NFC cards are built to last. The NFC chip has no battery and doesn\'t degrade with use. With normal use, your card should last several years. The physical card material is also durable and water-resistant.',
  },
  {
    question: 'What information can I share?',
    answer: 'You can share anything you want: contact details, social media links, website, portfolio, videos, documents, calendar booking links, and more. You have full control over what information is visible.',
  },
  {
    question: 'Is my data secure?',
    answer: 'Absolutely. Your data is encrypted and stored securely. You control what information is shared, and you can make your profile private anytime. We never sell or share your data with third parties.',
  },
]

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-zinc-100">
      {/* Breadcrumb */}
      <div className="flex justify-center bg-zinc-100 pt-6">
        <div className="w-[95%]">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-zinc-500 hover:text-zinc-700">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 text-zinc-400" />
            <span className="font-medium text-zinc-900">How It Works</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="flex justify-center bg-zinc-100 py-6">
        <div className="w-[95%]">
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-violet-600 to-violet-700 px-8 py-16 md:py-24">
            <div className="relative z-10 mx-auto max-w-3xl text-center">
              <span className="inline-block rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
                Simple & Effective
              </span>
              <h1 className="mt-6 text-4xl font-bold text-white md:text-5xl">
                Networking Made
                <span className="block text-violet-200">Effortless</span>
              </h1>
              <p className="mt-6 text-lg text-violet-100">
                Say goodbye to paper business cards. With Instant Connect, sharing your
                professional identity takes just one tap. Here&apos;s how it works.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link
                  href="/shop"
                  className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-violet-600 hover:bg-violet-50"
                >
                  Shop Now
                </Link>
                <Link
                  href="/book-demo"
                  className="rounded-lg border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/20"
                >
                  Book a Demo
                </Link>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-violet-500/30 blur-3xl" />
            <div className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-violet-400/30 blur-3xl" />
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="flex justify-center bg-zinc-100 py-8">
        <div className="w-[95%]">
          <div className="rounded-xl bg-white p-8 md:p-12">
            <div className="text-center">
              <span className="text-sm font-semibold uppercase tracking-wider text-violet-600">
                Getting Started
              </span>
              <h2 className="mt-2 text-3xl font-bold text-zinc-900">
                Three Simple Steps
              </h2>
              <p className="mt-2 text-zinc-500">
                Getting started with Instant Connect is quick and easy
              </p>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {steps.map((step, index) => (
                <div key={step.number} className="relative">
                  {/* Connector line */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-1/2 top-12 hidden h-0.5 w-full bg-zinc-200 md:block" />
                  )}
                  <div className="relative text-center">
                    {/* Step number badge */}
                    <div className={`mx-auto flex h-24 w-24 items-center justify-center rounded-2xl ${step.color}`}>
                      <step.icon className="h-10 w-10 text-white" />
                    </div>
                    <div className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 text-sm font-bold text-white">
                      {step.number}
                    </div>
                    <h3 className="mt-6 text-xl font-bold text-zinc-900">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-zinc-500">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Video/Demo Section */}
      <section className="flex justify-center bg-zinc-100 py-8">
        <div className="w-[95%]">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Video */}
            <div className="relative aspect-video overflow-hidden rounded-xl bg-zinc-900">
              <Image
                src="https://images.unsplash.com/photo-1556745757-8d76bdb6984b?w=800"
                alt="NFC card demonstration"
                fill
                className="object-cover opacity-80"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="group flex h-20 w-20 items-center justify-center rounded-full bg-white/90 shadow-xl transition-transform hover:scale-110">
                  <Play className="h-8 w-8 text-zinc-900 transition-transform group-hover:scale-110" />
                </button>
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-lg font-semibold text-white">Watch the Demo</p>
                <p className="text-sm text-white/70">See how easy it is to share your profile</p>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-xl bg-white p-5"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-100">
                    <feature.icon className="h-5 w-5 text-violet-600" />
                  </div>
                  <h3 className="mt-3 font-semibold text-zinc-900">
                    {feature.title}
                  </h3>
                  <p className="mt-1 text-sm text-zinc-500">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="flex justify-center bg-zinc-100 py-8">
        <div className="w-[95%]">
          <div className="rounded-xl bg-white p-8 md:p-12">
            <div className="mx-auto max-w-3xl">
              <div className="text-center">
                <span className="text-sm font-semibold uppercase tracking-wider text-teal-600">
                  FAQ
                </span>
                <h2 className="mt-2 text-3xl font-bold text-zinc-900">
                  Frequently Asked Questions
                </h2>
                <p className="mt-2 text-zinc-500">
                  Everything you need to know about Instant Connect
                </p>
              </div>

              <div className="mt-10 space-y-4">
                {faqs.map((faq, index) => (
                  <details
                    key={index}
                    className="group rounded-xl border border-zinc-200 bg-zinc-50"
                  >
                    <summary className="flex cursor-pointer items-center justify-between p-5">
                      <span className="font-semibold text-zinc-900">{faq.question}</span>
                      <ChevronDown className="h-5 w-5 text-zinc-400 transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="border-t border-zinc-200 p-5">
                      <p className="text-zinc-600">{faq.answer}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="flex justify-center bg-zinc-100 pb-8">
        <div className="w-[95%]">
          <div className="overflow-hidden rounded-xl bg-zinc-900 px-8 py-16 text-center md:py-20">
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Ready to Go Digital?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-zinc-400">
              Join thousands of professionals who have already upgraded their networking game.
              Get your Instant Connect card today.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/shop"
                className="rounded-lg bg-white px-8 py-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-100"
              >
                Shop Now
              </Link>
              <Link
                href="/book-demo"
                className="rounded-lg border border-zinc-700 px-8 py-3 text-sm font-semibold text-white hover:bg-zinc-800"
              >
                Book a Demo
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
