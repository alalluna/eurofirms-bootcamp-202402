import { User } from '../data/index.js'
import { errors, validate } from 'com'

const { SystemError, NotFoundError ,CredentialsError} = errors

function authenticateUser(email, password) {
    validate.email(email)
    validate.password(password)

    return User.findOne({ email })
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError('user not found')

            if (user.password !== password)
                throw new CredentialsError('wrong credentials')

            return {
                id: user.id,
                role: user.role
            }
        })
}

export default authenticateUser