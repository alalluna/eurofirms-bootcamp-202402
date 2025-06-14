import { User, Work } from '../data/index.js'
import { errors, validate } from 'com'

const { SystemError, NotFoundError } = errors

// Api logic methods
function retrieveWorks(userId) {
    validate.id(userId, 'userId')

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Work.find()
                .sort({ date: -1 })
                .select('-__v')
                .populate('author', 'name')
                .populate('likes', 'name') // Para obtener los nombres de los usuarios que dieron like
                .lean()
        })
        .then(works => {
            return works.map(work => {
                if (work._id) {
                    work.id = work._id.toString()
                    delete work._id
                }

                if (work.author?._id) {
                    work.author.id = work.author._id.toString()
                    delete work.author._id
                }

                if (Array.isArray(work.likes)) {
                    work.likes = work.likes.map(like => ({
                        id: like._id.toString(),
                        name: like.name
                    }))
                }

                return work
            })
        })
}

export default retrieveWorks
