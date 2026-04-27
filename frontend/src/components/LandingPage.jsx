import { Link } from 'react-router-dom'
import { useEffect } from 'react'

function LandingPage() {
  useEffect(() => {
    // Scroll reveal animation
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          entry.target.classList.add('active')
        }
      })
    }, { threshold: 0.1 })

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))

    // Navbar scroll effect
    const handleScroll = () => {
      const nav = document.querySelector('nav')
      if(window.scrollY > 50) nav?.classList.add('scrolled')
      else nav?.classList.remove('scrolled')
    }
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div>
      {/* Background */}
      <div className="ambient-light">
        <div className="light-orb orb-1"></div>
        <div className="light-orb orb-2"></div>
      </div>
      <div className="grid-bg"></div>

      {/* Nav */}
      <nav>
        <div className="logo">
          <i className="ri-flashlight-fill"></i> SCAA
        </div>
        <div style={{display:'flex', alignItems:'center', gap: '2rem'}}>
          <div className="desktop-links" style={{display:'flex'}}>
            <a href="#features" className="nav-link" data-hover-type="text">Features</a>
            <a href="#workflow" className="nav-link" data-hover-type="text">How it Works</a>
          </div>
          <Link to="/login" className="magnetic-btn btn-primary" data-hover-type="button" style={{padding: '10px 24px', fontSize: '0.9rem'}}>
            Launch App
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <header className="hero">
        <div className="hero-badge">🎓 Smart Campus Attendance</div>
        <h1>The Intelligent<br/><span className="gradient-accent">Campus Ecosystem</span></h1>
        <p>A unified, paperless infrastructure for attendance, activities, and academic engagement. Built for high-performance institutions.</p>
        
        <div className="btn-group">
          <Link to="/login" className="magnetic-btn btn-primary" data-hover-type="button">
            Get Started <i className="ri-arrow-right-line"></i>
          </Link>
          <a href="#features" className="magnetic-btn btn-ghost" data-hover-type="button">
            System Tour
          </a>
        </div>
      </header>

      {/* Stats */}
      <div className="stats-strip reveal">
        <div className="stat-item">
          <h3>0.1s</h3>
          <p>Data Latency</p>
        </div>
        <div className="stat-item">
          <h3>100%</h3>
          <p>Paperless</p>
        </div>
        <div className="stat-item">
          <h3>RBAC</h3>
          <p>Secure Access</p>
        </div>
        <div className="stat-item">
          <h3>24/7</h3>
          <p>Availability</p>
        </div>
      </div>

      {/* Core Features */}
      <section id="features">
        <span className="section-subtitle">Core Architecture</span>
        <h2 className="section-title">Engineered for <span className="gradient-text">Speed</span>.</h2>
        
        <div className="grid-3">
          <div className="feature-card reveal" data-hover-type="card">
            <div className="feature-icon"><i className="ri-shield-keyhole-line"></i></div>
            <h3>Unified Identity</h3>
            <p>Role-Based Access Control (RBAC) creates distinct, secure environments for Students and Faculty within a single cohesive database structure.</p>
          </div>
          <div className="feature-card reveal" data-hover-type="card">
            <div className="feature-icon"><i className="ri-fingerprint-line"></i></div>
            <h3>Digital Attendance</h3>
            <p>Replace manual logs with one-tap digital marking. Algorithms calculate percentages instantly and flag shortages automatically.</p>
          </div>
          <div className="feature-card reveal" data-hover-type="card">
            <div className="feature-icon"><i className="ri-radar-fill"></i></div>
            <h3>Activity Hub</h3>
            <p>A real-time event wall. Students can browse, register, and track participation in campus events without physical notices.</p>
          </div>
        </div>
      </section>

      {/* Marquee Break */}
      <div className="marquee-container">
        <div className="marquee-content">
          Efficiency &nbsp; • &nbsp; Transparency &nbsp; • &nbsp; Automation &nbsp; • &nbsp; Security &nbsp; • &nbsp; Analytics &nbsp; • &nbsp; 
          Efficiency &nbsp; • &nbsp; Transparency &nbsp; • &nbsp; Automation &nbsp; • &nbsp; Security &nbsp; • &nbsp; Analytics &nbsp; • &nbsp;
        </div>
      </div>

      {/* Workflow */}
      <section id="workflow">
        <span className="section-subtitle">Workflow</span>
        <h2 className="section-title">How it <span className="gradient-text">Works</span>.</h2>
        <div style={{height: '40px'}}></div>

        {/* Step 1: Admin Create */}
        <div className="workflow-step reveal">
          <div className="step-content">
            <div className="step-number">01</div>
            <h3>Faculty Initiation</h3>
            <p style={{color:'var(--text-muted)', fontSize: '1.1rem', marginTop: '1rem'}}>Faculty logs into the secure portal to create an activity or open an attendance session. The system generates a unique session ID automatically.</p>
          </div>
          <div className="step-visual" data-hover-type="card">
            <div className="glow-effect"></div>
            <div className="ui-mockup">
              <div className="ui-header">
                <div className="ui-dot red"></div><div className="ui-dot yellow"></div><div className="ui-dot green"></div>
              </div>
              <div className="ui-body">
                <div className="mock-row short" style={{background: 'rgba(255,255,255,0.2)'}}></div>
                <div className="mock-row"></div>
                <div className="mock-row"></div>
                <div style={{flex:1}}></div>
                <div className="mock-btn" style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.8rem', fontWeight: '600'}}>Create Event</div>
              </div>
            </div>
          </div>
        </div>

        {/* Step 2: Student View */}
        <div className="workflow-step reveal">
          <div className="step-content">
            <div className="step-number">02</div>
            <h3>Student Interaction</h3>
            <p style={{color:'var(--text-muted)', fontSize: '1.1rem', marginTop: '1rem'}}>Students access their dashboard to view live stats. They can register for events instantly or check their attendance percentage in real-time.</p>
          </div>
          <div className="step-visual" data-hover-type="card">
            <div className="glow-effect" style={{background: 'var(--accent)'}}></div>
            <div className="ui-mockup" style={{borderColor: 'rgba(168, 85, 247, 0.3)'}}>
              <div className="ui-header">
                <div className="ui-dot red"></div><div className="ui-dot yellow"></div><div className="ui-dot green"></div>
              </div>
              <div className="ui-body">
                <div style={{display:'flex', justifyContent: 'space-between'}}>
                  <div className="mock-row short" style={{width: '40%'}}></div>
                  <div className="mock-row short" style={{width: '20%', background: 'var(--accent)'}}></div>
                </div>
                <div className="mock-stat">
                  <div className="mock-box" style={{display: 'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                    <div style={{width: '20px', height: '20px', border: '2px solid var(--accent)', borderRadius: '50%'}}></div>
                  </div>
                  <div className="mock-box"></div>
                </div>
                <div className="mock-row" style={{marginTop: '10px'}}></div>
                <div className="mock-row"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section style={{textAlign: 'center', padding: '100px 10%'}}>
        <h2 style={{fontSize: '3rem', marginBottom: '1.5rem'}}>Ready to upgrade your campus?</h2>
        <p style={{color:'var(--text-muted)', marginBottom: '3rem'}}>Join the digital revolution. Zero paper. Zero hassle.</p>
        <Link to="/login" className="magnetic-btn btn-primary" data-hover-type="button" style={{transform: 'scale(1.2)'}}>
          Launch Portal Now
        </Link>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-grid">
          <div className="footer-brand">
            <h2>SCAA.</h2>
            <p style={{color:'var(--text-muted)', maxWidth: '300px'}}>The Smart Curriculum Activity & Attendance App. Defining the future of educational management systems.</p>
          </div>
          <div className="footer-links">
            <h4>Platform</h4>
            <ul>
              <li><Link to="/faculty">Faculty Portal</Link></li>
              <li><Link to="/student">Student Portal</Link></li>
              <li><a href="#">Admin Console</a></li>
            </ul>
          </div>
          <div className="footer-links">
            <h4>Legal</h4>
            <ul>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Use</a></li>
              <li><a href="#">Security</a></li>
            </ul>
          </div>
        </div>
        <div className="copy">
          © 2025 SCAA Project. Built for Excellence.
        </div>
      </footer>
    </div>
  )
}

export default LandingPage