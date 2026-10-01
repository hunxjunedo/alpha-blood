import { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { getSessionFromRequest, loginForYear } from '../lib/session'

export default function Dashboard2026() {
  const router = useRouter()
  const [studentName, setStudentName] = useState('')
  const [collegeId, setCollegeId] = useState('')
  const [house, setHouse] = useState('Rufus')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(e) {
    e.preventDefault()
    setError('')
    setSuccess('')
    if (!studentName.trim()) return setError('Student name is required')
    if (!/^\d{4,12}$/.test(collegeId)) return setError('College ID must be 4–12 digits')
    setLoading(true)
    try {
      const res = await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: studentName.trim(), collegeId: collegeId.trim(), house })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Failed to save student')
      setSuccess('2026 student saved successfully')
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
    router.push('/login2026')
  }

  return (
    <>
      <Head>
        <title>Admin Dashboard 2026</title>
      </Head>
      <a href="/2026" className="absolute top-3 right-3 underline text-gray-500">go back</a>
      <div className="min-h-screen flex items-start justify-center py-12">
        <div className="w-full max-w-lg bg-gray-900 p-8 rounded-lg shadow">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold">Add student</h2>
              <p className="text-sm text-gray-400 mt-1">2026 blood drive</p>
            </div>
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
        destination: loginForYear('2026'),
        permanent: false
      }
    }
  }

  if (session.year === '2025') {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false
      }
    }
  }

  return { props: {} }
}
