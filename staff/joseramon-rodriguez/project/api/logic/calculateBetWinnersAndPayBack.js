import { Event, Bet, User } from '../data/index.js'
import { errors } from 'com'

const { SystemError, MatchError } = errors

function calculateBetWinnersAndPayback() {
    //*get all open events
    //*get winner
    //*check bet winners
    //*return double the ammount bet to bet winners
    //*pay winners
    //*close event
    return Event.find({ status: 'open' }).select('-__v').lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(events => {
            if (!events)
                throw new MatchError('open events not found -> cant calculate winners and pay back')

            events.forEach(event => {
                if (!event.winner)
                    return

                return Event.findByIdAndUpdate(event._id, { status: 'closed' })
                    .catch(error => { throw new SystemError(error.message) })
                    .then(() => {
                        return Bet.find({ event: event._id })
                            .catch(error => { throw new SystemError(error.message) })
                            .then(bets => {
                                if (!bets)
                                    throw new MatchError('bets not found -> cant calculate winners and pay back')

                                let betWinners = []
                                bets.forEach(bet => {
                                    if (bet.player.toString() === event.winner.toString())
                                        betWinners.push({ user: bet.user.toString(), amount: bet.amount })
                                })

                                betWinners.forEach(async betWinner => {
                                    await User.findById(betWinner.user)
                                        .catch(error => { throw new SystemError(error.message) })
                                        .then(user => {
                                            if (!user)
                                                throw new MatchError('user not found -> cant calculate bet winners and pay back')

                                            const newWallet = user.wallet + (betWinner.amount * 2)

                                            user.wallet = newWallet

                                            return user.save()
                                                .catch(error => { throw new SystemError(error.message) })
                                        })
                                })
                            })
                    })
            })
        })
}

export default calculateBetWinnersAndPayback