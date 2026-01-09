import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { Benefit } from '@/lib/models'

export const dynamic = 'force-dynamic'

// Update benefit
export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect()
        const { id } = await params
        const body = await request.json()
        const benefit = await Benefit.findByIdAndUpdate(id, body, { new: true })

        if (!benefit) {
            return NextResponse.json({ error: 'Benefit not found' }, { status: 404 })
        }

        return NextResponse.json(benefit)
    } catch (error) {
        console.error('Error updating benefit:', error)
        return NextResponse.json({ error: 'Failed to update benefit' }, { status: 500 })
    }
}

// Delete benefit
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect()
        const { id } = await params
        const benefit = await Benefit.findByIdAndDelete(id)

        if (!benefit) {
            return NextResponse.json({ error: 'Benefit not found' }, { status: 404 })
        }

        return NextResponse.json({ message: 'Benefit deleted' })
    } catch (error) {
        console.error('Error deleting benefit:', error)
        return NextResponse.json({ error: 'Failed to delete benefit' }, { status: 500 })
    }
}
