import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { Benefit } from '@/lib/models'

export const dynamic = 'force-dynamic'

// Get all Flexpay benefits
export async function GET() {
    try {
        await dbConnect()
        const benefits = await Benefit.find({ pageType: 'flexpay' }).sort({ order: 1 })
        return NextResponse.json(benefits)
    } catch (error) {
        console.error('Error fetching Flexpay benefits:', error)
        return NextResponse.json({ error: 'Failed to fetch benefits' }, { status: 500 })
    }
}

// Create new Flexpay benefit
export async function POST(request: Request) {
    try {
        await dbConnect()
        const body = await request.json()
        const benefit = await Benefit.create({ ...body, pageType: 'flexpay' })
        return NextResponse.json(benefit, { status: 201 })
    } catch (error) {
        console.error('Error creating Flexpay benefit:', error)
        return NextResponse.json({ error: 'Failed to create benefit' }, { status: 500 })
    }
}
