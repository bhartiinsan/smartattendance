import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [role, setRole] = useState('student')
  const [formData, setFormData] = useState({ email: '', password: '', name: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register'
      const response = await fetch(`http://localhost:3001${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, role })
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        navigate(role === 'student' ? '/student' : '/faculty')
      } else {
        setError(data.message || 'Authentication failed')
      }
    } catch (err) {
      setError('Connection error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="ambient-light">
        <div className="light-orb orb-1"></div>
        <div className="light-orb orb-2"></div>
      </div>
      <div className="grid-bg"></div>

      <div className="feature-card" style={{ width: '100%', maxWidth: '450px', margin: '2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'white' }}>
              <i className="ri-graduation-cap-line" style={{ color: 'var(--primary)' }}></i> SCAA
            </h1>
          </Link>
          <p style={{ color: 'var(--text-muted)' }}>
            {isLogin ? 'Welcome back to the campus!' : 'Join the digital campus'}
          </p>
        </div>

        {error && (
          <div style={{ 
            padding: '12px', 
            background: 'rgba(239, 68, 68, 0.1)', 
            border: '1px solid rgba(239, 68, 68, 0.3)', 
            borderRadius: '8px', 
            color: '#ef4444', 
            marginBottom: '1rem',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Select Role</label>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <button
                type="button"
                onClick={() => setRole('student')}
                className={`magnetic-btn ${role === 'student' ? 'btn-primary' : 'btn-ghost'}`}
                style={{ flex: 1, padding: '14px', fontSize: '0.9rem' }}
              >
                <i className="ri-user-line"></i> Student
              </button>
              <button
                type="button"
                onClick={() => setRole('faculty')}
                className={`magnetic-btn ${role === 'faculty' ? 'btn-primary' : 'btn-ghost'}`}
                style={{ flex: 1, padding: '14px', fontSize: '0.9rem' }}
              >
                <i className="ri-user-star-line"></i> Faculty
              </button>
            </div>
          </div>

          {!isLogin && (
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input 
                type="text" 
                name="name"
                className="form-input" 
                placeholder="Enter your full name" 
                value={formData.name}
                onChange={handleInputChange}
                required 
              />
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input 
              type="email" 
              name="email"
              className="form-input" 
              placeholder={role === 'student' ? 'student@college.edu' : 'faculty@college.edu'}
              value={formData.email}
              onChange={handleInputChange}
              required 
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              name="password"
              className="form-input" 
              placeholder="Enter your password" 
              value={formData.password}
              onChange={handleInputChange}
              required 
            />
          </div>

          <button 
            type="submit" 
            className="magnetic-btn btn-primary" 
            style={{ width: '100%', padding: '16px', marginBottom: '1rem' }}
            disabled={loading}
          >
            {loading ? (
              <div className="loading"></div>
            ) : (
              <>
                <i className={isLogin ? "ri-login-box-line" : "ri-user-add-line"}></i> 
                {isLogin ? 'Login to Dashboard' : 'Create Account'}
              </>
            )}
          </button>

          <div style={{ textAlign: 'center' }}>
            <button
              type="button"
              onClick={() => { setIsLogin(!isLogin); setError(''); }}
              style={{ background: 'none', border: 'none', color: 'var(--primary)', textDecoration: 'underline', cursor: 'pointer' }}
            >
              {isLogin ? "New to SCAA? Create account" : 'Already registered? Login here'}
            </button>
          </div>

          <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <strong>Demo Accounts:</strong><br/>
            Student: student@demo.com / password<br/>
            Faculty: faculty@demo.com / password
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage