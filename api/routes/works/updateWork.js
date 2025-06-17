import logic from '../../logic/index.js'

export default async (req, res, next) => {
    try {
        const { userId } = req
        const { workId } = req.params
        const { title, text } = req.body
        await logic.updateWork(userId, workId, title, text)
        res.status(204).send()

    } catch (error) {
        next(error)
    }
}

// server.patch('/works/:workId', verifyToken, jsonBodyParser, async (req, res, next) => {
//     try {
//         const { userId } = req
//         const { workId } = req.params
//         const { title, text } = req.body
//         await logic.updateWork(userId, workId, title, text)
//         res.status(204).send()

//     } catch (error) {
//         next(error)
//     }
// })