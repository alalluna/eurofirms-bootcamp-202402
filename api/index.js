import mongoose from 'mongoose'
import express from 'express'
import logic from './logic/index.js'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import { errors } from 'com'
import dotenv from 'dotenv'
import { google } from 'googleapis'
import { upload } from './config/multer.js'
import { uploadFile } from './util/uploadFile.js'
import { handleError } from '../com/errors.js'

dotenv.config() // Cargar variables de entorno
const { JsonWebTokenError, TokenExpiredError } = jwt
const { ContentError, DuplicityError, MatchError,UnauthorizedError } = errors
const { PORT, MONGO_URL, JWT_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI } = process.env

// Configuración de Google OAuth
const oauth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URI
)

mongoose.connect(MONGO_URL)
    .then(() => {
        console.log(`DB connected at ${MONGO_URL}`)

        const server = express()

        const jsonBodyParser = express.json() // JSON.parse(...)

        const allowedOrigins = ['http://localhost:5173', 'https://alalluna.netlify.app']

        // server.use(cors()) //en lugar de esto es necesario permitir acceso a los header 
        server.use(cors({
            origin: function (origin, callback) {
                if (!origin || allowedOrigins.includes(origin)) {
                    callback(null, true)
                } else {
                    callback(new Error('Not allowed by CORS'))
                }
            },
            credentials: true // Si usas cookies o autorización por header
        }))

        server.use((req, res, next) => {
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
            next()
        })

        // Endpoint para iniciar el flujo de autenticación con Google

        server.get('/auth/google', (req, res) => {
            const scopes = [
                'https://www.googleapis.com/auth/calendar.events',
                'https://www.googleapis.com/auth/calendar',
                'https://www.googleapis.com/auth/userinfo.email',
                'https://www.googleapis.com/auth/userinfo.profile'
            ]

            const authUrl = oauth2Client.generateAuthUrl({
                access_type: 'offline',
                scope: scopes,
                prompt: 'consent',
            })

            res.redirect(authUrl)
        })

        // Endpoint para manejar el callback de Google

        server.get('/google/redirect', async (req, res) => {
            const { code } = req.query

            try {
                const { tokens } = await oauth2Client.getToken(code)

                oauth2Client.setCredentials(tokens)

                // Guarda los tokens en tu base de datos junto con el usuario autenticado
                // Ejemplo: await logic.saveGoogleTokens(userId, tokens);

                res.status(200).json({ message: 'Google tokens saved successfully', tokens })
            } catch (error) {
                handleError(res, error)
            }
        })

        // Obtener eventos del calendario de Google

        server.get('/calendar/events', async (req, res) => {
            try {
                // const { authorization } = req.headers
                // const token = authorization.slice(7)

                // const { sub: userId } = jwt.verify(token, JWT_SECRET)

                // // Recupera los tokens de Google guardados en tu base de datos
                // const googleTokens = await logic.getGoogleTokens(userId)

                oauth2Client.setCredentials(googleTokens)

                const calendar = google.calendar({ version: 'v3', auth: oauth2Client })

                const { data } = await calendar.events.list({
                    calendarId: 'primary',
                    timeMin: new Date().toISOString(),
                    maxResults: 10,
                    singleEvents: true,
                    orderBy: 'startTime',
                })

                res.json(data.items)
            } catch (error) {
                handleError(res, error)
            }
        })

        // Crear un evento en Google Calendar

        server.post('/calendar/events', jsonBodyParser, async (req, res) => {
            try {
                const { authorization } = req.headers
                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                // Recupera los tokens de Google guardados en tu base de datos
                const googleTokens = await logic.getGoogleTokens(userId)

                oauth2Client.setCredentials(googleTokens)

                const calendar = google.calendar({ version: 'v3', auth: oauth2Client })

                const event = req.body

                const { data } = await calendar.events.insert({
                    calendarId: 'primary',
                    resource: event,
                })

                res.status(201).json(data)
            } catch (error) {
                handleError(res, error)
            }
        })


        //registerStudent

        server.post('/users/students', jsonBodyParser, (req, res) => {

            try {
                const { authorization } = req.headers
                const token = authorization?.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)
                const { name, surname, email, password } = req.body

                logic.registerStudent(userId, name, surname, email, password)
                    .then(() => res.status(201).send())
                    .catch(error => {
                         handleError(res, error)
                    })

            } catch (error) {
                handleError(res, error)
            }
        })

        //registerTeacher

        server.post('/users/teachers', jsonBodyParser, (req, res) => {

            try {
                const { authorization } = req.headers
                const token = authorization?.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)
                const { name, surname, email, password } = req.body

                logic.registerTeacher(userId, name, surname, email, password)
                    .then(() => res.status(201).send())
                    .catch(error => {
                         handleError(res, error)
                    })

            } catch (error) {
                handleError(res, error)
            }
        })

        //authenticateUser

        server.post('/users/auth', jsonBodyParser, (req, res) => {
            try {
                const { email, password } = req.body

                logic.authenticateUser(email, password)
                    .then(user => {
                        const token = jwt.sign({ sub: user.id, role: user.role }, JWT_SECRET, { expiresIn: '120m' })

                        res.status(200).json(token)
                    })
                    .catch(error => {
                         handleError(res, error)
                    })

            } catch (error) {
                handleError(res, error)
            }
        })

        //retreiveUser

        server.get('/users/:targetUserId', (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                const { targetUserId } = req.params

                logic.retrieveUser(userId, targetUserId)
                    .then(user => res.json(user))
                    .catch(error => {
                         handleError(res, error)
                    })
            } catch (error) {
                handleError(res, error)
            }
        })

        //new create-work
        //prettier-ignore
        server.post('/works', upload.fields([{ name: 'image', maxCount: 1 }]), async (req, res) => {
            try {
                const { authorization } = req.headers
                const token = authorization && authorization.slice(7)
                if (!token) throw new UnauthorizedError('token not provided')

                const { sub: userId } = jwt.verify(token, JWT_SECRET)
                const { title, text } = req.body;
                const file = req.files && req.files.image && req.files.image[0]

                if (!file) {
                    return res.status(400).json({ error: 'No file uploaded' })
                }

                const { downloadURL } = await uploadFile(file)
                const imageUrl = downloadURL

                const createdWork = await logic.createWork(userId, title, imageUrl, text)

                res.status(201).json(createdWork)
            } catch (error) {
                handleError(res, error)
            }
        })

        //removeWork

        server.delete('/works/:workId', (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization && authorization.slice(7)
                if (!token) throw new UnauthorizedError('token not provided')

                const { sub: userId } = jwt.verify(token, JWT_SECRET)
                const { workId } = req.params

                logic.removeWork(userId, workId)
                    .then(work => res.status(204).send())
                    .catch(error => {
                        handleError(res, error)
                    })

            } catch (error) {
                handleError(res, error)
            }
        })

        //update work

        server.patch('/works/:workId', jsonBodyParser, (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                const { workId } = req.params

                const { title, text } = req.body

                logic.updateWork(userId, workId, title, text)
                    .then(() => res.status(204).send())
                    .catch(error => {
                        handleError(res, error)
                    })

            } catch (error) {
                 handleError(res, error)
            }
        })

        //retrieveWorks

        server.get('/works', (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                logic.retrieveWorks(userId)
                    .then(works => res.status(200).json(works))
                    .catch(error => {
                        handleError(res, error)
                    })

            } catch (error) {
                handleError(res, error)
            }
        })

        // retrieveUserWorks

        server.get('/profile/:targetUserId/works', (req, res) => {
            try {
                const { authorization } = req.headers
                const token = authorization.slice(7)
                const { sub: userId } = jwt.verify(token, JWT_SECRET)
                const { targetUserId } = req.params

                logic.retrieveUserWorks(userId, targetUserId)
                    .then(works => res.status(200).json(works))
                    .catch(error => {
                        let status = 500

                        if (error instanceof MatchError)
                            status = 401

                        res.status(status).json({ error: error.constructor.name, message: error.message })
                    })
            } catch (error) {
                 handleError(res, error)
            }
        })

        //like a work

        server.put('/works/:workId/likes', (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                const { workId } = req.params
                logic.giveLikeWork(userId, workId)
                    .then(() => res.status(204).send())
                    .catch(error => {
                        handleError(res, error)
                    })
            } catch (error) {
                 handleError(res, error)
            }
        })


        // createComment

        server.post('/works/:workId/comments', jsonBodyParser, (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                const { workId } = req.params

                const { text } = req.body

                logic.createComment(userId, workId, text)
                    .then(() => res.status(201).send())
                    .catch(error => {
                         handleError(res, error)
                    })

            } catch (error) {
                 handleError(res, error)
            }
        })


        // removeComment

        server.delete('/works/:workId/comments/:commentId', (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                const { workId, commentId } = req.params

                logic.removeComment(userId, workId, commentId)
                    .then(() => res.status(204).send())
                    .catch(error => {
                        handleError(res, error)
                    })

            } catch (error) {
                 handleError(res, error)
            }
        })

        //retrieveComment

        server.get('/works/:workId/comments/:commentId', (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                const { workId, commentId } = req.params

                logic.retrieveComment(userId, workId, commentId)
                    .then(comment => res.status(200).json(comment))
                    .catch(error => {
                         handleError(res, error)
                    })

            } catch (error) {
                 handleError(res, error)
            }
        })

        //retrieveComments

        server.get('/works/:workId/comments/', (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                const { workId } = req.params


                logic.retrieveComments(userId, workId)
                    .then(comments => res.status(200).json(comments))
                    .catch(error => {
                         handleError(res, error)
                    })

            } catch (error) {
                 handleError(res, error)
            }
        })

        //update comment

        server.patch('/works/:workId/comments/:commentId', jsonBodyParser, (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                const { workId, commentId } = req.params

                const { text } = req.body

                logic.updateComment(userId, workId, commentId, text)
                    .then(() => res.status(204).send())
                    .catch(error => {
                        handleError(res, error)
                    })

            } catch (error) {
                handleError(res, error)
            }
        })

        //searchWorks

        server.get('/works/search', (req, res) => {
            try {

                const { q } = req.query

                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                logic.searchWorks(userId, q)
                    .then(works => res.status(200).json(works))
                    .catch(error => {
                         handleError(res, error)
                    })

            } catch (error) {
                 handleError(res, error)
            }

        })

        //createLesson

        server.post('/lessons', jsonBodyParser, (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                const { title, image, description, link, video } = req.body

                logic.createLesson(userId, title, image, description, link, video)
                    .then(() => res.status(201).send())
                    .catch(error => {
                         handleError(res, error)
                    })
            } catch (error) {
                 handleError(res, error)
            }
        })

        //update lesson

        server.patch('/lessons/:lessonId', jsonBodyParser, (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                const { title, image, description, link, video } = req.body

                logic.updateLesson(userId, title, image, description, link, video)
                    .then(() => res.status(204).send())
                    .catch(error => {
                        handleError(res, error)
                    })

            } catch (error) {
                 handleError(res, error)
            }
        })

        //removeLesson

        server.delete('/lessons/:lessonId', (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization && authorization.slice(7)
                if (!token) throw new MatchError('token not provided')

                const { sub: userId } = jwt.verify(token, JWT_SECRET)
                const { lessonId } = req.params

                logic.removeLesson(userId, lessonId)
                    .then(lesson => res.status(204).send())
                    .catch(error => {
                         handleError(res, error)
                    })

            } catch (error) {
                 handleError(res, error)
            }
        })

        //retrieveLessons

        server.get('/lessons', (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                logic.retrieveLessons(userId)
                    .then(lessons => res.status(200).json(lessons))
                    .catch(error => {
                        handleError(res, error)
                    })

            } catch (error) {
                 handleError(res, error)
            }
        })

        server.post('/users/details', (req, res) => {
            try {
                const { authorization } = req.headers

                if (!authorization || !authorization.startsWith('Bearer ')) {
                    throw new UnauthorizedError('invalid token')
                }

                const token = authorization.slice(7)
                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                const { userIds } = req.body

                getUserDetailsByIds(userIds)
                    .then(users => res.status(200).json(users))
                    .catch(error => {
                        handleError(res, error)
                    })

            } catch (error) {
                 handleError(res, error)
            }
        })
        server.listen(PORT, () => console.log('API started at port ' + PORT))
    })
    .catch(error => console.error(error))
