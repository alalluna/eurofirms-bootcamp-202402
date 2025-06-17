import logic from '../../logic/index.js'

import { uploadFile } from '../../util/uploadFile.js'

export default async (req, res, next) => {
    try {
        const { title, text } = req.body;
        const file = req.files && req.files.image && req.files.image[0]

        if (!file) return res.status(400).json({ error: 'No file uploaded' })

        const { downloadURL } = await uploadFile(file)
        const imageUrl = downloadURL
        const { userId } = req
        const createdWork = await logic.createWork(userId, title, imageUrl, text)

        res.status(201).json(createdWork)

    } catch (error) {
        next(error)
    }
}
