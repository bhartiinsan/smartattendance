// Mock data for Indian engineering courses
export const indianCourses = {
  btech: [
    { code: 'CS101', name: 'Programming Fundamentals', credits: 4, semester: 1 },
    { code: 'CS102', name: 'Data Structures & Algorithms', credits: 4, semester: 2 },
    { code: 'CS201', name: 'Database Management Systems', credits: 3, semester: 3 },
    { code: 'CS202', name: 'Computer Networks', credits: 3, semester: 4 },
    { code: 'CS301', name: 'Software Engineering', credits: 4, semester: 5 },
    { code: 'CS302', name: 'Operating Systems', credits: 3, semester: 6 },
    { code: 'CS401', name: 'Machine Learning', credits: 4, semester: 7 },
    { code: 'CS402', name: 'Web Development', credits: 3, semester: 8 },
    { code: 'EC101', name: 'Digital Electronics', credits: 3, semester: 2 },
    { code: 'ME101', name: 'Engineering Mechanics', credits: 3, semester: 1 },
    { code: 'EE101', name: 'Electrical Circuits', credits: 4, semester: 2 },
    { code: 'MA101', name: 'Engineering Mathematics-I', credits: 4, semester: 1 },
    { code: 'MA102', name: 'Engineering Mathematics-II', credits: 4, semester: 2 },
    { code: 'PH101', name: 'Engineering Physics', credits: 3, semester: 1 },
    { code: 'CH101', name: 'Engineering Chemistry', credits: 3, semester: 1 }
  ],
  bca: [
    { code: 'BCA101', name: 'Computer Fundamentals', credits: 3, semester: 1 },
    { code: 'BCA102', name: 'Programming in C', credits: 4, semester: 1 },
    { code: 'BCA201', name: 'Object Oriented Programming', credits: 4, semester: 2 },
    { code: 'BCA202', name: 'Data Structures', credits: 3, semester: 2 },
    { code: 'BCA301', name: 'Database Management', credits: 4, semester: 3 },
    { code: 'BCA302', name: 'Web Technologies', credits: 3, semester: 3 },
    { code: 'BCA401', name: 'Software Engineering', credits: 3, semester: 4 },
    { code: 'BCA402', name: 'Computer Networks', credits: 3, semester: 4 },
    { code: 'BCA501', name: 'Java Programming', credits: 4, semester: 5 },
    { code: 'BCA502', name: 'Mobile Application Development', credits: 3, semester: 5 }
  ],
  mca: [
    { code: 'MCA101', name: 'Advanced Programming', credits: 4, semester: 1 },
    { code: 'MCA102', name: 'System Analysis & Design', credits: 3, semester: 1 },
    { code: 'MCA201', name: 'Advanced Database Systems', credits: 4, semester: 2 },
    { code: 'MCA202', name: 'Computer Graphics', credits: 3, semester: 2 },
    { code: 'MCA301', name: 'Artificial Intelligence', credits: 4, semester: 3 },
    { code: 'MCA302', name: 'Network Security', credits: 3, semester: 3 },
    { code: 'MCA401', name: 'Cloud Computing', credits: 4, semester: 4 },
    { code: 'MCA402', name: 'Big Data Analytics', credits: 3, semester: 4 }
  ]
}

export const mockStudentData = {
  user: {
    id: '1',
    name: 'Nitya Upadhyay',
    email: 'nitya.upadhyay@student.edu',
    course: 'MCA 2nd year',
    semester: 3,
    rollNumber: 'CS2021001',
    department: 'Computer Science & Engineering'
  },
  
  analytics: {
    totalClasses: 120,
    presentClasses: 95,
    overallPercentage: 79,
    subjectWise: {
      'Data Structures & Algorithms': { total: 25, present: 22, percentage: 88 },
      'Database Management Systems': { total: 20, present: 18, percentage: 90 },
      'Computer Networks': { total: 22, present: 16, percentage: 73 },
      'Software Engineering': { total: 18, present: 15, percentage: 83 },
      'Operating Systems': { total: 20, present: 14, percentage: 70 },
      'Engineering Mathematics-II': { total: 15, present: 10, percentage: 67 }
    },
    monthlyTrends: [
      { month: 'Aug', percentage: 85 },
      { month: 'Sep', percentage: 82 },
      { month: 'Oct', percentage: 78 },
      { month: 'Nov', percentage: 79 },
      { month: 'Dec', percentage: 81 }
    ],
    weeklyPatterns: {
      Monday: 85,
      Tuesday: 90,
      Wednesday: 75,
      Thursday: 80,
      Friday: 70,
      Saturday: 60
    }
  },

  courses: [
    { _id: '1', name: 'Data Structures & Algorithms', code: 'CS102', credits: 4, department: 'CSE', semester: 4 },
    { _id: '2', name: 'Database Management Systems', code: 'CS201', credits: 3, department: 'CSE', semester: 4 },
    { _id: '3', name: 'Computer Networks', code: 'CS202', credits: 3, department: 'CSE', semester: 4 },
    { _id: '4', name: 'Software Engineering', code: 'CS301', credits: 4, department: 'CSE', semester: 4 },
    { _id: '5', name: 'Operating Systems', code: 'CS302', credits: 3, department: 'CSE', semester: 4 },
    { _id: '6', name: 'Engineering Mathematics-II', code: 'MA102', credits: 4, department: 'Mathematics', semester: 4 }
  ],

  notifications: [
    { _id: '1', message: 'Low attendance in Computer Networks - 73%', type: 'warning', readStatus: false, createdAt: new Date() },
    { _id: '2', message: 'Assignment due for Software Engineering', type: 'info', readStatus: false, createdAt: new Date() },
    { _id: '3', message: 'Exam scheduled for Database Management', type: 'info', readStatus: true, createdAt: new Date() }
  ],

  activities: [
    { id: '1', title: 'Tech Fest 2024', description: 'Annual technical festival', date: new Date('2024-02-15'), facultyName: 'Dr. Priya Singh' },
    { id: '2', title: 'Coding Competition', description: 'Inter-college programming contest', date: new Date('2024-02-20'), facultyName: 'Prof. Amit Kumar' }
  ]
}

export const mockFacultyData = {
  user: {
    id: '2',
    name: 'Dr. Priya Singh',
    email: 'priya.singh@faculty.edu',
    department: 'Computer Science & Engineering',
    designation: 'Associate Professor'
  },

  students: [
    { id: '1', name: 'Nitya Upadhyay', rollNumber: 'CS2021001', course: 'B.Tech CSE', overallAttendance: 79, status: 'Regular' },
    { id: '2', name: 'Priya Patel', rollNumber: 'CS2021002', course: 'B.Tech CSE', overallAttendance: 92, status: 'Excellent' },
    { id: '3', name: 'Amit Kumar', rollNumber: 'CS2021003', course: 'B.Tech CSE', overallAttendance: 65, status: 'Below Average' },
    { id: '4', name: 'Sneha Gupta', rollNumber: 'CS2021004', course: 'B.Tech CSE', overallAttendance: 88, status: 'Good' },
    { id: '5', name: 'Vikram Singh', rollNumber: 'CS2021005', course: 'B.Tech CSE', overallAttendance: 71, status: 'Average' },
    { id: '6', name: 'Anita Sharma', rollNumber: 'CS2021006', course: 'B.Tech CSE', overallAttendance: 95, status: 'Excellent' },
    { id: '7', name: 'Ravi Verma', rollNumber: 'CS2021007', course: 'B.Tech CSE', overallAttendance: 58, status: 'Poor' },
    { id: '8', name: 'Kavya Reddy', rollNumber: 'CS2021008', course: 'B.Tech CSE', overallAttendance: 84, status: 'Good' },
    { id: '9', name: 'Arjun Mehta', rollNumber: 'CS2021009', course: 'B.Tech CSE', overallAttendance: 77, status: 'Regular' },
    { id: '10', name: 'Pooja Jain', rollNumber: 'CS2021010', course: 'B.Tech CSE', overallAttendance: 91, status: 'Excellent' }
  ],

  analytics: {
    totalSessions: 45,
    activeSessions: 2,
    totalStudents: 120,
    avgAttendance: 78,
    subjectPerformance: {
      'Data Structures & Algorithms': { sessions: 12, avgAttendance: 85, totalRecords: 300, presentRecords: 255 },
      'Database Management Systems': { sessions: 10, avgAttendance: 82, totalRecords: 250, presentRecords: 205 },
      'Software Engineering': { sessions: 8, avgAttendance: 79, totalRecords: 200, presentRecords: 158 }
    },
    monthlyStats: [
      { month: 'Aug', sessions: 10, avgAttendance: 82 },
      { month: 'Sep', sessions: 12, avgAttendance: 79 },
      { month: 'Oct', sessions: 11, avgAttendance: 76 },
      { month: 'Nov', sessions: 12, avgAttendance: 78 }
    ]
  },

  sessions: [
    { id: '1', subject: 'Data Structures & Algorithms', sessionId: 'DS2024A', status: 'active', createdAt: new Date(), duration: 60 },
    { id: '2', subject: 'Database Management Systems', sessionId: 'DB2024B', status: 'active', createdAt: new Date(), duration: 90 }
  ],

  activities: [
    { id: '1', title: 'Tech Fest 2024', description: 'Annual technical festival', date: new Date('2024-02-15') },
    { id: '2', title: 'Workshop on AI/ML', description: 'Hands-on workshop on machine learning', date: new Date('2024-02-25') }
  ]
}