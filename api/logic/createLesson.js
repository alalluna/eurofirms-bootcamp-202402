import { User, Lesson } from '../data/index.js'
import { validate, errors } from 'com'

const { SystemError,NotFoundError, UnauthorizedError} = errors

function createLesson(userId, title, image, description, link, video) {
    validate.id(userId, 'userId')
    validate.text(title, 'title')
    validate.url(image, 'image')
    validate.text(description, 'description')
    validate.url(link, 'link')
    validate.url(video, 'video')

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError('user not found')

            if (user.role !== 'teacher')
                throw new UnauthorizedError('user is not a teacher')

            const lesson = {
                teacher: user._id,
                title,
                image,
                description,
                link,
                video,
                date: new Date()
            }
            return Lesson.create(lesson)
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(lesson => { })
}

export default createLesson