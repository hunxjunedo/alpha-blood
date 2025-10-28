import { useState } from 'react'
import { useRouter } from 'next/router'
import jwt from 'jsonwebtoken'

export default function Login() {
  const router = useRouter()
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(e) {
    e.preventDefault()
    setError('')
    if (!user || !password) return setError('Enter both username and password')
    setLoading(true)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user, password })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Login failed')
      // success
    router.replace('/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
 <>
      <a href='/' className='absolute top-3 right-3 underline text-gray-500'>go back</a>
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-gray-900 p-8 rounded-lg shadow">
        <h1 className="text-2xl font-semibold mb-6">Admin login</h1>
        {error && <div className="mb-4 text-red-600">{error}</div>}
        <form onSubmit={submit}>
          <label className="block mb-2">Username</label>
          <input value={user} onChange={e => setUser(e.target.value)} className="w-full p-2 border rounded mb-4" />

          <label className="block mb-2">Password</label>
          <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="w-full p-2 border rounded mb-6" />

          <button type="submit" disabled={loading} className="w-full py-2 px-4 bg-blue-600 text-white rounded">
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
 </>
  )
}

export async function getServerSideProps({ req }) {
  const JWT_SECRET = process.env.JWT_SECRET
  const COOKIE_NAME = process.env.SESSION_COOKIE_NAME || 'students_app_session'

  // If there's no secret configured, treat as not logged in
  if (!JWT_SECRET) return { props: {} }

  const cookies = req.headers.cookie || ''
  const match = cookies.split(';').map(c => c.trim()).find(c => c.startsWith(COOKIE_NAME + '='))
  if (!match) return { props: {} }

  const token = match.split('=')[1]
  try {
    jwt.verify(token, JWT_SECRET)
    // Valid session -> redirect to dashboard
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false
      }
    }
  } catch (err) {
    // invalid token -> render login page
    return { props: {} }
  }
}