import { User, Work } from '../data/index.js'
import { validate, errors } from 'com'

const { SystemError, NotFoundError, ContentError } = errors

// Función para crear un nuevo trabajo
async function createWork(userId, title, imageUrl, text) {
    try {
        validate.id(userId, 'userId')
        validate.text(title, 'title')
        validate.url(imageUrl, 'imageUrl')
        validate.text(text, 'text')

        const user = await User.findById(userId)
        if (!user) throw new NotFoundError('User not found')
        

        const work = {
            author: user._id,
            title,
            image: imageUrl,
            text,
            date: new Date()
        }

        const createdWork = await Work.create(work)
        return createdWork
    } catch (error) {
        if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError) {
           throw new ContentError(error.message)
        } else {
            throw new SystemError(error.message)
        }
    }
}


export default createWork
