import { collections } from '../db-mongo.js'

class AnalyticsService {
  async getStudentAnalytics(studentId) {
    const attendanceRecords = await collections.attendanceRecords.find({ studentId }).toArray()
    const enrollments = await collections.enrollments.find({ studentId }).toArray()
    
    const analytics = {
      totalClasses: attendanceRecords.length,
      presentClasses: attendanceRecords.filter(r => r.status === 'present').length,
      overallPercentage: 0,
      subjectWise: {},
      monthlyTrends: {},
      weeklyPatterns: {}
    }

    analytics.overallPercentage = analytics.totalClasses > 0 
      ? Math.round((analytics.presentClasses / analytics.totalClasses) * 100) 
      : 0

    // Subject-wise analysis
    for (const record of attendanceRecords) {
      const session = await collections.attendanceSessions.findOne({ _id: record.sessionId })
      if (session) {
        if (!analytics.subjectWise[session.subject]) {
          analytics.subjectWise[session.subject] = { total: 0, present: 0, percentage: 0 }
        }
        analytics.subjectWise[session.subject].total++
        if (record.status === 'present') {
          analytics.subjectWise[session.subject].present++
        }
        analytics.subjectWise[session.subject].percentage = Math.round(
          (analytics.subjectWise[session.subject].present / analytics.subjectWise[session.subject].total) * 100
        )
      }
    }

    // Monthly trends
    const monthlyData = {}
    for (const record of attendanceRecords) {
      const month = new Date(record.markedAt).toISOString().slice(0, 7)
      if (!monthlyData[month]) monthlyData[month] = { total: 0, present: 0 }
      monthlyData[month].total++
      if (record.status === 'present') monthlyData[month].present++
    }

    analytics.monthlyTrends = Object.entries(monthlyData).map(([month, data]) => ({
      month,
      percentage: Math.round((data.present / data.total) * 100)
    }))

    return analytics
  }

  async getFacultyAnalytics(facultyId) {
    const sessions = await collections.attendanceSessions.find({ facultyId }).toArray()
    const activities = await collections.activities.find({ facultyId }).toArray()
    
    const analytics = {
      totalSessions: sessions.length,
      activeSessions: sessions.filter(s => s.status === 'active').length,
      totalStudents: 0,
      avgAttendance: 0,
      subjectPerformance: {},
      sessionTrends: []
    }

    // Calculate average attendance
    let totalAttendanceRecords = 0
    let totalPresentRecords = 0

    for (const session of sessions) {
      const records = await collections.attendanceRecords.find({ sessionId: session._id }).toArray()
      totalAttendanceRecords += records.length
      totalPresentRecords += records.filter(r => r.status === 'present').length

      // Subject performance
      if (!analytics.subjectPerformance[session.subject]) {
        analytics.subjectPerformance[session.subject] = { sessions: 0, avgAttendance: 0, totalRecords: 0, presentRecords: 0 }
      }
      analytics.subjectPerformance[session.subject].sessions++
      analytics.subjectPerformance[session.subject].totalRecords += records.length
      analytics.subjectPerformance[session.subject].presentRecords += records.filter(r => r.status === 'present').length
    }

    analytics.avgAttendance = totalAttendanceRecords > 0 
      ? Math.round((totalPresentRecords / totalAttendanceRecords) * 100) 
      : 0

    // Calculate subject-wise averages
    Object.keys(analytics.subjectPerformance).forEach(subject => {
      const subjectData = analytics.subjectPerformance[subject]
      subjectData.avgAttendance = subjectData.totalRecords > 0 
        ? Math.round((subjectData.presentRecords / subjectData.totalRecords) * 100) 
        : 0
    })

    return analytics
  }

  async getDepartmentAnalytics(department) {
    const courses = await collections.courses.find({ department }).toArray()
    const courseIds = courses.map(c => c._id)
    
    const analytics = {
      totalCourses: courses.length,
      totalStudents: 0,
      avgAttendance: 0,
      coursePerformance: {}
    }

    for (const course of courses) {
      const enrollments = await collections.enrollments.find({ courseId: course._id }).toArray()
      analytics.totalStudents += enrollments.length
      
      // Course performance analysis would go here
      analytics.coursePerformance[course.name] = {
        enrolledStudents: enrollments.length,
        avgAttendance: Math.floor(Math.random() * 30) + 70 // Mock data
      }
    }

    return analytics
  }

  async predictAttendance(studentId) {
    const records = await collections.attendanceRecords.find({ studentId }).sort({ markedAt: -1 }).limit(10).toArray()
    
    if (records.length < 5) return { prediction: 'insufficient_data' }

    const recentAttendance = records.filter(r => r.status === 'present').length / records.length
    const trend = recentAttendance > 0.8 ? 'improving' : recentAttendance < 0.6 ? 'declining' : 'stable'
    
    return {
      prediction: Math.round(recentAttendance * 100),
      trend,
      recommendation: recentAttendance < 0.75 ? 'Attend more classes to maintain minimum attendance' : 'Good attendance pattern'
    }
  }
}

export default new AnalyticsService()