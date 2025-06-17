import logic from '../../logic/index.js'

export default async (req, res, next) => {
    try {

        const { userId } = req
        const { workId } = req.params
        await logic.giveLikeWork(userId, workId)

        res.status(204).send()

    } catch (error) {
        next(error)
    }
}

//esto es verifytoken
// const { authorization } = req.headers

// const token = authorization.slice(7)

// const { sub: userId } = jwt.verify(token, JWT_SECRET)

