import express from 'express'
import verifyToken from '../../middlewares/verifyToken.js'
import { upload as multerUpload } from '../../config/multer.js'

const jsonBodyParser = express.json()
const imageUpload = multerUpload.fields([{ name: 'image', maxCount: 1 }])
const router = express.Router()

import createComment from './createComment.js'
import createWork from './createWork.js'
import giveLikeWork from './giveLikeWork.js'
import removeComment from './removeComment.js'
import removeWork from './removeWork.js'
import retrieveComment from './retrieveComment.js'
import retrieveComments from './retrieveComments.js'
import retrieveWorks from './retrieveWorks.js'
import searchWorks from './searchWorks.js'
import updateComment from './updateComment.js'
import updateWork from './updateWork.js'

router.post('/', verifyToken, imageUpload, createWork)
router.delete('/:workId', verifyToken, removeWork)
router.patch('/:workId', verifyToken, jsonBodyParser, updateWork)
router.get('/', verifyToken, retrieveWorks)
router.get('/search', verifyToken, searchWorks)

//likes
router.put('/:workId/likes', verifyToken, giveLikeWork)

//comments
router.post('/:workId/comments', verifyToken, jsonBodyParser, createComment)
router.delete('/:workId/comments/:commentId', verifyToken, removeComment)
router.get('/:workId/comments/:commentId', verifyToken, retrieveComment)
router.get('/:workId/comments', verifyToken, retrieveComments)
router.patch('/:workId/comments/:commentId', verifyToken, jsonBodyParser, updateComment)

export default router
