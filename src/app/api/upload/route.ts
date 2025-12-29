import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { put } from '@vercel/blob'

const ALLOWED_TYPES = ['image/jpeg', 'image/png']
const MAX_SIZE = 5 * 1024 * 1024 // 5MB

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const formData = await request.formData()
        const file = formData.get('file') as File | null
        const type = formData.get('type') as string | null // 'avatar' or 'thread'

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 })
        }

        // Validate file type
        if (!ALLOWED_TYPES.includes(file.type)) {
            return NextResponse.json(
                { error: 'Only JPG and PNG files are allowed' },
                { status: 400 }
            )
        }

        // Validate file size
        if (file.size > MAX_SIZE) {
            return NextResponse.json(
                { error: 'File size must be less than 5MB' },
                { status: 400 }
            )
        }

        // Generate unique filename
        const ext = file.type === 'image/jpeg' ? 'jpg' : 'png'
        const uploadType = type === 'avatar' ? 'avatars' : 'threads'
        const filename = `${uploadType}/${session.user.id}-${Date.now()}.${ext}`

        // Upload to Vercel Blob
        const blob = await put(filename, file, {
            access: 'public',
        });

        console.log('Upload success (Vercel Blob):', blob.url)

        return NextResponse.json({ url: blob.url, filename: blob.pathname }, { status: 200 })
    } catch (error: any) {
        console.error('Error uploading file to Vercel Blob:', error)
        return NextResponse.json(
            { error: error.message || 'Failed to upload file' },
            { status: 500 }
        )
    }
}
