import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import LoginPage from './components/LoginPage'
import EnhancedStudentDashboard from './components/EnhancedStudentDashboard'
import EnhancedFacultyDashboard from './components/EnhancedFacultyDashboard'
import ImprovedCursor from './components/ImprovedCursor'

function App() {
  return (
    <Router>
      <ImprovedCursor />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/student" element={<EnhancedStudentDashboard />} />
        <Route path="/faculty" element={<EnhancedFacultyDashboard />} />
      </Routes>
    </Router>
  )
}

export default App