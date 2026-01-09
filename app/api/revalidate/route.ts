import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const { path } = await request.json()

        if (path) {
            revalidatePath(path)
        } else {
            // Revalidate home page by default
            revalidatePath('/')
        }

        return NextResponse.json({ revalidated: true, now: Date.now() })
    } catch (error) {
        console.error('Revalidation error:', error)
        return NextResponse.json({ error: 'Failed to revalidate' }, { status: 500 })
    }
}
