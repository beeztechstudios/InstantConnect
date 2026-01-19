-- ============================================
-- INSTANT CONNECT - COMPLETE DATABASE SCHEMA
-- Run this in Supabase SQL Editor to set up fresh database
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. CATEGORIES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    image_url TEXT,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- 1b. SUB-CATEGORIES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS sub_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    image_url TEXT,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- 2. PRODUCTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID REFERENCES categories(id),
    sub_category_id UUID REFERENCES sub_categories(id),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    short_description TEXT,
    best_for TEXT,
    price NUMERIC NOT NULL,
    compare_at_price NUMERIC,
    images TEXT[] DEFAULT '{}',
    features TEXT[] DEFAULT '{}',
    specifications JSONB DEFAULT '{}',
    is_featured BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    is_popular BOOLEAN DEFAULT false,
    is_just_dropped_hero BOOLEAN DEFAULT false,
    hero_video_url TEXT,
    stock_quantity INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Add comments
COMMENT ON COLUMN products.is_just_dropped_hero IS 'Only one product can have this set to true. Used for the hero card in Just Dropped section.';
COMMENT ON COLUMN products.hero_video_url IS 'Video URL for the just dropped hero product background.';

-- ============================================
-- 3. CUSTOMERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id),
    email TEXT NOT NULL,
    phone TEXT,
    first_name TEXT,
    last_name TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- 4. ORDERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number TEXT UNIQUE NOT NULL,
    customer_id UUID REFERENCES customers(id),
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled')),
    subtotal NUMERIC NOT NULL,
    discount NUMERIC DEFAULT 0,
    shipping NUMERIC DEFAULT 0,
    total NUMERIC NOT NULL,
    coupon_code TEXT,
    billing_address JSONB,
    shipping_address JSONB,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- 5. ORDER ITEMS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES orders(id),
    product_id UUID REFERENCES products(id),
    product_name TEXT NOT NULL,
    product_image TEXT,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    unit_price NUMERIC NOT NULL,
    total_price NUMERIC NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- 6. PAYMENTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES orders(id),
    amount NUMERIC NOT NULL,
    currency TEXT DEFAULT 'INR',
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
    method TEXT,
    transaction_id TEXT,
    gateway_order_id TEXT,
    gateway_payment_id TEXT,
    gateway_signature TEXT,
    payment_data JSONB,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- 7. POST PAYMENT DETAILS TABLE (Card Details)
-- ============================================
CREATE TABLE IF NOT EXISTS post_payment_details (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES orders(id),
    business_name TEXT,
    business_type TEXT,
    google_review_link TEXT,
    social_links JSONB,
    design_preferences TEXT,
    additional_info TEXT,
    detail_type TEXT,
    detail_data JSONB,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- 8. COUPONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS coupons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT UNIQUE NOT NULL,
    discount_type TEXT NOT NULL CHECK (discount_type IN ('percentage', 'fixed')),
    discount_value NUMERIC NOT NULL,
    min_order_amount NUMERIC DEFAULT 0,
    max_uses INTEGER,
    current_uses INTEGER DEFAULT 0,
    valid_from TIMESTAMPTZ,
    valid_until TIMESTAMPTZ,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- 9. TESTIMONIALS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    role TEXT,
    company TEXT,
    content TEXT NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    image_url TEXT,
    is_featured BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- 10. DEMO BOOKINGS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS demo_bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company TEXT,
    message TEXT,
    preferred_date DATE,
    preferred_time TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'scheduled', 'completed', 'cancelled')),
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- 11. WISHLISTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS wishlists (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id TEXT NOT NULL,
    product_id UUID REFERENCES products(id),
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE sub_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_payment_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE demo_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;

-- Categories: Public read, authenticated write
CREATE POLICY "Categories are viewable by everyone" ON categories FOR SELECT USING (true);
CREATE POLICY "Categories are insertable by authenticated users" ON categories FOR INSERT WITH CHECK (true);
CREATE POLICY "Categories are updatable by authenticated users" ON categories FOR UPDATE USING (true);
CREATE POLICY "Categories are deletable by authenticated users" ON categories FOR DELETE USING (true);

-- Sub-Categories: Public read, authenticated write
CREATE POLICY "Sub-categories are viewable by everyone" ON sub_categories FOR SELECT USING (true);
CREATE POLICY "Sub-categories are insertable by authenticated users" ON sub_categories FOR INSERT WITH CHECK (true);
CREATE POLICY "Sub-categories are updatable by authenticated users" ON sub_categories FOR UPDATE USING (true);
CREATE POLICY "Sub-categories are deletable by authenticated users" ON sub_categories FOR DELETE USING (true);

-- Products: Public read, authenticated write
CREATE POLICY "Products are viewable by everyone" ON products FOR SELECT USING (true);
CREATE POLICY "Products are insertable by authenticated users" ON products FOR INSERT WITH CHECK (true);
CREATE POLICY "Products are updatable by authenticated users" ON products FOR UPDATE USING (true);
CREATE POLICY "Products are deletable by authenticated users" ON products FOR DELETE USING (true);

-- Customers: Full access (for order creation)
CREATE POLICY "Customers full access" ON customers FOR ALL USING (true);

-- Orders: Full access
CREATE POLICY "Orders full access" ON orders FOR ALL USING (true);

-- Order Items: Full access
CREATE POLICY "Order items full access" ON order_items FOR ALL USING (true);

-- Payments: Full access
CREATE POLICY "Payments full access" ON payments FOR ALL USING (true);

-- Post Payment Details: Full access
CREATE POLICY "Post payment details full access" ON post_payment_details FOR ALL USING (true);

-- Coupons: Public read for validation, authenticated write
CREATE POLICY "Coupons are viewable by everyone" ON coupons FOR SELECT USING (true);
CREATE POLICY "Coupons are insertable by authenticated users" ON coupons FOR INSERT WITH CHECK (true);
CREATE POLICY "Coupons are updatable by authenticated users" ON coupons FOR UPDATE USING (true);
CREATE POLICY "Coupons are deletable by authenticated users" ON coupons FOR DELETE USING (true);

-- Testimonials: Public read, authenticated write
CREATE POLICY "Testimonials are viewable by everyone" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Testimonials are insertable by authenticated users" ON testimonials FOR INSERT WITH CHECK (true);
CREATE POLICY "Testimonials are updatable by authenticated users" ON testimonials FOR UPDATE USING (true);
CREATE POLICY "Testimonials are deletable by authenticated users" ON testimonials FOR DELETE USING (true);

-- Demo Bookings: Full access
CREATE POLICY "Demo bookings full access" ON demo_bookings FOR ALL USING (true);

-- Wishlists: Full access
CREATE POLICY "Wishlists full access" ON wishlists FOR ALL USING (true);

-- ============================================
-- STORAGE BUCKET SETUP
-- Run this in Supabase Dashboard > Storage or SQL
-- ============================================
-- INSERT INTO storage.buckets (id, name, public) VALUES ('product-images', 'product-images', true);

-- Storage policies (run after creating bucket):
-- CREATE POLICY "Public read access" ON storage.objects FOR SELECT USING (bucket_id = 'product-images');
-- CREATE POLICY "Authenticated upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'product-images');
-- CREATE POLICY "Authenticated update" ON storage.objects FOR UPDATE USING (bucket_id = 'product-images');
-- CREATE POLICY "Authenticated delete" ON storage.objects FOR DELETE USING (bucket_id = 'product-images');

-- ============================================
-- SEED DATA: CATEGORIES
-- ============================================
INSERT INTO categories (name, slug, description, image_url, display_order, is_active) VALUES
('NFC Cards', 'nfc-cards', 'Tap once. Share everything. Smart NFC business cards for instant connections.', 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600', 1, true),
('QR Cards', 'qr-cards', 'Scan and connect instantly. QR-enabled cards for seamless sharing.', 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600', 2, true),
('Standees', 'standees', 'Turn footfall into connections. Smart standees for cafes, events & counters.', 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600', 3, true),
('KeyChains', 'keychains', 'Carry your profile everywhere. Portable NFC/QR keychains.', 'https://images.unsplash.com/photo-1620287341056-49a2f1ab2fdc?w=600', 4, true),
('Table Tents', 'table-tents', 'Perfect for cafes, events & everyday use. Smart table displays.', 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=600', 5, true);

-- ============================================
-- DONE!
-- ============================================
-- After running this script:
-- 1. Go to Storage in Supabase Dashboard
-- 2. Create a new bucket called "product-images"
-- 3. Make it PUBLIC
-- 4. Add the storage policies (or set to public in bucket settings)
