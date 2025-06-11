import { validate, errors } from 'com'

const { SystemError } = errors

function updateOffer(offerId, title, description, minSalary, maxSalary, publishDate, expirationDate) {
    validate.token(sessionStorage.token)
    //validate.id(offerId, 'offerId')
    validate.text(title)
    validate.text(description)
    validate.salary(minSalary)
    validate.text(publishDate)

    return fetch(`${import.meta.env.VITE_API_URL}/offers/${offerId}`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, description, minSalary, maxSalary, publishDate, expirationDate})
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

export default updateOffer;