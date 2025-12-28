import { Metadata } from 'next'
import Link from 'next/link'
import { Truck, Clock, MapPin, Package, Plane, IndianRupee, CheckCircle, AlertCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Delivery Policy',
  description: 'Learn about shipping options, delivery times, and tracking for Instant Connect orders.',
}

const shippingOptions = [
  {
    name: 'Standard Delivery',
    time: '5-7 Business Days',
    price: 'Free on orders above Rs. 499',
    priceBelow: 'Rs. 49 for orders below Rs. 499',
    icon: Truck,
    color: 'bg-violet-100',
    iconColor: 'text-violet-600',
  },
  {
    name: 'Express Delivery',
    time: '2-3 Business Days',
    price: 'Rs. 99',
    priceBelow: 'Available for select pin codes',
    icon: Plane,
    color: 'bg-teal-100',
    iconColor: 'text-teal-600',
  },
  {
    name: 'Same Day Delivery',
    time: 'Within 24 Hours',
    price: 'Rs. 199',
    priceBelow: 'Available in Udaipur city only',
    icon: Clock,
    color: 'bg-orange-100',
    iconColor: 'text-orange-600',
  },
]

const deliveryZones = [
  { zone: 'Metro Cities', cities: 'Delhi, Mumbai, Bangalore, Chennai, Kolkata, Hyderabad', time: '3-5 days' },
  { zone: 'Tier 1 Cities', cities: 'Pune, Ahmedabad, Jaipur, Lucknow, Chandigarh, etc.', time: '4-6 days' },
  { zone: 'Tier 2 Cities', cities: 'Udaipur, Jodhpur, Kota, Indore, Bhopal, etc.', time: '5-7 days' },
  { zone: 'Remote Areas', cities: 'North East, Islands, Hill Stations', time: '7-10 days' },
]

const trackingSteps = [
  { status: 'Order Confirmed', description: 'Your order has been placed successfully' },
  { status: 'Processing', description: 'We are preparing your order for shipment' },
  { status: 'Shipped', description: 'Your order is on its way' },
  { status: 'Out for Delivery', description: 'Your order will be delivered today' },
  { status: 'Delivered', description: 'Order delivered successfully' },
]

export default function DeliveryPolicyPage() {
  return (
    <div className="overflow-x-hidden" style={{ backgroundColor: '#F4F4F4' }}>
      {/* Hero */}
      <section className="pt-[6px] px-[6px] pb-0">
        <div className="relative h-[35vh] sm:h-[40vh] md:h-[45vh] overflow-hidden rounded-[10px]">
          {/* Background */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />

          {/* Content */}
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 sm:px-6">
            <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm mb-4">
              <Truck className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
            </div>
            <h1 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Delivery Policy
            </h1>
            <p className="mt-3 text-center text-xs sm:text-sm md:text-base text-white/70 max-w-xs sm:max-w-md md:max-w-2xl">
              Fast, reliable shipping across India with real-time tracking.
            </p>
          </div>
        </div>
      </section>

      {/* Shipping Options */}
      <section className="pt-6 sm:pt-8 lg:pt-10">
        <div className="mx-auto w-[95%]">
          <div className="text-center pb-5 sm:pb-6">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-zinc-900">Shipping Options</h2>
            <p className="mt-1 text-xs sm:text-sm text-zinc-500">Choose the delivery speed that works for you</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
            {shippingOptions.map((option) => (
              <div key={option.name} className="rounded-[10px] bg-white p-5 sm:p-6">
                <div className={`flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-lg ${option.color}`}>
                  <option.icon className={`h-5 w-5 sm:h-6 sm:w-6 ${option.iconColor}`} />
                </div>
                <h3 className="mt-4 text-base sm:text-lg font-bold text-zinc-900">{option.name}</h3>
                <p className="mt-1 text-lg sm:text-xl font-semibold" style={{ color: '#685BC7' }}>{option.time}</p>
                <div className="mt-3 pt-3 border-t border-zinc-100">
                  <p className="text-xs sm:text-sm font-medium text-zinc-900">{option.price}</p>
                  <p className="text-xs text-zinc-500">{option.priceBelow}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery Zones */}
      <section className="py-6 sm:py-8 lg:py-10">
        <div className="mx-auto w-[95%]">
          <div className="rounded-[10px] bg-white p-5 sm:p-6 lg:p-8">
            <div className="flex items-center gap-3 mb-5 sm:mb-6">
              <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-lg bg-violet-100">
                <MapPin className="h-5 w-5 text-violet-600" />
              </div>
              <h2 className="text-base sm:text-lg lg:text-xl font-bold text-zinc-900">Delivery Zones & Timelines</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[500px]">
                <thead>
                  <tr className="border-b border-zinc-200">
                    <th className="text-left py-3 px-4 text-xs sm:text-sm font-semibold text-zinc-900">Zone</th>
                    <th className="text-left py-3 px-4 text-xs sm:text-sm font-semibold text-zinc-900">Coverage</th>
                    <th className="text-right py-3 px-4 text-xs sm:text-sm font-semibold text-zinc-900">Est. Time</th>
                  </tr>
                </thead>
                <tbody>
                  {deliveryZones.map((zone, index) => (
                    <tr key={zone.zone} className={index !== deliveryZones.length - 1 ? 'border-b border-zinc-100' : ''}>
                      <td className="py-3 px-4 text-xs sm:text-sm font-medium text-zinc-900">{zone.zone}</td>
                      <td className="py-3 px-4 text-xs sm:text-sm text-zinc-600">{zone.cities}</td>
                      <td className="py-3 px-4 text-xs sm:text-sm font-medium text-right" style={{ color: '#685BC7' }}>{zone.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Order Tracking */}
      <section className="pb-6 sm:pb-8">
        <div className="mx-auto w-[95%]">
          <div className="rounded-[10px] p-5 sm:p-8 lg:p-10" style={{ backgroundColor: '#685BC7' }}>
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
              <div className="lg:w-1/3">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">Track Your Order</h2>
                <p className="mt-2 text-xs sm:text-sm text-white/70">
                  Once your order is shipped, you&apos;ll receive a tracking number via email and SMS.
                  Use it to track your package in real-time.
                </p>
                <Link
                  href="/track-order"
                  className="mt-4 inline-block rounded-lg bg-white px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold text-violet-600 hover:bg-violet-50"
                >
                  Track Order
                </Link>
              </div>
              <div className="lg:w-2/3">
                <div className="space-y-3">
                  {trackingSteps.map((step, index) => (
                    <div key={step.status} className="flex items-center gap-3 rounded-lg bg-white/10 p-3 sm:p-4">
                      <div className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-white/20">
                        <span className="text-xs font-bold text-white">{index + 1}</span>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-medium text-white">{step.status}</p>
                        <p className="text-xs text-white/60">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Free Shipping Banner */}
      <section className="pb-6 sm:pb-8">
        <div className="mx-auto w-[95%]">
          <div className="rounded-[10px] p-5 sm:p-6 lg:p-8 text-center" style={{ backgroundColor: '#F5A623' }}>
            <IndianRupee className="h-8 w-8 sm:h-10 sm:w-10 text-black mx-auto" />
            <h2 className="mt-3 text-lg sm:text-xl lg:text-2xl font-bold text-black">
              Free Shipping on Orders Above Rs. 499
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-black/70 max-w-lg mx-auto">
              Enjoy free standard shipping across India when you spend Rs. 499 or more.
            </p>
            <Link
              href="/shop"
              className="mt-4 inline-block rounded-lg bg-black px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold text-white hover:bg-black/90"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Important Information */}
      <section className="pb-6 sm:pb-8">
        <div className="mx-auto w-[95%]">
          <div className="rounded-[10px] bg-white p-5 sm:p-6 lg:p-8">
            <h2 className="text-base sm:text-lg lg:text-xl font-bold text-zinc-900 mb-4">Important Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs sm:text-sm font-medium text-zinc-900">Order Processing</p>
                  <p className="text-xs text-zinc-500">Orders are processed within 1-2 business days (Mon-Sat)</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs sm:text-sm font-medium text-zinc-900">Customization Time</p>
                  <p className="text-xs text-zinc-500">Custom designs add 1-2 days to processing time</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs sm:text-sm font-medium text-zinc-900">Delivery Attempts</p>
                  <p className="text-xs text-zinc-500">3 delivery attempts before returning to origin</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs sm:text-sm font-medium text-zinc-900">COD Available</p>
                  <p className="text-xs text-zinc-500">Cash on Delivery available for orders up to Rs. 5000</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Note */}
      <section className="pb-8 sm:pb-12 lg:pb-16">
        <div className="mx-auto w-[95%]">
          <div className="rounded-[10px] bg-amber-50 border border-amber-200 p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm sm:text-base font-bold text-amber-900">Please Note</h3>
                <p className="mt-2 text-xs sm:text-sm text-amber-800">
                  Delivery times are estimates and may vary due to factors beyond our control such as weather conditions,
                  public holidays, or courier delays. We&apos;ll keep you informed of any delays via email or SMS.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
