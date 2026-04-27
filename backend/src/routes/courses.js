import { Hono } from 'hono'
import jwt from 'jsonwebtoken'
import { Course } from '../models/Course.js'

const courses = new Hono()

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

courses.get('/', authMiddleware, async (c) => {
  try {
    const allCourses = await Course.findAll()
    return c.json(allCourses)
  } catch (error) {
    return c.json({ message: 'Server error' }, 500)
  }
})

courses.get('/department/:dept', authMiddleware, async (c) => {
  try {
    const department = c.req.param('dept')
    const departmentCourses = await Course.findByDepartment(department)
    return c.json(departmentCourses)
  } catch (error) {
    return c.json({ message: 'Server error' }, 500)
  }
})

courses.get('/semester/:sem', authMiddleware, async (c) => {
  try {
    const semester = c.req.param('sem')
    const semesterCourses = await Course.findBySemester(semester)
    return c.json(semesterCourses)
  } catch (error) {
    return c.json({ message: 'Server error' }, 500)
  }
})

courses.get('/student/:id', authMiddleware, async (c) => {
  try {
    const studentId = c.req.param('id')
    const studentCourses = await Course.getStudentCourses(studentId)
    return c.json(studentCourses)
  } catch (error) {
    return c.json({ message: 'Server error' }, 500)
  }
})

courses.post('/create', authMiddleware, async (c) => {
  try {
    const user = c.get('user')
    if (user.role !== 'faculty') {
      return c.json({ message: 'Access denied' }, 403)
    }

    const courseData = await c.req.json()
    const result = await Course.create({
      ...courseData,
      facultyId: user.userId
    })
    
    return c.json({ message: 'Course created successfully', courseId: result.insertedId })
  } catch (error) {
    return c.json({ message: 'Server error' }, 500)
  }
})

courses.post('/enroll', authMiddleware, async (c) => {
  try {
    const user = c.get('user')
    if (user.role !== 'student') {
      return c.json({ message: 'Access denied' }, 403)
    }

    const { courseId } = await c.req.json()
    await Course.enrollStudent(user.userId, courseId)
    
    return c.json({ message: 'Enrolled successfully' })
  } catch (error) {
    return c.json({ message: 'Server error' }, 500)
  }
})

export default courses