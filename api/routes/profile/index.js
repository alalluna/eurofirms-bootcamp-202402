import express from 'express'
import verifyToken from '../../middlewares/verifyToken.js'

const jsonBodyParser = express.json()

const router = express.Router()

import retrieveUserWorks from './retrieveUserWorks.js'

router.get('/:targetUserId/works', verifyToken, retrieveUserWorks)

export default router
