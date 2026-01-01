"use client";

import { useState } from "react";
import Link from "next/link";
import {
    ChevronRight,
    Calendar,
    Clock,
    Users,
    Video,
    Check,
    ArrowRight,
    Building2,
    Phone,
    Mail,
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import toast from "react-hot-toast";

const benefits = [
    "Personalized product recommendations",
    "Live demonstration of all features",
    "Custom pricing for bulk orders",
    "Q&A with our product experts",
    "Exclusive demo-only discounts",
];

const teamSizes = [
    { value: "1-10", label: "1-10 employees" },
    { value: "11-50", label: "11-50 employees" },
    { value: "51-200", label: "51-200 employees" },
    { value: "200+", label: "200+ employees" },
];

const demoInfo = [
    {
        icon: Video,
        title: "Virtual Demo",
        description: "Join via Google Meet or Zoom from anywhere",
        color: "bg-blue-100 text-blue-600",
    },
    {
        icon: Clock,
        title: "30 Minutes",
        description: "Quick overview of features and Q&A session",
        color: "bg-teal-100 text-teal-600",
    },
    {
        icon: Calendar,
        title: "Flexible Timing",
        description: "Schedule at your convenience",
        color: "bg-orange-100 text-orange-600",
    },
    {
        icon: Users,
        title: "Team Friendly",
        description: "Invite your team members to join",
        color: "bg-rose-100 text-rose-600",
    },
];

export default function BookDemoPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
        teamSize: "",
        message: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const supabase = createClient();
            const { error } = await supabase.from("demo_bookings").insert([
                {
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    company: formData.company,
                    message: `Team Size: ${formData.teamSize}\n\n${formData.message}`,
                    status: "pending",
                },
            ]);

            if (error) throw error;

            setIsSubmitted(true);
            toast.success("Demo request submitted successfully!");
        } catch (error) {
            console.error("Error booking demo:", error);
            toast.error("Failed to submit request. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-zinc-100">
                <div className="flex justify-center pt-6">
                    <div className="w-[95%]">
                        <nav className="flex items-center gap-2 text-sm">
                            <Link
                                href="/"
                                className="text-zinc-500 hover:text-zinc-700"
                            >
                                Home
                            </Link>
                            <ChevronRight className="h-4 w-4 text-zinc-400" />
                            <span className="font-medium text-zinc-900">
                                Book Demo
                            </span>
                        </nav>
                    </div>
                </div>

                <div className="flex min-h-[70vh] items-center justify-center px-4">
                    <div className="w-full max-w-md text-center">
                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[10px] bg-teal-100">
                            <Check className="h-10 w-10 text-teal-600" />
                        </div>
                        <h1 className="mt-6 text-3xl font-bold text-zinc-900">
                            Demo Request Received!
                        </h1>
                        <p className="mt-4 text-zinc-500">
                            Thank you for your interest! Our team will contact
                            you within 24 hours to schedule your personalized
                            demo.
                        </p>
                        <Link
                            href="/shop"
                            className="mt-8 inline-flex items-center gap-2 rounded-[10px] bg-zinc-900 px-6 py-3 text-sm font-semibold text-white hover:bg-zinc-800"
                        >
                            Browse Products
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-100">
            {/* Breadcrumb */}
            <div className="flex justify-center bg-zinc-100 pt-6">
                <div className="w-[95%]">
                    <nav className="flex items-center gap-2 text-sm">
                        <Link
                            href="/"
                            className="text-zinc-500 hover:text-zinc-700"
                        >
                            Home
                        </Link>
                        <ChevronRight className="h-4 w-4 text-zinc-400" />
                        <span className="font-medium text-zinc-900">
                            Book Demo
                        </span>
                    </nav>
                </div>
            </div>

            {/* Hero Section */}
            <section className="flex justify-center bg-zinc-100 py-6">
                <div className="w-[95%]">
                    <div className="relative overflow-hidden rounded-[10px] bg-gradient-to-br from-teal-500 to-teal-600 px-8 py-16 text-center md:py-20">
                        <div className="relative z-10">
                            <span className="inline-block rounded-[10px] bg-white/20 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
                                Free Consultation
                            </span>
                            <h1 className="mt-6 text-4xl font-bold text-white md:text-5xl">
                                Book a Free Demo
                            </h1>
                            <p className="mx-auto mt-4 max-w-xl text-lg text-teal-100">
                                See Instant Connect in action. Get a
                                personalized demo tailored to your business
                                needs.
                            </p>
                        </div>
                        {/* Decorative elements */}
                        <div className="absolute -left-20 -top-20 h-60 w-60 rounded-[10px] bg-teal-400/30 blur-3xl" />
                        <div className="absolute -bottom-20 -right-20 h-60 w-60 rounded-[10px] bg-teal-400/30 blur-3xl" />
                    </div>
                </div>
            </section>

            {/* Demo Info Cards */}
            <section className="flex justify-center bg-zinc-100 py-6">
                <div className="w-[95%]">
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {demoInfo.map((info) => (
                            <div
                                key={info.title}
                                className="rounded-[10px] bg-white p-6"
                            >
                                <div
                                    className={`flex h-12 w-12 items-center justify-center rounded-[10px] ${info.color}`}
                                >
                                    <info.icon className="h-6 w-6" />
                                </div>
                                <h3 className="mt-4 font-bold text-zinc-900">
                                    {info.title}
                                </h3>
                                <p className="mt-1 text-sm text-zinc-500">
                                    {info.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Form Section */}
            <section className="flex justify-center bg-zinc-100 py-8">
                <div className="w-[95%]">
                    <div className="grid gap-6 lg:grid-cols-3">
                        {/* Form */}
                        <div className="lg:col-span-2">
                            <div className="rounded-[10px] bg-white p-6 md:p-8">
                                <h2 className="text-2xl font-bold text-zinc-900">
                                    Request Your Demo
                                </h2>
                                <p className="mt-2 text-zinc-500">
                                    Fill out the form and we&apos;ll get back to
                                    you within 24 hours.
                                </p>

                                <form
                                    onSubmit={handleSubmit}
                                    className="mt-8 space-y-5"
                                >
                                    <div className="grid gap-5 sm:grid-cols-2">
                                        <div>
                                            <label className="mb-1.5 block text-sm font-medium text-zinc-700">
                                                Full Name *
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    placeholder="John Doe"
                                                    value={formData.name}
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            name: e.target
                                                                .value,
                                                        })
                                                    }
                                                    required
                                                    className="w-full rounded-[10px] border border-zinc-200 px-4 py-2.5 text-sm focus:border-zinc-400 focus:outline-none"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="mb-1.5 block text-sm font-medium text-zinc-700">
                                                Work Email *
                                            </label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                                                <input
                                                    type="email"
                                                    placeholder="john@company.com"
                                                    value={formData.email}
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            email: e.target
                                                                .value,
                                                        })
                                                    }
                                                    required
                                                    className="w-full rounded-[10px] border border-zinc-200 py-2.5 pl-10 pr-4 text-sm focus:border-zinc-400 focus:outline-none"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid gap-5 sm:grid-cols-2">
                                        <div>
                                            <label className="mb-1.5 block text-sm font-medium text-zinc-700">
                                                Phone Number *
                                            </label>
                                            <div className="relative">
                                                <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                                                <input
                                                    type="tel"
                                                    placeholder="+91 87646 31130"
                                                    value={formData.phone}
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            phone: e.target
                                                                .value,
                                                        })
                                                    }
                                                    required
                                                    className="w-full rounded-[10px] border border-zinc-200 py-2.5 pl-10 pr-4 text-sm focus:border-zinc-400 focus:outline-none"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="mb-1.5 block text-sm font-medium text-zinc-700">
                                                Company Name
                                            </label>
                                            <div className="relative">
                                                <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                                                <input
                                                    type="text"
                                                    placeholder="Acme Inc."
                                                    value={formData.company}
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            company:
                                                                e.target.value,
                                                        })
                                                    }
                                                    className="w-full rounded-[10px] border border-zinc-200 py-2.5 pl-10 pr-4 text-sm focus:border-zinc-400 focus:outline-none"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="mb-1.5 block text-sm font-medium text-zinc-700">
                                            Team Size
                                        </label>
                                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                                            {teamSizes.map((size) => (
                                                <button
                                                    key={size.value}
                                                    type="button"
                                                    onClick={() =>
                                                        setFormData({
                                                            ...formData,
                                                            teamSize:
                                                                size.value,
                                                        })
                                                    }
                                                    className={`rounded-[10px] border-2 px-4 py-3 text-sm font-medium transition-all ${
                                                        formData.teamSize ===
                                                        size.value
                                                            ? "border-teal-500 bg-teal-50 text-teal-700"
                                                            : "border-zinc-200 text-zinc-600 hover:border-zinc-300"
                                                    }`}
                                                >
                                                    {size.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="mb-1.5 block text-sm font-medium text-zinc-700">
                                            Tell us about your needs
                                        </label>
                                        <textarea
                                            placeholder="What are you looking to achieve with NFC products?"
                                            value={formData.message}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    message: e.target.value,
                                                })
                                            }
                                            rows={4}
                                            className="w-full rounded-[10px] border border-zinc-200 px-4 py-2.5 text-sm focus:border-zinc-400 focus:outline-none"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex w-full items-center justify-center gap-2 rounded-[10px] bg-zinc-900 px-6 py-3 text-sm font-semibold text-white hover:bg-zinc-800 disabled:opacity-50"
                                    >
                                        {isSubmitting ? (
                                            "Submitting..."
                                        ) : (
                                            <>
                                                Request Demo
                                                <ArrowRight className="h-4 w-4" />
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* What to expect */}
                            <div className="rounded-[10px] bg-white p-6">
                                <h3 className="font-bold text-zinc-900">
                                    What to Expect
                                </h3>
                                <ul className="mt-4 space-y-3">
                                    {benefits.map((benefit) => (
                                        <li
                                            key={benefit}
                                            className="flex items-start gap-3"
                                        >
                                            <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-[10px] bg-teal-100">
                                                <Check className="h-3 w-3 text-teal-600" />
                                            </div>
                                            <span className="text-sm text-zinc-600">
                                                {benefit}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Testimonial */}
                            <div className="rounded-[10px] bg-gradient-to-br from-blue-600 to-blue-700 p-6 text-white">
                                <p className="text-sm italic text-blue-100">
                                    &quot;The demo was incredibly helpful. The
                                    team understood our needs perfectly and
                                    helped us choose the right products for our
                                    entire organization.&quot;
                                </p>
                                <div className="mt-4 flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-[10px] bg-white/20" />
                                    <div>
                                        <p className="font-medium">
                                            Priya Sharma
                                        </p>
                                        <p className="text-xs text-blue-200">
                                            HR Director, TechCorp
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Quick contact */}
                            <div className="rounded-[10px] bg-zinc-900 p-6 text-white">
                                <h3 className="font-bold">Prefer to Call?</h3>
                                <p className="mt-2 text-sm text-zinc-400">
                                    Our team is available Mon-Fri, 9 AM - 6 PM
                                </p>
                                <a
                                    href="tel:+918764631130"
                                    className="mt-4 flex items-center gap-2 text-lg font-semibold"
                                >
                                    <Phone className="h-5 w-5" />
                                    +91 87646 31130
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
