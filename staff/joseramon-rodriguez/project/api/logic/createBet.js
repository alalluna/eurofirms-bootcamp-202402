import { validate, errors } from 'com'
import { User, Event, Player, Bet } from '../data/index.js'

const { SystemError, MatchError } = errors
function createBet(userId, eventId, playerId, amount) {
    validate.id(userId, 'user id')
    validate.id(eventId, 'event id')
    validate.id(playerId, 'player id')
    validate.amount(amount)

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new MatchError('user not found -> cant create bet')

            if (amount > user.wallet)
                throw new MatchError('you cannot bet more money than you have in your wallet -> cant create bet')

            return Event.findById(eventId)
                .catch(error => { throw new SystemError(error.message) })
                .then(event => {
                    if (!event)
                        throw new MatchError('event not found -> cant create bet')

                    if (event.status === 'closed')
                        throw new MatchError('you cannot bet on closed events -> cant create bet')

                    return Player.findById(playerId)
                        .catch(error => { throw new SystemError(error.message) })
                        .then(player => {
                            if (!player)
                                throw new MatchError('player not found -> cant create bet')

                            if (!event.players.includes(player._id))
                                throw new MatchError('player is not playing in that event -> cant create bet')

                            const newWallet = user.wallet - amount

                            return User.findByIdAndUpdate(userId, { wallet: newWallet })
                                .catch(error => { throw new SystemError(error.message) })
                                .then(() => {
                                    const bet = { user: userId, event: eventId, player: playerId, amount }

                                    return Bet.create(bet)
                                        .catch(error => { throw new SystemError(error.message) })
                                        .then(betCreated => { })

                                })
                        })
                })
        })
}

export default createBet