import logic from '../../logic/index.js'

export default async (req, res, next) => {
    try {
        const { userId } = req
        const { workId, commentId } = req.params
        const comment = await logic.retrieveComment(userId, workId, commentId)
        res.status(200).json(comment)

    } catch (error) {
        next(error)
    }
}