import { validate, errors } from "com";

const { SystemError } = errors;

function deleteCareer(careerId) {

    validate.token(sessionStorage.token);
    validate.id(careerId, "careerId");
    //validate.id(studentId, "studentId");

    return fetch(`http://localhost:8989/careers/${careerId}`, {
        method: 'DELETE',
        headers: { "Authorization": `Bearer ${sessionStorage.token}` },
    })
        .catch(error => { throw new SystemError(error.message) })
        .then((res) => {
            if (res.status === 204) return;

            return res.json()
                .catch(error => { throw new SystemError(error.message) })
                .then(body => {

                    const { error, message } = body;
                    const constructor = errors[error];
                    throw new constructor(message);
                })
        })

}

export default deleteCareer;