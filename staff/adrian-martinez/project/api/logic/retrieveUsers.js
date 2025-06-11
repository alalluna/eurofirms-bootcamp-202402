import { User } from '../data/index.js'

import { validate, errors } from 'com'

const { SystemError, MatchError } = errors

function retrieveUsers() {

    return User.find()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new MatchError('user not found')

            return User.find().select('-__v').lean()
                .then(users => {
                    
                    users.forEach(user => {

                            if(user._id){
                                const id = user._id.toString();
                                delete user._id;
    
                                user.id = id;
                            }
                    })
                    return users;
                })
        })
}

export default retrieveUsers;