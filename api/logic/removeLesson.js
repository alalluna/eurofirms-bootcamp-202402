import { User, Lesson } from '../data/index.js'
import { errors, validate } from 'com'

const { SystemError, MatchError } = errors

async function removeLesson(userId, lessonId) {
    validate.id(userId, 'userId')
    validate.id(lessonId, 'lessonId')

    try {
        const user = await User.findById(userId)
        if (!user) throw new MatchError('user not found')

        const lesson = await Lesson.findById(lessonId)
        if (!lesson) throw new MatchError('lesson not found')

        if (lesson.teacher.toString() !== userId)
            throw new MatchError('user is not authorized to delete this lesson')

        await Lesson.deleteOne({ _id: lesson._id })

        return { id: lessonId.toString() }
    } catch (error) {
        if (error instanceof MatchError) throw error
        throw new SystemError(error.message)
    }
}

export default removeLesson
