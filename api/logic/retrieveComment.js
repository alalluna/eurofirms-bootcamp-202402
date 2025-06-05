import { User, Work, Comment } from '../data/index.js'
import { errors, validate } from 'com'

const { SystemError, MatchError } = errors

function retrieveComment(userId, workId, commentId) {
    validate.id(userId, 'userId')
    validate.id(workId, 'workId')
    validate.id(commentId, 'commentId')

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new MatchError('teacher not found')

            return Work.findById(workId)
                .catch(error => { throw new SystemError(error.message) })
                .then(work => {
                    if (!work) throw new MatchError('work not found')

                    return Comment.findById(commentId).select('-__v').populate('teacher', 'name').lean()
                        .catch(error => { throw new SystemError(error.message) })
                        .then(comment => {
                            if (!comment) throw new MatchError('comment not found')
                            comment.id = comment._id.toString()

                            delete comment._id

                            comment.teacher.id = comment.teacher._id.toString()

                            delete comment.teacher._id

                            comment.work = comment.work.toString()

                            return comment
                        })
                })
        })
}

export default retrieveComment