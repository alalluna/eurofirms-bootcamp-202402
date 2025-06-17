import express from 'express'
import verifyToken from '../../middlewares/verifyToken.js'
import { upload as multerUpload } from '../../config/multer.js'

const jsonBodyParser = express.json()
const imageUpload = multerUpload.fields([{ name: 'image', maxCount: 1 }])
const router = express.Router()

import createComment from '../works/createComment.js'
import createWork from '../works/createWork.js'
import giveLikeWork from '../works/giveLikeWork.js'
import removeComment from '../works/removeComment.js'
import removeWork from '../works/removeWork.js'
import retrieveComment from '../works/retrieveComment.js'
import retrieveComments from './etrieveComments.js'
import retrieveWorks from '../works/retrieveWorks.js'
import searchWorks from '../works/searchWorks.js'
import updateComment from '../works/updateComment.js'
import updateWork from '../works/updateWork.js'

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
