import logic from '../logic'
import Form from '../components/Form.jsx'
import Button from '../components/Button.jsx'
import Hone from '../components/Hone.jsx'

import Input from '../components/Input.jsx'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { errors } from 'com'
import { useState } from 'react'

const { ContentError, DuplicityError } = errors

function RegisterStudent({ onStudentRegistered, onHomeClick, onLoginClick, onContactClick, onCoursesClick, onShopClick, onPrivacyClick}) {
  const [error, setError] = useState(null)

  const errorHandle = (error) => {
    console.error(error)

    let feedback = error.message

    if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError)
      feedback = `${feedback}, please correct it`

    else if (error instanceof DuplicityError)
      feedback = `${feedback}, please try with another user`

    else
      feedback = 'sorry, there was an error, please try again later'

    let isNameError = false

    const isSurnameError = error.message.includes('surname')
    const isEmailError = error.message.includes('email')
    const isPasswordError = error.message.includes('password')

    if (!isSurnameError) isNameError = error.message.includes('name')

    const anotherError =
      !isNameError &&
      !isSurnameError &&
      !isEmailError &&
      !isPasswordError



    setError({
      message: feedback,
      isNameError,
      isSurnameError,
      isEmailError,
      isPasswordError,
      anotherError
    })
  }
  const handleSubmit = (event) => {
    event.preventDefault()

    const form = event.target

    const name = form.name.value
    const surname = form.surname.value
    const email = form.email.value
    const password = form.password.value


    try {
      logic.registerStudent(name, surname, email, password)
        .then(() => {
          alert('Usuario registrado correctamente')
          setError(null)
          onStudentRegistered()

        })
        .catch(error => {
          errorHandle(error)
        })
    } catch (error) {
      errorHandle(error)
    }
  }

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
  console.debug('Register student render')


  return (
    <div className='flex items-center justify-center h-screen w-screen bg-[whitesmoke] overflow-hidden'>
      <div className='my-4 w-full max-w-md p-2 bg-white rounded-lg shadow-lg'>
      <Header
          isHome={true}
          onHomeClick={handleHomeClick}
          onLoginClick={handleLoginClick}
          onContactClick={handleContactClick}
          onCoursesClick={handleCoursesClick}
          onShopClick={handleShopClick}
        />
        <main className='w-full max-w-xl flex flex-col justify-center items-center mb-2'>
          <Hone className='text-center'>REGISTER</Hone>
          <Form onSubmit={handleSubmit} className='w-full flex justify-center'>

            <Input type='text' id='name' placeholder='Name' /><br />
            {error?.isNameError && <span className='text-[#C13E65]'>{error.message}</span>}

            <Input type='text' id='surname' placeholder='Surname' /><br />
            {error?.isSurnameError && <span className='text-[#C13E65]'>{error.message}</span>}

            <Input type='text' id='email' placeholder='Email' /><br />
            {error?.isEmailError && <span className='text-[#C13E65]'>{error.message}</span>}

            <Input type='password' id='password' placeholder='Password' /><br />
            {error?.isPasswordError && <span className='text-[#C13E65]'>{error.message}</span>}

            <Button type='submit'>Register</Button>
            {error?.anotherError && <span className='text-[#C13E65]'>{error.message}</span>}

            <div className='flex justify-center bg-[lightgray] hover:bg-[#c3c3c2] rounded-xl p-1 my-1'>
              <a id='login' onClick={handleLoginClick} className='no-underline text-cyan-900 font-semibold'>Login</a>
            </div>
          </Form>
        </main>
        <Footer isHome={true} onPrivacyClick={handlePrivacyClick} />
      </div>
    </div>
  )
}

export default RegisterStudent