import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { CustomSection } from '@/lib/models'

export const dynamic = 'force-dynamic'

// Update custom section
export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect()
        const { id } = await params
        const body = await request.json()
        const section = await CustomSection.findByIdAndUpdate(id, body, { new: true })

        if (!section) {
            return NextResponse.json({ error: 'Section not found' }, { status: 404 })
        }

        return NextResponse.json(section)
    } catch (error) {
        console.error('Error updating section:', error)
        return NextResponse.json({ error: 'Failed to update section' }, { status: 500 })
    }
}

// Delete custom section
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect()
        const { id } = await params
        const section = await CustomSection.findByIdAndDelete(id)

        if (!section) {
            return NextResponse.json({ error: 'Section not found' }, { status: 404 })
        }

        return NextResponse.json({ message: 'Section deleted' })
    } catch (error) {
        console.error('Error deleting section:', error)
        return NextResponse.json({ error: 'Failed to delete section' }, { status: 500 })
    }
}
