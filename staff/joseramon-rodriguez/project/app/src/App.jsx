import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import logic from './logic'


function App() {
  const navigate = useNavigate()

  const handleUserRegistered = () => navigate('/login')

  const handleUserLoggedIn = () => navigate('/')

  const handleRegisterClick = () => navigate('register')

  const handleLoginClick = () => navigate('/login')

  const handleLogoutClick = () => navigate('/login')
  return <div className=' bg-gray-200 w-screen h-screen p-3'>
    <Routes>
      <Route path='/login' element={logic.isUserLoggedIn() ? <Navigate to='/' /> :
        <Login
          onUserLoggedIn={handleUserLoggedIn}
          onRegisterClick={handleRegisterClick} />}
      />

      <Route path='/register' element={logic.isUserLoggedIn() ? <Navigate to='/' /> :
        <Register
          onUserRegistered={handleUserRegistered}
          onLoginClick={handleLoginClick} />}
      />

      <Route path='/*' element={logic.isUserLoggedIn() ?
        <Home onLogoutClick={handleLogoutClick} /> :
        <Navigate to={'/login'} />}
      />
    </Routes>
  </div>

}

export default App
