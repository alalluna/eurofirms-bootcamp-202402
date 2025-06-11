import { User, Event } from '../data/index.js'
import { validate, errors } from 'com'

const { SystemError, MatchError } = errors

function retrieveEvents(userId) {
    validate.id(userId, 'user id')

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new MatchError('user not found -> cant retrieve events')

            return Event.find().select('-code -__v').sort({ 'status': -1, 'startDate': 1 }).populate().lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(events => {

                    if (!events)
                        throw new MatchError('events not found -> cant retrieve events')

                    events.forEach(event => {
                        const idToString = event._id.toString()

                        delete event._id

                        event.id = idToString

                        const playerIdList = event.players.map(playerId => {
                            const newPlayerId = playerId.toString()

                            return newPlayerId
                        })

                        event.players = playerIdList

                        if (event.winner)
                            event.winner = event.winner.toString()
                    })

                    return events
                })

        })

}

export default retrieveEvents
