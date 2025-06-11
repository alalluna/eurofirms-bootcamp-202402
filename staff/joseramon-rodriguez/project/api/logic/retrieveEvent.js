import { validate, errors } from 'com'
import { User, Event } from '../data/index.js'
const { SystemError, MatchError } = errors

function retrieveEvent(userId, enventId) {
    validate.id(userId, 'user id')
    validate.id(enventId, 'event id')

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new MatchError('user not found -> cant retrieveEvent')

            return Event.findById(enventId).select('-__v -code').populate('players', ' name').populate('winner', '-_id name').lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(event => {
                    if (!event)
                        throw new MatchError('event not found -> cant retrieve event')

                    event.players.forEach(player => {
                        const id = player._id.toString()

                        player.id = id

                        delete player._id
                    })

                    const id = event._id.toString()

                    delete event._id

                    event.id = id
                    return event
                })
        })
}

export default retrieveEvent