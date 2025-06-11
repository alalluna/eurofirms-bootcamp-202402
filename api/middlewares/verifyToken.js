// middlewares/verifyToken.js
import jwt from 'jsonwebtoken'
import { UnauthorizedError } from 'com/errors.js'

export default function verifyToken(req, res, next) {
    try {
        const auth = req.headers.authorization
        if (!auth?.startsWith('Bearer ')) throw new UnauthorizedError('Token not provided')

        const token = auth.slice(7)
        const { sub: userId } = jwt.verify(token, process.env.JWT_SECRET)

        req.userId = userId
        next()
    } catch (error) {
        next(error)
    }
}
