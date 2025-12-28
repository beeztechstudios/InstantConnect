import { Metadata } from 'next'
import Link from 'next/link'
import { FileText, AlertTriangle, Scale, ShoppingBag, Ban, HelpCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Read the terms and conditions for using Instant Connect products and services.',
}

const sections = [
  {
    id: '1',
    title: 'Acceptance of Terms',
    content: `By accessing or using the Instant Connect website, mobile applications, or any of our products and services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing our services.

These terms apply to all users of the site, including without limitation users who are browsers, vendors, customers, merchants, and/or contributors of content.`,
  },
  {
    id: '2',
    title: 'Use of Products',
    content: `Our NFC cards, QR cards, and related products are intended for legitimate business and personal networking purposes only. You agree not to use our products for:

• Illegal activities or promoting illegal content
• Spreading malware, viruses, or harmful code
• Phishing, scamming, or fraudulent activities
• Harassment, defamation, or invasion of privacy
• Impersonating others or misrepresenting your identity
• Any activity that violates applicable laws or regulations

We reserve the right to terminate accounts and deactivate products that violate these terms.`,
  },
  {
    id: '3',
    title: 'Account Registration',
    content: `To use certain features of our services, you may be required to create an account. You agree to:

• Provide accurate, current, and complete information during registration
• Maintain and promptly update your account information
• Keep your password secure and confidential
• Accept responsibility for all activities under your account
• Notify us immediately of any unauthorized use of your account

You must be at least 18 years old to create an account. If you are under 18, you may only use our services with the involvement of a parent or guardian.`,
  },
  {
    id: '4',
    title: 'Orders & Payments',
    content: `All orders are subject to acceptance and availability. We reserve the right to refuse any order for any reason.

• Prices are listed in Indian Rupees (INR) and are subject to change without notice
• Payment must be received before order processing begins
• We accept UPI, credit/debit cards, net banking, and select wallets
• You agree to provide current, complete, and accurate purchase information
• Sales tax will be added where applicable based on shipping address

Order cancellations may be requested before the order is shipped. Once shipped, our refund policy applies.`,
  },
  {
    id: '5',
    title: 'Intellectual Property',
    content: `All content on this website, including but not limited to text, graphics, logos, images, audio clips, digital downloads, and software, is the property of Instant Connect or its content suppliers and is protected by Indian and international copyright laws.

You may not:
• Reproduce, distribute, or create derivative works from our content
• Use our trademarks without prior written permission
• Remove any copyright or proprietary notices from our materials
• Transfer materials to another person or "mirror" materials on any other server

Custom designs created for your NFC cards remain our intellectual property until full payment is received.`,
  },
  {
    id: '6',
    title: 'Limitation of Liability',
    content: `To the fullest extent permitted by law, Instant Connect shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to:

• Loss of profits, data, use, goodwill, or other intangible losses
• Damages resulting from unauthorized access to or use of our servers
• Damages resulting from any interruption or cessation of services
• Damages resulting from any bugs, viruses, or similar issues
• Damages resulting from any content or conduct of any third party

Our total liability for any claim arising from these terms or our services shall not exceed the amount you paid us in the twelve (12) months preceding the claim.`,
  },
  {
    id: '7',
    title: 'Dispute Resolution',
    content: `Any disputes arising from these Terms of Service or your use of our services shall be governed by the laws of India, without regard to its conflict of law provisions.

• You agree to first attempt to resolve any dispute informally by contacting us
• If informal resolution fails, disputes shall be resolved through binding arbitration
• Arbitration shall be conducted in Udaipur, Rajasthan, India
• You waive any right to participate in class action lawsuits against us

The arbitration shall be conducted in English and the arbitrator's decision shall be final and binding.`,
  },
  {
    id: '8',
    title: 'Changes to Terms',
    content: `We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to our website. Your continued use of our services after any changes constitutes acceptance of the new terms.

We will make reasonable efforts to notify users of significant changes through email or a prominent notice on our website. It is your responsibility to review these terms periodically for updates.`,
  },
]

export default function TermsPage() {
  return (
    <div className="overflow-x-hidden" style={{ backgroundColor: '#F4F4F4' }}>
      {/* Hero */}
      <section className="pt-[6px] px-[6px] pb-0">
        <div className="relative h-[35vh] sm:h-[40vh] md:h-[45vh] overflow-hidden rounded-[10px]">
          {/* Background */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />

          {/* Content */}
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 sm:px-6">
            <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm mb-4">
              <FileText className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
            </div>
            <h1 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Terms of Service
            </h1>
            <p className="mt-3 text-center text-xs sm:text-sm md:text-base text-white/70 max-w-xs sm:max-w-md md:max-w-2xl">
              Please read these terms carefully before using our services.
            </p>
          </div>
        </div>
      </section>

      {/* Last Updated */}
      <section className="pt-6 sm:pt-8 lg:pt-10">
        <div className="mx-auto w-[95%]">
          <div className="rounded-[10px] bg-white p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <p className="text-xs sm:text-sm text-zinc-500">
              Last Updated: <span className="font-medium text-zinc-900">December 27, 2025</span>
            </p>
            <p className="text-xs sm:text-sm text-zinc-500">
              Effective Date: <span className="font-medium text-zinc-900">January 1, 2025</span>
            </p>
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="pt-6 sm:pt-8">
        <div className="mx-auto w-[95%]">
          <div className="rounded-[10px] bg-white p-5 sm:p-6">
            <h2 className="text-sm sm:text-base font-bold text-zinc-900 mb-3">Quick Navigation</h2>
            <div className="flex flex-wrap gap-2">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#section-${section.id}`}
                  className="rounded-lg bg-zinc-100 px-3 py-1.5 text-xs sm:text-sm text-zinc-700 hover:bg-zinc-200"
                >
                  {section.id}. {section.title}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Terms Sections */}
      <section className="py-6 sm:py-8 lg:py-10">
        <div className="mx-auto w-[95%]">
          <div className="space-y-4 sm:space-y-6">
            {sections.map((section) => (
              <div
                key={section.id}
                id={`section-${section.id}`}
                className="rounded-[10px] bg-white p-5 sm:p-6 lg:p-8 scroll-mt-24"
              >
                <div className="flex items-start gap-3">
                  <span
                    className="flex h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0 items-center justify-center rounded-lg text-xs sm:text-sm font-bold text-white"
                    style={{ backgroundColor: '#685BC7' }}
                  >
                    {section.id}
                  </span>
                  <div className="flex-1">
                    <h2 className="text-base sm:text-lg lg:text-xl font-bold text-zinc-900">{section.title}</h2>
                    <div className="mt-3 text-xs sm:text-sm text-zinc-600 leading-relaxed whitespace-pre-line">
                      {section.content}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="pb-6 sm:pb-8">
        <div className="mx-auto w-[95%]">
          <div className="rounded-[10px] bg-amber-50 border border-amber-200 p-5 sm:p-6 lg:p-8">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm sm:text-base font-bold text-amber-900">Important Notice</h3>
                <p className="mt-2 text-xs sm:text-sm text-amber-800">
                  By using our website and services, you acknowledge that you have read, understood, and agree to be
                  bound by these Terms of Service. If you are using our services on behalf of an organization, you
                  represent and warrant that you have the authority to bind that organization to these terms.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="pb-8 sm:pb-12 lg:pb-16">
        <div className="mx-auto w-[95%]">
          <div className="rounded-[10px] p-5 sm:p-8 lg:p-10" style={{ backgroundColor: '#685BC7' }}>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
                  Have Questions About These Terms?
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-white/70">
                  Our legal team is happy to clarify any part of these terms for you.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/contact"
                  className="rounded-lg bg-white px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold text-violet-600 hover:bg-violet-50 text-center"
                >
                  Contact Us
                </Link>
                <Link
                  href="/faqs"
                  className="rounded-lg bg-white/20 px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold text-white hover:bg-white/30 text-center"
                >
                  View FAQs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
