// Simple chart components without external dependencies
export function AttendanceTrendChart({ data }) {
  if (!data || data.length === 0) return <div>No data available</div>

  const maxValue = Math.max(...data.map(d => d.percentage))
  
  return (
    <div style={{ width: '100%', height: '300px', padding: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'end', height: '250px', gap: '10px' }}>
        {data.map((item, index) => (
          <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div
              style={{
                width: '100%',
                height: `${(item.percentage / maxValue) * 200}px`,
                background: 'linear-gradient(to top, var(--primary), var(--accent))',
                borderRadius: '4px 4px 0 0',
                marginBottom: '10px',
                transition: 'height 0.3s ease'
              }}
            />
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {item.month}
            </span>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 'bold' }}>
              {item.percentage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function SubjectPerformanceChart({ data }) {
  if (!data || data.length === 0) return <div>No data available</div>

  return (
    <div style={{ width: '100%', height: '300px', padding: '20px' }}>
      {data.map((item, index) => (
        <div key={index} style={{ marginBottom: '15px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>{item.subject}</span>
            <span style={{ fontSize: '0.9rem', color: 'var(--primary)', fontWeight: 'bold' }}>{item.percentage}%</span>
          </div>
          <div style={{ 
            width: '100%', 
            height: '20px', 
            background: 'rgba(255,255,255,0.1)', 
            borderRadius: '10px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${item.percentage}%`,
              height: '100%',
              background: item.percentage >= 75 ? '#10b981' : item.percentage >= 50 ? '#f59e0b' : '#ef4444',
              borderRadius: '10px',
              transition: 'width 0.3s ease'
            }} />
          </div>
        </div>
      ))}
    </div>
  )
}

export function AttendanceDistributionChart({ data }) {
  if (!data || data.length === 0) return <div>No data available</div>

  const total = data.reduce((sum, item) => sum + item.value, 0)
  const colors = ['#10b981', '#ef4444']
  
  return (
    <div style={{ width: '100%', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ position: 'relative', width: '200px', height: '200px' }}>
        <svg width="200" height="200" viewBox="0 0 200 200">
          {data.map((item, index) => {
            const percentage = (item.value / total) * 100
            const angle = (percentage / 100) * 360
            const startAngle = index === 0 ? 0 : (data[0].value / total) * 360
            
            return (
              <g key={index}>
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke={colors[index]}
                  strokeWidth="20"
                  strokeDasharray={`${(angle / 360) * 502.65} 502.65`}
                  strokeDashoffset={index === 0 ? 0 : -((startAngle / 360) * 502.65)}
                  transform="rotate(-90 100 100)"
                />
              </g>
            )
          })}
        </svg>
        <div style={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-main)' }}>
            {Math.round((data[0]?.value / total) * 100)}%
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Present</div>
        </div>
      </div>
      <div style={{ marginLeft: '20px' }}>
        {data.map((item, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{ 
              width: '12px', 
              height: '12px', 
              background: colors[index], 
              borderRadius: '50%', 
              marginRight: '8px' 
            }} />
            <span style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>
              {item.name}: {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function WeeklyPatternChart({ data }) {
  if (!data || Object.keys(data).length === 0) return <div>No data available</div>

  const maxValue = Math.max(...Object.values(data))
  
  return (
    <div style={{ width: '100%', height: '300px', padding: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'end', height: '250px', gap: '8px' }}>
        {Object.entries(data).map(([day, percentage], index) => (
          <div key={day} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div
              style={{
                width: '100%',
                height: `${(percentage / maxValue) * 200}px`,
                background: `linear-gradient(to top, ${percentage >= 80 ? '#10b981' : percentage >= 60 ? '#f59e0b' : '#ef4444'}, ${percentage >= 80 ? '#34d399' : percentage >= 60 ? '#fbbf24' : '#f87171'})`,
                borderRadius: '4px 4px 0 0',
                marginBottom: '10px',
                transition: 'height 0.3s ease'
              }}
            />
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', transform: 'rotate(-45deg)', transformOrigin: 'center' }}>
              {day.substring(0, 3)}
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-main)', fontWeight: 'bold', marginTop: '5px' }}>
              {percentage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}