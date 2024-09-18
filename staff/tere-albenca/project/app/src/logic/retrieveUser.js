// import { errors, validate, utils } from 'com'

// const { SystemError } = errors

// function retrieveUser() {
//     validate.token(sessionStorage.token)

//     const { sub: userId } = utils.extractPayload(sessionStorage.token)

//     return fetch(`${import.meta.env.VITE_API_URL}/users/${userId}`, {
//         method: 'GET',
//         headers: {
//             Authorization: `Bearer ${sessionStorage.token}`
//         }
//     })
//         .catch(error => { throw new SystemError(error.message) })
//         .then(res => {
//             if (res.status === 200)
//                 return res.json()
//                     .catch(error => { throw new SystemError(error.message) })
//                     .then(user => user)

//             return res.json()
//                 .catch(error => { throw new SystemError(error.message) })
//                 .then(body => {
//                     const { error, message } = body

//                     const constructor = errors[error]

//                     throw new constructor(message)
//                 })
//         })
// }

// export default retrieveUser

import { errors, validate, utils } from 'com'

const { SystemError } = errors

function retrieveUser(targetUserId) {
    validate.token(sessionStorage.token)

    if (targetUserId)
        validate.id(targetUserId, 'targetUserId')
    else {
        const { sub } = utils.extractPayload(sessionStorage.token)

        targetUserId = sub
    }

    return fetch(`${import.meta.env.VITE_API_URL}/users/${targetUserId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`
        }
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(res => {
            if (res.status === 200)
                return res.json()
                    .catch(error => { throw new SystemError(error.message) })
                    .then(user => user)

            return res.json()
                .catch(error => { throw new SystemError(error.message) })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}

export default retrieveUser