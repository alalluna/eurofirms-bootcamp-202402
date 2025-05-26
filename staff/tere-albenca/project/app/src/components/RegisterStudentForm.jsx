import logic from '../logic'
import Form from '../components/Form.jsx'
import Button from '../components/Button.jsx'
import Hone from '../components/Hone.jsx'
import Input from '../components/Input.jsx'
import { errors } from 'com'
import { useState } from 'react'

const { ContentError, DuplicityError } = errors

function RegisterStudentForm({ onStudentRegistered }) {
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

    const name = form['student-name'].value.trim()
    const surname = form['student-surname'].value.trim()
    const email = form['student-email'].value.trim()
    const password = form['student-password'].value


    try {
      logic.registerStudent(name, surname, email, password)
        .then(() => {
          alert('Usuario registrado correctamente')
          setError(null)
          onStudentRegistered()
          form.reset()

        })
        .catch(error => {
          errorHandle(error)
        })
    } catch (error) {
      errorHandle(error)
    }
  }


  console.debug('Register student render')


  return (
    <div className='flex items-center justify-center w-full max-w-md p-2 bg-white rounded-lg shadow-lg my-4'>


      <div className='w-full flex flex-col justify-center items-center mb-1'>
        <Hone className='text-center'>NEW STUDENT</Hone>
        <Form onSubmit={handleSubmit} className='w-full flex justify-center'>

          <Input type='text' id='student-name' placeholder='Name' /><br />
          {error?.isNameError && <span className='text-[#C13E65]'>{error.message}</span>}

          <Input type='text' id='student-surname' placeholder='Surname' /><br />
          {error?.isSurnameError && <span className='text-[#C13E65]'>{error.message}</span>}

          <Input type='text' id='student-email' placeholder='Email' /><br />
          {error?.isEmailError && <span className='text-[#C13E65]'>{error.message}</span>}

          <Input type='password' id='student-password' placeholder='Password' /><br />
          {error?.isPasswordError && <span className='text-[#C13E65]'>{error.message}</span>}

          <Button type='submit'>Register</Button>
          {error?.anotherError && <span className='text-[#C13E65]'>{error.message}</span>}

        </Form>
      </div>

    </div>

  )
}

export default RegisterStudentForm