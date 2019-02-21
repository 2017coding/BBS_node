import express from 'express'
import Base from '../controller/Base'
const router = express.Router()

router.get('/getToken', new Base().getToken)

export default router