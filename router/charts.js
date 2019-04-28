import express from 'express'
import Charts from '../controller/Charts'

const router = express.Router()

/**
 * 用户登陆分析
 * @api {POST} /api/Count/userLoginAnalyze 创建
 * @apiDescription 用户登陆分析
 * @apiName userLoginAnalyze
 * @apiHeader {String} Authorization token
 * @apiSampleRequest /api/Charts/userLoginAnalyze
 * @apiGroup Count
 * @apiVersion 0.0.1
 */
router.get('/userLoginAnalyze', Charts.userLoginAnalyze)

export default router
