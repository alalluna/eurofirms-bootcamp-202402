import { User, Work } from '../data/index.js'
import { errors, validate } from 'com'

const { SystemError, NotFoundError } = errors

// Api logic methods

async function giveLikeWork(userId, workId) {
    validate.id(userId, 'userId')
    validate.id(workId, 'workId')

    let user, work

    try {
        user = await User.findById(userId)
        if (!user) throw new NotFoundError('user not found')
    } catch (error) {
        throw new SystemError(error.message)
    }

    try {
        work = await Work.findById(workId)
        if (!work) throw new NotFoundError('work not found')
    } catch (error) {
        throw new SystemError(error.message)
    }

    const index = work.likes.findIndex(likedUserId => likedUserId.toString() === userId)

    if (index < 0) {
        work.likes.push(userId) // Like
    } else {
        work.likes.splice(index, 1) // Unlike
    }

    try {
        await work.save()
    } catch (error) {
        throw new SystemError(error.message)
    }
}

export default giveLikeWork
