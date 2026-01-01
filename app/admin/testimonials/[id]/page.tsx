'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import { createClient } from '@/utils/supabase/client'
import toast from 'react-hot-toast'

export default function TestimonialFormPage() {
  const router = useRouter()
  const params = useParams()
  const isNew = params.id === 'new'
  const [isLoading, setIsLoading] = useState(!isNew)
  const [isSaving, setIsSaving] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    content: '',
    rating: 5,
    image_url: '',
    is_featured: false,
  })

  useEffect(() => {
    if (isNew) return

    const fetchTestimonial = async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('id', params.id)
        .single()

      if (error || !data) {
        toast.error('Testimonial not found')
        router.push('/admin/testimonials')
        return
      }

      setFormData({
        name: data.name,
        role: data.role || '',
        content: data.content,
        rating: data.rating || 5,
        image_url: data.image_url || '',
        is_featured: data.is_featured,
      })
      setIsLoading(false)
    }

    fetchTestimonial()
  }, [isNew, params.id, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      const supabase = createClient()

      if (isNew) {
        const { error } = await supabase.from('testimonials').insert([formData])
        if (error) throw error
        toast.success('Testimonial created successfully')
      } else {
        const { error } = await supabase
          .from('testimonials')
          .update(formData)
          .eq('id', params.id)
        if (error) throw error
        toast.success('Testimonial updated successfully')
      }

      router.push('/admin/testimonials')
    } catch (error) {
      console.error('Error saving testimonial:', error)
      toast.error('Failed to save testimonial')
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-[10px] border-4 border-zinc-200 border-t-zinc-900" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Link
          href="/admin/testimonials"
          className="inline-flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Testimonials
        </Link>
        <h1 className="mt-4 text-2xl font-bold text-zinc-900">
          {isNew ? 'Add Testimonial' : 'Edit Testimonial'}
        </h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div className="rounded-[10px] border border-zinc-200 bg-white p-6">
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label="Name"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <Input
                label="Role/Title"
                placeholder="CEO, Company"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              />
            </div>

            <Textarea
              label="Testimonial Content"
              placeholder="What the customer said..."
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              required
              className="min-h-[120px]"
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <Select
                label="Rating"
                value={formData.rating.toString()}
                onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                options={[
                  { value: '5', label: '5 Stars' },
                  { value: '4', label: '4 Stars' },
                  { value: '3', label: '3 Stars' },
                  { value: '2', label: '2 Stars' },
                  { value: '1', label: '1 Star' },
                ]}
              />
              <Input
                label="Image URL"
                placeholder="https://example.com/photo.jpg"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              />
            </div>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.is_featured}
                onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                className="h-4 w-4 rounded border-zinc-300"
              />
              <span className="text-sm text-zinc-700">Featured testimonial</span>
            </label>
          </div>
        </div>

        <div className="flex gap-3">
          <Button type="submit" isLoading={isSaving}>
            <Save className="mr-2 h-4 w-4" />
            {isNew ? 'Create Testimonial' : 'Save Changes'}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
