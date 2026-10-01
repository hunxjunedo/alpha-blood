import { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { dashboardForYear, getSessionFromRequest } from '../lib/session'

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
      router.replace('/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Admin Login 2025</title>
      </Head>
      <a href="/" className="absolute top-3 right-3 underline text-gray-500">go back</a>
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md bg-gray-900 p-8 rounded-lg shadow">
          <h1 className="text-2xl font-semibold mb-6">Admin login — 2025</h1>
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
  const session = getSessionFromRequest(req)
  if (!session) return { props: {} }

  return {
    redirect: {
      destination: dashboardForYear(session.year),
      permanent: false
    }
  }
}
