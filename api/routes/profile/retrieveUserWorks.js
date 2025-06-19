import logic from '../../logic/index.js'

export default async (req, res, next) => {
    try {
        const { userId } = req
        const { targetUserId } = req.params
        const works = await logic.retrieveUserWorks(userId, targetUserId)
        res.status(200).json(works)

    } catch (error) {
        next(error)
    }
}