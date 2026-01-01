export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          image_url: string | null
          display_order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          image_url?: string | null
          display_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          image_url?: string | null
          display_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: string
          category_id: string | null
          name: string
          slug: string
          description: string | null
          short_description: string | null
          best_for: string | null
          price: number
          compare_at_price: number | null
          images: string[]
          features: string[]
          specifications: Json
          is_featured: boolean
          is_popular: boolean
          is_active: boolean
          stock_quantity: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          category_id?: string | null
          name: string
          slug: string
          description?: string | null
          short_description?: string | null
          best_for?: string | null
          price: number
          compare_at_price?: number | null
          images?: string[]
          features?: string[]
          specifications?: Json
          is_featured?: boolean
          is_popular?: boolean
          is_active?: boolean
          stock_quantity?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          category_id?: string | null
          name?: string
          slug?: string
          description?: string | null
          short_description?: string | null
          best_for?: string | null
          price?: number
          compare_at_price?: number | null
          images?: string[]
          features?: string[]
          specifications?: Json
          is_featured?: boolean
          is_popular?: boolean
          is_active?: boolean
          stock_quantity?: number
          created_at?: string
          updated_at?: string
        }
      }
      customers: {
        Row: {
          id: string
          user_id: string | null
          email: string
          phone: string | null
          first_name: string | null
          last_name: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          email: string
          phone?: string | null
          first_name?: string | null
          last_name?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          email?: string
          phone?: string | null
          first_name?: string | null
          last_name?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          order_number: string
          customer_id: string | null
          status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          subtotal: number
          discount: number
          shipping: number
          total: number
          coupon_code: string | null
          billing_address: Json | null
          shipping_address: Json | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          order_number: string
          customer_id?: string | null
          status?: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          subtotal: number
          discount?: number
          shipping?: number
          total: number
          coupon_code?: string | null
          billing_address?: Json | null
          shipping_address?: Json | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          order_number?: string
          customer_id?: string | null
          status?: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          subtotal?: number
          discount?: number
          shipping?: number
          total?: number
          coupon_code?: string | null
          billing_address?: Json | null
          shipping_address?: Json | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string | null
          product_id: string | null
          product_name: string
          product_image: string | null
          quantity: number
          unit_price: number
          total_price: number
          created_at: string
        }
        Insert: {
          id?: string
          order_id?: string | null
          product_id?: string | null
          product_name: string
          product_image?: string | null
          quantity: number
          unit_price: number
          total_price: number
          created_at?: string
        }
        Update: {
          id?: string
          order_id?: string | null
          product_id?: string | null
          product_name?: string
          product_image?: string | null
          quantity?: number
          unit_price?: number
          total_price?: number
          created_at?: string
        }
      }
      payments: {
        Row: {
          id: string
          order_id: string | null
          amount: number
          currency: string
          status: 'pending' | 'completed' | 'failed' | 'refunded'
          method: string | null
          transaction_id: string | null
          gateway_order_id: string | null
          gateway_payment_id: string | null
          gateway_signature: string | null
          payment_data: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          order_id?: string | null
          amount: number
          currency?: string
          status?: 'pending' | 'completed' | 'failed' | 'refunded'
          method?: string | null
          transaction_id?: string | null
          gateway_order_id?: string | null
          gateway_payment_id?: string | null
          gateway_signature?: string | null
          payment_data?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          order_id?: string | null
          amount?: number
          currency?: string
          status?: 'pending' | 'completed' | 'failed' | 'refunded'
          method?: string | null
          transaction_id?: string | null
          gateway_order_id?: string | null
          gateway_payment_id?: string | null
          gateway_signature?: string | null
          payment_data?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      post_payment_details: {
        Row: {
          id: string
          order_id: string | null
          business_name: string | null
          business_type: string | null
          google_review_link: string | null
          social_links: Json | null
          design_preferences: string | null
          additional_info: string | null
          created_at: string
        }
        Insert: {
          id?: string
          order_id?: string | null
          business_name?: string | null
          business_type?: string | null
          google_review_link?: string | null
          social_links?: Json | null
          design_preferences?: string | null
          additional_info?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          order_id?: string | null
          business_name?: string | null
          business_type?: string | null
          google_review_link?: string | null
          social_links?: Json | null
          design_preferences?: string | null
          additional_info?: string | null
          created_at?: string
        }
      }
      coupons: {
        Row: {
          id: string
          code: string
          discount_type: 'percentage' | 'fixed'
          discount_value: number
          min_order_amount: number
          max_uses: number | null
          current_uses: number
          valid_from: string | null
          valid_until: string | null
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          code: string
          discount_type: 'percentage' | 'fixed'
          discount_value: number
          min_order_amount?: number
          max_uses?: number | null
          current_uses?: number
          valid_from?: string | null
          valid_until?: string | null
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          code?: string
          discount_type?: 'percentage' | 'fixed'
          discount_value?: number
          min_order_amount?: number
          max_uses?: number | null
          current_uses?: number
          valid_from?: string | null
          valid_until?: string | null
          is_active?: boolean
          created_at?: string
        }
      }
      testimonials: {
        Row: {
          id: string
          name: string
          role: string | null
          company: string | null
          content: string
          rating: number | null
          image_url: string | null
          is_featured: boolean
          is_active: boolean
          display_order: number
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          role?: string | null
          company?: string | null
          content: string
          rating?: number | null
          image_url?: string | null
          is_featured?: boolean
          is_active?: boolean
          display_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          role?: string | null
          company?: string | null
          content?: string
          rating?: number | null
          image_url?: string | null
          is_featured?: boolean
          is_active?: boolean
          display_order?: number
          created_at?: string
        }
      }
      demo_bookings: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          company: string | null
          message: string | null
          preferred_date: string | null
          preferred_time: string | null
          status: 'pending' | 'contacted' | 'scheduled' | 'completed' | 'cancelled'
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          company?: string | null
          message?: string | null
          preferred_date?: string | null
          preferred_time?: string | null
          status?: 'pending' | 'contacted' | 'scheduled' | 'completed' | 'cancelled'
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          company?: string | null
          message?: string | null
          preferred_date?: string | null
          preferred_time?: string | null
          status?: 'pending' | 'contacted' | 'scheduled' | 'completed' | 'cancelled'
          created_at?: string
        }
      }
      wishlists: {
        Row: {
          id: string
          session_id: string
          product_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          session_id: string
          product_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          session_id?: string
          product_id?: string | null
          created_at?: string
        }
      }
    }
  }
}

// Helper types
export type Category = Database['public']['Tables']['categories']['Row']
export type Product = Database['public']['Tables']['products']['Row']
export type Customer = Database['public']['Tables']['customers']['Row']
export type Order = Database['public']['Tables']['orders']['Row']
export type OrderItem = Database['public']['Tables']['order_items']['Row']
export type Payment = Database['public']['Tables']['payments']['Row']
export type PostPaymentDetails = Database['public']['Tables']['post_payment_details']['Row']
export type Coupon = Database['public']['Tables']['coupons']['Row']
export type Testimonial = Database['public']['Tables']['testimonials']['Row']
export type DemoBooking = Database['public']['Tables']['demo_bookings']['Row']
export type Wishlist = Database['public']['Tables']['wishlists']['Row']

// Product with category
export type ProductWithCategory = Product & {
  categories: Category | null
}
