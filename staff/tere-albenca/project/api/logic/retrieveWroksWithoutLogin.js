import { User, Work } from '../data/index.js'
import { errors, validate } from 'com'

const { SystemError, MatchError } = errors

// Api logic methods

function retrieveWorksWithoutLogin(userId) {

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) {
                throw new MatchError('user not found')
            }

            return Work.find().sort({ date: -1 }).select('-__v').populate('author', 'name').lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(works => {
                    works.forEach(work => {
                        if (work._id) {
                            work.id = work._id.toString()

                            delete work._id
                        }
                        if (work.author._id) {
                            work.author.id = work.author._id.toString()

                            delete work.author._id
                        }
                    })

                    return works
                })
        })
}

export default retrieveWorksWithoutLogin