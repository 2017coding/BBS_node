import express from 'express'
import Draft from '../controller/Draft'
const router = express.Router()

/**
 * 获取草稿数量
 * @api {get} /api/Draft/getTotals 获取草稿数量
 * @apiDescription 获取草稿数量
 * @apiName getTotals
 * @apiHeader {String} Authorization token
 * @apiSampleRequest /api/Draft/getTotals
 * @apiGroup Draft
 * @apiVersion 0.0.1
 */
router.get('/getTotals', Draft.getTotals)
/**
 * 获取草稿
 * @api {get} /api/Draft/getAll 获取草稿
 * @apiDescription 获取草稿
 * @apiName getAll
 * @apiHeader {String} Authorization token
 * @apiSampleRequest /api/Draft/getAll
 * @apiGroup Draft
 * @apiVersion 0.0.1
 */
router.get('/getAll', Draft.getAll)

export default router
