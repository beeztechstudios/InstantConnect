'use client'

import { useEffect, useState } from 'react'
import { CreditCard, CheckCircle, Clock, XCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { createClient } from '@/utils/supabase/client'
import { formatPrice, formatDate } from '@/lib/utils'

interface Payment {
  id: string
  amount: number
  status: string
  method: string
  transaction_id: string | null
  created_at: string
  orders: {
    order_number: string
    customers: {
      first_name: string
      last_name: string
      email: string
    } | null
  } | null
}

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPayments = async () => {
      const supabase = createClient()
      const { data } = await supabase
        .from('payments')
        .select('*, orders(order_number, customers(first_name, last_name, email))')
        .order('created_at', { ascending: false })

      setPayments(
        (data || []).map((p) => {
          const order = Array.isArray(p.orders) ? p.orders[0] : p.orders
          const customer = order?.customers
          return {
            ...p,
            orders: order ? {
              ...order,
              customers: Array.isArray(customer) ? customer[0] : customer
            } : null,
          }
        }) as Payment[]
      )
      setIsLoading(false)
    }

    fetchPayments()
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <CreditCard className="h-4 w-4 text-zinc-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'success' | 'warning' | 'danger' | 'default'> = {
      completed: 'success',
      pending: 'warning',
      failed: 'danger',
    }
    return <Badge variant={variants[status] || 'default'}>{status}</Badge>
  }

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
        <h1 className="text-2xl font-bold text-zinc-900">Payments</h1>
        <p className="mt-1 text-zinc-500">View all payment transactions</p>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-zinc-200 bg-zinc-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500">
                  Order
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500">
                  Customer
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500">
                  Amount
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500">
                  Method
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200">
              {payments.length > 0 ? (
                payments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-zinc-50">
                    <td className="px-4 py-3">
                      <p className="font-medium text-zinc-900">
                        {payment.orders?.order_number || 'N/A'}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      {payment.orders?.customers ? (
                        <div>
                          <p className="font-medium text-zinc-900">
                            {payment.orders.customers.first_name}{' '}
                            {payment.orders.customers.last_name}
                          </p>
                          <p className="text-xs text-zinc-500">
                            {payment.orders.customers.email}
                          </p>
                        </div>
                      ) : (
                        <span className="text-zinc-400">N/A</span>
                      )}
                    </td>
                    <td className="px-4 py-3 font-semibold text-zinc-900">
                      {formatPrice(payment.amount)}
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1 rounded-full bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-700 uppercase">
                        {payment.method}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(payment.status)}
                        {getStatusBadge(payment.status)}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-zinc-500">
                      {formatDate(payment.created_at)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-sm text-zinc-500">
                    No payments found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
