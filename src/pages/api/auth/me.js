import jwt from 'jsonwebtoken'

export default function handler(req, res) {
  const JWT_SECRET = process.env.JWT_SECRET
  const COOKIE_NAME = process.env.SESSION_COOKIE_NAME || 'students_app_session'
  const cookies = req.headers.cookie || ''
  const match = cookies.split(';').map(c => c.trim()).find(c => c.startsWith(COOKIE_NAME + '='))
  if (!match) return res.status(401).json({ message: 'Not authenticated' })
  const token = match.split('=')[1]
  try {
    const payload = jwt.verify(token, JWT_SECRET)
    return res.json({ user: payload.user })
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' })
  }
}