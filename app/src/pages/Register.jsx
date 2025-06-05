import logic from '../logic/index.js'
import RegisterStudentForm from '../components/RegisterStudentForm.jsx'
import RegisterTeacherForm from '../components/RegisterTeacherForm.jsx'
import CreateWork from '../components/CreateWork'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import { errors } from 'com'
import { useState } from 'react'

const { ContentError, DuplicityError } = errors

function Register({ user, onTeacherRegistered, onStudentRegistered, onUserLoggedOut, onHomeClick, onProfileClick, onNewUserClick, onDashboardClick }) {
  const [view, setView] = useState(null)
  const [refreshStamp, setRefreshStamp] = useState(null)
  
  const handleHomeClick = (event) => {
    event.preventDefault()
    onHomeClick()
  }
  const handleDashboardClick = (event) => {
    event.preventDefault()
    onDashboardClick()
  }

  const handleProfileClick = event => {
    event.preventDefault()
    onProfileClick(user.id)
  }

  const handleNewUser = (event) => {
    event.preventDefault()
    onNewUserClick()
  }
  const handleLogout = () => {
    logic.logoutUser()
    onUserLoggedOut()
  }
  const handleCreateClick = () => setView('createWork')

  const handleCancelClick = () => setView(null)

  const handleCreatedWork = () => {
    setView(null)
    setRefreshStamp(Date.now())
  }


  return (
    <div className='min-h-screen flex flex-col bg-[whitesmoke]'>
      {/* Header */}
      <Header
        isHome={false}
        onHomeClick={handleHomeClick}
        onCreateClick={handleCreateClick}
        onProfileClick={handleProfileClick}
        onNewUserClick={handleNewUser}
        onDashboardClick={handleDashboardClick}
        user={user}
      />

      {/* Main content */}
      <main className='flex flex-col md:flex-row justify-center items-center gap-6 py-14 md:gap-20 p-4 flex-grow overflow-y-auto'>

        <RegisterTeacherForm
          onTeacherRegistered={onTeacherRegistered}
        />

        <RegisterStudentForm
          onStudentRegistered={onStudentRegistered}
        />
        {view === 'createWork' && (
          <CreateWork onWorkCreated={handleCreatedWork} onCancelClick={handleCancelClick} />
        )}
      </main>

      {/* Footer */}
      <Footer
        isHome={false}
        onLogout={handleLogout}
      />
    </div>
  )
}

export default Register

