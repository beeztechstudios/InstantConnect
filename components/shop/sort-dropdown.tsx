'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'

export function SortDropdown() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const currentSort = searchParams.get('sort') || 'newest'

  const handleSort = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('sort', value)
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <select
      value={currentSort}
      onChange={(e) => handleSort(e.target.value)}
      className="rounded-[10px] border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700 focus:border-zinc-400 focus:outline-none"
    >
      <option value="newest">Newest</option>
      <option value="featured">Featured</option>
      <option value="price-low">Price: Low to High</option>
      <option value="price-high">Price: High to Low</option>
    </select>
  )
}
