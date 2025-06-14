import { User, Work, Comment } from '../data/index.js'
import { errors, validate } from 'com'

const { SystemError, NotFoundError, Unauthorized } = errors

function updateComment(userId, workId, commentId, text) {
    validate.id(userId, 'userId')
    validate.id(workId, 'workId')
    validate.id(commentId, 'commentId')
    validate.text(text)

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) {
                throw new NotFoundError('teacher not found')
            }

            return Work.findById(workId)
                .catch(error => { throw new SystemError(error.message) })
                .then(work => {
                    if (!work) throw new NotFoundError('work not found')
                    
                    return Comment.findById(commentId)
                        .then(comment => {
                            if (!comment)  throw new NotFoundError('comment not found')
                            
                            if (userId !== comment.teacher.toString()) throw new Unauthorized('you can not edit this comment')
                            
                            comment.text = text
                            return comment.save()
                        })
                        .catch(error => { throw new SystemError(error.message) })
                        .then(() => { })
                })
        })
}

export default updateComment