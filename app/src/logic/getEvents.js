import { errors } from 'com'
const { SystemError } = errors
async function getEvents() {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/calendar/events`, {
        method: 'GET',

    })

    if (!response.ok) {
        throw new SystemError('Error inesperado en el servidor')
    }

    return await response.json()
}
export default getEvents