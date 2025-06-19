import logic from '../../logic/index.js'

export default async (req, res, next) => {
    try {
        const { userId } = req
        const { lessonId } = req.params
        await logic.removeLesson(userId, lessonId)
        res.status(204).send()

    } catch (error) {
        next(error)
    }
}