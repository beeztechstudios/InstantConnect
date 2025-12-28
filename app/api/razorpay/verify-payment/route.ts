import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      order_id,
    } = await request.json()

    // Verify signature
    const body = razorpay_order_id + '|' + razorpay_payment_id
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(body.toString())
      .digest('hex')

    const isAuthentic = expectedSignature === razorpay_signature

    if (!isAuthentic) {
      return NextResponse.json(
        { error: 'Payment verification failed - Invalid signature' },
        { status: 400 }
      )
    }

    // Update payment status in database
    if (order_id) {
      // Update payment record
      const { error: paymentError } = await supabase
        .from('payments')
        .update({
          status: 'completed',
          transaction_id: razorpay_payment_id,
        })
        .eq('order_id', order_id)

      if (paymentError) {
        console.error('Payment update error:', paymentError)
      }

      // Update order status
      const { error: orderError } = await supabase
        .from('orders')
        .update({ status: 'confirmed' })
        .eq('id', order_id)

      if (orderError) {
        console.error('Order update error:', orderError)
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully',
      payment_id: razorpay_payment_id,
    })
  } catch (error) {
    console.error('Payment verification error:', error)
    return NextResponse.json(
      { error: 'Payment verification failed' },
      { status: 500 }
    )
  }
}
