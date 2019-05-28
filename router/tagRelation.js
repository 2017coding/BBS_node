import express from 'express'
import TagRelation from '../controller/TagRelation'
import ValidateTagRelation from '../validate/TagRelation'
const router = express.Router()

/**
 * 设置绑定标签
 * @api {POST} /api/TagRelation/setBindTag 设置绑定标签
 * @apiDescription 设置绑定标签
 * @apiName setBindTag
 * @apiHeader {String} Authorization token
 * @apiParam (参数) {Object} Object
 * @apiSampleRequest /api/TagRelation/setBindTag
 * @apiGroup TagRelation
 * @apiVersion 0.0.1
 */
router.post('/setBindTag', ValidateTagRelation.setBindTag, TagRelation.setBindTag)
/**
 * 获取绑定标签
 * @api {put} /api/TagRelation/getBindTag 获取绑定标签
 * @apiDescription 获取绑定标签
 * @apiName getBindTag
 * @apiHeader {String} Authorization token
 * @apiSampleRequest /api/TagRelation/getBindTag
 * @apiGroup TagRelation
 * @apiVersion 0.0.1
 */
router.get('/getBindTag', ValidateTagRelation.getBindTag, TagRelation.getBindTag)

export default router
