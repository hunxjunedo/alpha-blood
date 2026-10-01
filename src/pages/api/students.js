import { connectToDatabase } from '../../lib/mongodb'
import jwt from 'jsonwebtoken'

const COOKIE_NAME = process.env.SESSION_COOKIE_NAME || 'students_app_session'

function getTokenFromReq(req) {
  const cookies = req.headers.cookie || ''
  const match = cookies.split(';').map(c => c.trim()).find(c => c.startsWith(COOKIE_NAME + '='))
  if (!match) return null
  return match.split('=')[1]
}

export default async function handler(req, res) {
  const token = getTokenFromReq(req)
  try {
    jwt.verify(token, process.env.JWT_SECRET)
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  if (req.method === 'POST') {
    const { name, collegeId, house } = req.body || {}
    if (!name || typeof name !== 'string' || !name.trim()) return res.status(400).json({ message: 'Name required' })
    if (!collegeId || typeof collegeId !== 'string' || !/^\w{4,12}$/.test(collegeId)) return res.status(400).json({ message: 'Invalid collegeId' })
    if (!house || typeof house !== 'string') return res.status(400).json({ message: 'House required' })

    const { db } = await connectToDatabase()
    const students = db.collection('students_2026')

    // Ensure we don't duplicate collegeId
    const exists = await students.findOne({ collegeId })
    if (exists) return res.status(409).json({ message: 'collegeId already exists' })

    const doc = { name: name.trim(), collegeId: collegeId.trim(), house, createdAt: new Date() }
    const result = await students.insertOne(doc)
    return res.status(201).json({ insertedId: result.insertedId })
  }

  if (req.method === 'GET') {
    // optional: list students
    const { db } = await connectToDatabase()
    const students = db.collection('students_2026')
    const list = await students.find().sort({ createdAt: -1 }).limit(200).toArray()
    return res.json({ students: list })
  }

  res.status(405).end()
}
