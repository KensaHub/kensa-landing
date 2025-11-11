'use client'

import { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function OnboardingPage() {
  const { user } = useUser()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    full_name: '',
    institution: '',
    field_of_study: '',
    research_interests: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase
        .from('user_profiles')
        .insert([
          {
            clerk_user_id: user?.id,
            ...formData
          }
        ])

      if (error) throw error

      // Redirect to dashboard after successful save
      router.push('/dashboard')
    } catch (error) {
      console.error('Error saving profile:', error)
      alert('Error saving profile. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Kensa!</h1>
          <p className="text-gray-600">Let's set up your research profile to get started.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="full_name"
              required
              value={formData.full_name}
              onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Dr. Jane Smith"
            />
          </div>

          {/* Institution */}
          <div>
            <label htmlFor="institution" className="block text-sm font-medium text-gray-700 mb-2">
              Institution *
            </label>
            <input
              type="text"
              id="institution"
              required
              value={formData.institution}
              onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="MIT, Stanford, NREL, etc."
            />
          </div>

          {/* Field of Study */}
          <div>
            <label htmlFor="field_of_study" className="block text-sm font-medium text-gray-700 mb-2">
              Field of Study *
            </label>
            <input
              type="text"
              id="field_of_study"
              required
              value={formData.field_of_study}
              onChange={(e) => setFormData({ ...formData, field_of_study: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Mechanical Engineering, Physics, Chemistry, etc."
            />
          </div>

          {/* Research Interests */}
          <div>
            <label htmlFor="research_interests" className="block text-sm font-medium text-gray-700 mb-2">
              Research Interests *
            </label>
            <textarea
              id="research_interests"
              required
              rows={4}
              value={formData.research_interests}
              onChange={(e) => setFormData({ ...formData, research_interests: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Describe your main research areas and interests..."
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-600 text-white font-semibold py-3 rounded-lg hover:bg-teal-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Saving...' : 'Complete Profile'}
          </button>
        </form>
      </div>
    </div>
  )
}