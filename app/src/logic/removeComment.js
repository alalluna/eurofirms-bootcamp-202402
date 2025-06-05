import { errors, validate } from 'com'

const { SystemError } = errors

function removeComment(workId, commentId) {
    validate.id(workId, 'workId')
    validate.id(commentId, 'commentId')

    return fetch(`${import.meta.env.VITE_API_URL}/works/${workId}/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`
        }
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(res => {
            if (res.status === 204) return

            return res.json()
                .catch(error => { throw new SystemError(error.message) })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}

export default removeComment