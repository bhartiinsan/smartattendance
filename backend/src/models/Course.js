import { collections } from '../db-mongo.js'

export class Course {
  static async create(courseData) {
    return await collections.courses.insertOne({
      ...courseData,
      createdAt: new Date()
    })
  }

  static async findAll() {
    return await collections.courses.find({}).toArray()
  }

  static async findByDepartment(department) {
    return await collections.courses.find({ department }).toArray()
  }

  static async findBySemester(semester) {
    return await collections.courses.find({ semester }).toArray()
  }

  static async findByFaculty(facultyId) {
    return await collections.courses.find({ facultyId }).toArray()
  }

  static async enrollStudent(studentId, courseId) {
    return await collections.enrollments.insertOne({
      studentId,
      courseId,
      enrollmentDate: new Date(),
      status: 'active'
    })
  }

  static async getStudentCourses(studentId) {
    const enrollments = await collections.enrollments.find({ studentId, status: 'active' }).toArray()
    const courseIds = enrollments.map(e => e.courseId)
    return await collections.courses.find({ _id: { $in: courseIds } }).toArray()
  }
}