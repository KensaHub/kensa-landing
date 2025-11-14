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

    // Save paper metadata to Supabase
    const { data: paper, error: paperError } = await supabase
      .from('papers')
      .insert([
        {
          user_id: userId,
          title: file.name.replace('.pdf', ''),
          file_name: file.name,
          file_path: filePath,
          file_size: file.size,
          upload_date: new Date().toISOString(),
        },
      ])
      .select()
      .single()

    if (paperError) {
      console.error('Supabase error:', paperError)
      return NextResponse.json(
        { error: 'Failed to save paper metadata' },
        { status: 500 }
      )
    }

    // Find or create "My Papers" folder
    let { data: folder } = await supabase
      .from('folders')
      .select('id')
      .eq('user_id', userId)
      .eq('name', 'My Papers')
      .single()

    // If "My Papers" doesn't exist, create it
    if (!folder) {
      const { data: newFolder, error: folderError } = await supabase
        .from('folders')
        .insert([
          {
            user_id: userId,
            name: 'My Papers',
            parent_folder_id: null,
            watch_enabled: false,
          },
        ])
        .select()
        .single()

      if (folderError) {
        console.error('Error creating folder:', folderError)
      } else {
        folder = newFolder
      }
    }

    // Link paper to "My Papers" folder
    if (folder && paper) {
      const { error: linkError } = await supabase
        .from('paper_folders')
        .insert([
          {
            paper_id: paper.id,
            folder_id: folder.id,
          },
        ])

      if (linkError) {
        console.error('Error linking paper to folder:', linkError)
      }
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