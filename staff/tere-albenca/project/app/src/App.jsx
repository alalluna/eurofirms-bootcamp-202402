import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import RegisterStudent from './pages/RegisterStudent.jsx'
import Profile from './pages/Profile.jsx'
import logic from './logic'
import React from 'react'
import RegisterTeacher from './pages/RegisterTeacher.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Contact from './pages/Contact.jsx'
import Shop from './pages/Shop.jsx'
import Courses from './pages/Courses.jsx'
import Privacy from './pages/Privacy.jsx'

function App() {
  const navigate = useNavigate()

  const handleStudentRegistered = () => navigate('/login')
  const handleTeacherRegistered = () => navigate('/dashboard')
  const handleUserLoggedIn = () => navigate('/dashboard')
  const handleRegisterClick = () => navigate('/register')
  const handleLoginClick = () => navigate('/login')
  const handleContactClick = () => navigate('/contact')
  const handleCoursesClick = () => navigate('/courses')
  const handleShopClick = () => navigate('/shop')
  const handleDashboardClick = () => navigate('/dashboard')
  const handlePrivacyClick = () => navigate('/privacy')
  const handleHomeClick = () => navigate('/')
  const handleProfileClick = (targetUserId) => navigate(`/profile/${targetUserId}`)
  const handleUserProfileClick = (userId) => navigate(`/profile/${userId}`)
  
  const handleLogoutClick = () => {
    logic.logoutUser()
    navigate('/')
  }

  // Este método debería llamarse solo desde un lugar controlado
  const handleNewTeacherClick = () => navigate('/registerTeacher')

  return (
    <Routes>
      {/* Rutas publicas */}
      <Route
        path='/'
        element={
          <Home
            onHomeClick={handleHomeClick}
            onLoginClick={handleLoginClick}
            onContactClick={handleContactClick}
            onCoursesClick={handleCoursesClick}
            onShopClick={handleShopClick}
            onPrivacyClick={handlePrivacyClick}
          />
        }
      />
      <Route
        path='/contact'
        element={
          <Contact
            onHomeClick={handleHomeClick}
            onLoginClick={handleLoginClick}
            onContactClick={handleContactClick}
            onCoursesClick={handleCoursesClick}
            onShopClick={handleShopClick}
            onPrivacyClick={handlePrivacyClick}
          />
        }
      />
      <Route
        path='/courses'
        element={
          <Courses
            onHomeClick={handleHomeClick}
            onLoginClick={handleLoginClick}
            onContactClick={handleContactClick}
            onCoursesClick={handleCoursesClick}
            onShopClick={handleShopClick}
            onPrivacyClick={handlePrivacyClick}
          />
        }
      />
      <Route
        path='/shop'
        element={
          <Shop
            onHomeClick={handleHomeClick}
            onLoginClick={handleLoginClick}
            onContactClick={handleContactClick}
            onCoursesClick={handleCoursesClick}
            onShopClick={handleShopClick}
            onPrivacyClick={handlePrivacyClick}
          />
        }
      />
      <Route
        path='/privacy'
        element={
          <Privacy
            onHomeClick={handleHomeClick}
            onLoginClick={handleLoginClick}
            onContactClick={handleContactClick}
            onCoursesClick={handleCoursesClick}
            onShopClick={handleShopClick}
            onPrivacyClick={handlePrivacyClick}
          />
        }
      />
      {/* Rutas para login y register */}

      <Route
        path='/login'
        element={logic.isUserLoggedIn() ? (
          <Navigate to='/dashboard' />
        ) : (
          <Login
            onUserLoggedIn={handleUserLoggedIn}
            onRegisterClick={handleRegisterClick}
            onHomeClick={handleHomeClick}
            onLoginClick={handleLoginClick}
            onContactClick={handleContactClick}
            onCoursesClick={handleCoursesClick}
            onShopClick={handleShopClick}
            onPrivacyClick={handlePrivacyClick}
          />
        )}
      />
      <Route
        path='/register'
        element={logic.isUserLoggedIn() ? (
          <Navigate to='/login' />
        ) : (
          <RegisterStudent
            onStudentRegistered={handleStudentRegistered}
            onHomeClick={handleHomeClick}
            onLoginClick={handleLoginClick}
            onContactClick={handleContactClick}
            onCoursesClick={handleCoursesClick}
            onShopClick={handleShopClick}
            onPrivacyClick={handlePrivacyClick}
          />
        )}
      />
      {/* Rutas protegidas */}
      <Route
        path="/dashboard"
        element={logic.isUserLoggedIn() ? (
          <Dashboard
            onUserLoggedOut={handleLogoutClick}
            onHomeClick={handleHomeClick}
            onProfileClick={handleProfileClick}
            onUserProfileClick={handleUserProfileClick}
            onNewTeacherClick={handleNewTeacherClick}
            onDashboardClick={handleDashboardClick}

          />
        ) : (
          <Navigate to="/login" />
        )}
      />
      <Route
        path='/profile/:targetUserId'
        element={logic.isUserLoggedIn() ? (
          <Profile
            onUserLoggedOut={handleLogoutClick}
            onHomeClick={handleHomeClick}
            onProfileClick={handleProfileClick}
            onNewTeacherClick={handleNewTeacherClick}
            onDashboardClick={handleDashboardClick} />
        ) : (
          <Navigate to='/login' />
        )}
      />
      <Route
        path='/registerTeacher'
        element={logic.isUserLoggedIn() ? (
          <RegisterTeacher
            onTeacherRegistered={handleTeacherRegistered}
            onHomeClick={handleHomeClick}
            onLoginClick={handleLoginClick}
            onContactClick={handleContactClick}
            onCoursesClick={handleCoursesClick}
            onShopClick={handleShopClick}
            onPrivacyClick={handlePrivacyClick}
          />
        ) : (
          <Navigate to='/login' />
        )}
      />
    </Routes>
  )
}

export default App

// Integración en App.js

// Asegúrate de tener CalendarComponent importado y configurado en tus rutas en App.js:

// // src/App.js
// import React from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import CalendarComponent from './components/Calendar';

// const App = () => {
//     return (
//         <Router>
//             <Switch>
//                 <Route path="/calendar" component={CalendarComponent} />
//                 {/* otras rutas */}
//             </Switch>
//         </Router>
//     );
// };

// export default App;
