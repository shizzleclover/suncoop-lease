import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { FaqItem } from '@/lib/models'

// Update FAQ item
export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await dbConnect()
        const body = await request.json()
        const faq = await FaqItem.findByIdAndUpdate(params.id, body, { new: true })

        if (!faq) {
            return NextResponse.json({ error: 'FAQ not found' }, { status: 404 })
        }

        return NextResponse.json(faq)
    } catch (error) {
        console.error('Error updating FAQ:', error)
        return NextResponse.json({ error: 'Failed to update FAQ' }, { status: 500 })
    }
}

// Delete FAQ item
export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await dbConnect()
        const faq = await FaqItem.findByIdAndDelete(params.id)

        if (!faq) {
            return NextResponse.json({ error: 'FAQ not found' }, { status: 404 })
        }

        return NextResponse.json({ message: 'FAQ deleted' })
    } catch (error) {
        console.error('Error deleting FAQ:', error)
        return NextResponse.json({ error: 'Failed to delete FAQ' }, { status: 500 })
    }
}
