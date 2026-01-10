import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { FaqItem } from '@/lib/models'

export const dynamic = 'force-dynamic'

// Get all Flexpay FAQ items
export async function GET() {
    try {
        await dbConnect()
        const faqs = await FaqItem.find({ pageType: 'flexpay' }).sort({ group: 1, order: 1 })
        return NextResponse.json(faqs)
    } catch (error) {
        console.error('Error fetching Flexpay FAQs:', error)
        return NextResponse.json({ error: 'Failed to fetch FAQs' }, { status: 500 })
    }
}

// Create new Flexpay FAQ item
export async function POST(request: Request) {
    try {
        await dbConnect()
        const body = await request.json()
        const faq = await FaqItem.create({ ...body, pageType: 'flexpay' })
        return NextResponse.json(faq, { status: 201 })
    } catch (error) {
        console.error('Error creating Flexpay FAQ:', error)
        return NextResponse.json({ error: 'Failed to create FAQ' }, { status: 500 })
    }
}
