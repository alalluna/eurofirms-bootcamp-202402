import logic from '../../logic/index.js'

export default async (req, res, next) => {
    try {
        const { userId } = req
        
        const { targetUserId } = req.params
        
        const user = await logic.retrieveUser(userId, targetUserId)
        
        res.json(user)
    } catch (error) {
        next(error)
    }
}

