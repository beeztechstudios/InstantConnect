'use client'

import { useEffect, useRef } from 'react'

const hashtags = [
  '#InstantConnect',
  '#OneTapShare',
  '#SmartNetworking',
  '#NoAppNeeded',
  '#AlwaysConnected',
]

export function HashtagSlider() {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    let pos = 0
    let raf: number

    const animate = () => {
      pos -= 0.5
      if (Math.abs(pos) >= el.scrollWidth / 2) {
        pos = 0
      }
      el.style.transform = `translateX(${pos}px)`
      raf = requestAnimationFrame(animate)
    }

    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [])

  const renderTags = () => (
    <>
      {hashtags.map((tag, i) => (
        <span
          key={i}
          className="mx-6 text-sm font-extrabold italic text-white sm:mx-8 md:text-xl"
        >
          {tag}
        </span>
      ))}
    </>
  )

  return (
    <div
      className="relative -mt-32 z-30 flex justify-center"
      style={{ marginTop: '-14rem', marginBottom: '7rem' }}
    >
      {/* RED BAR */}
      <div className="relative w-[95%] overflow-hidden rounded-[10px] bg-[#e61b3a] py-4 sm:py-6 shadow-lg">

        {/* 📌 MOBILE: STATIC TEXT ON TOP LEFT */}
        <div className="sm:hidden text-left pl-4 pb-3">
          <span className="font-extrabold italic text-white text-lg">
            "connect instantly"
          </span>
        </div>

        {/* 🔁 SCROLLING HASHTAGS (ONLY THIS MOVES) */}
        <div className="overflow-hidden">
          <div
            ref={scrollRef}
            className="flex w-max items-center whitespace-nowrap sm:pr-[260px]"
          >
            {renderTags()}
            {renderTags()}
            {renderTags()}
            {renderTags()}
          </div>
        </div>

        {/* 📌 DESKTOP: STATIC TEXT ON RIGHT (NEVER MOVES) */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 hidden sm:flex items-center bg-[#e61b3a] px-3 md:px-6">
          <span className="rounded-[10px] px-0 md:px-5 py-3 font-extrabold italic text-white text-md md:text-3xl">
            "connect instantly"
          </span>
        </div>
      </div>
    </div>
  )
}
