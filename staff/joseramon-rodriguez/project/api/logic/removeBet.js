import { validate, errors } from 'com'
import { User, Event, Bet } from '../data/index.js'
const { SystemError, MatchError } = errors

function removeBet(userId, BetId) {
    validate.id(userId, 'user id')
    validate.id(BetId, 'bet id')

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new MatchError('user not found -> cant remove bet')

            return Bet.findById(BetId)
                .catch(error => { throw new SystemError(error.message) })
                .then(bet => {
                    if (!bet)
                        throw new MatchError('bet not found -> cant remove bet')

                    if (!bet.user === user._id)
                        throw new MatchError('you can only remove your own bets -> cant remove bet')

                    return Event.findById(bet.event)
                        .catch(error => { throw new SystemError(error.message) })
                        .then(event => {
                            if (!event)
                                throw new MatchError('event not found ->cant remove bet')

                            if (event.status === 'closed')
                                throw new MatchError('you cant remove bets from closed event -> cant remove bet')

                            const newWallet = user.wallet + bet.amount

                            return User.findByIdAndUpdate(userId, { wallet: newWallet })
                                .catch(error => { throw new SystemError(error.message) })
                                .then(() => {
                                    return Bet.findByIdAndDelete(BetId)
                                        .catch(error => { throw new SystemError(error.message) })
                                        .then(betDeleted => { })
                                })
                        })

                })
        })
}

export default removeBet