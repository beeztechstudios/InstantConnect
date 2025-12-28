import { Metadata } from 'next'
import Link from 'next/link'
import { HelpCircle, MessageCircle, Phone } from 'lucide-react'
import { Accordion } from '@/components/ui/accordion'

export const metadata: Metadata = {
  title: 'FAQs',
  description: 'Frequently asked questions about Instant Connect NFC cards and products.',
}

const faqCategories = [
  {
    title: 'General Questions',
    icon: HelpCircle,
    faqs: [
      {
        question: 'What is an NFC card?',
        answer: 'NFC (Near Field Communication) cards are smart cards embedded with a small chip that allows you to share your contact information, social media profiles, and more with just a tap on any NFC-enabled smartphone.',
      },
      {
        question: 'How do NFC cards work?',
        answer: 'When you tap your NFC card against a smartphone, it uses radio waves to communicate with the device. The phone reads the data stored on the card and can open a link, share contact info, or trigger other actions.',
      },
      {
        question: 'Do I need an app to use NFC cards?',
        answer: 'No! Most modern smartphones (both iPhone and Android) can read NFC cards natively without any app. When tapped, your phone will automatically display the information or open the link.',
      },
      {
        question: 'Are NFC cards secure?',
        answer: 'Yes, NFC technology is inherently secure as it requires very close proximity (usually within 4cm) to work. Additionally, the cards only share the information you choose to put on them.',
      },
    ],
  },
  {
    title: 'Products & Orders',
    icon: MessageCircle,
    faqs: [
      {
        question: 'What products do you offer?',
        answer: 'We offer a range of NFC-enabled products including business cards, QR cards, standees, keychains, and table tents. Each product can be customized with your branding and linked to your digital profile.',
      },
      {
        question: 'Can I customize my NFC card design?',
        answer: 'Absolutely! After placing your order, you can provide your design preferences, and our team will create a custom design for you. We also offer pre-designed templates if you prefer.',
      },
      {
        question: 'How long does delivery take?',
        answer: 'Standard delivery takes 5-7 business days across India. We also offer express shipping options for urgent orders.',
      },
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major payment methods including UPI, credit/debit cards, net banking, and wallets. Cash on Delivery (COD) is also available for select locations.',
      },
    ],
  },
  {
    title: 'Technical Support',
    icon: Phone,
    faqs: [
      {
        question: 'My NFC card is not working. What should I do?',
        answer: 'First, ensure your phone has NFC enabled (check in Settings). Try tapping the card on the top-back portion of your phone where the NFC reader is located. If issues persist, contact our support team.',
      },
      {
        question: 'Can I update the information on my NFC card?',
        answer: 'Yes! Our NFC cards are linked to an online profile that you can update anytime. Changes you make online will be reflected immediately when someone scans your card.',
      },
      {
        question: 'Which phones are compatible with NFC?',
        answer: 'Most smartphones released in the last 5 years support NFC, including all iPhones from iPhone 7 onwards and most Android phones. Check your phone settings for NFC capability.',
      },
      {
        question: 'What happens if I lose my NFC card?',
        answer: 'You can deactivate your lost card through your account dashboard and order a replacement. Your digital profile remains intact and can be linked to a new card.',
      },
    ],
  },
]

export default function FAQsPage() {
  return (
    <div className="overflow-x-hidden" style={{ backgroundColor: '#F4F4F4' }}>
      {/* Hero */}
      <section className="pt-[6px] px-[6px] pb-0">
        <div className="relative h-[40vh] sm:h-[50vh] md:h-[55vh] overflow-hidden rounded-[10px]">
          {/* Background */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

          {/* Content */}
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 sm:px-6">
            <p className="text-center text-xs sm:text-sm md:text-base text-white/70 max-w-xs sm:max-w-md md:max-w-2xl">
              Find answers to common questions about our NFC products and services.
            </p>
            <h1 className="mt-3 sm:mt-4 text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Frequently Asked Questions
            </h1>
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="pt-10 pb-8 sm:pt-14 sm:pb-10 lg:pt-20 lg:pb-12">
        <div className="mx-auto w-[95%]">
          <div className="space-y-6 sm:space-y-8">
            {faqCategories.map((category) => (
              <div key={category.title}>
                {/* Category Header */}
                <div className="flex items-center gap-3 pb-4 sm:pb-5">
                  <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-lg bg-violet-100">
                    <category.icon className="h-5 w-5 text-violet-600" />
                  </div>
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-zinc-900">{category.title}</h2>
                </div>

                {/* FAQs */}
                <div className="space-y-3">
                  {category.faqs.map((faq, index) => (
                    <Accordion key={index} title={faq.question}>
                      <p className="text-sm sm:text-base text-zinc-600">{faq.answer}</p>
                    </Accordion>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-8 sm:py-12 lg:py-16">
        <div className="mx-auto w-[95%]">
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
            {/* Contact Support */}
            <div className="w-full lg:w-1/2 p-5 sm:p-8 rounded-[10px]" style={{ backgroundColor: '#685BC7' }}>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">Still have questions?</h3>
              <p className="mt-2 text-sm sm:text-base text-white/70">
                Our support team is here to help you with any questions you may have.
              </p>
              <Link
                href="/contact"
                className="mt-5 sm:mt-6 inline-block rounded-lg bg-white px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold text-violet-600 hover:bg-violet-50"
              >
                Contact Support
              </Link>
            </div>

            {/* Book Demo */}
            <div className="w-full lg:w-1/2 p-5 sm:p-8 rounded-[10px]" style={{ backgroundColor: '#F5A623' }}>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-black">Want a personalized demo?</h3>
              <p className="mt-2 text-sm sm:text-base text-black/70">
                See our products in action with a free personalized demonstration.
              </p>
              <Link
                href="/book-demo"
                className="mt-5 sm:mt-6 inline-block rounded-lg bg-black px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold text-white hover:bg-black/90"
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
