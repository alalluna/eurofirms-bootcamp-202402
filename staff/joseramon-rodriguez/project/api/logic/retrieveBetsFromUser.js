import { User, Bet } from '../data/index.js'
import { validate, errors } from "com"

const { SystemError, MatchError } = errors

function retrieveBetsFromUser(userId, targetUserId) {
    validate.id(userId, 'user id')
    validate.id(targetUserId, 'target user id')

    return User.findById(targetUserId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new MatchError('user not found -> cant retrieve events')

            return Bet.find().select('-__v -user').populate('event', '-_id name description status startDate').populate('player', '-_id name').lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(bets => {

                    if (!bets)
                        throw new MatchError('bets not found -> cant retrieve bets')

                    bets.forEach(bet => {
                        const idToString = bet._id.toString()

                        delete bet._id

                        bet.id = idToString

                    })

                    const sortedBets = bets.sort((a, b) => {
                        const aStatus = a.event.status
                        const bStatus = b.event.status

                        const aStartDate = a.event.startDate.getTime()
                        const bStartDate = b.event.startDate.getTime()

                        if (aStatus === 'open' && bStatus === 'closed') {
                            return -1
                        }

                        if (aStatus === 'closed' && bStatus === 'open')
                            return 1

                        return aStartDate - bStartDate
                    })

                    return sortedBets
                })

        })

}

export default retrieveBetsFromUser
