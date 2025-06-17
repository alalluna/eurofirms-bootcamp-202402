import logic from '../../logic/index.js'

export default async (req, res, next) => {
    try {
        const { userId } = req
        const { searchQuery } = req.query

        let works

        if (searchQuery) {
            works = await logic.searchWorks(userId, searchQuery)
        } else {
            works = await logic.retrieveWorks(userId)
        }

        res.status(200).json(works)
    } catch (error) {
        next(error)
    }
}