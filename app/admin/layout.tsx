'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'
import { AdminSidebar } from '@/components/admin/admin-sidebar'
import { createClient } from '@/utils/supabase/client'
import { cn } from '@/lib/utils'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(true)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  // Skip auth check for login page
  const isLoginPage = pathname === '/admin/login'

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    if (isLoginPage) {
      setIsLoading(false)
      return
    }

    const checkAuth = async () => {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        router.push('/admin/login')
        return
      }

      // Check admin role
      const isAdmin = session.user?.user_metadata?.role === 'admin'
      if (!isAdmin) {
        await supabase.auth.signOut()
        router.push('/admin/login')
        return
      }

      setIsLoading(false)
    }

    checkAuth()
  }, [pathname, router, isLoginPage])

  // Show login page without layout
  if (isLoginPage) {
    return <>{children}</>
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-100">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-300 border-t-zinc-900" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-100">
      <AdminSidebar
        isCollapsed={isCollapsed}
        onToggle={() => setIsCollapsed(!isCollapsed)}
        isMobileOpen={isMobileOpen}
        onMobileClose={() => setIsMobileOpen(false)}
      />

      {/* Mobile Header */}
      <header className="fixed top-0 left-0 right-0 z-30 flex h-16 items-center justify-between border-b border-zinc-200 bg-white px-4 lg:hidden">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="rounded-lg p-2 text-zinc-600 hover:bg-zinc-100"
        >
          <Menu className="h-6 w-6" />
        </button>
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-xs font-bold text-white">
            IC
          </div>
          <span className="font-bold text-zinc-900">Admin</span>
        </div>
        <div className="w-10" /> {/* Spacer for centering */}
      </header>

      <main
        className={cn(
          'min-h-screen transition-all duration-300',
          // Desktop margin based on sidebar
          isCollapsed ? 'lg:ml-16' : 'lg:ml-64',
          // Mobile: no margin, but add top padding for header
          'ml-0 pt-16 lg:pt-0'
        )}
      >
        <div className="p-4 lg:p-6">{children}</div>
      </main>
    </div>
  )
}
