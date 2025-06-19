import express from 'express'
import verifyToken from '../../middlewares/verifyToken.js'

const jsonBodyParser = express.json()

const router = express.Router()

import registerStudent from './registerStudent.js'
import registerTeacher from './registerTeacher.js'
import authUser from './authUser.js'
import retrieveUser from './retrieveUser.js'
import getUserDetailsByIds from './getUserDetailsByIds.js'

router.post('/students', verifyToken, jsonBodyParser, registerStudent)
router.post('/teachers', verifyToken, jsonBodyParser, registerTeacher)
router.post('/auth', jsonBodyParser, authUser)
router.get('/:targetUserId', verifyToken, retrieveUser)
router.post('/details', verifyToken, getUserDetailsByIds )

export default router
