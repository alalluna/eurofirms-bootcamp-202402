import { User } from "../data/index.js"
import { errors, validate } from "com"

const { SystemError, MatchError } = errors

//TODO
function deleteUser(userId) {
    validate.id(userId, 'userId')

    return User.findById(userId)

        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new MatchError('user not found')

            return user.deleteOne({ _id: user._id })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(result => { })
}

export default deleteUser;