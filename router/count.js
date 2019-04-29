import express from 'express'
import Count from '../controller/Count'

const router = express.Router()

/**
 * 平台相关数据统计
 * @api {POST} /api/Count/platformData 平台相关数据统计
 * @apiDescription 平台相关数据统计
 * @apiName platformData
 * @apiHeader {String} Authorization token
 * @apiSampleRequest /api/Count/platformData
 * @apiGroup Count
 * @apiVersion 0.0.1
 */
router.get('/platformDataCount', Count.platformDataCount)

export default router
