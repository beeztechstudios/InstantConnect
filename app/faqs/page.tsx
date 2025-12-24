import { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, ChevronDown, HelpCircle, MessageCircle, Phone } from 'lucide-react'

export const metadata: Metadata = {
  title: 'FAQs',
  description: 'Frequently asked questions about Instant Connect NFC cards and products.',
}

const faqCategories = [
  {
    title: 'General Questions',
    icon: HelpCircle,
    color: 'bg-violet-100 text-violet-600',
    faqs: [
      {
        question: 'What is an NFC card?',
        answer:
          'NFC (Near Field Communication) cards are smart cards embedded with a small chip that allows you to share your contact information, social media profiles, and more with just a tap on any NFC-enabled smartphone.',
      },
      {
        question: 'How do NFC cards work?',
        answer:
          'When you tap your NFC card against a smartphone, it uses radio waves to communicate with the device. The phone reads the data stored on the card and can open a link, share contact info, or trigger other actions.',
      },
      {
        question: 'Do I need an app to use NFC cards?',
        answer:
          'No! Most modern smartphones (both iPhone and Android) can read NFC cards natively without any app. When tapped, your phone will automatically display the information or open the link.',
      },
      {
        question: 'Are NFC cards secure?',
        answer:
          'Yes, NFC technology is inherently secure as it requires very close proximity (usually within 4cm) to work. Additionally, the cards only share the information you choose to put on them.',
      },
    ],
  },
  {
    title: 'Products & Orders',
    icon: MessageCircle,
    color: 'bg-teal-100 text-teal-600',
    faqs: [
      {
        question: 'What products do you offer?',
        answer:
          'We offer a range of NFC-enabled products including business cards, QR cards, standees, keychains, and table tents. Each product can be customized with your branding and linked to your digital profile.',
      },
      {
        question: 'Can I customize my NFC card design?',
        answer:
          'Absolutely! After placing your order, you can provide your design preferences, and our team will create a custom design for you. We also offer pre-designed templates if you prefer.',
      },
      {
        question: 'How long does delivery take?',
        answer:
          'Standard delivery takes 5-7 business days across India. We also offer express shipping options for urgent orders.',
      },
      {
        question: 'What payment methods do you accept?',
        answer:
          'We accept all major payment methods including UPI, credit/debit cards, net banking, and wallets. Cash on Delivery (COD) is also available for select locations.',
      },
    ],
  },
  {
    title: 'Technical Support',
    icon: Phone,
    color: 'bg-orange-100 text-orange-600',
    faqs: [
      {
        question: 'My NFC card is not working. What should I do?',
        answer:
          'First, ensure your phone has NFC enabled (check in Settings). Try tapping the card on the top-back portion of your phone where the NFC reader is located. If issues persist, contact our support team.',
      },
      {
        question: 'Can I update the information on my NFC card?',
        answer:
          'Yes! Our NFC cards are linked to an online profile that you can update anytime. Changes you make online will be reflected immediately when someone scans your card.',
      },
      {
        question: 'Which phones are compatible with NFC?',
        answer:
          'Most smartphones released in the last 5 years support NFC, including all iPhones from iPhone 7 onwards and most Android phones. Check your phone settings for NFC capability.',
      },
      {
        question: 'What happens if I lose my NFC card?',
        answer:
          'You can deactivate your lost card through your account dashboard and order a replacement. Your digital profile remains intact and can be linked to a new card.',
      },
    ],
  },
]

export default function FAQsPage() {
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
            <span className="font-medium text-zinc-900">FAQs</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="flex justify-center bg-zinc-100 py-6">
        <div className="w-[95%]">
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 px-8 py-16 text-center md:py-20">
            <div className="relative z-10">
              <span className="inline-block rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
                Help Center
              </span>
              <h1 className="mt-6 text-4xl font-bold text-white md:text-5xl">
                Frequently Asked Questions
              </h1>
              <p className="mx-auto mt-4 max-w-xl text-lg text-teal-100">
                Find answers to common questions about our NFC products and services.
              </p>
            </div>
            {/* Decorative elements */}
            <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-teal-400/30 blur-3xl" />
            <div className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-teal-400/30 blur-3xl" />
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="flex justify-center bg-zinc-100 py-8">
        <div className="w-[95%]">
          <div className="space-y-6">
            {faqCategories.map((category) => (
              <div key={category.title} className="rounded-xl bg-white p-6 md:p-8">
                <div className="flex items-center gap-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${category.color}`}>
                    <category.icon className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-zinc-900">{category.title}</h2>
                </div>

                <div className="mt-6 space-y-3">
                  {category.faqs.map((faq, index) => (
                    <details
                      key={index}
                      className="group rounded-xl border border-zinc-200 bg-zinc-50"
                    >
                      <summary className="flex cursor-pointer items-center justify-between p-5">
                        <span className="font-medium text-zinc-900">{faq.question}</span>
                        <ChevronDown className="h-5 w-5 flex-shrink-0 text-zinc-400 transition-transform group-open:rotate-180" />
                      </summary>
                      <div className="border-t border-zinc-200 p-5">
                        <p className="text-zinc-600">{faq.answer}</p>
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="flex justify-center bg-zinc-100 pb-8">
        <div className="w-[95%]">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl bg-violet-600 p-8 text-white">
              <h3 className="text-2xl font-bold">Still have questions?</h3>
              <p className="mt-2 text-violet-100">
                Our support team is here to help you with any questions you may have.
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-block rounded-lg bg-white px-6 py-3 text-sm font-semibold text-violet-600 hover:bg-violet-50"
              >
                Contact Support
              </Link>
            </div>
            <div className="rounded-xl bg-zinc-900 p-8 text-white">
              <h3 className="text-2xl font-bold">Want a personalized demo?</h3>
              <p className="mt-2 text-zinc-400">
                See our products in action with a free personalized demonstration.
              </p>
              <Link
                href="/book-demo"
                className="mt-6 inline-block rounded-lg bg-white px-6 py-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-100"
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
