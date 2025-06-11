// api/middlewares/handleError.js
import errors from 'com/errors.js'
const { ValidationError, NotFoundError, CredentialsError, UnauthorizedError, AuthorshipError, DuplicityError } = errors
function handleError(error, req, res, next) {
  if (error instanceof ValidationError)
    return res.status(400).json({ error: error.constructor.name, message: error.message })

  if (error instanceof NotFoundError)
    return res.status(404).json({ error: error.constructor.name, message: error.message })

  if (error instanceof CredentialsError)
    return res.status(401).json({ error: error.constructor.name, message: error.message })

  if (
    error instanceof UnauthorizedError ||
    error.name === 'JsonWebTokenError' ||
    error.name === 'TokenExpiredError'
  )
    return res.status(401).json({ error: 'Unauthorized', message: error.message })

  if (error instanceof AuthorshipError)
    return res.status(403).json({ error: error.constructor.name, message: error.message })

  if (error instanceof DuplicityError)
    return res.status(409).json({ error: error.constructor.name, message: error.message })

  if (error instanceof SyntaxError && error.message.includes('JSON'))
    return res.status(400).json({ error: 'BadRequest', message: 'Invalid JSON format' })

  if (error instanceof TypeError || error instanceof RangeError || error instanceof ReferenceError)
    return res.status(400).json({ error: error.constructor.name, message: error.message })

  // Por defecto: error interno del sistema
  return res.status(500).json({ error: 'SystemError', message: error.message })
}

export default handleError
