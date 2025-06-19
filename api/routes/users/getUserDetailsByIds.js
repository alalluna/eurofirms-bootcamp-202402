import logic from '../../logic/index.js'

export default async (req, res, next) => {
    try {
        const { userIds } = req.body
        const users = await logic.getUserDetailsByIds(userIds)
        res.status(200).json(users)

    } catch (error) {
        next(error)
    }
}