import { User } from '../data/index.js'
import { errors, validate } from 'com'

const { SystemError, DuplicityError } = errors

function registerTeacher(name, surname, email, password) {
    validate.name(name)
    validate.surname(surname)
    validate.email(email)
    validate.password(password)

    return User.findOne({ email })
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (user) throw new DuplicityError('this teacher already exists')

            user = { name, surname, email, password }

            return User.create(user)
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(user => { })
}

export default registerTeacher