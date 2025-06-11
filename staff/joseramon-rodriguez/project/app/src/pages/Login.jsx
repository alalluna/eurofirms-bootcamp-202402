import logic from '../logic'
import Button from '../components/Button'
import Form from '../components/Form'
import Input from '../components/Input'
import { errors } from 'com'
import { useState } from 'react'

const { ContentError, MatchError } = errors

function Login({ onUserLoggedIn, onRegisterClick }) {
    const [error, setError] = useState(null)

    const errorHandler = error => {
        console.error(error)

        let feedback = error.message

        if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError)
            feedback = `${feedback}, please correct it`
        else if (error instanceof MatchError)
            feedback = `${feedback}, please input correct data`
        else feedback = 'sorry there was an error, please try again later'

        const isUserNameError = error.message.includes('username')
        const isPasswordError = error.message.includes('password')

        const isAnotherError = !isUserNameError && !isPasswordError

        setError({ message: feedback, isUserNameError, isPasswordError, isAnotherError })
    }

    const handleSubmit = event => {
        event.preventDefault()

        const form = event.target

        const username = form.username.value
        const password = form.password.value

        try {
            logic.loginUser(username, password)
                .then(() => onUserLoggedIn())
                .catch(error => errorHandler(error))
        } catch (error) {
            errorHandler(error)
        }
    }

    const handleRegisterClick = event => {
        event.preventDefault()

        onRegisterClick()
    }
    return <>
        <main className=' px-20'>
            <h1>Login</h1>
            <Form onSubmit={handleSubmit} >
                <label htmlFor='username'>Username</label>
                <Input id='username' />
                {error?.isUserNameError && <span className='text-red-500'>{error.message}</span>}

                <label htmlFor='password'>password</label>
                <Input id='password' type='password' />
                {error?.isPasswordError && <span className='text-red-500'>{error.message}</span>}

                <Button type='submit'>Login</Button>
                {error?.isAnotherError && <span className='text-red-500'>{error.message}</span>}

                <Button className='block text-center' href='register.html' onClick={handleRegisterClick}>Register</Button>
            </Form>
        </main>
    </>
}

export default Login