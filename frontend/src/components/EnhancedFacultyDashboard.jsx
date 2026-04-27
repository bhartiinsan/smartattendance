import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { mockFacultyData } from '../data/mockData'

function EnhancedFacultyDashboard() {
  const [user, setUser] = useState(mockFacultyData.user)
  const [students, setStudents] = useState(mockFacultyData.students)
  const [analytics, setAnalytics] = useState(mockFacultyData.analytics)
  const [sessions, setSessions] = useState(mockFacultyData.sessions)
  const [activeTab, setActiveTab] = useState('overview')
  const navigate = useNavigate()

  const logout = () => {
    navigate('/')
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-deep)' }}>
      <div className="ambient-light">
        <div className="light-orb orb-1"></div>
        <div className="light-orb orb-2"></div>
      </div>
      <div className="grid-bg"></div>

      {/* Header */}
      <nav style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '1.5rem 4%', 
        background: 'rgba(5, 5, 7, 0.95)', 
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border-color)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <div className="logo" style={{ fontSize: '1.8rem' }}>
            <i className="ri-user-star-line"></i> SCAA Faculty
          </div>
          <div style={{ 
            padding: '8px 16px', 
            background: 'linear-gradient(135deg, var(--primary), var(--accent))', 
            borderRadius: '20px',
            fontSize: '0.9rem',
            fontWeight: '600'
          }}>
            {user?.department}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>{user?.name}</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{user?.designation}</div>
          </div>
          <button onClick={logout} className="magnetic-btn btn-ghost" style={{ padding: '8px 16px' }}>
            <i className="ri-logout-box-line"></i>
          </button>
        </div>
      </nav>

      <div style={{ padding: '2rem 4%' }}>
        {/* Tab Navigation */}
        <div style={{ 
          display: 'flex', 
          gap: '0', 
          marginBottom: '2rem',
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '16px',
          padding: '6px',
          border: '1px solid var(--border-color)'
        }}>
          {[
            { key: 'overview', label: 'Overview', icon: 'ri-dashboard-3-line' },
            { key: 'students', label: 'Students', icon: 'ri-group-line' },
            { key: 'analytics', label: 'Analytics', icon: 'ri-bar-chart-line' },
            { key: 'sessions', label: 'Sessions', icon: 'ri-live-line' }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className="magnetic-btn"
              style={{
                flex: 1,
                padding: '12px 20px',
                background: activeTab === tab.key ? 'linear-gradient(135deg, var(--primary), var(--accent))' : 'transparent',
                color: activeTab === tab.key ? 'white' : 'var(--text-muted)',
                border: 'none',
                borderRadius: '12px',
                fontWeight: '600',
                fontSize: '0.9rem',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <i className={tab.icon}></i>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            <div className="feature-card" style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{ fontSize: '3.5rem', fontWeight: '800', color: 'var(--primary)', marginBottom: '0.5rem' }}>
                {analytics.totalSessions}
              </div>
              <h3 style={{ marginBottom: '0.5rem' }}>Total Sessions</h3>
              <p className="text-muted">Sessions conducted</p>
            </div>

            <div className="feature-card" style={{ 
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.05))',
              border: '1px solid rgba(16, 185, 129, 0.2)',
              textAlign: 'center',
              padding: '2rem'
            }}>
              <div style={{ fontSize: '3.5rem', fontWeight: '800', color: '#10b981', marginBottom: '0.5rem' }}>
                {analytics.activeSessions}
              </div>
              <h3 style={{ marginBottom: '0.5rem' }}>Active Sessions</h3>
              <p className="text-muted">Currently running</p>
            </div>

            <div className="feature-card" style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{ fontSize: '3.5rem', fontWeight: '800', color: 'var(--accent)', marginBottom: '0.5rem' }}>
                {analytics.totalStudents}
              </div>
              <h3 style={{ marginBottom: '0.5rem' }}>Total Students</h3>
              <p className="text-muted">Under supervision</p>
            </div>

            <div className="feature-card" style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{ fontSize: '3.5rem', fontWeight: '800', color: analytics.avgAttendance >= 75 ? '#10b981' : '#f59e0b', marginBottom: '0.5rem' }}>
                {analytics.avgAttendance}%
              </div>
              <h3 style={{ marginBottom: '0.5rem' }}>Avg Attendance</h3>
              <p className="text-muted">Across all subjects</p>
            </div>
          </div>
        )}

        {/* Students Tab */}
        {activeTab === 'students' && (
          <div className="feature-card">
            <h2 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <i className="ri-group-line" style={{ color: 'var(--primary)' }}></i>
              Student Performance Overview
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
              {students.map((student) => (
                <div key={student.id} className="card" style={{ 
                  padding: '1.5rem',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))',
                  border: `1px solid ${student.overallAttendance >= 75 ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                  borderRadius: '16px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <div>
                      <h4 style={{ marginBottom: '0.3rem', fontSize: '1.1rem' }}>{student.name}</h4>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.3rem' }}>
                        {student.rollNumber}
                      </p>
                      <p style={{ color: 'var(--primary)', fontSize: '0.8rem', fontWeight: '600' }}>
                        {student.course}
                      </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ 
                        fontSize: '1.5rem', 
                        fontWeight: 'bold', 
                        color: student.overallAttendance >= 75 ? '#10b981' : '#ef4444',
                        marginBottom: '0.3rem'
                      }}>
                        {student.overallAttendance}%
                      </div>
                      <div style={{ 
                        padding: '4px 8px',
                        background: student.overallAttendance >= 85 ? '#10b981' : student.overallAttendance >= 75 ? '#f59e0b' : '#ef4444',
                        color: 'white',
                        borderRadius: '12px',
                        fontSize: '0.7rem',
                        fontWeight: '600'
                      }}>
                        {student.status}
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ 
                    width: '100%', 
                    height: '6px', 
                    background: 'rgba(255,255,255,0.1)', 
                    borderRadius: '3px', 
                    overflow: 'hidden',
                    marginBottom: '1rem'
                  }}>
                    <div style={{ 
                      width: `${student.overallAttendance}%`, 
                      height: '100%', 
                      background: student.overallAttendance >= 75 ? '#10b981' : '#ef4444',
                      borderRadius: '3px',
                      transition: 'width 0.8s ease'
                    }}></div>
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button 
                      className="magnetic-btn btn-ghost"
                      style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                    >
                      <i className="ri-eye-line"></i> View Details
                    </button>
                    <button 
                      className="magnetic-btn btn-ghost"
                      style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                    >
                      <i className="ri-mail-line"></i> Send Alert
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
            <div className="feature-card">
              <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <i className="ri-line-chart-line" style={{ color: 'var(--primary)' }}></i>
                Monthly Session Trends
              </h3>
              <div style={{ padding: '1rem' }}>
                {analytics.monthlyStats.map((stat, index) => (
                  <div key={index} style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span>{stat.month}</span>
                      <span style={{ fontWeight: 'bold' }}>{stat.sessions} sessions • {stat.avgAttendance}%</span>
                    </div>
                    <div style={{ 
                      width: '100%', 
                      height: '8px', 
                      background: 'rgba(255,255,255,0.1)', 
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: `${stat.avgAttendance}%`,
                        height: '100%',
                        background: stat.avgAttendance >= 75 ? '#10b981' : '#f59e0b',
                        borderRadius: '4px',
                        transition: 'width 0.5s ease'
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="feature-card">
              <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <i className="ri-pie-chart-line" style={{ color: 'var(--accent)' }}></i>
                Student Distribution
              </h3>
              <div style={{ padding: '1rem' }}>
                {['Excellent', 'Good', 'Regular', 'Below Average', 'Poor'].map(status => {
                  const count = students.filter(s => s.status === status).length
                  const percentage = Math.round((count / students.length) * 100)
                  const color = status === 'Excellent' ? '#10b981' : status === 'Good' ? '#3b82f6' : status === 'Regular' ? '#f59e0b' : '#ef4444'
                  return (
                    <div key={status} style={{ marginBottom: '1rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span>{status}</span>
                        <span style={{ fontWeight: 'bold', color }}>
                          {count} ({percentage}%)
                        </span>
                      </div>
                      <div style={{ 
                        width: '100%', 
                        height: '6px', 
                        background: 'rgba(255,255,255,0.1)', 
                        borderRadius: '3px',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          width: `${percentage}%`,
                          height: '100%',
                          background: color,
                          borderRadius: '3px',
                          transition: 'width 0.5s ease'
                        }} />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* Sessions Tab */}
        {activeTab === 'sessions' && (
          <div className="feature-card">
            <h2 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <i className="ri-live-line" style={{ color: '#10b981' }}></i>
              Active Sessions
            </h2>
            {sessions.filter(s => s.status === 'active').length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
                {sessions.filter(s => s.status === 'active').map((session) => (
                  <div key={session.id} className="card" style={{ 
                    padding: '2rem', 
                    border: '2px solid #10b981',
                    background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.05))'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <h4 style={{ fontSize: '1.2rem' }}>{session.subject}</h4>
                      <span style={{ 
                        padding: '6px 16px', 
                        background: '#10b981', 
                        color: 'white', 
                        borderRadius: '20px', 
                        fontSize: '0.8rem',
                        fontWeight: '700',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}>
                        <div style={{ width: '6px', height: '6px', background: 'white', borderRadius: '50%', animation: 'pulse 2s infinite' }} />
                        LIVE
                      </span>
                    </div>
                    <div style={{ marginBottom: '1.5rem' }}>
                      <p style={{ fontSize: '1.3rem', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '0.5rem' }}>
                        Session ID: {session.sessionId}
                      </p>
                      <p className="text-muted" style={{ fontSize: '0.9rem' }}>
                        Started: {new Date(session.createdAt).toLocaleTimeString()} • Duration: {session.duration} min
                      </p>
                    </div>
                    <button 
                      className="magnetic-btn btn-ghost"
                      style={{ width: '100%', padding: '12px', borderColor: '#ef4444', color: '#ef4444' }}
                    >
                      <i className="ri-stop-circle-line"></i> End Session
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
                <i className="ri-time-line" style={{ fontSize: '4rem', marginBottom: '1rem', opacity: 0.3 }}></i>
                <p style={{ fontSize: '1.1rem' }}>No active sessions at the moment</p>
                <button 
                  className="magnetic-btn btn-primary"
                  style={{ marginTop: '1rem' }}
                >
                  Create New Session
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default EnhancedFacultyDashboard