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

        return NextResponse.json(content, {
            headers: {
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0'
            }
        })
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

        console.log('[API PUT] Section:', section)
        console.log('[API PUT] Body received:', JSON.stringify(body, null, 2))
        console.log('[API PUT] Has plans:', !!body.plans, 'Count:', body.plans?.length)
        console.log('[API PUT] Has categories:', !!body.categories, 'Count:', body.categories?.length)

        // Remove _id from body to prevent ImmutableField error
        const { _id, ...updateData } = body

        const content = await SiteContent.findByIdAndUpdate(
            section,
            { ...updateData, updatedAt: new Date() },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        )

        console.log('[API PUT] Saved content ID:', content?._id)
        console.log('[API PUT] Saved plans count:', content?.plans?.length)

        return NextResponse.json(content)
    } catch (error) {
        console.error('Error updating content:', error)
        return NextResponse.json({ error: 'Failed to update content' }, { status: 500 })
    }
}
