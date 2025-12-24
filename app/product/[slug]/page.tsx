'use client'

import { useEffect, useState } from 'react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight, Minus, Plus, ShoppingCart, Check, Truck, Shield, RotateCcw, ChevronDown } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import { useCart } from '@/contexts/cart-context'
import { formatPrice, calculateDiscount, cn } from '@/lib/utils'
import type { Product, Category } from '@/types/database'
import { ProductCard } from '@/components/products/product-card'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default function ProductPage({ params }: PageProps) {
  const [product, setProduct] = useState<Product | null>(null)
  const [category, setCategory] = useState<Category | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
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
      <div className="flex min-h-[400px] items-center justify-center bg-zinc-100">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-300 border-t-zinc-900" />
      </div>
    )
  }

  if (!product) {
    return notFound()
  }

  const discount = calculateDiscount(product.price, product.compare_at_price)

  const handleAddToCart = () => {
    addItem(
      {
        productId: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        compareAtPrice: product.compare_at_price,
        image: product.images[0] || '/placeholder-product.jpg',
      },
      quantity
    )
  }

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
            <Link href="/shop" className="text-zinc-500 hover:text-zinc-700">
              Shop
            </Link>
            {category && (
              <>
                <ChevronRight className="h-4 w-4 text-zinc-400" />
                <Link href={`/shop/${category.slug}`} className="text-zinc-500 hover:text-zinc-700">
                  {category.name}
                </Link>
              </>
            )}
            <ChevronRight className="h-4 w-4 text-zinc-400" />
            <span className="font-medium text-zinc-900 line-clamp-1">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Details */}
      <section className="flex justify-center bg-zinc-100 py-6">
        <div className="w-[95%]">
          <div className="grid gap-6 rounded-xl bg-white p-6 lg:grid-cols-2 lg:p-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square overflow-hidden rounded-xl bg-zinc-100">
                <Image
                  src={product.images[selectedImage] || '/placeholder-product.jpg'}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
                {discount > 0 && (
                  <span className="absolute left-4 top-4 rounded-lg bg-teal-500 px-3 py-1.5 text-sm font-semibold text-white">
                    {discount}% OFF
                  </span>
                )}
                {product.is_featured && (
                  <span className="absolute right-4 top-4 rounded-lg bg-orange-500 px-3 py-1.5 text-sm font-semibold text-white">
                    Bestseller
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-3">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={cn(
                        'relative h-20 w-20 overflow-hidden rounded-lg border-2 transition-all',
                        selectedImage === index
                          ? 'border-zinc-900'
                          : 'border-zinc-200 hover:border-zinc-400'
                      )}
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

            {/* Product Info */}
            <div className="flex flex-col">
              {product.best_for && (
                <p className="text-sm text-zinc-500">
                  Best for {product.best_for}
                </p>
              )}

              <h1 className="mt-2 text-2xl font-bold text-zinc-900 md:text-3xl">
                {product.name}
              </h1>

              {/* Price */}
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <span className="text-3xl font-bold text-zinc-900">
                  {formatPrice(product.price)}
                </span>
                {product.compare_at_price && product.compare_at_price > product.price && (
                  <span className="text-lg text-zinc-400 line-through">
                    {formatPrice(product.compare_at_price)}
                  </span>
                )}
                {discount > 0 && (
                  <span className="rounded-lg bg-teal-100 px-3 py-1 text-sm font-semibold text-teal-700">
                    Save {discount}%
                  </span>
                )}
              </div>

              {/* Short Description */}
              {product.short_description && (
                <p className="mt-4 text-zinc-600">
                  {product.short_description}
                </p>
              )}

              {/* Features */}
              {product.features && product.features.length > 0 && (
                <div className="mt-6 space-y-2">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-teal-100">
                        <Check className="h-3 w-3 text-teal-600" />
                      </div>
                      <span className="text-zinc-600">{feature}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Quantity & Add to Cart */}
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                {/* Quantity Selector */}
                <div className="flex items-center rounded-lg border border-zinc-200">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-zinc-50"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-zinc-50"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-zinc-900 px-6 py-3 text-sm font-semibold text-white hover:bg-zinc-800"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </button>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 grid grid-cols-3 gap-4 rounded-xl bg-zinc-50 p-4">
                <div className="text-center">
                  <Truck className="mx-auto h-5 w-5 text-teal-600" />
                  <p className="mt-1.5 text-xs font-medium text-zinc-700">Free Shipping</p>
                  <p className="text-[10px] text-zinc-500">Orders over ₹999</p>
                </div>
                <div className="text-center">
                  <Shield className="mx-auto h-5 w-5 text-teal-600" />
                  <p className="mt-1.5 text-xs font-medium text-zinc-700">Secure Payment</p>
                  <p className="text-[10px] text-zinc-500">100% Protected</p>
                </div>
                <div className="text-center">
                  <RotateCcw className="mx-auto h-5 w-5 text-teal-600" />
                  <p className="mt-1.5 text-xs font-medium text-zinc-700">Easy Returns</p>
                  <p className="text-[10px] text-zinc-500">7 Day Policy</p>
                </div>
              </div>

              {/* Accordion Sections */}
              <div className="mt-6 space-y-3">
                {/* Description */}
                {product.description && (
                  <details className="group rounded-xl border border-zinc-200" open>
                    <summary className="flex cursor-pointer items-center justify-between p-4">
                      <span className="font-semibold text-zinc-900">Product Description</span>
                      <ChevronDown className="h-5 w-5 text-zinc-400 transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="border-t border-zinc-200 p-4">
                      <p className="whitespace-pre-line text-sm text-zinc-600">
                        {product.description}
                      </p>
                    </div>
                  </details>
                )}

                {/* Shipping Info */}
                <details className="group rounded-xl border border-zinc-200">
                  <summary className="flex cursor-pointer items-center justify-between p-4">
                    <span className="font-semibold text-zinc-900">Shipping & Delivery</span>
                    <ChevronDown className="h-5 w-5 text-zinc-400 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="border-t border-zinc-200 p-4">
                    <ul className="space-y-2 text-sm text-zinc-600">
                      <li className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-teal-500" />
                        <span>Free shipping on orders above ₹999</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-teal-500" />
                        <span>Standard delivery: 5-7 business days</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-teal-500" />
                        <span>Express delivery available at checkout</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-teal-500" />
                        <span>Track your order in real-time</span>
                      </li>
                    </ul>
                  </div>
                </details>

                {/* Returns */}
                <details className="group rounded-xl border border-zinc-200">
                  <summary className="flex cursor-pointer items-center justify-between p-4">
                    <span className="font-semibold text-zinc-900">Returns & Exchange</span>
                    <ChevronDown className="h-5 w-5 text-zinc-400 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="border-t border-zinc-200 p-4">
                    <ul className="space-y-2 text-sm text-zinc-600">
                      <li className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-teal-500" />
                        <span>7-day easy return policy</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-teal-500" />
                        <span>Free replacement for defective products</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-teal-500" />
                        <span>Refund processed within 5-7 days</span>
                      </li>
                    </ul>
                  </div>
                </details>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="flex justify-center bg-zinc-100 pb-8">
          <div className="w-[95%]">
            <div className="rounded-xl bg-white p-6 lg:p-8">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold text-zinc-900">You might also like</h2>
                {category && (
                  <Link
                    href={`/shop/${category.slug}`}
                    className="text-sm font-medium text-teal-600 hover:text-teal-700"
                  >
                    View all
                  </Link>
                )}
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {relatedProducts.map((relatedProduct) => (
                  <ProductCard
                    key={relatedProduct.id}
                    product={relatedProduct}
                    categorySlug={category?.slug}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Sticky Add to Cart Bar (Mobile) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-zinc-200 bg-white p-4 lg:hidden">
        <div className="flex items-center gap-4">
          <div>
            <p className="text-sm text-zinc-500">{product.name}</p>
            <p className="font-bold text-zinc-900">{formatPrice(product.price)}</p>
          </div>
          <button
            onClick={handleAddToCart}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-zinc-900 px-4 py-3 text-sm font-semibold text-white"
          >
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
