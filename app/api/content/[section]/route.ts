import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { SiteContent } from '@/lib/models'

// Force dynamic rendering (not static)
export const dynamic = 'force-dynamic'

export async function GET(
    request: Request,
    { params }: { params: { section: string } }
) {
    try {
        await dbConnect()
        const { section } = await params
        const content = await SiteContent.findById(section)

        if (!content) {
            return NextResponse.json({ error: 'Section not found' }, { status: 404 })
        }

        return NextResponse.json(content)
    } catch (error) {
        console.error('Error fetching content:', error)
        return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 })
    }
}

export async function PUT(
    request: Request,
    { params }: { params: { section: string } }
) {
    try {
        await dbConnect()
        const { section } = await params
        const body = await request.json()

        // Remove _id from body to prevent ImmutableField error
        const { _id, ...updateData } = body

        const content = await SiteContent.findByIdAndUpdate(
            section,
            { ...updateData, updatedAt: new Date() },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        )

        return NextResponse.json(content)
    } catch (error) {
        console.error('Error updating content:', error)
        return NextResponse.json({ error: 'Failed to update content' }, { status: 500 })
    }
}
