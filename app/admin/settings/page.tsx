'use client'

import { useState } from 'react'
import { Save, Store, Mail, CreditCard } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import toast from 'react-hot-toast'

export default function AdminSettingsPage() {
  const [isSaving, setIsSaving] = useState(false)

  const [settings, setSettings] = useState({
    storeName: 'Instant Connect',
    storeEmail: 'hello@instantconnect.in',
    storePhone: '+91 98765 43210',
    storeAddress: 'Mumbai, Maharashtra, India',
    shippingNote: 'Free shipping on all orders. Delivery within 5-7 business days.',
    orderPrefix: 'IC',
  })

  const handleSave = async () => {
    setIsSaving(true)
    // In a real app, save to database
    await new Promise((r) => setTimeout(r, 1000))
    toast.success('Settings saved successfully')
    setIsSaving(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">Settings</h1>
        <p className="mt-1 text-zinc-500">Configure your store settings</p>
      </div>

      <div className="max-w-2xl space-y-6">
        {/* Store Information */}
        <div className="rounded-xl border border-zinc-200 bg-white p-6">
          <div className="flex items-center gap-2 mb-4">
            <Store className="h-5 w-5 text-zinc-500" />
            <h2 className="font-semibold text-zinc-900">Store Information</h2>
          </div>
          <div className="space-y-4">
            <Input
              label="Store Name"
              value={settings.storeName}
              onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label="Email"
                type="email"
                value={settings.storeEmail}
                onChange={(e) => setSettings({ ...settings, storeEmail: e.target.value })}
              />
              <Input
                label="Phone"
                value={settings.storePhone}
                onChange={(e) => setSettings({ ...settings, storePhone: e.target.value })}
              />
            </div>
            <Textarea
              label="Address"
              value={settings.storeAddress}
              onChange={(e) => setSettings({ ...settings, storeAddress: e.target.value })}
            />
          </div>
        </div>

        {/* Order Settings */}
        <div className="rounded-xl border border-zinc-200 bg-white p-6">
          <div className="flex items-center gap-2 mb-4">
            <CreditCard className="h-5 w-5 text-zinc-500" />
            <h2 className="font-semibold text-zinc-900">Order Settings</h2>
          </div>
          <div className="space-y-4">
            <Input
              label="Order Number Prefix"
              value={settings.orderPrefix}
              onChange={(e) => setSettings({ ...settings, orderPrefix: e.target.value })}
            />
            <Textarea
              label="Shipping Note"
              value={settings.shippingNote}
              onChange={(e) => setSettings({ ...settings, shippingNote: e.target.value })}
            />
          </div>
        </div>

        {/* Payment Integration (Placeholder) */}
        <div className="rounded-xl border border-zinc-200 bg-white p-6">
          <div className="flex items-center gap-2 mb-4">
            <CreditCard className="h-5 w-5 text-zinc-500" />
            <h2 className="font-semibold text-zinc-900">Payment Integration</h2>
          </div>
          <p className="text-sm text-zinc-500">
            RazorPay integration coming soon. Currently operating in COD mode.
          </p>
        </div>

        <Button onClick={handleSave} isLoading={isSaving}>
          <Save className="mr-2 h-4 w-4" />
          Save Settings
        </Button>
      </div>
    </div>
  )
}
