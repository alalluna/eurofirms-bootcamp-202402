import { User, Player } from '../data/index.js'
import { validate, errors } from 'com'

const { SystemError, MatchError, DuplicityError } = errors
function createPlayer(userId, name) {
    validate.id(userId, 'userId')
    validate.name(name, 'playerName')

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new MatchError('user not found - cant create player')

            return Player.findOne({ name })
                .catch(error => { throw new SystemError(error.message) })
                .then(player => {
                    if (player)
                        throw new DuplicityError('player already exists -> cant create player')

                    const newPlayer = { name }

                    Player.create(newPlayer)
                        .then(playerCreated => { })
                        .catch(error => { throw new SystemError(error.message) })
                })
        })
}

export default createPlayer