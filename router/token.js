import express from 'express'
import Authority from '../controller/Authority'
const router = express.Router()

router.get('/getToken', Authority.getToken)

export default router