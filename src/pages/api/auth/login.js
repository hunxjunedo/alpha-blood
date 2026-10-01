import jwt from 'jsonwebtoken'
import { serialize } from 'cookie'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const { user, password } = req.body || {}
  const ADMIN_USER = process.env.ADMIN_USER
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD_2026 || process.env.ADMIN_PASSWORD
  const JWT_SECRET = process.env.JWT_SECRET
  const COOKIE_NAME = process.env.SESSION_COOKIE_NAME || 'students_app_session'

  if (!ADMIN_USER || !ADMIN_PASSWORD || !JWT_SECRET) {
    return res.status(500).json({ message: 'Server not configured with admin credentials' })
  }

  if (user !== ADMIN_USER || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ message: 'Invalid username or password' })
  }

  const token = jwt.sign({ user: ADMIN_USER }, JWT_SECRET, { expiresIn: '8h' })

  res.setHeader('Set-Cookie', serialize(COOKIE_NAME, token, {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 8,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production'
  }))

  return res.json({ success: true })
}
