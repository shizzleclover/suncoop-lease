import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { Benefit } from '@/lib/models'

// Update benefit
export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await dbConnect()
        const body = await request.json()
        const benefit = await Benefit.findByIdAndUpdate(params.id, body, { new: true })

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
    { params }: { params: { id: string } }
) {
    try {
        await dbConnect()
        const benefit = await Benefit.findByIdAndDelete(params.id)

        if (!benefit) {
            return NextResponse.json({ error: 'Benefit not found' }, { status: 404 })
        }

        return NextResponse.json({ message: 'Benefit deleted' })
    } catch (error) {
        console.error('Error deleting benefit:', error)
        return NextResponse.json({ error: 'Failed to delete benefit' }, { status: 500 })
    }
}
