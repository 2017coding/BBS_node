import express from 'express'
import User from '../controller/User'
const router = express.Router()

router.post('/registered', User.registered)
router.post('/login', User.login)
router.put('/update', User.update)
router.delete('/delete/:id', User.delete)
router.get('/userInfo', User.userInfo)
router.get('/getList', User.getList)
router.get('/getAll', User.getAll)

export default router
