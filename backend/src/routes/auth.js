import { Hono } from 'hono'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { collections } from '../db-mongo.js'

const auth = new Hono()

auth.post('/login', async (c) => {
  try {
    const { email, password, role } = await c.req.json()

    const user = await collections.users.findOne({ email, role })

    if (!user) {
      return c.json({ message: 'Invalid credentials' }, 401)
    }
    const validPassword = await bcrypt.compare(password, user.password)

    if (!validPassword) {
      return c.json({ message: 'Invalid credentials' }, 401)
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '24h' }
    )

    return c.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    })
  } catch (error) {
    return c.json({ message: 'Server error' }, 500)
  }
})

auth.post('/register', async (c) => {
  try {
    const { name, email, password, role } = await c.req.json()

    const hashedPassword = await bcrypt.hash(password, 10)

    await collections.users.insertOne({
      name,
      email,
      password: hashedPassword,
      role
    })

    return c.json({ message: 'User registered successfully' })
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return c.json({ message: 'Email already exists' }, 400)
    }
    return c.json({ message: 'Server error' }, 500)
  }
})

export default auth