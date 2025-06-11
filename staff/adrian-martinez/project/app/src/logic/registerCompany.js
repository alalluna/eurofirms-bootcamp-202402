import { errors, validate } from "com"

const { SystemError } = errors;

function registerCompany(name, address, activity, email, password) {
    validate.name(name);
    validate.direccion(address);
    validate.actividad(activity);
    validate.email(email);
    validate.password(password);

    return fetch(`${import.meta.env.VITE_API_URL}/users/companies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, address, activity, email, password })
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(res => {
            if (res.status === 201) return

            return res.json()
                .catch(error => { throw new SystemError(error.message) })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}

export default registerCompany;

