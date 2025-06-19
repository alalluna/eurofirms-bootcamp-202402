import express from 'express'
import verifyToken from '../../middlewares/verifyToken.js'

const jsonBodyParser = express.json()

const router = express.Router()

import createLesson from './createLesson.js'
import updateLesson from './updateLesson.js'
import removeLesson from './removeLesson.js'
import retrieveLessons from './retrieveLessons.js'

router.post('/', verifyToken, jsonBodyParser, createLesson)
router.patch('/:lessonId', verifyToken, jsonBodyParser, updateLesson)
router.delete('/:lessonId', verifyToken, removeLesson)
router.get('/', verifyToken, retrieveLessons)

export default router