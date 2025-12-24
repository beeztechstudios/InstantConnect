import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight, Target, Users, Zap, Award, Heart, Globe } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Instant Connect - your partner in digital networking solutions.',
}

const stats = [
  { label: 'Happy Customers', value: '10,000+', color: 'bg-violet-500' },
  { label: 'Products Delivered', value: '25,000+', color: 'bg-teal-500' },
  { label: 'Cities Covered', value: '100+', color: 'bg-orange-500' },
  { label: 'Years of Experience', value: '5+', color: 'bg-rose-500' },
]

const values = [
  {
    icon: Target,
    title: 'Innovation First',
    description: 'We constantly push boundaries to bring you the latest in digital networking technology.',
    color: 'bg-violet-100 text-violet-600',
  },
  {
    icon: Users,
    title: 'Customer Centric',
    description: 'Your success is our priority. We design solutions that work for your unique needs.',
    color: 'bg-teal-100 text-teal-600',
  },
  {
    icon: Zap,
    title: 'Speed & Quality',
    description: 'Fast delivery without compromising on quality. Every product is crafted with care.',
    color: 'bg-orange-100 text-orange-600',
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'We strive for excellence in everything we do, from product design to customer service.',
    color: 'bg-rose-100 text-rose-600',
  },
]

const team = [
  {
    name: 'Rahul Sharma',
    role: 'Founder & CEO',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
  },
  {
    name: 'Priya Patel',
    role: 'Head of Design',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
  },
  {
    name: 'Amit Kumar',
    role: 'Tech Lead',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
  },
  {
    name: 'Neha Singh',
    role: 'Customer Success',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
  },
]

export default function AboutPage() {
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
            <span className="font-medium text-zinc-900">About Us</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="flex justify-center bg-zinc-100 py-6">
        <div className="w-[95%]">
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-800 px-8 py-16 md:py-24">
            <div className="relative z-10 mx-auto max-w-3xl text-center">
              <span className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
                Our Story
              </span>
              <h1 className="mt-6 text-4xl font-bold text-white md:text-5xl">
                We&apos;re Revolutionizing
                <span className="block text-zinc-400">Digital Networking</span>
              </h1>
              <p className="mt-6 text-lg text-zinc-300">
                Instant Connect was founded with a simple mission: make sharing your professional
                identity as easy as a tap. We believe in the power of first impressions.
              </p>
            </div>
            {/* Decorative elements */}
            <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-violet-500/20 blur-3xl" />
            <div className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-teal-500/20 blur-3xl" />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="flex justify-center bg-zinc-100 py-6">
        <div className="w-[95%]">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-xl bg-white p-6 text-center">
                <div className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${stat.color}`}>
                  <span className="text-lg font-bold text-white">#</span>
                </div>
                <p className="text-3xl font-bold text-zinc-900">{stat.value}</p>
                <p className="mt-1 text-sm text-zinc-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="flex justify-center bg-zinc-100 py-8">
        <div className="w-[95%]">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-xl bg-white p-8 md:p-12">
              <span className="text-sm font-semibold uppercase tracking-wider text-violet-600">
                Our Journey
              </span>
              <h2 className="mt-2 text-3xl font-bold text-zinc-900">
                From an Idea to India&apos;s Leading NFC Provider
              </h2>
              <div className="mt-6 space-y-4 text-zinc-600">
                <p>
                  It all started when our founders experienced the frustration of running out of
                  business cards at a crucial networking event. That moment sparked an idea: what if
                  we could carry our entire professional identity in a single, smart card?
                </p>
                <p>
                  Today, Instant Connect is India&apos;s leading provider of NFC-enabled networking
                  solutions. From individual professionals to large enterprises, we help thousands
                  of people make memorable first impressions every day.
                </p>
                <p>
                  Our product range has expanded to include NFC cards, QR cards, standees, keychains,
                  and table tents - all designed to help you share your contact information, social
                  profiles, and business details with just a tap.
                </p>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-xl">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800"
                alt="Team collaboration"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="flex justify-center bg-zinc-100 py-8">
        <div className="w-[95%]">
          <div className="rounded-xl bg-white p-8 md:p-12">
            <div className="text-center">
              <span className="text-sm font-semibold uppercase tracking-wider text-teal-600">
                What Drives Us
              </span>
              <h2 className="mt-2 text-3xl font-bold text-zinc-900">Our Values</h2>
              <p className="mt-2 text-zinc-500">The principles that guide everything we do</p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value) => (
                <div key={value.title} className="rounded-xl bg-zinc-50 p-6">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${value.color}`}>
                    <value.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 font-bold text-zinc-900">{value.title}</h3>
                  <p className="mt-2 text-sm text-zinc-500">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="flex justify-center bg-zinc-100 py-8">
        <div className="w-[95%]">
          <div className="rounded-xl bg-gradient-to-br from-violet-600 to-violet-700 p-8 md:p-12">
            <div className="text-center">
              <span className="text-sm font-semibold uppercase tracking-wider text-violet-200">
                The People Behind
              </span>
              <h2 className="mt-2 text-3xl font-bold text-white">Meet Our Team</h2>
              <p className="mt-2 text-violet-100">Passionate individuals dedicated to your success</p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {team.map((member) => (
                <div key={member.name} className="overflow-hidden rounded-xl bg-white/10 backdrop-blur-sm">
                  <div className="relative aspect-square">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-bold text-white">{member.name}</h3>
                    <p className="text-sm text-violet-200">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="flex justify-center bg-zinc-100 py-8">
        <div className="w-[95%]">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl bg-white p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100">
                <Heart className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="mt-4 text-xl font-bold text-zinc-900">Our Mission</h3>
              <p className="mt-3 text-zinc-600">
                To empower professionals and businesses with innovative digital networking solutions
                that make meaningful connections effortless and memorable.
              </p>
            </div>
            <div className="rounded-xl bg-white p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100">
                <Globe className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="mt-4 text-xl font-bold text-zinc-900">Our Vision</h3>
              <p className="mt-3 text-zinc-600">
                To become the global leader in smart networking products, making paper business cards
                obsolete and contributing to a more sustainable, connected world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="flex justify-center bg-zinc-100 pb-8">
        <div className="w-[95%]">
          <div className="rounded-xl bg-zinc-900 px-8 py-16 text-center">
            <h2 className="text-3xl font-bold text-white">
              Ready to Transform Your Networking?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-zinc-400">
              Join thousands of professionals who have already upgraded to smart networking.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/shop"
                className="rounded-lg bg-white px-8 py-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-100"
              >
                Shop Now
              </Link>
              <Link
                href="/contact"
                className="rounded-lg border border-zinc-700 px-8 py-3 text-sm font-semibold text-white hover:bg-zinc-800"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
