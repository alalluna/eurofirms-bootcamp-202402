import logic from '../../logic/index.js'

import { uploadFile } from '../../util/uploadFile.js'

//TODO necesitas implementar la carga de imagenes de cloudinary en la logica de create lesson

export default async (req, res, next) => {
    try {
        const { userId } = req
        const { title, image, description, link, video } = req.body

        await logic.createLesson(userId, title, image, description, link, video)
        res.status(201).send()
    } catch (error) {
        next(error)
    }
}