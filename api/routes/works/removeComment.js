import logic from '../../logic/index.js'

export default async (req, res, next) => {
    try {
        const { userId } = req
        const { workId, commentId } = req.params
        await logic.removeComment(userId, workId, commentId)
        res.status(204).send()

    } catch (error) {
        next(error)
    }
}