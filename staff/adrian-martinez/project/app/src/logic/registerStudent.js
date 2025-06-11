import { errors, validate } from "com"

const { SystemError } = errors;

function registerStudent(name, surnames, age, email, password) {
    validate.name(name);
    validate.surnames(surnames);
    validate.age(age);
    validate.email(email);
    validate.password(password);

    return fetch(`${import.meta.env.VITE_API_URL}/users/students`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, surnames, age, email, password })
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

export default registerStudent;