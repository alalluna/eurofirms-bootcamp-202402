import { User } from "../data/index.js"
import { errors, validate } from "com"

const { MatchError, SystemError } = errors;

function retrieveUser(userId, targetUserId) {

    validate.id(userId, "userId");
    validate.id(targetUserId, "targetUserId");

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new MatchError("user not found");

            return User.findById(targetUserId).select("-__v -password").lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(targetUser => {
                    if (!targetUser)
                        throw new MatchError("target user not found");

                        targetUser.id = targetUser._id.toString()

                        delete targetUser._id

                        return targetUser;
                })
        })
}

export default retrieveUser;
