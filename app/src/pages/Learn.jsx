import logic from '../logic'
import React, { useState, useEffect } from 'react'
import { errors } from 'com'
import CreateLesson from '../components/CreateLesson'
import Lessons from '../components/Lessons'
import Header from '../components/Header'
import Footer from '../components/Footer'

const { ContentError, TypeError, RangeError, MatchError } = errors

function Learn({ onUserLoggedOut, onHomeClick, onLessonsClick, onProfileClick, onUserProfileClick, onNewTeacherClick }) {
  const [view, setView] = useState(null)
  const [refreshStamp, setRefreshStamp] = useState(null)
  const [user, setUser] = useState(null)
  const [lessons, setLessons] = useState([])

  useEffect(() => {
    const fetchUserAndWorks = async () => {
      try {
        const user = await logic.retrieveUser()
        setUser(user)

        const lessons = await logic.retrieveLessons()
        setLessons(lessons)
      } catch (error) {
        console.error(error)
        let feedback = error.message
        if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError) {
          feedback = `${feedback}, please correct it`
        } else if (error instanceof MatchError) {
          feedback = `${feedback}, please verify credentials`
        } else {
          feedback = 'Sorry, there was an error, please try again later'
        }
        alert(feedback)
      }
    }

    fetchUserAndWorks()
  }, [])

  const handleLogout = () => {
    logic.logoutUser()
    onUserLoggedOut()
  }

  const handleCreateClick = () => setView('createLesson')

  const handleCancelClick = () => setView(null)

  const handleCreatedLesson = () => {
    setView(null)
    setRefreshStamp(Date.now())
  }

  const handleHomeClick = (event) => {
    event.preventDefault()
    onHomeClick()
  }

  const handleLessonsClick = (event) => {
    event.preventDefault()
    onLessonsClick(user.id)
  }

  const handleLessonsUserClick = (userId) => {
    onUserProfileClick(userId)
  }


  return (
    <div className='m-0 p-0 max-w-[100%]'>
      <Header
        onHomeClick={handleHomeClick}
        onCreateClick={handleCreateClick}
        onLessonsClick={handleLessonsClick}
        onProfileClick={onProfileClick}
        onNewTeacherClick={onNewTeacherClick}
        user={user}
      />
      <main className='w-[100%] bg-[whitesmoke]'>
        <Lessons
          user={user}
          refreshStamp={refreshStamp}
          onUserLessonsClick={handleLessonsUserClick}
        />
        {view === 'createLesson' && (
          <CreateLesson
            onLessonCreated={handleCreatedLesson}
            onCancelLessonClick={handleCancelClick}
          />
        )}
      </main>
      <Footer onLogout={handleLogout} />
    </div>
  )
}

export default Learn
