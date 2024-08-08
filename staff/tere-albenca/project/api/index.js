import mongoose from 'mongoose'
import express from 'express'
import logic from './logic/index.js'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import { errors } from 'com'
import dotenv from 'dotenv'
import { Work, User } from './data/index.js'
import { upload } from './config/multer.js'
import { uploadFile } from './util/uploadFile.js'


dotenv.config()

const { JsonWebTokenError, TokenExpiredError } = jwt
const { ContentError, DuplicityError, MatchError } = errors
const { PORT, MONGO_URL, JWT_SECRET } = process.env

mongoose.connect(MONGO_URL)
    .then(() => {
        console.log(`DB connected at ${MONGO_URL}`)

        const server = express()

        const jsonBodyParser = express.json() // JSON.parse(...)

        server.use(cors({
            origin: 'https://alalluna.netlify.app'
        }
        ))

        //registerStudent

        server.post('/users/students', jsonBodyParser, (req, res) => {

            try {
                const { name, surname, email, password } = req.body

                logic.registerStudent(name, surname, email, password)
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

        //registerTeacher

        server.post('/users/teachers', jsonBodyParser, (req, res) => {

            try {

                const { name, surname, email, password } = req.body

                logic.registerTeacher(name, surname, email, password)
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

        //authenticateUser

        server.post('/users/auth', jsonBodyParser, (req, res) => {
            try {
                const { email, password } = req.body

                logic.authenticateUser(email, password)
                    .then(user => {
                        const token = jwt.sign({ sub: user.id, role: user.role }, JWT_SECRET, { expiresIn: '60m' })

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
                        let status = 500

                        if (error instanceof MatchError)
                            status = 404

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

        //new create-work
        //prettier-ignore
        server.post('/works', upload.fields([{ name: 'image', maxCount: 1 }]), async (req, res) => {
            try {
                const { authorization } = req.headers
                const token = authorization && authorization.slice(7)
                if (!token) throw new MatchError('token not provided')

                const { sub: userId } = jwt.verify(token, JWT_SECRET)
                const { title, text } = req.body;
                const file = req.files && req.files.image && req.files.image[0];

                if (!file) {
                    return res.status(400).json({ error: 'No file uploaded' });
                }

                const { downloadURL } = await uploadFile(file);
                const imageUrl = downloadURL;

                const createdWork = await logic.createWork(userId, title, imageUrl, text)

                res.status(201).json(createdWork)
            } catch (error) {
                console.error('Error in POST /works:', error.message);

                let status = 500;

                if (error instanceof MatchError) {
                    status = 401;
                } else if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError) {
                    status = 401;
                    error = new MatchError(error.message);
                } else if (error instanceof ContentError) {
                    status = 400;
                }

                res.status(status).json({ error: error.constructor.name, message: error.message });
            }
        });

        //removeWork

        server.delete('/works/:workId', (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization && authorization.slice(7)
                if (!token) throw new MatchError('token not provided')

                const { sub: userId } = jwt.verify(token, JWT_SECRET)
                const { workId } = req.params

                logic.removeWork(userId, workId)
                    .then(work => res.status(204).send())
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

        //retrieveWorks

        server.get('/works', (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                logic.retrieveWorks(userId)
                    .then(works => res.status(200).json(works))
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

        //retrieveLessons

        server.get('/lessons', (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                logic.retrieveLessons(userId)
                    .then(lessons => res.status(200).json(lessons))
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


        server.listen(PORT, () => console.log('API started at port ' + PORT))
    })
    .catch(error => console.error(error));




// createWork

// server.post('/works', jsonBodyParser, (req, res) => {
//     try {
//         const { authorization } = req.headers

//         const token = authorization.slice(7)

//         const { sub: userId } = jwt.verify(token, JWT_SECRET)

//         const { title, image, text } = req.body

//         logic.createWork(userId, title, image, text)
//             .then(() => res.status(201).send())
//             .catch(error => {
//                 let status = 500

//                 if (error instanceof MatchError)
//                     status = 401

//                 res.status(status).json({ error: error.constructor.name, message: error.message })
//             })

//     } catch (error) {
//         let status = 500

//         if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError)
//             status = 400

//         else if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError) {
//             status = 401

//             error = new MatchError(error.message)
//         }

//         res.status(status).json({ error: error.constructor.name, message: error.message })
//     }
// })


//retriveUserWorks
// server.get('/profile/:targetUserId/works', (req, res) => {
//     try {
//         const { authorization } = req.headers;
//         const token = authorization.slice(7);
//         const { sub: userId } = jwt.verify(token, JWT_SECRET);
//         const { targetUserId } = req.params;

//         logic.retrieveUserWorks(userId, targetUserId)
//             .then(works => res.status(200).json(works))
//             .catch(error => {
//                 let status = 500;
//                 if (error instanceof MatchError)
//                     status = 401;
//                 res.status(status).json({ error: error.constructor.name, message: error.message });
//             });
//     } catch (error) {
//         let status = 500;
//         if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError)
//             status = 400;
//         else if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError) {
//             status = 401;
//             error = new MatchError(error.message);
//         }
//         res.status(status).json({ error: error.constructor.name, message: error.message });
//     }
// });