import logic from '../../logic/index.js'

export default async (req, res, next) => {
            try {
                const { userId } = req
                const { workId } = req.params
                const comments = await logic.retrieveComments(userId, workId)
                res.status(200).json(comments)

            } catch (error) {
                next(error)
            }
        }