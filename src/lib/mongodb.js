import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI
if (!uri) throw new Error('Please define MONGODB_URI in .env.local')

let cachedClient = null
let cachedDb = null

export async function connectToDatabase() {
  if (cachedClient && cachedDb) return { client: cachedClient, db: cachedDb }

  const client = new MongoClient(uri)
  await client.connect()
  const db = client.db() // default DB from URI

  cachedClient = client
  cachedDb = db
  return { client, db }
}