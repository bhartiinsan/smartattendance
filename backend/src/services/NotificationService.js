import nodemailer from 'nodemailer'
import { collections } from '../db-mongo.js'

class NotificationService {
  constructor() {
    this.transporter = nodemailer.createTransporter({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    })
  }

  async sendEmail(to, subject, html) {
    try {
      await this.transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject,
        html
      })
    } catch (error) {
      console.error('Email send error:', error)
    }
  }

  async createNotification(userId, message, type = 'info') {
    return await collections.notifications.insertOne({
      userId,
      message,
      type,
      readStatus: false,
      createdAt: new Date()
    })
  }

  async getNotifications(userId) {
    return await collections.notifications.find({ userId }).sort({ createdAt: -1 }).toArray()
  }

  async markAsRead(notificationId) {
    return await collections.notifications.updateOne(
      { _id: notificationId },
      { $set: { readStatus: true } }
    )
  }

  async sendAttendanceAlert(studentId, subject, percentage) {
    const student = await collections.users.findOne({ _id: studentId })
    if (student && percentage < 75) {
      await this.createNotification(
        studentId,
        `Low attendance alert: ${subject} - ${percentage}%`,
        'warning'
      )
      
      await this.sendEmail(
        student.email,
        'Attendance Alert - SCAA',
        `<h3>Low Attendance Alert</h3>
         <p>Your attendance in ${subject} is ${percentage}%</p>
         <p>Minimum required: 75%</p>`
      )
    }
  }
}

export default new NotificationService()