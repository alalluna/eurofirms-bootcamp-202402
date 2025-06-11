
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


class ValidationError extends Error {
     constructor(message) {
        super(message)
        this.name = ValidationError.name
    }
}

class NotFoundError extends Error {
     constructor(message) {
        super(message)
        this.name = NotFoundError.name
    }
}

class CredentialsError extends Error {
     constructor(message) {
        super(message)
        this.name = CredentialsError.name
    }
}

class AuthorshipError extends Error {
     constructor(message) {
        super(message)
        this.name = AuthorshipError.name
    }
}

const errors = {
    SystemError,
    ContentError,
    DuplicityError,
    MatchError,
    UnauthorizedError,
    ValidationError,
    NotFoundError,
    CredentialsError,
    AuthorshipError
}

export default errors
export {
   SystemError,
    ContentError,
    DuplicityError,
    MatchError,
    UnauthorizedError,
    ValidationError,
    NotFoundError,
    CredentialsError,
    AuthorshipError

}