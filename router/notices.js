import express from 'express'
import Notices from '../controller/Notices'
import ValidateNotices from '../validate/Notices'
const router = express.Router()

/**
 * 设置
 * @api {POST} /api/Notices/set 设置
 * @apiDescription 设置通知
 * @apiName set
 * @apiHeader {String} Authorization token
 * @apiSampleRequest /api/Notices/set
 * @apiGroup Notices
 * @apiVersion 0.0.1
 */
router.post('/set', ValidateNotices.setNotices, Notices.setNotices)
/**
 * 获取
 * @api {POST} /api/Notices/get 获取
 * @apiDescription 获取通知
 * @apiName get
 * @apiHeader {String} Authorization token
 * @apiSampleRequest /api/Notices/get
 * @apiGroup Notices
 * @apiVersion 0.0.1
 */
router.get('/get', ValidateNotices.getNotices, Notices.getNotices)

export default router
