import { User, Work, Comment } from '../data/index.js'
import { errors, validate } from 'com'

const { SystemError, MatchError } = errors

function retrieveComments(userId, workId) {
    validate.id(userId, 'userId')
    validate.id(workId, 'workId')

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) { throw new MatchError('teacher not found') }

            return Work.findById(workId)
                .catch(error => { throw new SystemError(error.message) })
                .then(work => {
                    if (!work) { throw new MatchError('work not found') }

                    return Comment.find({ work: workId }).sort({ date: -1 }).select('-__v').populate('teacher', 'name').lean()
                        .catch(error => { throw new SystemError(error.message) })
                        .then(comments => {
                            comments.forEach(comment => {
                                if (comment) {
                                    comment.id = comment._id.toString()

                                    delete comment._id
                                }

                                if (comment.teacher._id) {
                                    comment.teacher.id = comment.teacher._id.toString()

                                    delete comment.teacher._id
                                }
                            })
                            return comments
                        })
                })
        })
}

export default retrieveComments