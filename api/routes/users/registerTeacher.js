import logic from '../../logic/index.js'

export default async (req, res, next) => {

    try {
        const { userId } = req
        
        const { name, surname, email, password } = req.body

        await logic.registerTeacher(userId, name, surname, email, password)
        
        res.status(201).send()      

    } catch (error) {
        next(error)
    }
}

