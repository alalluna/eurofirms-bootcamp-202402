import { errors, validate } from 'com'

const { SystemError } = errors;

async function searchWorks(searchQuery) {
    // Validar el token de sesión y el texto de búsqueda
    validate.token(sessionStorage.token)
    validate.text(searchQuery, 'searchQuery')

    try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/works/search?q=${searchQuery}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${sessionStorage.token}`
            }
        })

        if (res.status === 200) {
            try {
                const works = await res.json()
                return works;
            } catch (error) {
                throw new SystemError(error.message)
            }
        }

        try {
            const body = await res.json()
            const { error, message } = body

            const Constructor = errors[error]
            throw new Constructor(message)
        } catch (error) {
            throw new SystemError(error.message)
        }
    } catch (error) {
        throw new SystemError(error.message)
    }
}

export default searchWorks