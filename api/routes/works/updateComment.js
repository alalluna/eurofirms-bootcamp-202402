import logic from '../../logic/index.js'

export default async (req, res, next) => {
    try {
        const { userId } = req
        const { workId, commentId } = req.params
        const { text } = req.body
        await logic.updateComment(userId, workId, commentId, text)
        res.status(204).send()

    } catch (error) {
        next(error)
    }
}