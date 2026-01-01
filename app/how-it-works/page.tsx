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
    ArrowRight,
    X,
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
        number: "01",
        icon: CreditCard,
        title: "Choose Your Product",
        description:
            "Select from our range of NFC cards, QR codes, standees, keychains, or table tents.",
    },
    {
        number: "02",
        icon: Smartphone,
        title: "Set Up Your Profile",
        description:
            "Create your digital profile with contact details, social links, portfolio, and more.",
    },
    {
        number: "03",
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
        description: "Track views, taps, and engagement with detailed analytics.",
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

const traditionalProblems = [
    "Get lost or thrown away",
    "Can't be updated once printed",
    "Wasteful and not eco-friendly",
    "Limited information space",
    "No analytics or tracking",
];

const instantConnectBenefits = [
    "Always with you, never lost",
    "Update anytime, instantly reflected",
    "Eco-friendly, one card forever",
    "Unlimited info: links, portfolio, videos",
    "Full analytics and insights",
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
        <div className="overflow-x-hidden bg-slate-100">
            {/* Hero */}
            <section className="pt-28 sm:pt-32 lg:pt-36 px-[6px]">
                <div className="mx-auto w-[95%]">
                    <div className="rounded-[10px] bg-sky-400 p-6 sm:p-10 md:p-16 lg:p-20">
                        <div className="max-w-3xl">
                            <span className="text-xs sm:text-sm font-medium text-white/70 uppercase tracking-wide">
                                How It Works
                            </span>
                            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white tracking-tighter leading-[0.95]">
                                Networking made<br />
                                <span className="text-sky-900/50">effortless.</span>
                            </h1>
                            <p className="mt-5 text-sm sm:text-base lg:text-lg text-white/80 max-w-xl">
                                Say goodbye to paper business cards. Share your professional identity with just one tap.
                            </p>
                            <div className="mt-8 flex flex-wrap gap-3">
                                <Link
                                    href="/shop"
                                    className="inline-flex items-center gap-2 rounded-[10px] bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-zinc-800"
                                >
                                    Shop Now
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                                <Link
                                    href="/book-demo"
                                    className="inline-flex items-center gap-2 rounded-[10px] bg-white/20 backdrop-blur-sm px-6 py-3 text-sm font-semibold text-white hover:bg-white/30"
                                >
                                    Book a Demo
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Steps Section */}
            <section className="py-12 sm:py-16 lg:py-20">
                <div className="mx-auto w-[95%]">
                    {/* Section Header */}
                    <div className="mb-10 sm:mb-12">
                        <span className="text-xs sm:text-sm font-medium text-sky-400 uppercase tracking-wide">
                            Getting Started
                        </span>
                        <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black text-black tracking-tighter">
                            Three simple <span className="text-zinc-400">steps.</span>
                        </h2>
                    </div>

                    {/* Steps */}
                    <div className="grid lg:grid-cols-3 gap-4">
                        {steps.map((step, index) => (
                            <div
                                key={index}
                                className="group relative bg-white rounded-[10px] p-6 sm:p-8 hover:bg-sky-400 transition-colors duration-300"
                            >
                                <span className="text-6xl sm:text-7xl font-black text-zinc-100 group-hover:text-sky-300/50 transition-colors">
                                    {step.number}
                                </span>
                                <div className="mt-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-[10px] bg-sky-100 group-hover:bg-white/20 transition-colors">
                                        <step.icon className="h-6 w-6 text-sky-500 group-hover:text-white transition-colors" />
                                    </div>
                                    <h3 className="mt-4 text-lg sm:text-xl font-bold text-zinc-900 group-hover:text-white transition-colors">
                                        {step.title}
                                    </h3>
                                    <p className="mt-2 text-sm text-zinc-500 group-hover:text-white/80 transition-colors">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-12 sm:py-16 lg:py-20 bg-white">
                <div className="mx-auto w-[95%]">
                    {/* Section Header */}
                    <div className="text-center mb-10 sm:mb-12">
                        <span className="text-xs sm:text-sm font-medium text-sky-400 uppercase tracking-wide">
                            Features
                        </span>
                        <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black text-black tracking-tighter">
                            Why choose <span className="text-zinc-400">us?</span>
                        </h2>
                    </div>

                    {/* Features Grid */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="flex items-start gap-4 p-5 sm:p-6 rounded-[10px] bg-slate-50"
                            >
                                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-[10px] bg-sky-400">
                                    <feature.icon className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-zinc-900">
                                        {feature.title}
                                    </h3>
                                    <p className="mt-1 text-sm text-zinc-500">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Comparison Section */}
            <section className="py-12 sm:py-16 lg:py-20">
                <div className="mx-auto w-[95%]">
                    {/* Section Header */}
                    <div className="text-center mb-10 sm:mb-12">
                        <span className="text-xs sm:text-sm font-medium text-sky-400 uppercase tracking-wide">
                            Comparison
                        </span>
                        <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black text-black tracking-tighter">
                            Old vs <span className="text-zinc-400">New.</span>
                        </h2>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-4">
                        {/* Traditional */}
                        <div className="rounded-[10px] bg-zinc-200 p-6 sm:p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="h-3 w-3 rounded-full bg-red-500" />
                                <h3 className="text-lg font-bold text-zinc-900">
                                    Traditional Business Cards
                                </h3>
                            </div>
                            <div className="space-y-3">
                                {traditionalProblems.map((item, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <X className="h-4 w-4 text-red-500 flex-shrink-0" />
                                        <span className="text-sm text-zinc-600">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Instant Connect */}
                        <div className="rounded-[10px] bg-sky-400 p-6 sm:p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="h-3 w-3 rounded-full bg-white" />
                                <h3 className="text-lg font-bold text-white">
                                    Instant Connect Cards
                                </h3>
                            </div>
                            <div className="space-y-3">
                                {instantConnectBenefits.map((item, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <CheckCircle className="h-4 w-4 text-white flex-shrink-0" />
                                        <span className="text-sm text-white/90">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-12 sm:py-16 lg:py-20 bg-white">
                <div className="mx-auto w-[95%] max-w-3xl">
                    <div className="text-center mb-10 sm:mb-12">
                        <span className="text-xs sm:text-sm font-medium text-sky-400 uppercase tracking-wide">
                            FAQ
                        </span>
                        <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black text-black tracking-tighter">
                            Questions? <span className="text-zinc-400">Answered.</span>
                        </h2>
                    </div>
                    <div className="space-y-3">
                        {faqs.map((faq, index) => (
                            <Accordion key={index} title={faq.question}>
                                <p className="text-sm text-zinc-600">{faq.answer}</p>
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
