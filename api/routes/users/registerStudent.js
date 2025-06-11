import express from 'express'
import verifyToken from '../../middlewares/verifyToken.js'

import logic from '../../logic/index.js'

const router = express.Router()

const jsonBodyParser = express.json() // JSON.parse(...)

const { JWT_SECRET } = process.env

//registerStudent

router.post('/', verifyToken, jsonBodyParser, async (req, res, next) => {

    try {
        const { userId } = req
        const { name, surname, email, password } = req.body

        await logic.registerStudent(userId, name, surname, email, password)
         res.status(201).send()      

    } catch (error) {
        next(error)
    }
})

export default router