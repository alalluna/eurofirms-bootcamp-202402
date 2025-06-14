import { User, Lesson } from '../data/index.js'
import { validate, errors } from 'com'

const { SystemError, NotFoundError, Unauthorized } = errors

function updateLesson(userId, lessonId, title, image, description, link, video) {
    validate.id(userId, 'userId')
    validate.id(lessonId, 'lessonId')
    validate.text(title, 'title')
    validate.url(image, 'image')
    validate.text(description, 'description')
    validate.url(link, 'link')
    validate.url(video, 'video')

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Lesson.findById(lessonId)
                .then(lesson => {
                    if (!lesson) throw new NotFoundError('lesson not found')

                    if (userId !== lesson.teacher.toString()) throw new Unauthorized('you can not edit this lesson')

                    lesson.title = title
                    lesson.image = image
                    lesson.description = description
                    lesson.link = link
                    lesson.video = video

                    return lesson.save()      
                })
                .catch(error => { throw new SystemError(error.message) })
                .then(() => { })
        })
}

export default updateLesson