import { errors, validate } from 'com'

const { SystemError } = errors

function retrieveBetsFromUser(targetUserId) {
    validate.token(sessionStorage.token)
    validate.id(targetUserId, 'target user id')

    return fetch(`${import.meta.env.VITE_API_URL}/bets/${targetUserId}`, {
        method: 'GET',
        headers: { authorization: `Bearer ${sessionStorage.token}` }
    })
        .then(res => {
            if (res.status === 200) return res.json()

            return res.json()
                .then(res => {
                    const { error, message } = res

                    const constructor = errors[error]


                    throw new constructor(message)
                })
                .catch(error => { throw new SystemError(error.message) })
        })
        .catch(error => { throw new SystemError(error.message) })
}

export default retrieveBetsFromUser