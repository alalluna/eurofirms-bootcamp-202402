import { User, Work, Comment } from '../data/index.js'
import { errors, validate } from 'com'

const { SystemError, UnauthorizedError, NotFoundError } = errors

function createComment(userId, workId, text) {
    validate.id(userId, 'userId')
    validate.id(workId, 'workId')
    validate.text(text)

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new  NotFoundError('user not found')

            if (user.role !== 'teacher')
                throw new UnauthorizedError('user is not a teacher')

            return Work.findById(workId)
                .catch(error => { throw new SystemError(error.message) })

                .then(work => {
                    if (!work)
                        throw new NotFoundError ('work not found')

                    const comment = {
                        teacher: user._id,
                        work: work._id,
                        text,
                        date: new Date
                    }

                    return Comment.create(comment)
                        .catch(error => { throw new SystemError(error.message) })

                })
                .then(comment => { })
        })
}

export default createComment