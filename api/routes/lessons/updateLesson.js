import logic from '../../logic/index.js'

export default async (req, res, next) => {
    try {
        const { userId } = req
        const { title, image, description, link, video } = req.body
        await logic.updateLesson(userId, title, image, description, link, video)
        res.status(204).send()

    } catch (error) {
        next(error)
    }
}