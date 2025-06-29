import { User } from '../data/index.js'
import { errors, validate } from 'com'

const { NotFoundError, UnauthorizedError , SystemError, DuplicityError } = errors

function registerStudent(userId,name, surname, email, password){
  validate.id(userId, 'userId')
  validate.name(name)
  validate.surname(surname)
  validate.email(email)
  validate.password(password)

  return User.findById(userId)
    .catch(error => { throw new SystemError(error.message) })
    .then(loggedUser => {
      if (!loggedUser) throw new NotFoundError('user not found')

      if (loggedUser.role !== 'teacher') throw new UnauthorizedError('user is not a teacher')
      
   return User.findOne({ email })
        .catch(error => { throw new SystemError(error.message) })
        .then(existingUser => {
          if (existingUser)
            throw new DuplicityError('this student already exists')

          const newUser = {
            name,
            surname,
            email,
            password,
            role: 'student'
          }

          return User.create(newUser)
            .catch(error => { throw new SystemError(error.message) })
        })
        .then(newUser => {})
    })
}

export default registerStudent




