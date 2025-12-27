import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { existsSync } from 'fs'

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

        // Determine upload directory
        const uploadType = type === 'avatar' ? 'avatars' : 'threads'
        const publicDir = path.join(process.cwd(), 'public')
        const uploadDir = path.join(publicDir, 'uploads', uploadType)

        // Ensure directories exist
        try {
            if (!existsSync(path.join(publicDir, 'uploads'))) {
                await mkdir(path.join(publicDir, 'uploads'), { recursive: true })
            }
            if (!existsSync(uploadDir)) {
                await mkdir(uploadDir, { recursive: true })
            }
        } catch (err) {
            console.error('Failed to create directories:', err)
        }

        // Generate unique filename
        const ext = file.type === 'image/jpeg' ? 'jpg' : 'png'
        const filename = `${session.user.id}-${Date.now()}.${ext}`
        const filepath = path.join(uploadDir, filename)

        // Convert file to buffer and save
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        try {
            await writeFile(filepath, buffer)
        } catch (err) {
            console.error('Failed to write file:', err)
            throw new Error('Permission denied or file system error')
        }

        // Return the public URL
        const url = `/uploads/${uploadType}/${filename}`
        console.log('Upload success:', url)

        return NextResponse.json({ url, filename }, { status: 200 })
    } catch (error: any) {
        console.error('Error uploading file:', error)
        return NextResponse.json(
            { error: error.message || 'Failed to upload file' },
            { status: 500 }
        )
    }
}
