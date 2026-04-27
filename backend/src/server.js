import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import 'dotenv/config'
import authRoutes from './routes/auth.js'
import attendanceRoutes from './routes/attendance.js'
import activityRoutes from './routes/activities.js'
import analyticsRoutes from './routes/analytics.js'
import coursesRoutes from './routes/courses.js'
import { initDB } from './db-mongo.js'

const app = new Hono()

app.use('*', cors())
app.use('*', logger())

app.route('/api/auth', authRoutes)
app.route('/api/attendance', attendanceRoutes)
app.route('/api/activities', activityRoutes)
app.route('/api/analytics', analyticsRoutes)
app.route('/api/courses', coursesRoutes)

app.get('/', (c) => c.json({ message: 'SCAA Backend API' }))

const port = process.env.PORT || 3001

// Initialize database
await initDB()

console.log(`Server running on port ${port}`)

export default {
  port,
  fetch: app.fetch,
}