import express from 'express'
import Area from '../controller/Area'
import ValidateArea from '../validate/Area'
const router = express.Router()

/**
 * 编辑
 * @api {POST} /api/Area/update 编辑
 * @apiDescription 编辑
 * @apiName update
 * @apiHeader {String} Authorization token
 * @apiParam (参数) {Number} status
 * @apiSampleRequest /api/Area/update
 * @apiGroup Area
 * @apiVersion 0.0.1
 */
router.put('/update', ValidateArea.update, Area.update)
/**
 * 获取区域列表
 * @api {get} /api/Area/getList 获取日志列表
 * @apiDescription 获取日志列表
 * @apiName getList
 * @apiHeader {String} Authorization token
 * @apiParam (path参数) {Number} curPage
 * @apiParam (path参数) {Number} pageSize
 * @apiParam (path参数) {Number} pid
 * @apiSampleRequest /api/Area/getList
 * @apiGroup Area
 * @apiVersion 0.0.1
 */
router.get('/getList', ValidateArea.getList, Area.getList)
/**
 * 获取所有区域
 * @api {get} /api/Area/getAll/:pid 获取所有区域
 * @apiDescription 获取所有区域
 * @apiName getAll
 * @apiHeader {String} Authorization token
 * @apiParam {Number} pid
 * @apiSampleRequest /api/Area/getAll
 * @apiGroup Area
 * @apiVersion 0.0.1
 */
router.get('/getAll/:pid', ValidateArea.getAll, Area.getAll)

export default router