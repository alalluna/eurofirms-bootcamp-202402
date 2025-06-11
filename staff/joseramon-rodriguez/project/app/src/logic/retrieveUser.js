import { errors, validate, utils } from 'com'

const { SystemError } = errors

function retrieveUser() {
    validate.token(sessionStorage.token)

    const { sub: userId } = utils.extractPayload(sessionStorage.token)

    return fetch(`${import.meta.env.VITE_API_URL}/users/${userId}`, {
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

export default retrieveUser