import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { CustomSection } from '@/lib/models'

// Update custom section
export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await dbConnect()
        const body = await request.json()
        const section = await CustomSection.findByIdAndUpdate(params.id, body, { new: true })

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
    { params }: { params: { id: string } }
) {
    try {
        await dbConnect()
        const section = await CustomSection.findByIdAndDelete(params.id)

        if (!section) {
            return NextResponse.json({ error: 'Section not found' }, { status: 404 })
        }

        return NextResponse.json({ message: 'Section deleted' })
    } catch (error) {
        console.error('Error deleting section:', error)
        return NextResponse.json({ error: 'Failed to delete section' }, { status: 500 })
    }
}
