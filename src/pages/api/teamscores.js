import { connectToDatabase } from '../../lib/mongodb'


export default async function handler(req, res) {


  if (req.method === 'GET') {
    // optional: list students
    const { db } = await connectToDatabase()
    const students = db.collection('students')
    const list = await students.find().sort({ createdAt: -1 }).toArray();
    let teamscores= {
        rufus: 0,
        dirus: 0,
        timber: 0,
        sawtooth: 0,
        arcadian: 0
    };
    list.forEach(student => {
        teamscores[student.house.toLowerCase()] +=1
    });
    return res.json({ students: teamscores })
  }

  res.status(405).end()
}