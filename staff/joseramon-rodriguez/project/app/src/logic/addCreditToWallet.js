import { validate, errors } from 'com'

const { SystemError } = errors

function addCreditToWallet(amount) {
    validate.token(sessionStorage.token)
    validate.amount(amount)

    return fetch(`${import.meta.env.VITE_API_URL}/users/wallet/add`, {
        method: 'PATCH',
        headers: { 'Content-type': 'application/json', 'authorization': `bearer ${sessionStorage.token}` },
        body: JSON.stringify({ amount })
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

export default addCreditToWallet