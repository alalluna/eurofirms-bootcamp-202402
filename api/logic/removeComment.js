import { User, Work, Comment } from '../data/index.js'
import { errors, validate } from 'com'

const { SystemError, MatchError } = errors

function removeComment(userId, workId, commentId) {
    validate.id(userId, 'userId')
    validate.id(workId, 'workId')
    validate.id(commentId, 'commentId')

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new MatchError('teacher not found')

            return Work.findById(workId)
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(work => {
            if (!work)
                throw new MatchError('work not found')

            return Comment.findById(commentId)
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(comment => {
            if (!comment)
                throw new MatchError(' not found')

            return Comment.deleteOne({ _id: comment._id })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(result => { })
}

export default removeComment