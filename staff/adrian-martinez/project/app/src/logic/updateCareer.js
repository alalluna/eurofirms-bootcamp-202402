import { validate, errors } from 'com'

const { SystemError } = errors

function updateCareer(careerId, title, description, certification) {
    validate.token(sessionStorage.token)
    //validate.id(careerId, 'careerId')
    validate.text(title)
    validate.text(description)
    validate.text(certification)

    return fetch(`${import.meta.env.VITE_API_URL}/careers/${careerId}`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, description, certification })
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(res => {
            if (res.status === 204)
                return

            return res.json()
                .catch(error => { throw new SystemError(error.message) })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}

export default updateCareer