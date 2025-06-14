import { User, Work } from '../data/index.js'
import { errors, validate } from 'com'

const { SystemError, NotFoundError, UnauthorizedError, ValidationError } = errors

async function removeWork(userId, workId) {
    validate.id(userId, 'userId')
    validate.id(workId, 'workId')

    try {
        const user = await User.findById(userId)
        if (!user) throw new NotFoundError('user not found')

        const work = await Work.findById(workId)
        if (!work) throw new NotFoundError('work not found')

        if (work.author.toString() !== userId && user.role !== 'teacher')
            throw new UnauthorizedError('user is not authorized to delete this work')

        await Work.deleteOne({ _id: work._id })

        return { id: workId.toString() }
    } catch (error) {
        if (error instanceof ValidationError) throw error
        throw new SystemError(error.message)
    }
}

export default removeWork
