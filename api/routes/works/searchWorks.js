import logic from '../../logic/index.js'

export default async (req, res, next) => {
    try {
        const { userId } = req
        const { q } = req.query
        const works = await logic.searchWorks(userId, q)
        res.status(200).json(works)

    } catch (error) {
        next(error)
    }

}