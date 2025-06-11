import dotenv from 'dotenv'

dotenv.config()

import mongoose from 'mongoose'
import express from 'express'
import logic from './logic/index.js'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import { errors } from 'com'

const { MatchError, DuplicityError, ContentError } = errors
const { JsonWebTokenError, TokenExpiredError } = jwt

const { PORT, MONGO_URL, JWT_SECRET } = process.env

mongoose.connect(MONGO_URL)
    .then(() => {
        console.log(`DB connected at ${MONGO_URL}`)

        const server = express()

        const jsonBodyParser = express.json()

        server.use(cors())

        server.get('/', (req, res) => res.json({ hello: 'client' }))

        server.post('/users', jsonBodyParser, (req, res) => {
            try {
                const { username, email, password, birthdate, wallet } = req.body

                logic.registerUser(username, email, password, birthdate, wallet)
                    .then(() => res.status(201).send())
                    .catch(error => {
                        let status = 500

                        if (error instanceof DuplicityError)
                            status = 409

                        res.status(status).json({ error: error.constructor.name, message: error.message })
                    })
            } catch (error) {
                let status = 500

                if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError)
                    status = 400

                res.status(status).json({ error: error.constructor.name, message: error.message })
            }
        })

        server.post('/users/auth', jsonBodyParser, (req, res) => {
            try {
                const { username, password } = req.body

                logic.authecticateUser(username, password)
                    .then((userId) => {
                        const token = jwt.sign({ sub: userId }, JWT_SECRET, { expiresIn: '1h' })

                        res.status(200).json(token)
                    })
                    .catch(error => {
                        let status = 500

                        if (error instanceof MatchError)
                            status = 401

                        res.status(status).json({ error: error.constructor.name, message: error.message })
                    })
            } catch (error) {
                let status = 500

                if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError)
                    status = 400

                res.status(status).json({ error: error.constructor.name, message: error.message })
            }
        })

        server.get('/users/:targetUserId', (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                const { targetUserId } = req.params

                logic.retrieveUser(userId, targetUserId)
                    .then(user => res.json(user))
                    .catch(error => {
                        let status = 500

                        if (error instanceof MatchError)
                            status = 401

                        res.status(status).json({ error: error.constructor.name, message: error.message })
                    })
            } catch (error) {
                let status = 500

                if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError)
                    status = 400
                else if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError) {
                    status = 401

                    error = new MatchError(error.message)
                }

                res.status(status).json({ error: error.constructor.name, message: error.message })
            }
        })

        server.post('/event', jsonBodyParser, (req, res) => {
            try {
                const { authorization } = req.headers
                const token = authorization.slice(7)
                const { sub: userId } = jwt.verify(token, JWT_SECRET)
                const { name, description, players, startDate, endDate } = req.body

                logic.createEvent(userId, name, description, players, startDate, endDate)
                    .then(() => res.status(201).send())
                    .catch(error => {
                        let status = 500

                        if (error instanceof DuplicityError)
                            status = 409

                        res.status(status).json({ error: error.constructor.name, message: error.message })

                    })
            } catch (error) {
                let status = 500

                if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError)
                    status = 400
                else if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError) {
                    status = 401

                    error = new MatchError(error.message)
                }

                res.status(status).json({ error: error.constructor.name, message: error.message })
            }
        })

        server.get('/events', (req, res) => {
            try {
                const { authorization } = req.headers
                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                logic.retrieveEvents(userId)
                    .then(events => res.json(events))
                    .catch(error => {
                        let status = 500

                        if (error instanceof MatchError)
                            status = 401

                        res.status(status).json({ error: error.constructor.name, message: error.message })
                    })

            } catch (error) {
                let status = 500

                if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError) {
                    status = 401

                    error = new MatchError(error.message)
                }

                res.status(status).json({ error: error.constructor.name, message: error.message })
            }
        })

        server.get('/events/:targetEventId', (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                const { targetEventId } = req.params

                logic.retrieveEvent(userId, targetEventId)
                    .then(event => res.json(event))
                    .catch(error => {
                        let status = 500

                        if (error instanceof MatchError)
                            status = 401

                        res.status(status).json({ error: error.constructor.name, message: error.message })
                    })
            } catch (error) {
                let status = 500

                if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError)
                    status = 400
                else if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError) {
                    status = 401

                    error = new MatchError(error.message)
                }

                res.status(status).json({ error: error.constructor.name, message: error.message })
            }
        })

        server.post('/bet', jsonBodyParser, (req, res) => {
            try {
                const { authorization } = req.headers
                const token = authorization.slice(7)
                const { sub: userId } = jwt.verify(token, JWT_SECRET)
                const { eventId, playerId, amount } = req.body

                logic.createBet(userId, eventId, playerId, amount)
                    .then(() => res.status(201).send())
                    .catch(error => {
                        let status = 500

                        if (error instanceof MatchError)
                            status = 409

                        res.status(status).json({ error: error.constructor.name, message: error.message })

                    })
            } catch (error) {
                let status = 500

                if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError)
                    status = 400
                else if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError) {
                    status = 401

                    error = new MatchError(error.message)
                }

                res.status(status).json({ error: error.constructor.name, message: error.message })
            }
        })

        server.delete('/bet/:betId', (req, res) => {
            try {
                const { authorization } = req.headers
                const token = authorization.slice(7)
                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                const { betId } = req.params

                logic.removeBet(userId, betId)
                    .then(() => res.status(204).send())
                    .catch(error => {
                        let status = 500

                        if (error instanceof MatchError)
                            status = 409

                        res.status(status).json({ error: error.constructor.name, message: error.message })

                    })
            } catch (error) {
                let status = 500

                if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError)
                    status = 400
                else if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError) {
                    status = 401

                    error = new MatchError(error.message)
                }

                res.status(status).json({ error: error.constructor.name, message: error.message })
            }
        })

        server.patch('/bet/:betId', jsonBodyParser, (req, res) => {
            try {
                const { authorization } = req.headers
                const token = authorization.slice(7)
                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                const { amount } = req.body

                const { betId } = req.params

                logic.modifyBet(userId, betId, amount)
                    .then(() => res.status(204).send())
                    .catch(error => {
                        let status = 500

                        if (error instanceof MatchError)
                            status = 409

                        res.status(status).json({ error: error.constructor.name, message: error.message })

                    })
            } catch (error) {
                let status = 500

                if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError)
                    status = 400
                else if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError) {
                    status = 401

                    error = new MatchError(error.message)
                }

                res.status(status).json({ error: error.constructor.name, message: error.message })
            }
        })
        //retrieveBetsFromUser
        server.get('/bets/:targetUserId', (req, res) => {
            try {
                const { authorization } = req.headers
                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                const { targetUserId } = req.params

                logic.retrieveBetsFromUser(userId, targetUserId)
                    .then(betsFromUser => res.json(betsFromUser))
                    .catch(error => {
                        let status = 500

                        if (error instanceof MatchError)
                            status = 401

                        res.status(status).json({ error: error.constructor.name, message: error.message })
                    })

            } catch (error) {
                let status = 500

                if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError) {
                    status = 401

                    error = new MatchError(error.message)
                }

                res.status(status).json({ error: error.constructor.name, message: error.message })
            }
        })
        //retrieveBet
        server.get('/bet/:targetBetId', (req, res) => {
            try {
                const { authorization } = req.headers
                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                const { targetBetId } = req.params

                logic.retrieveBet(userId, targetBetId)
                    .then(bet => res.json(bet))
                    .catch(error => {
                        let status = 500

                        if (error instanceof MatchError)
                            status = 401

                        res.status(status).json({ error: error.constructor.name, message: error.message })
                    })

            } catch (error) {
                let status = 500

                if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError) {
                    status = 401

                    error = new MatchError(error.message)
                }

                res.status(status).json({ error: error.constructor.name, message: error.message })
            }
        })

        server.patch('/users/wallet/add', jsonBodyParser, (req, res) => {
            try {
                const { authorization } = req.headers
                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                const { amount } = req.body

                logic.addCreditToWallet(userId, amount)
                    .then(() => res.status(204).send())
                    .catch(error => {
                        let status = 500

                        if (error instanceof MatchError)
                            status = 401

                        res.status(status).json({ error: error.constructor.name, message: error.message })
                    })

            } catch (error) {
                let status = 500

                if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError) {
                    status = 401

                    error = new MatchError(error.message)
                }

                res.status(status).json({ error: error.constructor.name, message: error.message })
            }
        })

        server.patch('/users/wallet/substract', jsonBodyParser, (req, res) => {
            try {
                const { authorization } = req.headers
                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                const { amount } = req.body

                logic.substractCreditFromWallet(userId, amount)
                    .then(() => res.status(204).send())
                    .catch(error => {
                        let status = 500

                        if (error instanceof MatchError)
                            status = 401

                        res.status(status).json({ error: error.constructor.name, message: error.message })
                    })

            } catch (error) {
                let status = 500

                if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError) {
                    status = 401

                    error = new MatchError(error.message)
                }

                res.status(status).json({ error: error.constructor.name, message: error.message })
            }
        })


        server.listen(PORT, () => console.log(`API started on port ${PORT}`))
    })
    .catch(error => console.error(error))