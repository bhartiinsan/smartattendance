import bcrypt from 'bcrypt'
import db from './db.js'

async function seedDatabase() {
  try {
    console.log('Seeding database...')
    
    // Create demo users
    const hashedPassword = await bcrypt.hash('password', 10)
    
    // Insert demo student
    await db.execute(`
      INSERT IGNORE INTO users (name, email, password, role) 
      VALUES (?, ?, ?, ?)
    `, ['Demo Student', 'student@demo.com', hashedPassword, 'student'])
    
    // Insert demo faculty
    await db.execute(`
      INSERT IGNORE INTO users (name, email, password, role) 
      VALUES (?, ?, ?, ?)
    `, ['Demo Faculty', 'faculty@demo.com', hashedPassword, 'faculty'])
    
    console.log('Database seeded successfully!')
    console.log('Demo credentials:')
    console.log('Student: student@demo.com / password')
    console.log('Faculty: faculty@demo.com / password')
    
  } catch (error) {
    console.error('Seeding error:', error)
  }
}

export { seedDatabase }