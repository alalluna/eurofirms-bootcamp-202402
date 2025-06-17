import logic from '../../logic/index.js'

export default async (req, res, next) => {
    try {
        const { userId } = req
        const { workId } = req.params
        const { text } = req.body
        await logic.createComment(userId, workId, text)
        res.status(201).send()

    } catch (error) {
        next(error)
    }
}