import { Work, User } from '../data/index.js'
import { errors, validate } from 'com'

const { SystemError, MatchError } = errors

function retrieveUserWorks(userId, targetUserId) {
    validate.id(userId, 'userId')
    validate.id(targetUserId, 'targetUserId')

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new MatchError('userId not found')

            return Work.find({ author: targetUserId })
                .select('-__v')
                .populate('author', 'name')
                .populate('likes', 'name')
                .lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(works => {
                    // if (works.length === 0) throw new MatchError('Firstly upload work please')
                    if (!works) throw new MatchError('works not found')
                    works.forEach(work => {
                        if (work._id) {
                            work.id = work._id.toString()

                            delete work._id
                        }
                        // Transform author
                        if (work.author?._id) {
                            work.author.id = work.author._id.toString()
                            delete work.author._id
                        }

                        // Transform likes
                        if (work.likes?.length) {
                            work.likes = work.likes.map(like => ({
                                id: like._id.toString(),
                                name: like.name
                            }))
                        }
                    })

                    return works.reverse()
                })
        })
}

export default retrieveUserWorks