import { User, Lesson } from '../data/index.js'
import { errors, validate } from 'com'

const { SystemError, NotFoundError} = errors

function retrieveLessons(userId) {
    validate.id(userId, 'userId')

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) {
                throw new NotFoundError('user not found')
            }

            return Lesson.find().sort({ date: -1 }).select('-__v').populate('teacher', 'name').lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(lessons => {
                    lessons.forEach(lesson => {
                        if (lesson._id) {
                            lesson.id = lesson._id.toString()

                            delete lesson._id
                        }
                        if (lesson.teacher._id) {
                            lesson.teacher.id = lesson.teacher._id.toString()

                            delete lesson.teacher._id
                        }
                    })

                    return lessons
                })
        })
}

export default retrieveLessons