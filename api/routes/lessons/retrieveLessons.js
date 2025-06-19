import logic from '../../logic/index.js'

export default async (req, res, next) => {
    try {
        const { userId } = req
        const lessons = await logic.retrieveLessons(userId)
        res.status(200).json(lessons)

    } catch (error) {
        next(error)
    }
}