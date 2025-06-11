import { validate, errors } from 'com'

const { SystemError } = errors

function createBet(eventId, playerId, amount) {
    validate.token(sessionStorage.token)
    validate.id(eventId, 'event id')
    validate.id(playerId, 'player id')
    validate.amount(amount)

    return fetch(`${import.meta.env.VITE_API_URL}/bet`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json', 'authorization': `bearer ${sessionStorage.token}` },
        body: JSON.stringify({ eventId, playerId, amount })
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(res => {
            if (res.status === 201) return

            return res.json()
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}

export default createBet