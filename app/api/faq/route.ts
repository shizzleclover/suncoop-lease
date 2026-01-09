import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { FaqItem } from '@/lib/models'

// Get all FAQ items
export async function GET() {
    try {
        await dbConnect()
        const faqs = await FaqItem.find().sort({ group: 1, order: 1 })
        return NextResponse.json(faqs)
    } catch (error) {
        console.error('Error fetching FAQs:', error)
        return NextResponse.json({ error: 'Failed to fetch FAQs' }, { status: 500 })
    }
}

// Create new FAQ item
export async function POST(request: Request) {
    try {
        await dbConnect()
        const body = await request.json()
        const faq = await FaqItem.create(body)
        return NextResponse.json(faq, { status: 201 })
    } catch (error) {
        console.error('Error creating FAQ:', error)
        return NextResponse.json({ error: 'Failed to create FAQ' }, { status: 500 })
    }
}
