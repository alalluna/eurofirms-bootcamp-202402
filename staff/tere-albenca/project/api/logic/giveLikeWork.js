import { User, Work } from '../data/index.js'
import { errors, validate } from 'com'

const { SystemError, MatchError } = errors

// Api logic methods

function giveLikeWork(userId, workId) {
    validate.id(userId, 'userId')
    validate.id(workId, 'workId')

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) {
                throw new MatchError('user not found')
            }

            return Work.findById(workId)
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(work => {
            if (!work) throw new MatchError('work not found')

            const index = work.likes.findIndex(likedUserId => likedUserId.toString() === userId)

            if (index < 0)
                work.likes.push(userId)
            else
                work.likes.splice(index, 1)

            return work.save()
                .catch(error => { throw new SystemError(error.message) })

        })
}

export default giveLikeWork