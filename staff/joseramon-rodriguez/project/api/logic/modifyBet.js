import { validate, errors } from 'com'
import { Event, User, Bet } from '../data/index.js'

const { SystemError, MatchError } = errors

function modifyBet(userId, betId, amount) {
    validate.id(userId, 'user id')
    validate.id(betId, 'bet id')
    validate.amount(amount)

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new MatchError('user not found -> cant modify bet')

            return Bet.findById(betId)
                .catch(error => { throw new SystemError(error.message) })
                .then(bet => {
                    if (!bet)
                        throw new MatchError('bet not found -> cant modify bet')

                    if (bet.user.toString() !== userId)
                        throw new MatchError('you can only modify your own bets -> cant modify bet')

                    if (bet.amount === amount)
                        throw new MatchError('you cant modify bet with the same ammount')

                    return Event.findById(bet.event)
                        .catch(error => { throw new SystemError(error.message) })
                        .then(event => {
                            if (!event)
                                throw new MatchError('event not found ->cant modify bet')

                            if (event.status === 'closed')
                                throw new MatchError('you cant modify bets from closed event -> cant modify bet')

                            let newWallet = user.wallet

                            const netChange = bet.amount - amount

                            if (bet.amount > amount)
                                newWallet += netChange

                            else if (bet.amount < amount)
                                newWallet += netChange

                            if (newWallet < 0)
                                throw new MatchError('you cant bet more money than you have -> cant modify bet')

                            return User.findByIdAndUpdate(userId, { wallet: newWallet })
                                .catch(error => { throw new SystemError(error.message) })
                                .then(() => {
                                    return Bet.findByIdAndUpdate(betId, { amount })
                                        .catch(error => { throw new SystemError(error.message) })
                                        .then(() => { })
                                })
                        })

                })
        })
}

export default modifyBet