import { errors, validate } from 'com'

const { SystemError } = errors

function updateLesson(lessonId, title, description, link, video) {

    validate.token(sessionStorage.token)
    validate.id(lessonId, 'lessonId')
    validate.text(title, 'title')
    validate.text(description, 'description')
    validate.url(link, 'link')
    validate.url(video, 'video')


    return fetch(`${import.meta.env.VITE_API_URL}/lessons/${lessonId}`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, text, description, link, video })
    })

        .catch(error => { throw new SystemError(error.message) })
        .then(res => {
            if (res.status === 204) return

            return res.json()
                .catch(error => { throw new SystemError(error.message) })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}

export default updateLesson