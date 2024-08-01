import { User, Work } from '../data/index.js'
import { validate, errors } from 'com'// Asumiendo que tienes un archivo de utilidades para validar

const { SystemError, MatchError, ContentError } = errors

// Función para crear un nuevo trabajo
async function createWork(userId, title, imageUrl, text) {
    try {
        validate.id(userId, 'userId')
        validate.text(title, 'title')
        validate.url(imageUrl, 'imageUrl')
        validate.text(text, 'text')

        const user = await User.findById(userId)
        if (!user) {
            throw new MatchError('User not found')
        }

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
            throw new SystemError(error.message)
        } else {
            throw error
        }
    }
}


export default createWork


// import { User, Work } from '../data/index.js'
// import { validate, errors } from 'com'// Asumiendo que tienes un archivo de utilidades para validar
// const { SystemError, MatchError } = errors

// async function createWork(userId, title, imageUrl, text) {
//     try {
//         validate.id(userId, 'userId')
//         validate.text(title, 'title')
//         validate.url(imageUrl, 'imageUrl')
//         validate.text(text, 'text')

//         const user = await User.findById(userId)
//         if (!user) {
//             throw new MatchError('User not found')
//         }

//         const work = {
//             author: user._id,
//             title,
//             image: imageUrl,
//             text,
//             date: new Date()
//         }

//         const createdWork = await Work.create(work)
//         return createdWork
//     } catch (error) {
//         if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError) {
//             throw new SystemError(error.message)
//         } else {
//             throw error
//         }
//     }
// }

// export default createWork
