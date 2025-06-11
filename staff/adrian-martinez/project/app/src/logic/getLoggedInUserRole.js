import { utils, validate } from "com";

function getLoggedInUserRole() {

    validate.token(sessionStorage.token);
    const { role } = utils.extractPayload(sessionStorage.token)

    return role;
}

export default getLoggedInUserRole;