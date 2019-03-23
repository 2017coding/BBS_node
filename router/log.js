import express from 'express'
import Log from '../controller/Log'
import ValidateLog from '../validate/Log'
const router = express.Router()

/**
 * 写日志
 * @api {POST} /api/log/registered 写日志
 * @apiDescription 写日志
 * @apiName registered
 * @apiHeader {String} Authorization token
 * @apiParam (参数) {Number} origin 日志来源:0: 手机 1: 论坛 2: 管理平台
 * @apiParam (参数) {Number} type 日志类型: 1.用户登录 2. 用户登出 3. 模块访问 4.功能操作
 * @apiParam (参数) {String} title 日志标题
 * @apiParam (参数) {String} desc 日志描述
 * @apiParam (参数) {String} ip ip
 * @apiSampleRequest /api/log/registered
 * @apiGroup Log
 * @apiVersion 0.0.1
 */
router.post('/writeLog', ValidateLog.writeLog, Log.writeLog)
/**
 * 获取日志列表
 * @api {get} /api/log/getList 获取日志列表
 * @apiDescription 获取日志列表
 * @apiName getList
 * @apiHeader {String} Authorization token
 * @apiParam (path参数) {Number} curPage
 * @apiParam (path参数) {Number} pageSize
 * @apiParam (path参数) {Number} origin 日志来源:0: 手机 1: 论坛 2: 管理平台
 * @apiParam (path参数) {Number} type 日志类型: 1.用户登录 2. 用户登出 3. 模块访问 4.功能操作
 * @apiSampleRequest /api/log/getList
 * @apiGroup Log
 * @apiVersion 0.0.1
 */
router.get('/getList', ValidateLog.getList, Log.getList)

export default router