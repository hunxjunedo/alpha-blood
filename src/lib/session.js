import jwt from 'jsonwebtoken'

const COOKIE_NAME = process.env.SESSION_COOKIE_NAME || 'students_app_session'

export function getSessionFromRequest(req) {
  const JWT_SECRET = process.env.JWT_SECRET
  if (!JWT_SECRET) return null

  const cookies = req.headers.cookie || ''
  const match = cookies.split(';').map(c => c.trim()).find(c => c.startsWith(COOKIE_NAME + '='))
  if (!match) return null

  const token = match.split('=')[1]
  try {
    const payload = jwt.verify(token, JWT_SECRET)
    return {
      user: payload.user,
      year: payload.year === '2026' ? '2026' : '2025'
    }
  } catch {
    return null
  }
}

export function dashboardForYear(year) {
  return year === '2026' ? '/dashboard2026' : '/dashboard'
}

export function loginForYear(year) {
  return year === '2026' ? '/login2026' : '/login'
}

export function leaderboardForYear(year) {
  return year === '2026' ? '/2026' : '/'
}
