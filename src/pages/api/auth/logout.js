import { serialize } from 'cookie'

export default function handler(req, res) {
  const COOKIE_NAME = process.env.SESSION_COOKIE_NAME || 'students_app_session'
  res.setHeader('Set-Cookie', serialize(COOKIE_NAME, '', {
    httpOnly: true,
    path: '/',
    expires: new Date(0),
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production'
  }))
  res.json({ success: true })
}