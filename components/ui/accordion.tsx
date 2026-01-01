'use client'

import { useState, ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AccordionItem {
  id: string
  title: string
  content: string
}

interface AccordionListProps {
  items: AccordionItem[]
  className?: string
}

interface AccordionSingleProps {
  title: string
  children: ReactNode
  defaultOpen?: boolean
  className?: string
}

// Single accordion item component
export function Accordion({ title, children, defaultOpen = false, className }: AccordionSingleProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className={cn('rounded-[10px] border border-zinc-200', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between p-4 text-left"
      >
        <span className="text-sm font-medium text-zinc-900 sm:text-base">
          {title}
        </span>
        <ChevronDown
          className={cn(
            'h-5 w-5 flex-shrink-0 text-zinc-500 transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        />
      </button>
      <div
        className={cn(
          'grid transition-all duration-200 ease-in-out',
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        )}
      >
        <div className="overflow-hidden">
          <div className="px-4 pb-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

// Multiple accordion items component
export function AccordionList({ items, className }: AccordionListProps) {
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  return (
    <div className={cn('divide-y divide-zinc-200', className)}>
      {items.map((item) => {
        const isOpen = openItems.includes(item.id)

        return (
          <div key={item.id} className="py-4">
            <button
              onClick={() => toggleItem(item.id)}
              className="flex w-full items-center justify-between text-left"
            >
              <span className="text-sm font-medium text-zinc-900 sm:text-base">
                {item.title}
              </span>
              <ChevronDown
                className={cn(
                  'h-5 w-5 flex-shrink-0 text-zinc-500 transition-transform duration-200',
                  isOpen && 'rotate-180'
                )}
              />
            </button>
            <div
              className={cn(
                'grid transition-all duration-200 ease-in-out',
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              )}
            >
              <div className="overflow-hidden">
                <p className="pt-3 text-sm text-zinc-600">
                  {item.content}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
