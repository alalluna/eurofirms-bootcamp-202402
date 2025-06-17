import mongoose from 'mongoose'
import express from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { google } from 'googleapis'

import logic from './logic/index.js'
import { upload } from './config/multer.js'
import { uploadFile } from './util/uploadFile.js'
import handleError from './middlewares/handleError.js'
import verifyToken from './middlewares/verifyToken.js'
import usersRouter from './routes/users/index.js'
import worksRouter from './routes/works/index.js'

dotenv.config() // Cargar variables de entorno
// const { JsonWebTokenError, TokenExpiredError } = jwt

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

        // Middlewares
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

        server.use(jsonBodyParser)
        server.use(express.urlencoded({ extended: true })) // Para formularios


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

        server.get('/google/redirect', async (req, res, next) => {
            const { code } = req.query
            try {
                const { tokens } = await oauth2Client.getToken(code)

                oauth2Client.setCredentials(tokens)
                // Guarda los tokens en tu base de datos junto con el usuario autenticado
                // Ejemplo: await logic.saveGoogleTokens(userId, tokens);

                res.status(200).json({ message: 'Google tokens saved successfully', tokens })

            } catch (error) {
                next(error)
            }
        })

        // Obtener eventos del calendario de Google

        server.get('/calendar/events', async (req, res, next) => {
            try {
                let userId = null
                const { authorization } = req.headers
                if (authorization?.startsWith('Bearer ')) {
                    const token = authorization.slice(7)

                    try {
                        const { sub } = jwt.verify(token, JWT_SECRET)
                        userId = sub
                    } catch (err) {
                        // Token inválido: simplemente seguimos sin userId
                        console.warn('Token inválido:', err.message)
                    }
                }

                if (!userId) {
                    return res.json([]) // O podrías devolver eventos públicos por defecto
                }

                const googleTokens = await logic.getGoogleTokens(userId)
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
                next(error)
            }
        })

        // Crear un evento en Google Calendar

        server.post('/calendar/events', verifyToken, jsonBodyParser, async (req, res, next) => {
            try {
                // Recupera los tokens de Google guardados en tu base de datos
                const { userId } = req
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
                next(error)
            }
        })


        // ---------------------- USERS ----------------------
        //registerStudent
        server.use('/users', usersRouter)
     
        // ----------------------  WORKS  ----------------------
        server.use('works', worksRouter)
        //new create-work
        //prettier-ignore
        // server.post('/works', verifyToken, upload.fields([{ name: 'image', maxCount: 1 }]), async (req, res, next) => {
        //     try {
        //         const { title, text } = req.body;
        //         const file = req.files && req.files.image && req.files.image[0]

        //         if (!file) return res.status(400).json({ error: 'No file uploaded' })

        //         const { downloadURL } = await uploadFile(file)
        //         const imageUrl = downloadURL
        //         const { userId } = req
        //         const createdWork = await logic.createWork(userId, title, imageUrl, text)

        //         res.status(201).json(createdWork)

        //     } catch (error) {
        //         next(error)
        //     }
        // })

        //removeWork

        // server.delete('/works/:workId', verifyToken, async (req, res, next) => {
        //     try {
        //         const { userId } = req
        //         const { workId } = req.params
        //         await logic.removeWork(userId, workId)
        //         res.status(204).send()

        //     } catch (error) {
        //         next(error)
        //     }
        // })

        //update work

        // server.patch('/works/:workId', verifyToken, jsonBodyParser, async (req, res, next) => {
        //     try {
        //         const { userId } = req
        //         const { workId } = req.params
        //         const { title, text } = req.body
        //         await logic.updateWork(userId, workId, title, text)
        //         res.status(204).send()

        //     } catch (error) {
        //         next(error)
        //     }
        // })

        //retrieveWorks

        // server.get('/works', verifyToken, async (req, res, next) => {
        //     try {
        //         const { userId } = req
        //         const { searchQuery } = req.query

        //         let works

        //         if (searchQuery) {
        //             works = await logic.searchWorks(userId, searchQuery)
        //         } else {
        //             works = await logic.retrieveWorks(userId)
        //         }

        //         res.status(200).json(works)
        //     } catch (error) {
        //         next(error)
        //     }
        // })

        //like a work

        // server.put('/works/:workId/likes', async(req, res, next) => {
        //     try {
        //         const { authorization } = req.headers

        //         const token = authorization.slice(7)

        //         const { sub: userId } = jwt.verify(token, JWT_SECRET)

        //         const { workId } = req.params
        //         await logic.giveLikeWork(userId, workId)
                
        //         res.status(204).send()
        
        //     } catch (error) {
        //         next(error)
        //     }
        // })
        //searchWorks

        // server.get('/works/search', verifyToken, async (req, res, next) => {
        //     try {
        //         const { userId } = req
        //         const { q } = req.query
        //         const works = await logic.searchWorks(userId, q)
        //         res.status(200).json(works)

        //     } catch (error) {
        //         next(error)
        //     }

        // })

        // ---------------------- COMMENTS ----------------------
        // createComment

        // server.post('/works/:workId/comments', verifyToken, jsonBodyParser, async (req, res, next) => {
        //     try {
        //         const { userId } = req
        //         const { workId } = req.params
        //         const { text } = req.body
        //         await logic.createComment(userId, workId, text)
        //         res.status(201).send()

        //     } catch (error) {
        //         next(error)
        //     }
        // })


        // removeComment

        // server.delete('/works/:workId/comments/:commentId', verifyToken, async (req, res, next) => {
        //     try {
        //         const { userId } = req
        //         const { workId, commentId } = req.params
        //         await logic.removeComment(userId, workId, commentId)
        //         res.status(204).send()

        //     } catch (error) {
        //         next(error)
        //     }
        // })

        //retrieveComment

        // server.get('/works/:workId/comments/:commentId', verifyToken, async (req, res, next) => {
        //     try {
        //         const { userId } = req
        //         const { workId, commentId } = req.params
        //         const comment = await logic.retrieveComment(userId, workId, commentId)
        //         res.status(200).json(comment)

        //     } catch (error) {
        //         next(error)
        //     }
        // })

        //retrieveComments

        // server.get('/works/:workId/comments/', verifyToken, async (req, res, next) => {
        //     try {
        //         const { userId } = req
        //         const { workId } = req.params
        //         const comments = await logic.retrieveComments(userId, workId)
        //         res.status(200).json(comments)

        //     } catch (error) {
        //         next(error)
        //     }
        // })

        //update comment

        // server.patch('/works/:workId/comments/:commentId', verifyToken, jsonBodyParser, async (req, res, next) => {
        //     try {
        //         const { userId } = req
        //         const { workId, commentId } = req.params
        //         const { text } = req.body
        //         await logic.updateComment(userId, workId, commentId, text)
        //         res.status(204).send()

        //     } catch (error) {
        //         next(error)
        //     }
        // })

      
        // ---------------------- PROFILE ----------------------
        // retrieveUserWorks

        server.get('/profile/:targetUserId/works', verifyToken, async (req, res, next) => {
            try {
                const { userId } = req
                const { targetUserId } = req.params
                const works = await logic.retrieveUserWorks(userId, targetUserId)
                res.status(200).json(works)

            } catch (error) {
                next(error)
            }
        })

        // ---------------------- LESSONS ----------------------
        //createLesson

        server.post('/lessons', verifyToken, jsonBodyParser, async (req, res, next) => {
            try {
                const { userId } = req
                const { title, image, description, link, video } = req.body

                await logic.createLesson(userId, title, image, description, link, video)
                res.status(201).send()
            } catch (error) {
                next(error)
            }
        })

        //update lesson

        server.patch('/lessons/:lessonId', verifyToken, jsonBodyParser, async (req, res, next) => {
            try {
                const { userId } = req
                const { title, image, description, link, video } = req.body
                await logic.updateLesson(userId, title, image, description, link, video)
                res.status(204).send()

            } catch (error) {
                next(error)
            }
        })

        //removeLesson

        server.delete('/lessons/:lessonId', verifyToken, async (req, res, next) => {
            try {
                const { userId } = req
                const { lessonId } = req.params
                await logic.removeLesson(userId, lessonId)
                res.status(204).send()

            } catch (error) {
                next(error)
            }
        })

        //retrieveLessons

        server.get('/lessons', verifyToken, async (req, res, next) => {
            try {
                const { userId } = req
                const lessons = await logic.retrieveLessons(userId)
                res.status(200).json(lessons)

            } catch (error) {
                next(error)
            }
        })

        server.post('/users/details', verifyToken, async (req, res, next) => {
            try {
                const { userIds } = req.body
                const users = await getUserDetailsByIds(userIds)
                res.status(200).json(users)

            } catch (error) {
                next(error)
            }
        })

        server.use(handleError)


        server.listen(PORT, () => console.log('API started at port ' + PORT))
    })
    .catch(error => console.error('Error connecting to DB', error))


//INDEX ANTIGUO

// import mongoose from 'mongoose'
// import express from 'express'
// import logic from './logic/index.js'
// import cors from 'cors'
// import jwt from 'jsonwebtoken'
// import errors from './../com/errors.js'
// import handleError from './api/middlewares/handleError.js'
// import dotenv from 'dotenv'
// import { google } from 'googleapis'
// import { upload } from './config/multer.js'
// import { uploadFile } from './util/uploadFile.js'
// import registerStudentRouter from './routes/users/registerStudent.js'
// import verifyToken from './middlewares/verifyToken.js'

// dotenv.config() // Cargar variables de entorno
// // const { JsonWebTokenError, TokenExpiredError } = jwt

// const { PORT, MONGO_URL, JWT_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI } = process.env

// // Configuración de Google OAuth
// const oauth2Client = new google.auth.OAuth2(
//     GOOGLE_CLIENT_ID,
//     GOOGLE_CLIENT_SECRET,
//     GOOGLE_REDIRECT_URI
// )

// mongoose.connect(MONGO_URL)
//     .then(() => {
//         console.log(`DB connected at ${MONGO_URL}`)

//         const server = express()

//         const jsonBodyParser = express.json() // JSON.parse(...)

//         const allowedOrigins = ['http://localhost:5173', 'https://alalluna.netlify.app']

//         // server.use(cors()) //en lugar de esto es necesario permitir acceso a los header
//         server.use(cors({
//             origin: function (origin, callback) {
//                 if (!origin || allowedOrigins.includes(origin)) {
//                     callback(null, true)
//                 } else {
//                     callback(new Error('Not allowed by CORS'))
//                 }
//             },
//             credentials: true // Si usas cookies o autorización por header
//         }))

//         server.use((req, res, next) => {
//             res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
//             res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
//             next()
//         })

//         // Endpoint para iniciar el flujo de autenticación con Google

//         server.get('/auth/google', (req, res) => {
//             const scopes = [
//                 'https://www.googleapis.com/auth/calendar.events',
//                 'https://www.googleapis.com/auth/calendar',
//                 'https://www.googleapis.com/auth/userinfo.email',
//                 'https://www.googleapis.com/auth/userinfo.profile'
//             ]

//             const authUrl = oauth2Client.generateAuthUrl({
//                 access_type: 'offline',
//                 scope: scopes,
//                 prompt: 'consent',
//             })

//             res.redirect(authUrl)
//         })

//         // Endpoint para manejar el callback de Google

//         server.get('/google/redirect', async (req, res, next) => {
//             const { code } = req.query

//             try {
//                 const { tokens } = await oauth2Client.getToken(code)

//                 oauth2Client.setCredentials(tokens)

//                 // Guarda los tokens en tu base de datos junto con el usuario autenticado
//                 // Ejemplo: await logic.saveGoogleTokens(userId, tokens);

//                 res.status(200).json({ message: 'Google tokens saved successfully', tokens })
//             } catch (error) {
//                 next(error)
//             }
//         })

//         // Obtener eventos del calendario de Google

//     server.get('/calendar/events', async (req, res, next) => {
//     try {
//         let userId = null

//         const { authorization } = req.headers

//         if (authorization?.startsWith('Bearer ')) {
//             const token = authorization.slice(7)

//             try {
//                 const { sub } = jwt.verify(token, JWT_SECRET)
//                 userId = sub
//             } catch (err) {
//                 // Token inválido: simplemente seguimos sin userId
//                 console.warn('Token inválido:', err.message)
//             }
//         }

//         if (!userId) {
//             return res.json([]) // O podrías devolver eventos públicos por defecto
//         }

//         const googleTokens = await logic.getGoogleTokens(userId)

//         oauth2Client.setCredentials(googleTokens)

//         const calendar = google.calendar({ version: 'v3', auth: oauth2Client })

//         const { data } = await calendar.events.list({
//             calendarId: 'primary',
//             timeMin: new Date().toISOString(),
//             maxResults: 10,
//             singleEvents: true,
//             orderBy: 'startTime',
//         })

//         res.json(data.items)
//     } catch (error) {
//         next(error)
//     }
// })

//         // Crear un evento en Google Calendar

//         server.post('/calendar/events', verifyToken, jsonBodyParser, async (req, res, next) => {
//             try {
//                 // const { authorization } = req.headers
//                 // const token = authorization.slice(7)

//                 // const { sub: userId } = jwt.verify(token, JWT_SECRET)

//                 // Recupera los tokens de Google guardados en tu base de datos
//                 const { userId } = req
//                 const googleTokens = await logic.getGoogleTokens(userId)

//                 oauth2Client.setCredentials(googleTokens)

//                 const calendar = google.calendar({ version: 'v3', auth: oauth2Client })

//                 const event = req.body

//                 const { data } = await calendar.events.insert({
//                     calendarId: 'primary',
//                     resource: event,
//                 })

//                 res.status(201).json(data)
//             } catch (error) {
//                 next(error)
//             }
//         })


//         //registerStudent

//         server.use('/users/students', registerStudentRouter)

//         // server.post('/users/students', jsonBodyParser, (req, res, next) => {

//         //     try {
//         //         const { authorization } = req.headers
//         //         const token = authorization?.slice(7)

//         //         const { sub: userId } = jwt.verify(token, JWT_SECRET)
//         //         const { name, surname, email, password } = req.body

//         //         logic.registerStudent(userId, name, surname, email, password)
//         //             .then(() => res.status(201).send())
//         //             .catch(next)

//         //     } catch (error) {
//         //           next(error)
//         //     }
//         // })

//         //registerTeacher

//         server.post('/users/teachers', verifyToken, jsonBodyParser, (req, res, next) => {

//             try {
//                 // const { authorization } = req.headers
//                 // const token = authorization?.slice(7)

//                 // const { sub: userId } = jwt.verify(token, JWT_SECRET)
//                 const { userId } = req
//                 const { name, surname, email, password } = req.body

//                 logic.registerTeacher(userId, name, surname, email, password)
//                     .then(() => res.status(201).send())
//                     .catch(next)

//             } catch (error) {
//                 next(error)
//             }
//         })

//         //authenticateUser

//         server.post('/users/auth', jsonBodyParser, (req, res, next) => {
//             try {
//                 const { email, password } = req.body

//                 logic.authenticateUser(email, password)
//                     .then(user => {
//                         const token = jwt.sign({ sub: user.id, role: user.role }, JWT_SECRET, { expiresIn: '120m' })

//                         res.status(200).json(token)
//                     })
//                     .catch(next)

//             } catch (error) {
//                 next(error)
//             }
//         })

//         //retreiveUser

//         server.get('/users/:targetUserId', verifyToken, (req, res, next) => {
//             try {
//                 // const { authorization } = req.headers

//                 // const token = authorization.slice(7)

//                 // const { sub: userId } = jwt.verify(token, JWT_SECRET)
//                 const { userId } = req
//                 const { targetUserId } = req.params

//                 logic.retrieveUser(userId, targetUserId)
//                     .then(user => res.json(user))
//                     .catch(next)
//             } catch (error) {
//                 next(error)
//             }
//         })

//         //new create-work
//         //prettier-ignore
//         server.post('/works', verifyToken, upload.fields([{ name: 'image', maxCount: 1 }]), async (req, res, next) => {
//             try {
//                 // const { authorization } = req.headers
//                 // const token = authorization && authorization.slice(7)
//                 // if (!token) throw new UnauthorizedError('token not provided')

//                 // const { sub: userId } = jwt.verify(token, JWT_SECRET)
//                 const { title, text } = req.body;
//                 const file = req.files && req.files.image && req.files.image[0]

//                 if (!file) {
//                     return res.status(400).json({ error: 'No file uploaded' })
//                 }

//                 const { downloadURL } = await uploadFile(file)
//                 const imageUrl = downloadURL
//                 const { userId } = req
//                 const createdWork = await logic.createWork(userId, title, imageUrl, text)

//                 res.status(201).json(createdWork)
//             } catch (error) {
//                 next(error)
//             }
//         })

//         //removeWork

//         server.delete('/works/:workId', verifyToken, (req, res, next) => {
//             try {
//                 // const { authorization } = req.headers

//                 // const token = authorization && authorization.slice(7)
//                 // if (!token) throw new UnauthorizedError('token not provided')
//                 const { userId } = req

//                 const { workId } = req.params

//                 logic.removeWork(userId, workId)
//                     .then(work => res.status(204).send())
//                     .catch(next)

//             } catch (error) {
//                 next(error)
//             }
//         })

//         //update work

//         server.patch('/works/:workId', verifyToken, jsonBodyParser, (req, res, next) => {
//             try {
//                 // const { authorization } = req.headers

//                 // const token = authorization.slice(7)

//                 // const { sub: userId } = jwt.verify(token, JWT_SECRET)

//                 const { workId } = req.params

//                 const { title, text } = req.body

//                 logic.updateWork(userId, workId, title, text)
//                     .then(() => res.status(204).send())
//                     .catch(next)

//             } catch (error) {
//                 next(error)
//             }
//         })

//         //retrieveWorks

//         server.get('/works', verifyToken, (req, res, next) => {
//             try {
//                 // const { authorization } = req.headers

//                 // const token = authorization.slice(7)

//                 // const { sub: userId } = jwt.verify(token, JWT_SECRET)
//                 const { userId } = req
//                 logic.retrieveWorks(userId)
//                     .then(works => res.status(200).json(works))
//                     .catch(next)

//             } catch (error) {
//                 next(error)
//             }
//         })

//         // retrieveUserWorks

//         server.get('/profile/:targetUserId/works', verifyToken, (req, res, next) => {
//             try {
//                 // const { authorization } = req.headers
//                 // const token = authorization.slice(7)
//                 // const { sub: userId } = jwt.verify(token, JWT_SECRET)
//                 const { userId } = req
//                 const { targetUserId } = req.params

//                 logic.retrieveUserWorks(userId, targetUserId)
//                     .then(works => res.status(200).json(works))
//                     .catch(next)
//             } catch (error) {
//                 next(error)
//             }
//         })

//         //like a work

//         server.put('/works/:workId/likes', verifyToken, (req, res, next) => {
//             try {
//                 // const { authorization } = req.headers

//                 // const token = authorization.slice(7)

//                 // const { sub: userId } = jwt.verify(token, JWT_SECRET)
//                 const { userId } = req
//                 const { workId } = req.params
//                 logic.giveLikeWork(userId, workId)
//                     .then(() => res.status(204).send())
//                     .catch(next)
//             } catch (error) {
//                 next(error)
//             }
//         })


//         // createComment

//         server.post('/works/:workId/comments', verifyToken, jsonBodyParser, (req, res, next) => {
//             try {
//                 // const { authorization } = req.headers

//                 // const token = authorization.slice(7)

//                 // const { sub: userId } = jwt.verify(token, JWT_SECRET)

//                 const { workId } = req.params

//                 const { text } = req.body

//                 logic.createComment(userId, workId, text)
//                     .then(() => res.status(201).send())
//                     .catch(next)

//             } catch (error) {
//                 next(error)
//             }
//         })


//         // removeComment

//         server.delete('/works/:workId/comments/:commentId', verifyToken, (req, res, next) => {
//             try {
//                 // const { authorization } = req.headers

//                 // const token = authorization.slice(7)

//                 // const { sub: userId } = jwt.verify(token, JWT_SECRET)

//                 const { workId, commentId } = req.params

//                 logic.removeComment(userId, workId, commentId)
//                     .then(() => res.status(204).send())
//                     .catch(next)

//             } catch (error) {
//                 next(error)
//             }
//         })

//         //retrieveComment

//         server.get('/works/:workId/comments/:commentId', verifyToken, (req, res, next) => {
//             try {
//                 // const { authorization } = req.headers

//                 // const token = authorization.slice(7)

//                 // const { sub: userId } = jwt.verify(token, JWT_SECRET)

//                 const { workId, commentId } = req.params

//                 logic.retrieveComment(userId, workId, commentId)
//                     .then(comment => res.status(200).json(comment))
//                     .catch(next)

//             } catch (error) {
//                 next(error)
//             }
//         })

//         //retrieveComments

//         server.get('/works/:workId/comments/', verifyToken, (req, res, next) => {
//             try {
//                 // const { authorization } = req.headers

//                 // const token = authorization.slice(7)

//                 // const { sub: userId } = jwt.verify(token, JWT_SECRET)

//                 const { workId } = req.params


//                 logic.retrieveComments(userId, workId)
//                     .then(comments => res.status(200).json(comments))
//                     .catch(next)

//             } catch (error) {
//                 next(error)
//             }
//         })

//         //update comment

//         server.patch('/works/:workId/comments/:commentId', verifyToken, jsonBodyParser, (req, res, next) => {
//             try {
//                 // const { authorization } = req.headers

//                 // const token = authorization.slice(7)

//                 // const { sub: userId } = jwt.verify(token, JWT_SECRET)

//                 const { workId, commentId } = req.params

//                 const { text } = req.body

//                 logic.updateComment(userId, workId, commentId, text)
//                     .then(() => res.status(204).send())
//                     .catch(next)

//             } catch (error) {
//                 next(error)
//             }
//         })

//         //searchWorks

//         server.get('/works/search', verifyToken, (req, res, next) => {
//             try {

//                 const { q } = req.query

//                 // const { authorization } = req.headers

//                 // const token = authorization.slice(7)

//                 // const { sub: userId } = jwt.verify(token, JWT_SECRET)

//                 logic.searchWorks(userId, q)
//                     .then(works => res.status(200).json(works))
//                     .catch(next)

//             } catch (error) {
//                 next(error)
//             }

//         })

//         //createLesson

//         server.post('/lessons', verifyToken, jsonBodyParser, (req, res, next) => {
//             try {
//                 // const { authorization } = req.headers

//                 // const token = authorization.slice(7)

//                 // const { sub: userId } = jwt.verify(token, JWT_SECRET)

//                 const { title, image, description, link, video } = req.body

//                 logic.createLesson(userId, title, image, description, link, video)
//                     .then(() => res.status(201).send())
//                     .catch(next)
//             } catch (error) {
//                 next(error)
//             }
//         })

//         //update lesson

//         server.patch('/lessons/:lessonId', verifyToken, jsonBodyParser, (req, res, next) => {
//             try {
//                 // const { authorization } = req.headers

//                 // const token = authorization.slice(7)

//                 // const { sub: userId } = jwt.verify(token, JWT_SECRET)

//                 const { title, image, description, link, video } = req.body

//                 logic.updateLesson(userId, title, image, description, link, video)
//                     .then(() => res.status(204).send())
//                     .catch(next)

//             } catch (error) {
//                 next(error)
//             }
//         })

//         //removeLesson

//         server.delete('/lessons/:lessonId', verifyToken, (req, res, next) => {
//             try {
//                 // const { authorization } = req.headers

//                 // const token = authorization && authorization.slice(7)
//                 // if (!token) throw new MatchError('token not provided')

//                 // const { sub: userId } = jwt.verify(token, JWT_SECRET)
//                 const { lessonId } = req.params

//                 logic.removeLesson(userId, lessonId)
//                     .then(lesson => res.status(204).send())
//                     .catch(next)

//             } catch (error) {
//                 next(error)
//             }
//         })

//         //retrieveLessons

//         server.get('/lessons', verifyToken, (req, res, next) => {
//             try {
//                 // const { authorization } = req.headers

//                 // const token = authorization.slice(7)

//                 // const { sub: userId } = jwt.verify(token, JWT_SECRET)

//                 logic.retrieveLessons(userId)
//                     .then(lessons => res.status(200).json(lessons))
//                     .catch(next)

//             } catch (error) {
//                 next(error)
//             }
//         })

//         server.post('/users/details', verifyToken, (req, res, next) => {
//             try {
//                 // const { authorization } = req.headers

//                 // if (!authorization || !authorization.startsWith('Bearer ')) {
//                 //     throw new UnauthorizedError('invalid token')
//                 // }

//                 // const token = authorization.slice(7)
//                 // const { sub: userId } = jwt.verify(token, JWT_SECRET)

//                 const { userIds } = req.body

//                 getUserDetailsByIds(userIds)
//                     .then(users => res.status(200).json(users))
//                     .catch(next)

//             } catch (error) {
//                 next(error)
//             }
//         })

//         server.use((error, req, res, next) => {
//             handleError(error, res)
//         })


//         server.listen(PORT, () => console.log('API started at port ' + PORT))
//     })
//     .catch(error => console.error(error))
