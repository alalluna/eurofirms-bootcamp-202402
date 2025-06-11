import { User } from '../data/index.js'
import { validate, errors } from 'com'

const { SystemError, MatchError } = errors

function addCreditToWallet(userId, amount) {
    validate.id(userId, 'user id')
    validate.amount(amount)

    return User.findById(userId).select('wallet').lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new MatchError('user not found -> cant add credit to wallet')

            const newWallet = user.wallet + amount

            return User.findByIdAndUpdate(userId, { wallet: newWallet })
                .catch(error => { throw new SystemError(error.message) })
        })
}

export default addCreditToWallet