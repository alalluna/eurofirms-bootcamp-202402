import { User } from '../data/index.js'
import { validate, errors } from 'com'

const { SystemError, MatchError } = errors

function substractCreditFromWallet(userId, amount) {
    validate.id(userId, 'user id')
    validate.amount(amount)

    return User.findById(userId).select('wallet').lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new MatchError('user not found -> cant add credit to wallet')

            const newWallet = user.wallet - amount

            if (newWallet < 0)
                throw new MatchError('wallet cant be negative after substraction -> cant substract creadit from wallet')

            return User.findByIdAndUpdate(userId, { wallet: newWallet })
                .catch(error => { throw new SystemError(error.message) })
        })
}

export default substractCreditFromWallet