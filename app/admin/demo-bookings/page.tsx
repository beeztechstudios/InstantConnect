'use client'

import { useEffect, useState } from 'react'
import { Eye, Search, Mail, Phone } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Select } from '@/components/ui/select'
import { Modal } from '@/components/ui/modal'
import { Button } from '@/components/ui/button'
import { createClient } from '@/utils/supabase/client'
import { formatDate } from '@/lib/utils'
import toast from 'react-hot-toast'
import type { DemoBooking } from '@/types/database'

export default function AdminDemoBookingsPage() {
  const [bookings, setBookings] = useState<DemoBooking[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [viewModal, setViewModal] = useState<{ open: boolean; booking: DemoBooking | null }>({
    open: false,
    booking: null,
  })

  const fetchBookings = async () => {
    const supabase = createClient()
    const { data } = await supabase
      .from('demo_bookings')
      .select('*')
      .order('created_at', { ascending: false })

    setBookings(data || [])
    setIsLoading(false)
  }

  useEffect(() => {
    fetchBookings()
  }, [])

  const updateBookingStatus = async (bookingId: string, status: string) => {
    const supabase = createClient()
    const { error } = await supabase
      .from('demo_bookings')
      .update({ status })
      .eq('id', bookingId)

    if (error) {
      toast.error('Failed to update booking status')
    } else {
      toast.success('Booking status updated')
      fetchBookings()
    }
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'success' | 'warning' | 'danger' | 'default'> = {
      pending: 'warning',
      contacted: 'default',
      scheduled: 'success',
      completed: 'success',
      cancelled: 'danger',
    }
    return <Badge variant={variants[status] || 'default'}>{status}</Badge>
  }

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      search === '' ||
      booking.name.toLowerCase().includes(search.toLowerCase()) ||
      booking.email.toLowerCase().includes(search.toLowerCase()) ||
      booking.company?.toLowerCase().includes(search.toLowerCase())

    const matchesStatus = statusFilter === '' || booking.status === statusFilter

    return matchesSearch && matchesStatus
  })

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-200 border-t-zinc-900" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">Demo Bookings</h1>
        <p className="mt-1 text-zinc-500">Manage demo requests from potential customers</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-zinc-200 bg-white p-4">
          <p className="text-sm text-zinc-500">Total Requests</p>
          <p className="mt-1 text-2xl font-bold text-zinc-900">{bookings.length}</p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-4">
          <p className="text-sm text-zinc-500">Pending</p>
          <p className="mt-1 text-2xl font-bold text-amber-600">
            {bookings.filter((b) => b.status === 'pending').length}
          </p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-4">
          <p className="text-sm text-zinc-500">Scheduled</p>
          <p className="mt-1 text-2xl font-bold text-teal-600">
            {bookings.filter((b) => b.status === 'scheduled').length}
          </p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-4">
          <p className="text-sm text-zinc-500">Completed</p>
          <p className="mt-1 text-2xl font-bold text-green-600">
            {bookings.filter((b) => b.status === 'completed').length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="relative min-w-[200px] max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder="Search by name, email, company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-zinc-300 bg-white py-2 pl-9 pr-4 text-sm focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
          />
        </div>
        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          options={[
            { value: '', label: 'All Status' },
            { value: 'pending', label: 'Pending' },
            { value: 'contacted', label: 'Contacted' },
            { value: 'scheduled', label: 'Scheduled' },
            { value: 'completed', label: 'Completed' },
            { value: 'cancelled', label: 'Cancelled' },
          ]}
          className="w-40"
        />
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-zinc-200 bg-zinc-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500">
                  Contact
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500">
                  Company
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200">
              {filteredBookings.length > 0 ? (
                filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-zinc-50">
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-zinc-900">{booking.name}</p>
                        <div className="mt-1 flex items-center gap-3 text-xs text-zinc-500">
                          <span className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {booking.email}
                          </span>
                          {booking.phone && (
                            <span className="flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {booking.phone}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-zinc-600">
                      {booking.company || '-'}
                    </td>
                    <td className="px-4 py-3">
                      <Select
                        value={booking.status}
                        onChange={(e) => updateBookingStatus(booking.id, e.target.value)}
                        options={[
                          { value: 'pending', label: 'Pending' },
                          { value: 'contacted', label: 'Contacted' },
                          { value: 'scheduled', label: 'Scheduled' },
                          { value: 'completed', label: 'Completed' },
                          { value: 'cancelled', label: 'Cancelled' },
                        ]}
                        className="w-32"
                      />
                    </td>
                    <td className="px-4 py-3 text-sm text-zinc-500">
                      {formatDate(booking.created_at)}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => setViewModal({ open: true, booking })}
                        className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium text-zinc-600 hover:bg-zinc-100"
                      >
                        <Eye className="h-4 w-4" />
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-sm text-zinc-500">
                    No demo bookings found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Modal */}
      <Modal
        isOpen={viewModal.open}
        onClose={() => setViewModal({ open: false, booking: null })}
        title="Demo Booking Details"
      >
        {viewModal.booking && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-zinc-500">Name</p>
                <p className="font-medium text-zinc-900">{viewModal.booking.name}</p>
              </div>
              <div>
                <p className="text-sm text-zinc-500">Status</p>
                {getStatusBadge(viewModal.booking.status)}
              </div>
              <div>
                <p className="text-sm text-zinc-500">Email</p>
                <a
                  href={`mailto:${viewModal.booking.email}`}
                  className="font-medium text-teal-600 hover:text-teal-700"
                >
                  {viewModal.booking.email}
                </a>
              </div>
              <div>
                <p className="text-sm text-zinc-500">Phone</p>
                {viewModal.booking.phone ? (
                  <a
                    href={`tel:${viewModal.booking.phone}`}
                    className="font-medium text-teal-600 hover:text-teal-700"
                  >
                    {viewModal.booking.phone}
                  </a>
                ) : (
                  <p className="text-zinc-400">-</p>
                )}
              </div>
              <div>
                <p className="text-sm text-zinc-500">Company</p>
                <p className="font-medium text-zinc-900">
                  {viewModal.booking.company || '-'}
                </p>
              </div>
              <div>
                <p className="text-sm text-zinc-500">Requested On</p>
                <p className="font-medium text-zinc-900">
                  {formatDate(viewModal.booking.created_at)}
                </p>
              </div>
            </div>

            {viewModal.booking.message && (
              <div>
                <p className="text-sm text-zinc-500">Message / Notes</p>
                <p className="mt-1 whitespace-pre-line rounded-lg bg-zinc-50 p-3 text-sm text-zinc-700">
                  {viewModal.booking.message}
                </p>
              </div>
            )}

            <div className="flex justify-end gap-3 border-t border-zinc-200 pt-4">
              <Button variant="outline" onClick={() => setViewModal({ open: false, booking: null })}>
                Close
              </Button>
              <Button asChild>
                <a href={`mailto:${viewModal.booking.email}`}>Send Email</a>
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
