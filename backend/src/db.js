// Simple in-memory database for demo
const users = [
  { id: 1, name: 'Demo Student', email: 'student@demo.com', password: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', role: 'student' },
  { id: 2, name: 'Demo Faculty', email: 'faculty@demo.com', password: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', role: 'faculty' }
]

const attendanceSessions = []
const attendanceRecords = []
const activities = []
const activityRegistrations = []

let nextId = 3

const db = {
  async execute(query, params = []) {
    // Simple query parser for demo
    if (query.includes('SELECT * FROM users WHERE email = ? AND role = ?')) {
      return [users.filter(u => u.email === params[0] && u.role === params[1])]
    }
    if (query.includes('INSERT INTO users')) {
      const [name, email, password, role] = params
      const user = { id: nextId++, name, email, password, role }
      users.push(user)
      return [{ insertId: user.id }]
    }
    if (query.includes('INSERT INTO attendance_sessions')) {
      const [sessionId, facultyId, subject, duration] = params
      const session = { id: nextId++, session_id: sessionId, faculty_id: facultyId, subject, duration, status: 'active', created_at: new Date() }
      attendanceSessions.push(session)
      return [{ insertId: session.id }]
    }
    if (query.includes('SELECT * FROM attendance_sessions WHERE faculty_id')) {
      return [attendanceSessions.filter(s => s.faculty_id === params[0])]
    }
    if (query.includes('SELECT id FROM attendance_sessions WHERE session_id')) {
      return [attendanceSessions.filter(s => s.session_id === params[0] && s.status === 'active')]
    }
    if (query.includes('INSERT INTO attendance_records')) {
      const [sessionId, studentId] = params
      const existing = attendanceRecords.find(r => r.session_id === sessionId && r.student_id === studentId)
      if (!existing) {
        attendanceRecords.push({ id: nextId++, session_id: sessionId, student_id: studentId, status: 'present', marked_at: new Date() })
      }
      return [{ insertId: nextId }]
    }
    if (query.includes('SELECT ar.*, s.subject')) {
      const records = attendanceRecords.filter(r => r.student_id === params[0])
      return [records.map(r => {
        const session = attendanceSessions.find(s => s.id === r.session_id)
        return { ...r, subject: session?.subject, date: session?.created_at }
      })]
    }
    if (query.includes('UPDATE attendance_sessions SET status')) {
      const session = attendanceSessions.find(s => s.id === parseInt(params[0]) && s.faculty_id === params[1])
      if (session) session.status = 'ended'
      return [{ affectedRows: session ? 1 : 0 }]
    }
    if (query.includes('INSERT INTO activities')) {
      const [title, description, facultyId, date] = params
      const activity = { id: nextId++, title, description, faculty_id: facultyId, date: new Date(date), created_at: new Date() }
      activities.push(activity)
      return [{ insertId: activity.id }]
    }
    if (query.includes('SELECT a.*, u.name as faculty_name')) {
      return [activities.map(a => {
        const faculty = users.find(u => u.id === a.faculty_id)
        const isRegistered = activityRegistrations.some(r => r.activity_id === a.id && r.student_id === params[0])
        return { ...a, faculty_name: faculty?.name, is_registered: isRegistered ? 1 : 0 }
      }).filter(a => new Date(a.date) > new Date())]
    }
    if (query.includes('SELECT * FROM activities WHERE faculty_id')) {
      return [activities.filter(a => a.faculty_id === params[0])]
    }
    if (query.includes('SELECT id FROM activities WHERE id')) {
      return [activities.filter(a => a.id === params[0] && new Date(a.date) > new Date())]
    }
    if (query.includes('INSERT INTO activity_registrations')) {
      const [activityId, studentId] = params
      const existing = activityRegistrations.find(r => r.activity_id === activityId && r.student_id === studentId)
      if (!existing) {
        activityRegistrations.push({ id: nextId++, activity_id: activityId, student_id: studentId, registered_at: new Date() })
      }
      return [{ insertId: nextId }]
    }
    return [[]]
  }
}

export async function initDB() {
  console.log('Using in-memory database for demo')
  console.log('Demo users created:')
  console.log('Student: student@demo.com / password')
  console.log('Faculty: faculty@demo.com / password')
}

export default db