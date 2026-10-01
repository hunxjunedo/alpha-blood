import { useState } from 'react'
import { useRouter } from 'next/router'
import { getSessionFromRequest, loginForYear } from '../lib/session'

export default function Dashboard() {
  const router = useRouter()
  const [studentName, setStudentName] = useState('')
  const [collegeId, setCollegeId] = useState('')
  const [house, setHouse] = useState('Rufus')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  function validate() {
    if (!studentName.trim()) return 'Student name is required'
    if (!collegeId.trim()) return 'College ID is required'
    if (!/^\d{4,12}$/.test(collegeId)) return 'College ID must a number,  4–12 digits'
    if (!house) return 'House is required'
    return null
  }

  async function submit(e) {
    e.preventDefault()
    setError('')
    setSuccess('')
    const v = validate()
    if (v) return setError(v)
    setLoading(true)
    try {
      const res = await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: studentName.trim(), collegeId: collegeId.trim(), house })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Failed to save student')
      setSuccess('Student saved successfully')
      setStudentName('')
      setCollegeId('')
      setHouse('Rufus')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
  }

  return (
    <>
      <a href="/" className="absolute top-3 right-3 underline text-gray-500">go back</a>
      <div className="min-h-screen flex items-start justify-center py-12">
        <div className="w-full max-w-lg bg-gray-900 p-8 rounded-lg shadow">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Add student</h2>
            <button onClick={logout} className="text-sm text-red-600">Logout</button>
          </div>
          {error && <div className="mb-4 text-red-600">{error}</div>}
          {success && <div className="mb-4 text-green-600">{success}</div>}

          <form onSubmit={submit}>
            <label className="block mb-2">Student name</label>
            <input value={studentName} onChange={e => setStudentName(e.target.value)} className="w-full p-2 border rounded mb-4" />

            <label className="block mb-2">House</label>
            <select value={house} onChange={e => setHouse(e.target.value)} className="w-full p-2 border rounded mb-4">
              <option>Rufus</option>
              <option>Dirus</option>
              <option>Timber</option>
              <option>Arcadian</option>
              <option>Sawtooth</option>
            </select>

            <label className="block mb-2">College ID</label>
            <input value={collegeId} onChange={e => setCollegeId(e.target.value)} className="w-full p-2 border rounded mb-6" />

            <button type="submit" disabled={loading} className="py-2 px-4 bg-green-600 text-white rounded">
              {loading ? 'Saving...' : 'Save student'}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps({ req }) {
  const session = getSessionFromRequest(req)
  if (!session) {
    return {
      redirect: {
        destination: loginForYear('2025'),
        permanent: false
      }
    }
  }

  if (session.year === '2026') {
    return {
      redirect: {
        destination: '/dashboard2026',
        permanent: false
      }
    }
  }

  return { props: {} }
}
