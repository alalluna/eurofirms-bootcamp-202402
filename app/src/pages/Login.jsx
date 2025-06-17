import logic from '../logic'
import Form from '../components/Form'
import Button from '../components/Button'
import Input from '../components/Input'
import { errors } from 'com'
import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'


const { ContentError, MatchError } = errors

function Login({ onUserLoggedIn, onHomeClick, onLoginClick, onContactClick, onCoursesClick, onShopClick, onPrivacyClick }) {

  const [error, setError] = useState(null)

  const errorHandle = (error) => {
    console.error(error.message)

    let feedback = error.message

    if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError)
      feedback = `${feedback}, please correct it`
    else if (error instanceof MatchError)
      feedback = `${feedback}, please verify credentials`
    else
      feedback = 'sorry, there was an error, please try again later'

    const isEmailError = error.message.includes('email')
    const isPasswordError = error.message.includes('password')
    const anotherError = !isEmailError && !isPasswordError

    setError({ message: feedback, isEmailError, isPasswordError, anotherError })
  }

  const handleSubmit = (event) => {

    event.preventDefault()

    const form = event.target
    const email = form.email.value
    const password = form.password.value

    try {
      logic.loginUser(email, password)
        .then(() => {
          alert('Usuario logeado correctamente')
          setError(null)
          onUserLoggedIn()
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

  return (
    <div className='h-screen w-screen flex flex-col overflow-hidden bg-[whitesmoke]'>
      <Header
        isHome={true}
        onHomeClick={onHomeClick}
        onLoginClick={onLoginClick}
        onContactClick={onContactClick}
        onCoursesClick={onCoursesClick}
        onShopClick={onShopClick}
      />

      {/* MAIN AREA */}
      <main className='flex-1 flex items-center justify-center py-15 px-4'>
        <div className='flex flex-col sm:flex-row w-full max-w-4xl min-h-[calc(100vh-160px)] bg-white rounded-lg shadow-lg overflow-hidden'>
          {/* Image */}
          <div className='flex justify-center items-center w-full sm:w-1/2 p-4'>
            <img
              src='../images/hero-image.png'
              alt='logo'
              className='max-h-[170px] sm:max-h-full max-w-full object-contain'
            />
          </div>

          {/* Form */}
          <div className='w-full sm:w-1/2 p-4 flex flex-col justify-center'>
            <Form onSubmit={handleSubmit} className='w-full'>
              <label htmlFor='email' className='text-sm'>Email</label>
              <Input type='text' id='email' placeholder=' ' />
              {error?.isEmailError && <span className='text-[#C13E65] text-xs'>{error.message}</span>}

              <label htmlFor='password' className='text-sm'>Password</label>
              <Input type='password' id='password' placeholder='' />
              {error?.isPasswordError && <span className='text-[#C13E65] text-xs'>{error.message}</span>}

              <Button type='submit' className='mt-4'>LOGIN</Button>
              {error?.anotherError && <span className='text-[#C13E65] text-xs'>{error.message}</span>}
            </Form>

            <h3 className='text-md text-center pt-2'>Puedes acceder con las siguientes credenciales</h3>
            <p className='text-sm text-center' > con email: "xxxxxxxx@gmail.com" password: "xxxxxxy@" </p>
          </div>
        </div>
      </main>


      <Footer isHome={true} onPrivacyClick={onPrivacyClick} />
    </div>
  )
  // return (
  //   <div className='flex items-center justify-center h-screen w-screen bg-[whitesmoke] overflow-hidden'>
  //     <div className='m-2 max-h-screen w-full bg-white rounded-lg shadow-lg '>

  //       <Header
  //         isHome={true}
  //         onHomeClick={handleHomeClick}
  //         onLoginClick={handleLoginClick}
  //         onContactClick={handleContactClick}
  //         onCoursesClick={handleCoursesClick}
  //         onShopClick={handleShopClick}
  //       />
  //       <main className='flex-w-full flex flex-col justify-center items-center py-6'>
  //         <img
  //           src='../images/hero-image.png'
  //           alt='logo'
  //           className='h-40 sm:h-42 md:h-44 lg:h-47 xl:h-50'
  //         />

  //         <Form onSubmit={handleSubmit} className='w-full flex justify-center'>
  //           <label htmlFor='email'>Email</label>
  //           <Input type='text' id='email' placeholder=' ' />
  //           {error?.isEmailError && <span className='text-[#C13E65]'>{error.message}</span>}

  //           <label htmlFor='password'>Password</label>
  //           <Input type='password' id='password' placeholder='' />
  //           {error?.isPasswordError && <span className='text-[#C13E65]'>{error.message}</span>}

  //           <Button type="submit" className='mt-2 md:mt-3 lg:mt-4 '>LOGIN</Button>
  //           {error?.anotherError && <span className='text-[#C13E65]'>{error.message}</span>}

  //         </Form>
  //       </main>
  //       <Footer isHome={true} onPrivacyClick={handlePrivacyClick} />
  //     </div>
  //   </div>
  // )
}
export default Login