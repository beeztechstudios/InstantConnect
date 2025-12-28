'use client'

import { useEffect, useState } from 'react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Home, ChevronLeft, ChevronRight, Star, Scissors, Users, Smartphone, Apple, Tablet, Shield, Minus, Plus } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import { useCart } from '@/contexts/cart-context'
import { formatPrice } from '@/lib/utils'
import type { Product, Category } from '@/types/database'
import { ShopProductCard } from '@/components/products/shop-product-card'

interface PageProps {
  params: Promise<{ slug: string }>
}

const productFaqs = [
  {
    question: 'On-going fees?',
    answer: 'No ongoing fees! Pay once and use your card forever. All features are included with your purchase.',
  },
  {
    question: 'How do I customise my card?',
    answer: 'After purchase, you\'ll receive a link to our customisation portal where you can add your contact details, social links, and profile information.',
  },
  {
    question: 'What can I customise in my digital profile?',
    answer: 'You can customise your name, photo, job title, company, phone numbers, email, website, social media links, and more. Your profile can be updated anytime.',
  },
]

export default function ProductPage({ params }: PageProps) {
  const [product, setProduct] = useState<Product | null>(null)
  const [category, setCategory] = useState<Category | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const { addItem } = useCart()

  useEffect(() => {
    async function fetchProduct() {
      const { slug } = await params
      const supabase = createClient()

      const { data: productData } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .eq('is_active', true)
        .single()

      if (!productData) {
        notFound()
      }

      setProduct(productData)

      if (productData.category_id) {
        const { data: categoryData } = await supabase
          .from('categories')
          .select('*')
          .eq('id', productData.category_id)
          .single()
        setCategory(categoryData)

        const { data: related } = await supabase
          .from('products')
          .select('*')
          .eq('category_id', productData.category_id)
          .neq('id', productData.id)
          .eq('is_active', true)
          .limit(4)
        setRelatedProducts(related || [])
      }

      setIsLoading(false)
    }

    fetchProduct()
  }, [params])

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 sm:pt-28 lg:pt-36" style={{ backgroundColor: '#F4F4F4' }}>
        <div className="mx-auto w-[95%]">
          <div className="grid lg:grid-cols-2 gap-4 sm:gap-8 lg:gap-12">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="hidden sm:flex flex-col gap-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-16 h-16 lg:w-20 lg:h-20 rounded-[10px] bg-zinc-200 animate-pulse" />
                ))}
              </div>
              <div className="flex-1 aspect-square rounded-[10px] bg-zinc-200 animate-pulse" />
            </div>
            <div className="space-y-3 sm:space-y-4">
              <div className="h-5 w-32 sm:w-48 bg-zinc-200 rounded animate-pulse" />
              <div className="h-8 sm:h-10 w-48 sm:w-64 bg-zinc-200 rounded animate-pulse" />
              <div className="h-16 sm:h-20 w-full bg-zinc-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return notFound()
  }

  const images = product.images.length > 0 ? product.images : ['/placeholder-product.jpg']

  const handleAddToCart = () => {
    addItem(
      {
        productId: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        compareAtPrice: product.compare_at_price,
        image: images[0],
      },
      quantity
    )
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F4F4F4' }}>
      {/* Main Content */}
      <section className="pt-20 sm:pt-28 lg:pt-36 pb-6 sm:pb-10 lg:pb-16">
        <div className="mx-auto w-[95%]">
          <div className="grid lg:grid-cols-2 gap-4 sm:gap-8 lg:gap-12 xl:gap-16">
            {/* Left: Image Gallery */}
            <div>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                {/* Vertical Thumbnails (Desktop/Tablet) */}
                {images.length > 1 && (
                  <div className="hidden sm:flex flex-col gap-2 lg:gap-3 order-first">
                    {images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`relative w-14 h-14 lg:w-20 lg:h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                          selectedImage === index
                            ? 'border-zinc-900'
                            : 'border-transparent hover:border-zinc-300'
                        }`}
                      >
                        <Image
                          src={image}
                          alt={`${product.name} ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}

                {/* Main Image */}
                <div className="relative flex-1 aspect-square rounded-xl overflow-hidden bg-white">
                  <Image
                    src={images[selectedImage]}
                    alt={product.name}
                    fill
                    className="object-contain p-4 sm:p-6 lg:p-10"
                    priority
                  />
                </div>
              </div>

              {/* Mobile Thumbnails (Horizontal scroll) */}
              {images.length > 1 && (
                <div className="flex sm:hidden gap-2.5 overflow-x-auto no-scrollbar mt-3 pb-1">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                        selectedImage === index
                          ? 'border-zinc-900 ring-2 ring-zinc-900/20'
                          : 'border-zinc-200 active:border-zinc-400'
                      }`}
                      style={{ width: '72px', height: '72px' }}
                    >
                      <Image
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Product Info */}
            <div className="mt-2 sm:mt-0 lg:pt-4">
              {/* Breadcrumb */}
              <nav className="hidden sm:flex items-center gap-2 text-sm text-zinc-500">
                <Link href="/" className="hover:text-zinc-700">
                  <Home className="h-4 w-4" />
                </Link>
                {category && (
                  <>
                    <span className="text-zinc-300">/</span>
                    <Link href={`/shop?category=${category.slug}`} className="hover:text-zinc-700">
                      {category.name}
                    </Link>
                  </>
                )}
                <span className="text-zinc-300">/</span>
                <span className="text-zinc-700 font-medium line-clamp-1">{product.name}</span>
              </nav>

              {/* Mobile Breadcrumb (Simplified) */}
              <nav className="flex sm:hidden items-center gap-1.5 text-xs text-zinc-500 mb-2">
                <Link href="/" className="hover:text-zinc-700">
                  <Home className="h-3.5 w-3.5" />
                </Link>
                {category && (
                  <>
                    <span>/</span>
                    <Link href={`/shop?category=${category.slug}`} className="hover:text-zinc-700">
                      {category.name}
                    </Link>
                  </>
                )}
              </nav>

              {/* Rating */}
              <div className="flex items-center gap-1 sm:gap-1.5 sm:mt-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-xs sm:text-sm text-zinc-500 ml-1">(739)</span>
              </div>

              {/* Title & Price */}
              <div className="mt-2 sm:mt-3">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-4">
                  <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-zinc-900">
                    {product.name}
                  </h1>
                  <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-zinc-900 flex-shrink-0">
                    {formatPrice(product.price)}
                  </p>
                </div>
              </div>

              {/* Description */}
              {product.short_description && (
                <p className="mt-3 sm:mt-4 text-sm sm:text-base text-zinc-600 leading-relaxed">
                  {product.short_description}
                </p>
              )}

              {/* Quantity & Add to Cart (Desktop/Tablet only) */}
              <div className="hidden sm:flex items-center gap-3 sm:gap-4 mt-6 sm:mt-8">
                {/* Quantity Selector */}
                <div className="flex items-center border border-zinc-200 rounded-full">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center text-zinc-500 hover:text-zinc-900 transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-8 sm:w-10 text-center font-medium text-zinc-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center text-zinc-500 hover:text-zinc-900 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 h-10 sm:h-12 rounded-full text-white font-semibold text-sm hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: '#685BC7' }}
                >
                  Add to cart
                </button>
              </div>

              {/* FAQ Accordion */}
              <div className="mt-6 sm:mt-10 space-y-0">
                {productFaqs.map((faq, index) => (
                  <div key={index} className="border-b border-zinc-200">
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full flex items-center gap-2.5 sm:gap-3 py-3.5 sm:py-4 text-left active:bg-zinc-100 transition-colors"
                    >
                      <Scissors className="h-4 w-4 text-zinc-400 flex-shrink-0" />
                      <span className="font-medium text-zinc-900 text-sm sm:text-base">{faq.question}</span>
                    </button>
                    {openFaq === index && (
                      <div className="pb-3.5 sm:pb-4 pl-6.5 sm:pl-7">
                        <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="pb-6 sm:pb-10 lg:pb-16">
          <div className="mx-auto w-[95%]">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-zinc-900">You might also like</h2>
              {category && (
                <Link
                  href={`/shop?category=${category.slug}`}
                  className="text-xs sm:text-sm font-medium hover:underline"
                  style={{ color: '#685BC7' }}
                >
                  View all
                </Link>
              )}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ShopProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features Bar */}
      <section className="py-6 sm:py-8 lg:py-12 border-t border-zinc-200">
        <div className="mx-auto w-[95%]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {/* Connect with anyone */}
            <div className="flex gap-3 items-start">
              <div className="flex-shrink-0 w-8 h-8 sm:w-auto sm:h-auto flex items-center justify-center">
                <Users className="h-5 w-5 text-zinc-700" />
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-zinc-900 text-sm">Connect with anyone</h3>
                <p className="mt-0.5 sm:mt-1 text-xs text-zinc-500 leading-relaxed">
                  Just one person needs Tapt to begin networking.
                </p>
              </div>
            </div>

            {/* No app required */}
            <div className="flex gap-3 items-start">
              <div className="flex-shrink-0 w-8 h-8 sm:w-auto sm:h-auto flex items-center justify-center">
                <Smartphone className="h-5 w-5 text-zinc-700" />
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-zinc-900 text-sm">No app required</h3>
                <p className="mt-0.5 sm:mt-1 text-xs text-zinc-500 leading-relaxed">
                  Use your web browser to exchange contact details.
                </p>
              </div>
            </div>

            {/* iOS & Android compatible */}
            <div className="flex gap-3 items-start">
              <div className="flex-shrink-0 w-8 h-8 sm:w-auto sm:h-auto flex items-center justify-center">
                <div className="flex flex-col gap-0.5">
                  <Apple className="h-3 w-3 text-zinc-700" />
                  <Tablet className="h-3 w-3 text-zinc-700" />
                </div>
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-zinc-900 text-sm">iOS & Android compatible</h3>
                <p className="mt-0.5 sm:mt-1 text-xs text-zinc-500 leading-relaxed">
                  Works with all mobile devices.
                </p>
              </div>
            </div>

            {/* Built to last */}
            <div className="flex gap-3 items-start">
              <div className="flex-shrink-0 w-8 h-8 sm:w-auto sm:h-auto flex items-center justify-center">
                <Shield className="h-5 w-5 text-zinc-700" />
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-zinc-900 text-sm">Built to last</h3>
                <p className="mt-0.5 sm:mt-1 text-xs text-zinc-500 leading-relaxed">
                  Crafted like a credit card, our cards are durable and timeless.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Add to Cart Bar (Mobile) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-zinc-200 p-4 sm:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
        <div className="flex items-center gap-3">
          {/* Quantity Selector */}
          <div className="flex items-center border border-zinc-200 rounded-full bg-zinc-50">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="h-11 w-11 flex items-center justify-center text-zinc-600 active:bg-zinc-200 rounded-l-full transition-colors"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-8 text-center font-semibold text-zinc-900">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="h-11 w-11 flex items-center justify-center text-zinc-600 active:bg-zinc-200 rounded-r-full transition-colors"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="flex-1 h-11 rounded-full text-white font-semibold text-sm active:opacity-90 transition-opacity"
            style={{ backgroundColor: '#685BC7' }}
          >
            Add to cart • {formatPrice(product.price * quantity)}
          </button>
        </div>
      </div>

      {/* Spacer for mobile sticky bar */}
      <div className="h-24 sm:hidden" aria-hidden="true" />
    </div>
  )
}
