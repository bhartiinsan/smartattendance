import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AttendanceTrendChart, SubjectPerformanceChart, AttendanceDistributionChart, WeeklyPatternChart } from './Charts/SimpleCharts'
import { mockStudentData } from '../data/mockData'

function EnhancedStudentDashboard() {
  const [user, setUser] = useState(mockStudentData.user)
  const [analytics, setAnalytics] = useState(mockStudentData.analytics)
  const [courses, setCourses] = useState(mockStudentData.courses)
  const [notifications, setNotifications] = useState(mockStudentData.notifications)
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
            <i className="ri-graduation-cap-line"></i> SCAA Student
          </div>
          <div style={{ 
            padding: '8px 16px', 
            background: 'linear-gradient(135deg, var(--primary), var(--accent))', 
            borderRadius: '20px',
            fontSize: '0.9rem',
            fontWeight: '600'
          }}>
{user?.course} • Sem {user?.semester}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>{user?.name}</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{user?.rollNumber}</div>
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
            { key: 'analytics', label: 'Analytics', icon: 'ri-bar-chart-line' },
            { key: 'subjects', label: 'Subjects', icon: 'ri-book-line' },
            { key: 'notifications', label: 'Alerts', icon: 'ri-notification-line' }
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
          <>
            {/* Stats Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
              <div className="feature-card" style={{ 
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.05))',
                border: '1px solid rgba(16, 185, 129, 0.2)',
                textAlign: 'center',
                padding: '2rem'
              }}>
                <div style={{ fontSize: '3.5rem', fontWeight: '800', color: '#10b981', marginBottom: '0.5rem' }}>
                  {analytics?.overallPercentage}%
                </div>
                <h3 style={{ marginBottom: '0.5rem' }}>Overall Attendance</h3>
                <p className="text-muted">{analytics?.presentClasses} / {analytics?.totalClasses} classes</p>
                <div style={{ 
                  marginTop: '1rem',
                  padding: '6px 12px',
                  background: analytics?.overallPercentage >= 75 ? '#10b981' : '#ef4444',
                  color: 'white',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  display: 'inline-block'
                }}>
                  {analytics?.overallPercentage >= 85 ? 'Excellent' : analytics?.overallPercentage >= 75 ? 'Good' : 'Poor'}
                </div>
              </div>

              <div className="feature-card" style={{ textAlign: 'center', padding: '2rem' }}>
                <div style={{ fontSize: '3.5rem', fontWeight: '800', color: 'var(--primary)', marginBottom: '0.5rem' }}>
                  {courses.length}
                </div>
                <h3 style={{ marginBottom: '0.5rem' }}>Active Subjects</h3>
                <p className="text-muted">Current semester courses</p>
              </div>

              <div className="feature-card" style={{ textAlign: 'center', padding: '2rem' }}>
                <div style={{ fontSize: '3.5rem', fontWeight: '800', color: 'var(--accent)', marginBottom: '0.5rem' }}>
                  {Object.values(analytics?.subjectWise || {}).filter(s => s.percentage < 75).length}
                </div>
                <h3 style={{ marginBottom: '0.5rem' }}>Need Attention</h3>
                <p className="text-muted">Subjects below 75%</p>
              </div>

              <div className="feature-card" style={{ textAlign: 'center', padding: '2rem' }}>
                <div style={{ fontSize: '3.5rem', fontWeight: '800', color: '#f59e0b', marginBottom: '0.5rem' }}>
                  {notifications.filter(n => !n.readStatus).length}
                </div>
                <h3 style={{ marginBottom: '0.5rem' }}>Pending Alerts</h3>
                <p className="text-muted">Unread notifications</p>
              </div>
            </div>

            {/* Subject Performance Grid */}
            <div className="feature-card" style={{ marginBottom: '2rem' }}>
              <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <i className="ri-book-open-line" style={{ color: 'var(--primary)' }}></i>
                Subject Performance
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
                {Object.entries(analytics?.subjectWise || {}).map(([subject, data]) => (
                  <div key={subject} className="card" style={{ 
                    padding: '1.5rem',
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
                    border: `1px solid ${data.percentage >= 75 ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ marginBottom: '0.5rem', fontSize: '1.1rem' }}>{subject}</h4>
                        <p className="text-muted" style={{ fontSize: '0.85rem' }}>
                          {courses.find(c => c.name === subject)?.code} • {courses.find(c => c.name === subject)?.credits} Credits
                        </p>
                      </div>
                      <div style={{ 
                        fontSize: '1.8rem', 
                        fontWeight: 'bold', 
                        color: data.percentage >= 75 ? '#10b981' : '#ef4444',
                        textAlign: 'right'
                      }}>
                        {data.percentage}%
                      </div>
                    </div>
                    
                    <div style={{ 
                      width: '100%', 
                      height: '8px', 
                      background: 'rgba(255,255,255,0.1)', 
                      borderRadius: '4px', 
                      overflow: 'hidden',
                      marginBottom: '1rem'
                    }}>
                      <div style={{ 
                        width: `${data.percentage}%`, 
                        height: '100%', 
                        background: data.percentage >= 75 ? '#10b981' : '#ef4444',
                        transition: 'width 0.8s ease'
                      }}></div>
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>
                        Present: {data.present} / {data.total}
                      </span>
                      <span style={{ 
                        padding: '4px 8px',
                        background: data.percentage >= 75 ? '#10b981' : '#ef4444',
                        color: 'white',
                        borderRadius: '12px',
                        fontSize: '0.75rem',
                        fontWeight: '600'
                      }}>
                        {data.percentage >= 85 ? 'Excellent' : data.percentage >= 75 ? 'Good' : 'Poor'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Subjects Tab */}
        {activeTab === 'subjects' && (
          <div className="feature-card">
            <h2 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <i className="ri-book-line" style={{ color: 'var(--primary)' }}></i>
              Enrolled Subjects - Semester {user?.semester}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem' }}>
              {courses.map((course) => (
                <div key={course._id} className="card" style={{ 
                  padding: '2rem',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))',
                  border: '1px solid var(--border-color)',
                  borderRadius: '16px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <div>
                      <h4 style={{ marginBottom: '0.5rem', fontSize: '1.2rem' }}>{course.name}</h4>
                      <p style={{ color: 'var(--primary)', fontSize: '0.9rem', fontWeight: '600' }}>{course.code}</p>
                    </div>
                    <div style={{ 
                      padding: '6px 12px',
                      background: 'var(--accent)',
                      color: 'white',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontWeight: '600'
                    }}>
                      {course.credits} Credits
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                      Department: {course.department}
                    </span>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                      Semester: {course.semester}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div className="feature-card">
            <h2 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <i className="ri-notification-line" style={{ color: 'var(--accent)' }}></i>
              Notifications & Alerts
            </h2>
            <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
              {notifications.map((notification) => (
                <div key={notification._id} style={{ 
                  padding: '1.5rem', 
                  marginBottom: '1rem', 
                  background: notification.readStatus ? 'rgba(255,255,255,0.02)' : 'rgba(99, 102, 241, 0.1)',
                  borderRadius: '12px',
                  border: `1px solid ${notification.readStatus ? 'var(--border-color)' : 'var(--primary)'}`,
                  position: 'relative'
                }}>
                  {!notification.readStatus && (
                    <div style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem',
                      width: '8px',
                      height: '8px',
                      background: '#ef4444',
                      borderRadius: '50%'
                    }} />
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ 
                      padding: '4px 12px', 
                      background: notification.type === 'warning' ? '#ef4444' : 'var(--primary)', 
                      color: 'white', 
                      borderRadius: '16px', 
                      fontSize: '0.8rem',
                      fontWeight: '600',
                      textTransform: 'uppercase'
                    }}>
                      {notification.type}
                    </span>
                    <span className="text-muted" style={{ fontSize: '0.85rem' }}>
                      {new Date(notification.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p style={{ fontSize: '1rem', lineHeight: 1.5 }}>{notification.message}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <>
            {/* Analytics Header */}
            <div className="feature-card" style={{ marginBottom: '2rem', textAlign: 'center', padding: '2rem' }}>
              <h2 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <i className="ri-bar-chart-line" style={{ color: 'var(--primary)' }}></i>
                Analytics Dashboard
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                Comprehensive insights into your academic performance and attendance patterns
              </p>
            </div>

            {/* Charts Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
              {/* Attendance Trends */}
              <div className="feature-card">
                <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <i className="ri-line-chart-line" style={{ color: 'var(--primary)' }}></i>
                  Monthly Attendance Trends
                </h3>
                <AttendanceTrendChart data={analytics?.monthlyTrends || []} />
                <div style={{ padding: '0 1rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Track your attendance consistency over the past months
                </div>
              </div>

              {/* Subject Performance */}
              <div className="feature-card">
                <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <i className="ri-bar-chart-line" style={{ color: 'var(--accent)' }}></i>
                  Subject-wise Performance
                </h3>
                <SubjectPerformanceChart data={Object.entries(analytics?.subjectWise || {}).map(([subject, data]) => ({
                  subject: subject.length > 15 ? subject.substring(0, 15) + '...' : subject,
                  percentage: data.percentage
                }))} />
                <div style={{ padding: '0 1rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Compare attendance across all enrolled subjects
                </div>
              </div>

              {/* Attendance Distribution */}
              <div className="feature-card">
                <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <i className="ri-pie-chart-line" style={{ color: '#f59e0b' }}></i>
                  Overall Distribution
                </h3>
                <AttendanceDistributionChart data={[
                  { name: 'Present', value: analytics?.presentClasses || 0 },
                  { name: 'Absent', value: (analytics?.totalClasses || 0) - (analytics?.presentClasses || 0) }
                ]} />
                <div style={{ padding: '0 1rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Visual breakdown of your total attendance record
                </div>
              </div>

              {/* Weekly Pattern */}
              <div className="feature-card">
                <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <i className="ri-calendar-line" style={{ color: '#10b981' }}></i>
                  Weekly Attendance Pattern
                </h3>
                <WeeklyPatternChart data={analytics?.weeklyPatterns || {}} />
                <div style={{ padding: '0 1rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Identify your attendance patterns by day of the week
                </div>
              </div>
            </div>

            {/* Insights Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {/* Performance Insights */}
              <div className="feature-card" style={{ 
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.05))',
                border: '1px solid rgba(16, 185, 129, 0.2)'
              }}>
                <h4 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <i className="ri-lightbulb-line" style={{ color: '#10b981' }}></i>
                  Performance Insights
                </h4>
                <div style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>
                  <p style={{ marginBottom: '0.5rem' }}>
                    • Your overall attendance is <strong>{analytics?.overallPercentage}%</strong>
                  </p>
                  <p style={{ marginBottom: '0.5rem' }}>
                    • Best performing subject: <strong>{Object.entries(analytics?.subjectWise || {}).sort((a, b) => b[1].percentage - a[1].percentage)[0]?.[0]}</strong>
                  </p>
                  <p style={{ marginBottom: '0.5rem' }}>
                    • Most consistent day: <strong>{Object.entries(analytics?.weeklyPatterns || {}).sort((a, b) => b[1] - a[1])[0]?.[0]}</strong>
                  </p>
                  <p>
                    • Classes to improve: <strong>{Object.values(analytics?.subjectWise || {}).filter(s => s.percentage < 75).length}</strong> subjects
                  </p>
                </div>
              </div>

              {/* Recommendations */}
              <div className="feature-card" style={{ 
                background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(168, 85, 247, 0.05))',
                border: '1px solid rgba(168, 85, 247, 0.2)'
              }}>
                <h4 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <i className="ri-star-line" style={{ color: 'var(--accent)' }}></i>
                  Recommendations
                </h4>
                <div style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>
                  {analytics?.overallPercentage >= 85 ? (
                    <p>• Excellent attendance! Keep up the great work.</p>
                  ) : analytics?.overallPercentage >= 75 ? (
                    <p>• Good attendance. Focus on consistency to reach 85%+.</p>
                  ) : (
                    <p>• Attendance needs improvement. Aim for 75%+ to avoid shortage.</p>
                  )}
                  <p style={{ marginTop: '0.5rem' }}>
                    • Focus on {Object.entries(analytics?.weeklyPatterns || {}).sort((a, b) => a[1] - b[1])[0]?.[0]} classes
                  </p>
                  <p style={{ marginTop: '0.5rem' }}>
                    • Prioritize {Object.entries(analytics?.subjectWise || {}).filter(([_, data]) => data.percentage < 75).slice(0, 2).map(([subject]) => subject).join(' & ')}
                  </p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="feature-card">
                <h4 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <i className="ri-dashboard-line" style={{ color: 'var(--primary)' }}></i>
                  Quick Statistics
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                      {Math.round(analytics?.presentClasses / analytics?.totalClasses * 100) || 0}%
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Attendance Rate</div>
                  </div>
                  <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent)' }}>
                      {analytics?.totalClasses - analytics?.presentClasses || 0}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Classes Missed</div>
                  </div>
                  <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10b981' }}>
                      {Object.values(analytics?.subjectWise || {}).filter(s => s.percentage >= 85).length}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Excellent Subjects</div>
                  </div>
                  <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#f59e0b' }}>
                      {Math.round(Object.values(analytics?.weeklyPatterns || {}).reduce((a, b) => a + b, 0) / Object.keys(analytics?.weeklyPatterns || {}).length) || 0}%
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Weekly Average</div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default EnhancedStudentDashboard