import { Hono } from 'hono'
import jwt from 'jsonwebtoken'
import AnalyticsService from '../services/AnalyticsService.js'

const analytics = new Hono()

const authMiddleware = async (c, next) => {
  const token = c.req.header('Authorization')?.replace('Bearer ', '')
  if (!token) return c.json({ message: 'No token provided' }, 401)
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret')
    c.set('user', decoded)
    await next()
  } catch (error) {
    return c.json({ message: 'Invalid token' }, 401)
  }
}

analytics.get('/student/:id', authMiddleware, async (c) => {
  try {
    const studentId = c.req.param('id')
    const user = c.get('user')
    
    if (user.role !== 'student' && user.userId !== studentId) {
      return c.json({ message: 'Access denied' }, 403)
    }

    const analyticsData = await AnalyticsService.getStudentAnalytics(studentId)
    return c.json(analyticsData)
  } catch (error) {
    return c.json({ message: 'Server error' }, 500)
  }
})

analytics.get('/faculty/:id', authMiddleware, async (c) => {
  try {
    const facultyId = c.req.param('id')
    const user = c.get('user')
    
    if (user.role !== 'faculty' && user.userId !== facultyId) {
      return c.json({ message: 'Access denied' }, 403)
    }

    const analyticsData = await AnalyticsService.getFacultyAnalytics(facultyId)
    return c.json(analyticsData)
  } catch (error) {
    return c.json({ message: 'Server error' }, 500)
  }
})

analytics.get('/department/:dept', authMiddleware, async (c) => {
  try {
    const department = c.req.param('dept')
    const analyticsData = await AnalyticsService.getDepartmentAnalytics(department)
    return c.json(analyticsData)
  } catch (error) {
    return c.json({ message: 'Server error' }, 500)
  }
})

analytics.get('/predict/:studentId', authMiddleware, async (c) => {
  try {
    const studentId = c.req.param('studentId')
    const prediction = await AnalyticsService.predictAttendance(studentId)
    return c.json(prediction)
  } catch (error) {
    return c.json({ message: 'Server error' }, 500)
  }
})

export default analytics