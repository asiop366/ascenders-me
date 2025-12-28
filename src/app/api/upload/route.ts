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

        // Use path.resolve(process.cwd(), 'public') to get absolute path
        const publicDir = path.resolve(process.cwd(), 'public')
        const uploadsDir = path.join(publicDir, 'uploads')
        const uploadDir = path.join(uploadsDir, uploadType)

        // Ensure directories exist
        try {
            if (!existsSync(publicDir)) {
                console.error('Public directory does not exist:', publicDir)
            }
            if (!existsSync(uploadsDir)) {
                await mkdir(uploadsDir, { recursive: true })
            }
            if (!existsSync(uploadDir)) {
                await mkdir(uploadDir, { recursive: true })
            }
        } catch (err) {
            console.error('Failed to create directories:', err)
            // Continue anyway, writeFile might still work if dir exists but existsSync failed (race condition)
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
