import { MongoClient } from 'mongodb'
import bcrypt from 'bcrypt'

let db = null
let client = null

export async function initDB() {
  try {
    const uri = process.env.MONGODB_URI
    client = new MongoClient(uri)
    await client.connect()
    db = client.db()
    
    // Create demo users if they don't exist
    const hashedPassword = await bcrypt.hash('password', 10)
    
    await db.collection('users').updateOne(
      { email: 'student@demo.com' },
      { $setOnInsert: { name: 'Demo Student', email: 'student@demo.com', password: hashedPassword, role: 'student' } },
      { upsert: true }
    )
    
    await db.collection('users').updateOne(
      { email: 'faculty@demo.com' },
      { $setOnInsert: { name: 'Demo Faculty', email: 'faculty@demo.com', password: hashedPassword, role: 'faculty' } },
      { upsert: true }
    )
    
    console.log('Connected to MongoDB Atlas')
    console.log('Demo users available:')
    console.log('Student: student@demo.com / password')
    console.log('Faculty: faculty@demo.com / password')
    return true
  } catch (error) {
    console.error('MongoDB connection failed:', error.message)
    return false
  }
}

// In-memory database for demo
const users = [
  { _id: '1', name: 'Demo Student', email: 'student@demo.com', password: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', role: 'student' },
  { _id: '2', name: 'Demo Faculty', email: 'faculty@demo.com', password: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', role: 'faculty' }
]

const attendanceSessions = []
const attendanceRecords = []
const activities = []
const activityRegistrations = []

let nextId = 3

export const collections = {
  users: {
    async findOne(query) {
      return await db.collection('users').findOne(query)
    },
    async insertOne(doc) {
      return await db.collection('users').insertOne(doc)
    }
  },
  
  courses: {
    async insertOne(doc) {
      return await db.collection('courses').insertOne(doc)
    },
    async find(query) {
      return db.collection('courses').find(query)
    },
    async findOne(query) {
      return await db.collection('courses').findOne(query)
    }
  },
  
  enrollments: {
    async insertOne(doc) {
      return await db.collection('enrollments').insertOne(doc)
    },
    async find(query) {
      return db.collection('enrollments').find(query)
    }
  },
  
  notifications: {
    async insertOne(doc) {
      return await db.collection('notifications').insertOne(doc)
    },
    async find(query) {
      return db.collection('notifications').find(query)
    },
    async updateOne(filter, update) {
      return await db.collection('notifications').updateOne(filter, update)
    }
  },
  
  attendanceSessions: {
    async insertOne(doc) {
      return await db.collection('attendanceSessions').insertOne({ ...doc, createdAt: new Date(), status: 'active' })
    },
    async find(query) {
      return db.collection('attendanceSessions').find(query)
    },
    async findOne(query) {
      return await db.collection('attendanceSessions').findOne(query)
    },
    async updateOne(filter, update) {
      return await db.collection('attendanceSessions').updateOne(filter, update)
    }
  },
  
  attendanceRecords: {
    async insertOne(doc) {
      return await db.collection('attendanceRecords').insertOne({ ...doc, markedAt: new Date(), status: 'present' })
    },
    async find(query) {
      return db.collection('attendanceRecords').find(query)
    }
  },
  
  activities: {
    async insertOne(doc) {
      return await db.collection('activities').insertOne({ ...doc, createdAt: new Date() })
    },
    async find(query) {
      return db.collection('activities').find(query)
    },
    async findOne(query) {
      return await db.collection('activities').findOne(query)
    }
  },
  
  activityRegistrations: {
    async insertOne(doc) {
      return await db.collection('activityRegistrations').insertOne({ ...doc, registeredAt: new Date() })
    },
    async find(query) {
      return db.collection('activityRegistrations').find(query)
    }
  }
}

export default { collections }