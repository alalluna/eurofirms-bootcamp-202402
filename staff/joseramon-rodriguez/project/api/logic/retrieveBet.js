import { validate, errors } from 'com'
import { User, Event, Bet, Player } from '../data/index.js'
const { SystemError, MatchError } = errors

function retrieveBet(userId, betId) {
    validate.id(userId, 'user id')
    validate.id(betId, 'bet id')

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new MatchError('user not found -> cant retrieve bet')

            return Bet.findById(betId).select('-__v -user').populate({
                path: 'event',
                select: 'name description startDate endDate status',
                populate: {
                    path: 'players',
                    model: 'Player'
                }
            }).populate('player', '-__v').lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(bet => {
                    if (!bet)
                        throw new MatchError('bet not found -> cant retrieve bet')

                    const betIdString = bet._id.toString()

                    const eventIdString = bet.event._id.toString()

                    const playerIdString = bet.player._id.toString()

                    delete bet._id

                    delete bet.event._id

                    delete bet.player._id

                    bet.id = betIdString

                    bet.event.id = eventIdString

                    bet.player.id = playerIdString

                    bet.event.players.forEach(player => {
                        const eventPlayerIdString = player._id.toString()

                        delete player._id

                        delete player.__v

                        player.id = eventPlayerIdString
                    })
                    return bet
                })
        })
}

export default retrieveBet

