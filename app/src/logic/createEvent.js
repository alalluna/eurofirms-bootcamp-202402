 async function createEvent({ title, start, end }) {
    const event = {
        summary: title,
        start: { dateTime: start, timeZone: 'Europe/Madrid' },
        end: { dateTime: end, timeZone: 'Europe/Madrid' }
    }

    const response = await fetch(`${import.meta.env.VITE_API_URL}/calendar/events`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.token}`
        },
        body: JSON.stringify(event)
    })

    if (!response.ok) {
        const { error, message } = await response.json()
        throw new Error(`${error}: ${message}`)
    }

    return await response.json()
}
export default createEvent