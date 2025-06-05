import { User, Work, Comment } from '../data/index.js'
import { errors, validate } from 'com'

const { SystemError, MatchError } = errors

function updateComment(userId, workId, commentId, text) {
    validate.id(userId, 'userId')
    validate.id(workId, 'workId')
    validate.id(commentId, 'commentId')
    validate.text(text)

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) {
                throw new MatchError('teacher not found')
            }

            return Work.findById(workId)
                .catch(error => { throw new SystemError(error.message) })
                .then(work => {
                    if (!work) {
                        throw new MatchError('work not found')
                    }
                    return Comment.findById(commentId)
                        .then(comment => {
                            if (!comment) {
                                throw new MatchError('this comment does not exist')
                            }
                            if (userId !== comment.teacher.toString()) {
                                throw new MatchError('you cant edit this comment')
                            }

                            comment.text = text
                            return comment.save()
                        })
                        .catch(error => { throw new SystemError(error.message) })
                        .then(() => { })
                })
        })
}

export default updateComment