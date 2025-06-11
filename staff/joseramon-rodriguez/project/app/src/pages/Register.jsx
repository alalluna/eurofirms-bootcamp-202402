import logic from '../logic'
import Button from '../components/Button'
import Input from '../components/Input'
import Form from '../components/Form'
import { errors } from 'com'
import { useState } from 'react'

const { ContentError, DuplicityError, MatchError } = errors

function Register({ onUserRegistered, onLoginClick }) {
    const [error, SetError] = useState(null)

    const errorHandler = error => {
        console.error(error)

        let feedback = error.message

        if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError)
            feedback = `${feedback}, please correct it`
        else if (error instanceof DuplicityError)
            feedback = `${feedback}, please try with another user`
        else if (error instanceof MatchError)
            feedback = feedback
        else
            feedback = 'sorry, there was an error,please try again later'

        const isUserNameError = error.message.includes('name')
        const isEmailError = error.message.includes('email')
        const isPasswordError = error.message.includes('password')
        const isBirthdateError = error.message.includes('birthdate')

        const isAnotherError = !isUserNameError && !isEmailError && !isPasswordError && !isBirthdateError

        SetError({ message: feedback, isUserNameError, isEmailError, isPasswordError, isBirthdateError, isAnotherError })
    }

    const handleSubmit = event => {
        event.preventDefault()

        const form = event.target

        const username = form.username.value
        const email = form.email.value
        const password = form.password.value
        const birthdate = form.birthdate.value

        try {
            logic.registerUser(username, email, password, birthdate)
                .then(() => onUserRegistered())
                .catch(error => errorHandler(error))
        } catch (error) {
            errorHandler(error)
        }
    }

    const handleLoginClick = event => {
        event.preventDefault()

        onLoginClick()
    }
    return <>
        <main className=' px-20'>
            <h1>Register</h1>
            <Form className='flex flex-col gap-2 mb-5' onSubmit={handleSubmit}>
                <label htmlFor='username'>Username</label>
                <Input id='username' />
                {error?.isNameError && <span className='text-red-500'>{error.message}</span>}

                <label htmlFor="email">E-mail</label>
                <Input id='email' />
                {error?.isEmailError && <span className='text-red-500'>{error.message}</span>}

                <label htmlFor="password">Password</label>
                <Input type='password' id='password' />
                {error?.isPasswordError && <span className='text-red-500'>{error.message}</span>}

                <label htmlFor="birthdate">Birth date</label>
                <Input type='date' id='birthdate' />
                {error?.isBirthdateError && <span className='text-red-500'>{error.message}</span>}

                <Button href='login.html' type='submit'>Register</Button>
            </Form>

            <Button className='block text-center w-full' onClick={handleLoginClick}>Login</Button>
            {error?.isAnotherError && <span className='text-red-500'>{error.message}</span>}
        </main>
    </>
}

export default Register