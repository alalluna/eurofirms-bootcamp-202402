import { User } from '../data/index.js'
import { errors, validate } from 'com'

const {MatchError, SystemError, DuplicityError } = errors

function registerTeacher(userId, name, surname, email, password) {
    validate.id(userId, 'userId')
    validate.name(name)
    validate.surname(surname)
    validate.email(email)
    validate.password(password)

    return User.findById(userId)
    .catch(error => { throw new SystemError(error.message) })
    .then(loggedUser => {
      if (!loggedUser)
        throw new MatchError('user not found')

      if (loggedUser.role !== 'teacher')
        throw new MatchError('user is not a teacher')
      
    
    return User.findOne({ email })
        .catch(error => { throw new SystemError(error.message) })
        .then(existingUser => {
          if (existingUser)
            throw new DuplicityError('this teacher already exists')

          const newUser = {
            name,
            surname,
            email,
            password,
            role: 'teacher'
          }

          return User.create(newUser)
            .catch(error => { throw new SystemError(error.message) })
        })
        .then(newUser => {})
    })
}

export default registerTeacher