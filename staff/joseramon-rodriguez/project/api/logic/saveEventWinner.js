import { Event, Player } from '../data/index.js'
import { validate, errors } from 'com'

const { SystemError, MatchError } = errors

function saveEventWinner(name, description, players, startDate, endDate, winner) {
    validate.name(name, 'name')
    validate.text(description, 'description')
    validate.players(players)
    validate.date(startDate, 'start date')
    validate.date(endDate, 'end date')
    validate.eventDates(startDate, endDate)
    validate.text(winner, 'winner')

    const eventCodeJson = JSON.stringify({ name, description, players, startDate, endDate })
    const eventCode = btoa(eventCodeJson)

    return Player.findOne({ name: winner })
        .catch(error => { throw new SystemError(error.message) })
        .then(player => {
            if (!player)
                throw new MatchError('winner not found in db -> cant save winner')

            return Event.findOne({ code: eventCode })
                .catch(error => { throw new SystemError(error.message) })
                .then(event => {
                    if (!event)
                        throw new MatchError('event not found -> cant save event winner')

                    if (event.winner)
                        throw new MatchError('event has already a winner -> cant save event winner')

                    return Event.findOneAndUpdate({ code: eventCode }, { winner: player._id })
                        .then(() => { })
                        .catch(error => { throw new SystemError(error.message) })
                })
        })
}
export default saveEventWinner