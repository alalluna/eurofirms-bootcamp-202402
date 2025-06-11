import { validate, errors } from 'com'

const { SystemError } = errors

function removeBet(betId) {
    validate.token(sessionStorage.token)
    validate.id(betId, 'bet id')

    return fetch(`${import.meta.env.VITE_API_URL}/bet/${betId}`, {
        method: 'DELETE',
        headers: { 'authorization': `bearer ${sessionStorage.token}` }
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(res => {
            if (res.status === 204) return

            return res.json()
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}

export default removeBet