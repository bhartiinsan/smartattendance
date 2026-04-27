import { Hono } from 'hono'
import jwt from 'jsonwebtoken'
import { collections } from '../db-mongo.js'

const activities = new Hono()

// Middleware to verify JWT token
const authMiddleware = async (c, next) => {
  const token = c.req.header('Authorization')?.replace('Bearer ', '')
  
  if (!token) {
    return c.json({ message: 'No token provided' }, 401)
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret')
    c.set('user', decoded)
    await next()
  } catch (error) {
    return c.json({ message: 'Invalid token' }, 401)
  }
}

// Create activity (Faculty only)
activities.post('/create', authMiddleware, async (c) => {
  try {
    const user = c.get('user')
    if (user.role !== 'faculty') {
      return c.json({ message: 'Access denied' }, 403)
    }

    const { title, description, date } = await c.req.json()

    await db.execute(
      'INSERT INTO activities (title, description, faculty_id, date) VALUES (?, ?, ?, ?)',
      [title, description, user.userId, date]
    )

    return c.json({ message: 'Activity created successfully' })
  } catch (error) {
    return c.json({ message: 'Server error' }, 500)
  }
})

// Get all activities (for students)
activities.get('/', authMiddleware, async (c) => {
  try {
    const user = c.get('user')
    if (user.role !== 'student') {
      return c.json({ message: 'Access denied' }, 403)
    }

    const [activityList] = await db.execute(`
      SELECT a.*, u.name as faculty_name,
      CASE WHEN ar.id IS NOT NULL THEN 1 ELSE 0 END as is_registered
      FROM activities a
      JOIN users u ON a.faculty_id = u.id
      LEFT JOIN activity_registrations ar ON a.id = ar.activity_id AND ar.student_id = ?
      WHERE a.date > NOW()
      ORDER BY a.date ASC
    `, [user.userId])

    return c.json(activityList)
  } catch (error) {
    return c.json({ message: 'Server error' }, 500)
  }
})

// Get faculty activities
activities.get('/my-activities', authMiddleware, async (c) => {
  try {
    const user = c.get('user')
    if (user.role !== 'faculty') {
      return c.json({ message: 'Access denied' }, 403)
    }

    const [activityList] = await db.execute(
      'SELECT * FROM activities WHERE faculty_id = ? ORDER BY created_at DESC',
      [user.userId]
    )

    return c.json(activityList)
  } catch (error) {
    return c.json({ message: 'Server error' }, 500)
  }
})

// Register for activity (Student only)
activities.post('/register', authMiddleware, async (c) => {
  try {
    const user = c.get('user')
    if (user.role !== 'student') {
      return c.json({ message: 'Access denied' }, 403)
    }

    const { activityId } = await c.req.json()

    // Check if activity exists
    const [activityList] = await db.execute(
      'SELECT id FROM activities WHERE id = ? AND date > NOW()',
      [activityId]
    )

    if (activityList.length === 0) {
      return c.json({ message: 'Activity not found or expired' }, 400)
    }

    // Register for activity
    await db.execute(
      'INSERT INTO activity_registrations (activity_id, student_id) VALUES (?, ?) ON DUPLICATE KEY UPDATE registered_at = CURRENT_TIMESTAMP',
      [activityId, user.userId]
    )

    return c.json({ message: 'Registered successfully' })
  } catch (error) {
    return c.json({ message: 'Server error' }, 500)
  }
})

// Get activity registrations (Faculty only)
activities.get('/:id/registrations', authMiddleware, async (c) => {
  try {
    const user = c.get('user')
    if (user.role !== 'faculty') {
      return c.json({ message: 'Access denied' }, 403)
    }

    const activityId = c.req.param('id')

    const [registrations] = await db.execute(`
      SELECT ar.*, u.name, u.email
      FROM activity_registrations ar
      JOIN users u ON ar.student_id = u.id
      JOIN activities a ON ar.activity_id = a.id
      WHERE ar.activity_id = ? AND a.faculty_id = ?
      ORDER BY ar.registered_at DESC
    `, [activityId, user.userId])

    return c.json(registrations)
  } catch (error) {
    return c.json({ message: 'Server error' }, 500)
  }
})

export default activities