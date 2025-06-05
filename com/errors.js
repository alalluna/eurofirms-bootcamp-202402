
class SystemError extends Error {
    constructor(message) {
        super(message)

        this.name = SystemError.name
    }
}

class ContentError extends Error {
    constructor(message) {
        super(message)

        this.name = ContentError.name
    }
}

class DuplicityError extends Error {
    constructor(message) {
        super(message)

        this.name = DuplicityError.name
    }
}

class MatchError extends Error {
    constructor(message) {
        super(message)

        this.name = MatchError.name
    }
}

class UnauthorizedError extends Error {
    constructor(message) {
        super(message)
        this.name = UnauthorizedError.name
    }
}

function handleError(res, error) {
    let status = 500

    if (error instanceof ContentError || error instanceof TypeError || error instanceof RangeError)
        status = 400
    else if (error instanceof DuplicityError)
        status = 409
    else if ( error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError')
        status = 401
    else if (error instanceof UnauthorizedError)
    status = 401
    else if (error instanceof MatchError)
        status = 403 

    res.status(status).json({ error: error.constructor?.name || 'Error', message: error.message })
}

export {
    SystemError,
    ContentError,
    DuplicityError,
    MatchError,
    UnauthorizedError,
    handleError
}

const errors = {
    SystemError,
    ContentError,
    DuplicityError,
    TypeError,
    RangeError,
    UnauthorizedError,
    MatchError
}

export default errors