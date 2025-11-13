'use client'

import { useState, useEffect } from 'react'
import { UserButton, useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

interface Paper {
  id: string
  title: string
  authors: string | null
  year: number | null
  file_name: string
  upload_date: string
}

export default function LibraryPage() {
  const { user } = useUser()
  const router = useRouter()
  const [uploading, setUploading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [papers, setPapers] = useState<Paper[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch papers when component loads
  useEffect(() => {
    if (user) {
      fetchPapers()
    }
  }, [user])

  const handleDelete = async (paperId: string) => {
    if (!confirm('Are you sure you want to delete this paper?')) {
      return
    }

    try {
      const { error } = await supabase
        .from('papers')
        .delete()
        .eq('id', paperId)

      if (error) {
        console.error('Error deleting paper:', error)
        alert('Failed to delete paper')
      } else {
        alert('Paper deleted successfully!')
        fetchPapers() // Refresh the list
      }
    } catch (error) {
      console.error('Delete error:', error)
      alert('Failed to delete paper')
    }
  }

  const fetchPapers = async () => {
    if (!user) return

    const { data, error } = await supabase
      .from('papers')
      .select('*')
      .eq('user_id', user.id)
      .order('upload_date', { ascending: false })

    if (error) {
      console.error('Error fetching papers:', error)
    } else {
      setPapers(data || [])
    }
    setLoading(false)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file)
    } else {
      alert('Please select a PDF file')
    }
  }

  const handleUpload = async () => {
    if (!selectedFile || !user) return

    setUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', selectedFile)
      formData.append('userId', user.id)

      const response = await fetch('/api/upload-paper', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        alert('Paper uploaded successfully!')
        setSelectedFile(null)
        const fileInput = document.getElementById('file-input') as HTMLInputElement
        if (fileInput) fileInput.value = ''
        
        // Refresh the papers list
        fetchPapers()
      } else {
        alert('Upload failed. Please try again.')
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('Upload failed. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push('/dashboard')}>
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">K</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">kensa</span>
            </div>
            <nav className="flex gap-4">
              <span className="text-teal-600 font-semibold">Library</span>
              <span className="text-gray-600 cursor-pointer hover:text-gray-900">Grants</span>
              <span className="text-gray-600 cursor-pointer hover:text-gray-900">Opportunities</span>
            </nav>
          </div>
          <UserButton afterSignOutUrl="/" />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Research Library</h1>
          <p className="text-lg text-gray-600">Upload and organize your research papers</p>
        </div>

        {/* Upload Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Upload a Paper</h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="file-input" className="block text-sm font-medium text-gray-700 mb-2">
                Select PDF File
              </label>
              <input
                id="file-input"
                type="file"
                accept=".pdf"
                onChange={handleFileSelect}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
              />
            </div>

            {selectedFile && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Selected file:</p>
                <p className="font-medium text-gray-900">{selectedFile.name}</p>
                <p className="text-sm text-gray-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            )}

            <button
              onClick={handleUpload}
              disabled={!selectedFile || uploading}
              className="w-full bg-teal-600 text-white font-semibold py-3 rounded-lg hover:bg-teal-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? 'Uploading...' : 'Upload Paper'}
            </button>
          </div>
        </div>

        {/* Papers List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Your Papers ({papers.length})
          </h2>
          
          {loading ? (
            <p className="text-gray-600">Loading papers...</p>
          ) : papers.length === 0 ? (
            <p className="text-gray-600">No papers yet. Upload your first paper above!</p>
          ) : (
            <div className="space-y-4">
              {papers.map((paper) => (
                <div
                  key={paper.id}
                  className="border border-gray-200 rounded-lg p-4 hover:border-teal-500 hover:shadow-sm transition flex justify-between items-start"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{paper.title}</h3>
                    {paper.authors && (
                      <p className="text-sm text-gray-600 mb-1">{paper.authors}</p>
                    )}
                    {paper.year && (
                      <p className="text-sm text-gray-500">Year: {paper.year}</p>
                    )}
                    <p className="text-xs text-gray-400 mt-2">
                      Uploaded: {new Date(paper.upload_date).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(paper.id)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium ml-4"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}