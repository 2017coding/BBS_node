import express from 'express'
import Base from '../controller/Base'
const router = express.Router()

router.get('/getToken', Base.getToken)

export default router