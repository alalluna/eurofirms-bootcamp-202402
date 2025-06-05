import logic from '../logic'
import React, { useState, useEffect } from 'react'
import { errors } from 'com'
import Header from '../components/Header'
import Footer from '../components/Footer'

const { ContentError, TypeError, RangeError, MatchError } = errors

function Courses ({onHomeClick,onLoginClick, onContactClick, onCoursesClick, onShopClick, onPrivacyClick}){
  const handleHomeClick = (event) => {
    event.preventDefault()
    onHomeClick()
  }
  const handleLoginClick = (event) => {
    event.preventDefault()
    onLoginClick()
  }
  const handleContactClick = (event) => {
    event.preventDefault()
    onContactClick()
  }
  const handleCoursesClick = (event) => {
    event.preventDefault()
    onCoursesClick()
  }
  const handleShopClick = (event) => {
    event.preventDefault()
    onShopClick()
  }
  const handlePrivacyClick = (event) => {
    event.preventDefault()
    onPrivacyClick()
  }
  return(
        <div className='flex justify-center m-0 p-0 bg-gray-100'>
      <div className='w-full sm:w-1/2 md:w-1/3 px-4'>
        <Header
          isHome={true} 
          onHomeClick={handleHomeClick}
          onLoginClick={handleLoginClick}
          onContactClick={handleContactClick}
          onCoursesClick={handleCoursesClick}
          onShopClick={handleShopClick}
        />
        <main className='w-[100%] bg-[whitesmoke]'>
         


        </main>
        <Footer isHome={true}  onPrivacyClick={handlePrivacyClick} />
      </div>
    </div>
  )
}
export default Courses