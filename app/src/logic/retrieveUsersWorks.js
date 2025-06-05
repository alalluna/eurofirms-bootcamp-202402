import { errors, validate } from 'com'

const { SystemError } = errors

function retrieveUsersWorks(targetUserId) {
    validate.token(sessionStorage.token)
    validate.id(targetUserId, 'targetUserId')

    return fetch(`${import.meta.env.VITE_API_URL}/profile/${targetUserId}/works`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`
        }
    })
        .then(res => {
            if (res.ok) {
                return res.json()
            } else {
                return res.json().then(body => {
                    const { error, message } = body
                    const constructor = errors[error]
                    throw new constructor(message)
                });
            }
        })
        .catch(error => {
            throw new SystemError(error.message)
        })
}

export default retrieveUsersWorks
