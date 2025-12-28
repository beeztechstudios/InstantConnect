import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/products/product-card";
import { createClient } from "@/utils/supabase/server";

export async function FeaturedProducts() {
  const supabase = await createClient();

  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("is_featured", true)
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(3);

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="bg-zinc-100 -mt-24 sm:-mt-24">
      <div className="flex justify-center">
        <section className="relative z-10 w-[95%] rounded-t-[12px] bg-zinc-100 px-4 py-6 sm:px-6 sm:py-8">
          {/* HEADER */}
          <div className="mb-6 flex flex-col text-center gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="md:hidden sm:block text-sm font-bold text-zinc-800 sm:text-lg">
                Our most popular smart products
              </p>
              <h2 className="text-3xl font-extrabold text-zinc-900 sm:text-4xl">
                This week&apos;s steal deals
              </h2>
            </div>

            {/* Desktop button */}
            <Link
              href="/shop"
              className="hidden sm:inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-5 py-2.5 text-lg md:text-lg font-medium text-white hover:bg-zinc-800"
            >
              Explore all products
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* ================= DESKTOP GRID ================= */}
          <div className="hidden sm:grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}

            {/* Promo Banner */}
            <Link href="/shop?category=qr-cards" className="group h-full">
              <PromoCard />
            </Link>
          </div>

          {/* ================= MOBILE SLIDER ================= */}
          <div className="sm:hidden">
            <div className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4">
              {products.map((product) => (
                <div key={product.id} className="min-w-[85%] snap-center">
                  <ProductCard product={product} />
                </div>
              ))}

              {/* Promo slide */}
              <div className="min-w-[85%] snap-center">
                <PromoCard />
              </div>
            </div>

            {/* Mobile CTA */}
            <div className="mt-6 flex justify-center">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-6 py-3 text-base font-medium text-white"
              >
                Explore all products
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
  function PromoCard() {
    return (
      <div className="relative h-full min-h-[420px] overflow-hidden rounded-[20px]">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/PROMOCARDBG.png')" }}
        />

        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
          {/* Discount */}
          <div className="leading-none flex justify-end items-end ">
            <span className="text-[86px] font-extrabold tracking-tight ">
              33
            </span>
            <div className="flex flex-col items-start  mb-2">
              <span className="align-top text-3xl font-bold">%</span>
              <div className="-mt-2 text-4xl font-extrabold">OFF</div>
            </div>
          </div>

          {/* Product Name */}
          <h3 className="mt-6 text-4xl font-extrabold">Instant </h3>
          <h3 className="mt-1 text-4xl font-extrabold">Discount </h3>

          {/* CTA */}
          <button className="mt-8 rounded-full bg-white px-10 py-3 text-lg font-semibold text-zinc-900 transition hover:bg-zinc-100">
            Shop now
          </button>
        </div>
      </div>
    );
  }

}
