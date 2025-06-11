import { User } from '../data/index.js'
import { validate, errors } from 'com'

const { SystemError, DuplicityError } = errors

function registerUser(username, email, password, birthdate, wallet) {
    validate.name(username, 'username')
    validate.email(email)
    validate.password(password)
    validate.birthdate(birthdate)
    validate.adult(birthdate)
    validate.wallet(wallet)

    return User.findOne({ email })
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (user) throw new DuplicityError('email already exists')

            return User.findOne({ username })
                .catch(error => { throw new SystemError(error.message) })
                .then(user => {
                    if (user) throw new DuplicityError('username alreadty exists')

                    user = { username, email, password, birthdate, wallet }

                    return User.create(user)
                        .catch(error => { throw new SystemError(error.message) })
                })
        })
        .then(userCreated => { })
}

export default registerUser