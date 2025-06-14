import { User } from '../data/index.js'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

function getUserDetailsByIds(userIds) {
    if (!Array.isArray(userIds)) {
        throw new TypeError('userIds should be an array')
    }

    userIds.forEach(id => validate.id(id, 'userId'))

    return User.find({ _id: { $in: userIds } })
        .catch(error => { throw new SystemError(error.message) })
        .then(users => {
            if (!users.length) {
                throw new NotFoundError('no users found')
            }

            return users.map(user => ({
                id: user.id,
                name: user.name,
                surname: user.surname
            }))
        })
}

export default getUserDetailsByIds