import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import RegisterStudent from './pages/RegisterStudent.jsx'
import Profile from './pages/Profile.jsx'
import logic from './logic'
import React from 'react'
import RegisterTeacher from './pages/RegisterTeacher.jsx'

function App() {
  const navigate = useNavigate()

  const handleStudentRegistered = () => navigate('/login')
  const handleTeacherRegistered = () => navigate('/')

  const handleUserLoggedIn = () => navigate('/')

  const handleRegisterClick = () => navigate('/register')

  const handleLoginClick = () => navigate('/login')

  const handleLogoutClick = () => {
    logic.logoutUser()
    navigate('/login')
  }

  const handleHomeClick = () => navigate('/')

  const handleProfileClick = (targetUserId) => navigate(`/profile/${targetUserId}`)
  const handleUserProfileClick = (userId) => navigate(`/profile/${userId}`)
  // Este método debería llamarse solo desde un lugar controlado
  const handleNewTeacherClick = () => navigate('/registerTeacher')

  return (
    <Routes>
      <Route
        path='/'
        element={logic.isUserLoggedIn() ? (
          <Home
            onUserLoggedOut={handleLogoutClick}
            onHomeClick={handleHomeClick}
            onProfileClick={handleProfileClick}
            onUserProfileClick={handleUserProfileClick}
            onNewTeacherClick={handleNewTeacherClick}
          />
        ) : (
          <Navigate to='/login' />
        )}
      />
      <Route
        path='/login'
        element={logic.isUserLoggedIn() ? (
          <Navigate to='/' />
        ) : (
          <Login
            onUserLoggedIn={handleUserLoggedIn}
            onRegisterClick={handleRegisterClick}
          />
        )}
      />
      <Route
        path='/register'
        element={logic.isUserLoggedIn() ? (
          <Navigate to='/' />
        ) : (
          <RegisterStudent
            onStudentRegistered={handleStudentRegistered}
            onLoginClick={handleLoginClick}
            onHomeClick={handleHomeClick}
          />
        )}
      />
      <Route
        path='/profile/:targetUserId'
        element={logic.isUserLoggedIn() ? (
          <Profile onUserLoggedOut={handleLogoutClick} onHomeClick={handleHomeClick} onProfileClick={handleProfileClick} onNewTeacherClick={handleNewTeacherClick} />
        ) : (
          <Navigate to='/login' />
        )}
      />
      <Route
        path='/registerTeacher'
        element={logic.isUserLoggedIn() ? (
          <RegisterTeacher
            onTeacherRegistered={handleTeacherRegistered}
            onLoginClick={handleLoginClick}
          />
        ) : (
          <Navigate to='/login' />
        )}
      />
    </Routes>
  )
}

export default App


