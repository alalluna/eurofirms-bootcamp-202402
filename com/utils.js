function extractPayload(token) {
    const [, payload64,] = token.split('.')
    const payloadJSON = atob(payload64)
    const payload = JSON.parse(payloadJSON)

    return payload
}

const utils = {
    extractPayload
}

export default utils