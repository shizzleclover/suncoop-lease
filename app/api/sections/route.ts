import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { CustomSection } from '@/lib/models'

export const dynamic = 'force-dynamic'

// Get all custom sections
export async function GET() {
    try {
        await dbConnect()
        const sections = await CustomSection.find().sort({ order: 1 })
        return NextResponse.json(sections)
    } catch (error) {
        console.error('Error fetching sections:', error)
        return NextResponse.json({ error: 'Failed to fetch sections' }, { status: 500 })
    }
}

// Create new custom section
export async function POST(request: Request) {
    try {
        await dbConnect()
        const body = await request.json()
        const section = await CustomSection.create(body)
        return NextResponse.json(section, { status: 201 })
    } catch (error) {
        console.error('Error creating section:', error)
        return NextResponse.json({ error: 'Failed to create section' }, { status: 500 })
    }
}
