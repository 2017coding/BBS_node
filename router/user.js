import express from 'express'
import User from '../controller/User'
const router = express.Router()

router.post('/registered', User.registered)
router.post('/login', User.login)
router.get('/userInfo', User.getUserInfo)

export default router
