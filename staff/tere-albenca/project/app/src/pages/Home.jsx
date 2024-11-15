import logic from '../logic'
import React, { useState, useEffect } from 'react'
import { errors } from 'com'
import CreateWork from '../components/CreateWork'
import Works from '../components/Works'
import Header from '../components/Header'
import Footer from '../components/Footer'

const { ContentError, TypeError, RangeError, MatchError } = errors

function Home({ onUserLoggedOut, onHomeClick, onProfileClick, onUserProfileClick, onNewTeacherClick }) {
  const [view, setView] = useState(null)
  const [refreshStamp, setRefreshStamp] = useState(null)
  const [user, setUser] = useState(null)
  const [works, setWorks] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const fetchUserAndWorks = async () => {
      try {
        const user = await logic.retrieveUser()
        setUser(user)

        const works = await logic.retrieveWorks()
        setWorks(works)
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

  const handleCreateClick = () => setView('createWork')

  const handleCancelClick = () => setView(null)

  const handleCreatedWork = () => {
    setView(null)
    setRefreshStamp(Date.now())
  }

  const handleHomeClick = (event) => {
    event.preventDefault()
    onHomeClick()
  }

  const handleProfileClick = (event) => {
    event.preventDefault()
    onProfileClick(user.id)
  }

  const handleProfileUserClick = (userId) => {
    onUserProfileClick(userId)
  }

  const handleSearchWorks = (event) => {
    event.preventDefault()
    const query = event.target.query.value
    setSearchQuery(query)
  }

  const handleCancelSearch = () => {
    setSearchQuery('')
    setRefreshStamp(Date.now())
  }

  return (
    <div className='flex justify-center m-0 p-0 bg-gray-100'>
      <div className='w-full sm:w-1/2 md:w-1/3 px-4'>
        <Header
          onHomeClick={handleHomeClick}
          onCreateClick={handleCreateClick}
          onProfileClick={handleProfileClick}
          onNewTeacherClick={onNewTeacherClick}
          user={user}
        />
        <main className='w-[100%] bg-[whitesmoke]'>
          <div className='w-[100%] flex justify-center items-center'>
            <form className='mt-16' onSubmit={handleSearchWorks}>
              <input
                name="query"
                type="text"
                className="border border-gray-500 rounded-md px-4 py-2 mb-4"
                placeholder="Search works..."
              />
              <button
                type="submit"
                className="bg-blue-400 text-white rounded-md px-4 py-2 ml-2 hover:bg-blue-500"
              >Search
              </button>
              <button
                type="button"
                onClick={handleCancelSearch}
                className="bg-blue-400 text-white rounded-md px-4 py-2 ml-2 hover:bg-blue-500"
              >X
              </button>
            </form>
          </div>

          <Works
            user={user}
            refreshStamp={refreshStamp}
            searchQuery={searchQuery}
            onUserProfileClick={handleProfileUserClick}
          />
          {view === 'createWork' && (
            <CreateWork
              onWorkCreated={handleCreatedWork}
              onCancelClick={handleCancelClick}
            />
          )}
        </main>
        <Footer onLogout={handleLogout} />
      </div>
    </div>
  )
}

export default Home
