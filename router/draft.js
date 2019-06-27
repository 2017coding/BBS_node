import express from 'express'
import Draft from '../controller/Draft'
import ValidateDraft from '../validate/Draft'
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
/**
 * 舍弃草稿
 * @api {delete} /api/Draft/giveUp 舍弃草稿
 * @apiDescription 舍弃草稿
 * @apiName giveUp
 * @apiHeader {String} Authorization token
 * @apiSampleRequest /api/Draft/giveUp
 * @apiGroup Draft
 * @apiVersion 0.0.1
 */
router.delete('/giveUp', ValidateDraft.giveUp, Draft.giveUp)
/**
 * 舍弃全部草稿
 * @api {delete} /api/Draft/giveUpAll 舍弃全部草稿
 * @apiDescription 舍弃全部草稿
 * @apiName giveUpAll
 * @apiHeader {String} Authorization token
 * @apiSampleRequest /api/Draft/giveUpAll
 * @apiGroup Draft
 * @apiVersion 0.0.1
 */
router.delete('/giveUpAll', Draft.giveUpAll)

export default router
