'use client'

import { useEffect, useRef } from 'react'

const hashtags = [
  '#CollegeDays',
  '#Surprises',
  '#PocketSizedFun',
  '#RetroFeel',
  '#Scrapbooks',
  '#SmartNetworking',
  '#NoAppNeeded',
  '#AlwaysConnected',
]

export function HashtagSlider() {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scroll = scrollRef.current
    if (!scroll) return

    let animationId: number
    let position = 0

    const animate = () => {
      position -= 0.5
      if (position <= -scroll.scrollWidth / 2) {
        position = 0
      }
      scroll.style.transform = `translateX(${position}px)`
      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationId)
  }, [])

  const renderContent = () => (
    <>
      {hashtags.map((tag, index) => (
        <span
          key={index}
          className="mx-6 text-base font-bold italic text-white/70 md:mx-10 md:text-lg"
        >
          {tag}
        </span>
      ))}
      <span className="mx-6 text-lg font-bold text-white md:mx-10 md:text-xl">
        don&apos;t just take, give.<sup className="text-xs">™</sup>
      </span>
    </>
  )

  return (
    <div className="relative z-30 flex justify-center" style={{ marginTop: '-14rem', marginBottom: '7rem' }}>
      <div className="w-[95%] overflow-hidden rounded-xl bg-violet-600 py-7 shadow-lg">
        <div ref={scrollRef} className="flex items-center whitespace-nowrap">
          {renderContent()}
          {renderContent()}
          {renderContent()}
          {renderContent()}
        </div>
      </div>
    </div>
  )
}
