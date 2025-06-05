import { utils, validate } from 'com'

function getLoggedInUserId() {

    validate.token(sessionStorage.token)
    const { sub: userId } = utils.extractPayload(sessionStorage.token)

    return userId
}

export default getLoggedInUserId