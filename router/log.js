import express from 'express'
import Log from '../controller/Log'
const router = express.Router()

router.post('/writeLog', Log.writeLog)
router.get('/getList', Log.getList)

export default router