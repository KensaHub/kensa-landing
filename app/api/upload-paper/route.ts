import { NextRequest, NextResponse } from 'next/server'
import { uploadToR2 } from '@/lib/r2'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const userId = formData.get('userId') as string

    if (!file || !userId) {
      return NextResponse.json(
        { error: 'Missing file or userId' },
        { status: 400 }
      )
    }

    // Upload to R2
    const filePath = await uploadToR2(file, userId)

    // Save metadata to Supabase
    const { error } = await supabase.from('papers').insert([
      {
        user_id: userId,
        title: file.name.replace('.pdf', ''),
        file_name: file.name,
        file_path: filePath,
        file_size: file.size,
      },
    ])

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to save paper metadata' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    )
  }
}