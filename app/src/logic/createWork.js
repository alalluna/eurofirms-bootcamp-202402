import { errors, validate } from 'com'

const { SystemError } = errors

async function createWork(title, imageFile, text) {
    validate.token(sessionStorage.token)
    validate.text(title, 'title')
    validate.text(text)

    const formData = new FormData()
    formData.append('title', title)
    formData.append('image', imageFile)
    formData.append('text', text)

    try {
        // const response = await fetch(`${import.meta.env.VITE_API_URL}/works`, {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/works`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${sessionStorage.token}`
            },
            body: formData
        })

        console.log('URL:', `${import.meta.env.VITE_API_URL}/works`)

        // if (response.status === 201) return;
        if (response.ok) {
            return await response.json() // Asegúrate de que el response sea parseado como JSON si se espera que tenga un cuerpo
        }

        const body = await response.json()
        const { error, message } = body

        const ErrorConstructor = errors[error]

        if (ErrorConstructor) {
            throw new ErrorConstructor(message)
        } else {
            throw new SystemError(message)
        }
    } catch (error) {
        throw new SystemError(error.message)
    }
}

export default createWork
