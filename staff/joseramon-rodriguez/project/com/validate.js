import errors from './errors.js'
import utils from './utils.js'

const { ContentError, MatchError } = errors

function validateName(name, explain = 'username') {
    if (typeof name !== 'string')
        throw new TypeError(`${explain} must be a string`)

    if (name.length < 1)
        throw new RangeError(`${explain} must be at least 1 non blank character`)

    let nameIsBlank

    for (let i = 0; i < name.length && nameIsBlank; i++) {
        const char = name[i]

        if (char !== ' ')
            nameIsBlank = false
    }

    if (nameIsBlank)
        throw new ContentError(`${explain} cant be all blank characters`)
}

function validateDate(date, explain = 'date') {
    //format yyyy-mm-dd
    if (typeof date !== 'string')
        throw new TypeError(`${explain} must be a string`)

    if (date.length !== 16)
        throw new RangeError(`${explain} must be 16 characters only`)

    if (date.indexOf('-') !== 4 || date.lastIndexOf('-') !== 7)
        throw new ContentError(`${explain} dashes must be in correct place`)

}

function validateBirthDate(date) {
    //format yyyy-mm-dd
    if (typeof date !== 'string')
        throw new TypeError('birth date must be a string')

    if (date.length !== 10)
        throw new RangeError('birth date must be 10 characters only')

    if (date.indexOf('-') !== 4 || date.lastIndexOf('-') !== 7)
        throw new ContentError('birth date dashes must be in correct place')

}

function validateIsAdult(birthdate) {
    const now = new Date()
    const birthDate = new Date(birthdate)

    const diffTime = Math.abs(now - birthDate);

    const age = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365))

    if (age < 18)
        throw new MatchError('invalid birthdate you must be at least 18 years old')
}

function validateEventDates(start, end) {
    const dateStart = new Date(start)
    const dateEnd = new Date(end)
    const now = new Date()

    if (dateStart < now)
        throw new MatchError('start date must be a future date')

    if (dateEnd < now)
        throw new MatchError('end date must be a future date')

    if (dateEnd < dateStart)
        throw new MatchError('start date must be before end date')

    if (dateStart.getTime() === dateEnd.getTime())
        throw new MatchError('start date must be different from end date')
}

function validateEmail(email) {
    if (typeof email !== 'string')
        throw new TypeError('email must be a string')

    if (email.length < 6)
        throw new RangeError('email must be at least 7 characters')

    if (!email.includes('@'))
        throw new ContentError('email must include the -> @ <- character')

    if (!email.includes('.'))
        throw new ContentError('email must include the -> . <- character')

    if (email.lastIndexOf('.') < email.indexOf('@'))
        throw new ContentError('email contains -> . <- before -> @ <-')

    if (email.lastIndexOf('.') - email.indexOf('@') < 2)
        throw new ContentError('email contains -> . <- next to -> @ <-')

    if (email.length - 1 - email.indexOf('.') < 2)
        throw new ContentError('email domain is lower than 2 characters')

    if (email.includes(' '))
        throw new ContentError('email cant contain space characters')
}

function validatePassword(password) {
    if (typeof password !== 'string')
        throw new TypeError('password must be a string')

    if (password.length < 8)
        throw new RangeError('password must be at least 8 characters')

    if (password.includes(' '))
        throw new ContentError('password cant contain space characters')

    if (!password.length)
        throw new ContentError('password cant be empty')
}

function validateId(id, explain = 'id') {
    if (typeof id !== 'string')
        throw new TypeError(`${explain} must be a string`)

    if (id.includes(' '))
        throw new ContentError(`${explain} cant contain space characters`)

    if (!id.length)
        throw new ContentError(`${explain} is empty`)

    if (id.length !== 24)
        throw new RangeError(`${explain} length is not 24`)
}

function validateText(text, explain = 'text') {
    if (typeof text !== 'string')
        throw new TypeError(`${explain} must be a string`)

    if (!text.length)
        throw new ContentError(`${explain} is empty`)
}

function validateToken(token, explain = 'token') {
    if (typeof token !== 'string')
        throw new TypeError(`${explain} must be a string`)

    if (!token.length)
        throw new ContentError(`${explain} is empty`)

    const payload = utils.extractPayload(token)

    const { exp } = payload

    const now = Date.now() / 1000

    if (exp < now)
        throw new MatchError(`${explain} expired`)
}

function validateWallet(wallet) {
    if (typeof wallet !== 'number')
        throw new TypeError('wallet must be a number')

    if (wallet < 0)
        throw new ContentError('wallet must be at least 0')
}

function validateAmount(amount) {
    if (typeof amount !== 'number')
        throw new TypeError('amount must be a number')

    if (amount < 1)
        throw new ContentError('amount must be at least 1')
}

function validatePlayers(players) {
    if (!players instanceof Array)
        throw new TypeError('players must be an array')

}

const validate = {
    name: validateName,
    date: validateDate,
    birthdate: validateBirthDate,
    adult: validateIsAdult,
    eventDates: validateEventDates,
    email: validateEmail,
    password: validatePassword,
    id: validateId,
    text: validateText,
    token: validateToken,
    wallet: validateWallet,
    amount: validateAmount,
    players: validatePlayers,
}

export default validate