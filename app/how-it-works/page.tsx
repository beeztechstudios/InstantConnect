import { Metadata } from "next";
import Link from "next/link";
import {
    Smartphone,
    Globe,
    CheckCircle,
    Zap,
    Users,
    BarChart3,
    Leaf,
    Shield,
    CreditCard,
} from "lucide-react";
import { Accordion } from "@/components/ui/accordion";
import { BookDemoCTA } from "@/components/home/book-demo-cta";

export const metadata: Metadata = {
    title: "How It Works",
    description:
        "Learn how Instant Connect NFC cards work and how to set them up.",
};

const steps = [
    {
        step: "STEP 1",
        icon: CreditCard,
        title: "Choose Your Product",
        description:
            "Select from our range of NFC cards, QR codes, standees, keychains, or table tents.",
    },
    {
        step: "STEP 2",
        icon: Smartphone,
        title: "Set Up Your Profile",
        description:
            "Create your digital profile with contact details, social links, portfolio, and more.",
    },
    {
        step: "STEP 3",
        icon: Globe,
        title: "Share Instantly",
        description:
            "Tap your NFC product against any smartphone to instantly share your profile.",
    },
];

const features = [
    {
        icon: Zap,
        title: "Instant Sharing",
        description: "Share your contact in under a second with a simple tap.",
    },
    {
        icon: Smartphone,
        title: "No App Required",
        description: "Works with all modern smartphones out of the box.",
    },
    {
        icon: Users,
        title: "Unlimited Contacts",
        description: "Share with as many people as you want, no limits.",
    },
    {
        icon: BarChart3,
        title: "Analytics Dashboard",
        description:
            "Track views, taps, and engagement with detailed analytics.",
    },
    {
        icon: Leaf,
        title: "Eco-Friendly",
        description: "Replace hundreds of paper cards with one NFC card.",
    },
    {
        icon: Shield,
        title: "Secure & Private",
        description: "Your data is encrypted and you control what's shared.",
    },
];

const faqs = [
    {
        question: "What is Instant Connect?",
        answer: "Instant Connect is an NFC-based digital solution that allows you to instantly share your business details, contact information, social media links, payment links, and more by simply tapping the card or scanning a QR code.",
    },
    {
        question: "Which devices support Instant Connect?",
        answer: "Instant Connect works on all NFC-enabled Android phones and iPhones (XR and above). For devices without NFC, the QR code on the product can be scanned to access the details.",
    },
    {
        question: "Can I update my information after purchase?",
        answer: "Yes, your digital information can be updated even after purchase. Updates depend on the plan selected and may be free or chargeable as per the service terms.",
    },
    {
        question: "Do I need an internet connection to use Instant Connect?",
        answer: "Internet is required only to open the digital profile. The NFC card itself does not require charging, battery, or any app installation.",
    },
    {
        question: "Is the NFC card reusable and shareable?",
        answer: "Yes, the NFC card is reusable and long-lasting. You can tap it unlimited times and share your details with anyone without any physical wear for digital data.",
    },
    {
        question: "What happens if my card gets damaged or lost?",
        answer: "Physical damage or loss is not covered under warranty. However, you can reorder a replacement card and link it to your existing digital profile.",
    },
];

export default function HowItWorksPage() {
    return (
        <div
            className="overflow-x-hidden"
            style={{ backgroundColor: "#F4F4F4" }}
        >
            {/* Hero */}
            <section className="pt-[6px] px-[6px] pb-0">
                <div className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] overflow-hidden rounded-[10px]">
                    {/* Background Image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: `url('https://images.unsplash.com/photo-1556745757-8d76bdb6984b?q=80&w=2070&auto=format&fit=crop')`,
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

                    {/* Content */}
                    <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 sm:px-6">
                        <p className="text-center text-xs sm:text-sm md:text-base text-white/70 max-w-xs sm:max-w-md md:max-w-2xl">
                            Say goodbye to paper business cards. Share your
                            professional identity with just one tap.
                        </p>
                        <h1 className="mt-3 sm:mt-4 text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white max-w-xs sm:max-w-lg md:max-w-3xl">
                            Networking Made Effortless
                        </h1>
                        <div className="mt-5 sm:mt-6 md:mt-8 flex flex-col sm:flex-row gap-3">
                            <Link
                                href="/shop"
                                className="rounded-[10px] bg-white px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold text-zinc-900 hover:bg-zinc-100"
                            >
                                Shop Now
                            </Link>
                            <Link
                                href="/book-demo"
                                className="rounded-[10px] bg-white/20 backdrop-blur-sm px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold text-white hover:bg-white/30"
                            >
                                Book a Demo
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Steps */}
            <section className="pt-10 pb-8 sm:pt-14 sm:pb-10 lg:pt-20 lg:pb-12">
                <div className="mx-auto w-[95%]">
                    {/* Section Header */}
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-6 pb-6 sm:pb-8">
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <span className="hidden sm:block h-px w-8 bg-sky-400" />
                                <span className="text-xs sm:text-sm font-black uppercase tracking-[0.2em] text-sky-400">
                                    Getting started is quick and easy
                                </span>
                            </div>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black tracking-tighter leading-[0.9]">
                                Three simple{" "}
                                <span className="text-zinc-400">steps.</span>
                            </h2>
                        </div>
                        <Link
                            href="/shop"
                            className="group flex items-center gap-3 rounded-[10px] bg-black px-6 py-3 sm:px-8 sm:py-4 text-sm font-black text-white transition-all hover:bg-sky-500 hover:scale-105 w-fit"
                        >
                            Get Started
                        </Link>
                    </div>

                    {/* Steps Grid */}
                    <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
                        {/* Left - Purple Section */}
                        <div
                            className="w-full lg:w-[45%] p-5 sm:p-8 lg:p-10 rounded-[10px]"
                            style={{ backgroundColor: "#38bdf8" }}
                        >
                            <div className="space-y-6 sm:space-y-8">
                                {steps.map((step, index) => (
                                    <div key={index}>
                                        <p className="text-[10px] sm:text-xs font-medium text-white/50">
                                            {step.step}
                                        </p>
                                        <div className="mt-2 flex items-start gap-3 sm:gap-4">
                                            <div className="flex h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0 items-center justify-center rounded-[10px] bg-white/20">
                                                <step.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="text-base sm:text-lg font-semibold text-white">
                                                    {step.title}
                                                </h3>
                                                <p className="mt-1 text-xs sm:text-sm text-white/70">
                                                    {step.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right - Image */}
                        <div className="w-full lg:w-[55%] relative min-h-[280px] sm:min-h-[350px] lg:min-h-[450px] rounded-[10px] overflow-hidden">
                            <div
                                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                                style={{
                                    backgroundImage: `url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop')`,
                                }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-8 sm:py-12 lg:py-16">
                <div className="mx-auto w-[95%]">
                    {/* Section Header */}
                    <div className="text-center pb-6 sm:pb-8 lg:pb-10">
                        <div className="flex items-center justify-center gap-2 mb-3">
                            <span className="h-px w-8 bg-sky-400" />
                            <span className="text-xs sm:text-sm font-black uppercase tracking-[0.2em] text-sky-400">
                                Everything you need
                            </span>
                            <span className="h-px w-8 bg-sky-400" />
                        </div>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black tracking-tighter leading-[0.9]">
                            Why choose{" "}
                            <span className="text-zinc-400">Instant Connect?</span>
                        </h2>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                        {features.map((feature) => (
                            <div
                                key={feature.title}
                                className="rounded-[10px] bg-white p-5 sm:p-6"
                            >
                                <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-[10px] bg-blue-100">
                                    <feature.icon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                                </div>
                                <h3 className="mt-4 text-base sm:text-lg font-semibold text-zinc-900">
                                    {feature.title}
                                </h3>
                                <p className="mt-1.5 text-xs sm:text-sm text-zinc-500">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Comparison Section */}
            <section className="py-8 sm:py-12 lg:py-16">
                <div className="mx-auto w-[95%]">
                    <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
                        {/* Traditional Cards */}
                        <div className="w-full lg:w-1/2 p-5 sm:p-8 rounded-[10px] bg-zinc-200">
                            <h3 className="text-lg sm:text-xl font-bold text-zinc-900">
                                Traditional Business Cards
                            </h3>
                            <div className="mt-4 sm:mt-6 space-y-3">
                                <div className="flex items-center gap-3 text-sm text-zinc-600">
                                    <div className="h-2 w-2 rounded-[10px] bg-red-500" />
                                    Get lost or thrown away
                                </div>
                                <div className="flex items-center gap-3 text-sm text-zinc-600">
                                    <div className="h-2 w-2 rounded-[10px] bg-red-500" />
                                    Can&apos;t be updated once printed
                                </div>
                                <div className="flex items-center gap-3 text-sm text-zinc-600">
                                    <div className="h-2 w-2 rounded-[10px] bg-red-500" />
                                    Wasteful and not eco-friendly
                                </div>
                                <div className="flex items-center gap-3 text-sm text-zinc-600">
                                    <div className="h-2 w-2 rounded-[10px] bg-red-500" />
                                    Limited information space
                                </div>
                                <div className="flex items-center gap-3 text-sm text-zinc-600">
                                    <div className="h-2 w-2 rounded-[10px] bg-red-500" />
                                    No analytics or tracking
                                </div>
                            </div>
                        </div>

                        {/* Instant Connect */}
                        <div
                            className="w-full lg:w-1/2 p-5 sm:p-8 rounded-[10px]"
                            style={{ backgroundColor: "#F5A623" }}
                        >
                            <h3 className="text-lg sm:text-xl font-bold text-black">
                                Instant Connect Cards
                            </h3>
                            <div className="mt-4 sm:mt-6 space-y-3">
                                <div className="flex items-center gap-3 text-sm text-black/80">
                                    <CheckCircle className="h-4 w-4 text-black" />
                                    Always with you, never lost
                                </div>
                                <div className="flex items-center gap-3 text-sm text-black/80">
                                    <CheckCircle className="h-4 w-4 text-black" />
                                    Update anytime, instantly reflected
                                </div>
                                <div className="flex items-center gap-3 text-sm text-black/80">
                                    <CheckCircle className="h-4 w-4 text-black" />
                                    Eco-friendly, one card forever
                                </div>
                                <div className="flex items-center gap-3 text-sm text-black/80">
                                    <CheckCircle className="h-4 w-4 text-black" />
                                    Unlimited info: links, portfolio, videos
                                </div>
                                <div className="flex items-center gap-3 text-sm text-black/80">
                                    <CheckCircle className="h-4 w-4 text-black" />
                                    Full analytics and insights
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
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
                                <p className="text-sm sm:text-base text-zinc-600">
                                    {faq.answer}
                                </p>
                            </Accordion>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer CTA */}
            <BookDemoCTA />
        </div>
    );
}
