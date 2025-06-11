function extractPayload(token) {
    const [, payload64,] = token.split('.')
    const payloadJSON = atob(payload64)
    const payload = JSON.parse(payloadJSON)

    return payload
}

function formatDate(dateToFormat) {
    const date = new Date(dateToFormat)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    let hours = date.getHours()
    let minutes = date.getMinutes()

    if (hours < 10)
        hours = `0${hours}`

    if (minutes < 10)
        minutes = `0${minutes}`

    const newDate = `Date: ${day}/${month}/${year} Hours: ${hours}:${minutes}`

    return newDate
}

const utils = {
    extractPayload,
    formatDate
}

export default utils