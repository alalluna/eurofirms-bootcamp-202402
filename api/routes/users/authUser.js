import logic from '../../logic/index.js'
import jwt from 'jsonwebtoken'

const { JWT_SECRET } = process.env

export default async (req, res, next) => {
    try {
        const { email, password } = req.body
        
        const user = await logic.authenticateUser(email, password)
        
        const token = jwt.sign({ sub: user.id, role: user.role }, JWT_SECRET, { expiresIn: '120m' })
        
        res.status(200).json(token)
    } catch (error) {
        next(error)
    }
}




