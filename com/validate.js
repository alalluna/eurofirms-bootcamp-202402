import errors from './errors.js'

const { ContentError, MatchError } = errors

function validateName(name) {
    if (typeof name !== 'string') throw new TypeError('name is not string')

    if (name.length < 1)
        throw new RangeError('name is lower than 1 character')

    var nameIsBlank = true

    for (var i = 0; i < name.length && nameIsBlank; i++) {
        var char = name[i]

        if (char !== ' ')
            nameIsBlank = false
    }

    if (nameIsBlank)
        throw new ContentError('name is blank')
}


function validateSurname(surname) {
    if (typeof surname !== 'string') throw new TypeError('surname is not string')

    if (surname.length < 2)
        throw new RangeError('surname is lower than 2 character')

    var surnameIsBlank = true

    for (var i = 0; i < surname.length && surnameIsBlank; i++) {
        var char = surname[i]

        if (char !== ' ')
            surnameIsBlank = false
    }

    if (surnameIsBlank)
        throw new ContentError('surname is blank')
}

function validateEmail(email) {
    if (typeof email !== 'string') throw new TypeError('email is not string')

    if (email.length < 6)
        throw new RangeError('email is lower than 6 characters')

    if (!email.includes('@'))
        throw new ContentError('email has no @')

    if (!email.includes('.'))
        throw new ContentError('email has no .')

    if (email.lastIndexOf('.') < email.indexOf('@'))
        throw new ContentError('email has . before @')

    if (email.lastIndexOf('.') - email.indexOf('@') < 2)
        throw new ContentError('email has . next to @')

    if (email.length - 1 - email.indexOf('.') < 2)
        throw new ContentError('email domain is lower than 2 characters')

    if (email.includes(' '))
        throw new ContentError('email has space character')
}

function validatePassword(password) {
    if (typeof password !== 'string') throw new TypeError('password is not string')

    if (password.length < 8)
        throw new RangeError('password is lower than 8 characters')

    if (password.includes(' '))
        throw new ContentError('password has space character')
}

function validateId(id, explain = 'id') {
    if (typeof id !== 'string') throw new TypeError(`${explain} is not a string`)

    if (id.length !== 24) throw new RangeError(`${explain} length is not 24`)

    if (id.includes(' ')) throw new ContentError(`${explain} has spaces`)

    if (!id.length) throw new ContentError(`${explain} is empty`)
}

function validateText(text, explain = 'text') {
    if (typeof text !== 'string') throw new TypeError(`${explain} is not a string`)

    if (!text.length) throw new ContentError(`${explain} is empty`)
}

function validateUrl(url, explain = 'url') {
    if (typeof url !== 'string') throw new TypeError(`${explain} is not a string`)

    if (!url.length) throw new ContentError(`${explain} is empty`)

    if (!url.startsWith('http')) throw new ContentError(`${explain} is not an http address`)
}

function validateToken(token, explain = 'token') {
    if (typeof token !== 'string') throw new TypeError(`${explain} is not a string`)

    if (!token.length) throw new ContentError(`${explain} is empty`)

    const [, payload64,] = token.split('.')
    const payloadJSON = atob(payload64)
    const payload = JSON.parse(payloadJSON)

    const { exp } = payload

    const now = Date.now() / 1000

    if (exp < now) throw new MatchError(`${explain} expired`)
}

const validate = {
    name: validateName,
    surname: validateSurname,
    email: validateEmail,
    password: validatePassword,
    id: validateId,
    text: validateText,
    url: validateUrl,
    token: validateToken
}

export default validate