import { Hono } from 'hono'
import jwt from 'jsonwebtoken'
import { collections } from '../db-mongo.js'

const attendance = new Hono()

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

// Generate random session ID
function generateSessionId() {
  return Math.random().toString(36).substring(2, 8).toUpperCase()
}

// Create attendance session (Faculty only)
attendance.post('/create-session', authMiddleware, async (c) => {
  try {
    const user = c.get('user')
    if (user.role !== 'faculty') {
      return c.json({ message: 'Access denied' }, 403)
    }

    const { subject, duration } = await c.req.json()
    const sessionId = generateSessionId()

    await db.execute(
      'INSERT INTO attendance_sessions (session_id, faculty_id, subject, duration) VALUES (?, ?, ?, ?)',
      [sessionId, user.userId, subject, duration]
    )

    return c.json({ message: 'Session created', sessionId })
  } catch (error) {
    return c.json({ message: 'Server error' }, 500)
  }
})

// Get faculty sessions
attendance.get('/sessions', authMiddleware, async (c) => {
  try {
    const user = c.get('user')
    if (user.role !== 'faculty') {
      return c.json({ message: 'Access denied' }, 403)
    }

    const [sessions] = await db.execute(
      'SELECT * FROM attendance_sessions WHERE faculty_id = ? ORDER BY created_at DESC',
      [user.userId]
    )

    return c.json(sessions)
  } catch (error) {
    return c.json({ message: 'Server error' }, 500)
  }
})

// Mark attendance (Student only)
attendance.post('/mark', authMiddleware, async (c) => {
  try {
    const user = c.get('user')
    if (user.role !== 'student') {
      return c.json({ message: 'Access denied' }, 403)
    }

    const { sessionId } = await c.req.json()

    // Check if session exists and is active
    const [sessions] = await db.execute(
      'SELECT id FROM attendance_sessions WHERE session_id = ? AND status = "active"',
      [sessionId]
    )

    if (sessions.length === 0) {
      return c.json({ message: 'Invalid or expired session' }, 400)
    }

    const session = sessions[0]

    // Mark attendance
    await db.execute(
      'INSERT INTO attendance_records (session_id, student_id) VALUES (?, ?) ON DUPLICATE KEY UPDATE marked_at = CURRENT_TIMESTAMP',
      [session.id, user.userId]
    )

    return c.json({ message: 'Attendance marked successfully' })
  } catch (error) {
    return c.json({ message: 'Server error' }, 500)
  }
})

// Get student attendance
attendance.get('/my-attendance', authMiddleware, async (c) => {
  try {
    const user = c.get('user')
    if (user.role !== 'student') {
      return c.json({ message: 'Access denied' }, 403)
    }

    const [records] = await db.execute(`
      SELECT ar.*, s.subject, s.created_at as date
      FROM attendance_records ar
      JOIN attendance_sessions s ON ar.session_id = s.id
      WHERE ar.student_id = ?
      ORDER BY s.created_at DESC
    `, [user.userId])

    return c.json(records)
  } catch (error) {
    return c.json({ message: 'Server error' }, 500)
  }
})

// End session (Faculty only)
attendance.post('/end-session/:id', authMiddleware, async (c) => {
  try {
    const user = c.get('user')
    if (user.role !== 'faculty') {
      return c.json({ message: 'Access denied' }, 403)
    }

    const sessionId = c.req.param('id')

    await db.execute(
      'UPDATE attendance_sessions SET status = "ended" WHERE id = ? AND faculty_id = ?',
      [sessionId, user.userId]
    )

    return c.json({ message: 'Session ended successfully' })
  } catch (error) {
    return c.json({ message: 'Server error' }, 500)
  }
})

export default attendance