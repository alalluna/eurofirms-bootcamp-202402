import logic from '../../logic/index.js'

export default async (req, res, next) => {
    try {
        const { userId } = req
        const { workId } = req.params
        await logic.removeWork(userId, workId)
            res.status(204).send()

    } catch (error) {
        next(error)
    }
    }