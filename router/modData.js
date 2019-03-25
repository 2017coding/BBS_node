import express from 'express'
import ModData from '../controller/ModData'
import ValidateModData from '../validate/ModData'
const router = express.Router()

/**
 * 创建
 * @api {POST} /api/ModData/create 创建
 * @apiDescription 创建模块权限
 * @apiName create
 * @apiHeader {String} Authorization token
 * @apiParam (参数) {Number} mod_id 模块ID
 * @apiParam (参数) {String} name 名称
 * @apiParam (参数) {String} code 编码
 * @apiParam (参数) {String} type 类型 按钮或者其他
 * @apiParam (参数) {String} method 请求方式
 * @apiSampleRequest /api/ModData/create
 * @apiGroup ModData
 * @apiVersion 0.0.1
 */
router.post('/create', ValidateModData.create, ModData.create)
/**
 * 编辑
 * @api {put} /api/ModData/update 编辑
 * @apiDescription 编辑
 * @apiName update
 * @apiHeader {String} Authorization token
 * @apiParam (参数) {Number} id
 * @apiParam (参数) {Number} mod_id 模块ID
 * @apiParam (参数) {String} name 名称
 * @apiParam (参数) {String} code 编码
 * @apiParam (参数) {String} type 类型 按钮或者其他
 * @apiParam (参数) {String} method 请求方式
 * @apiSampleRequest /api/ModData/update
 * @apiGroup ModData
 * @apiVersion 0.0.1
 */
router.put('/update', ValidateModData.update, ModData.update)
/**
 * 删除
 * @api {delete} /api/ModData/delete/:id 删除
 * @apiDescription 删除
 * @apiName delete
 * @apiHeader {String} Authorization token
 * @apiParam {Number} id
 * @apiSampleRequest /api/ModData/delete
 * @apiGroup ModData
 * @apiVersion 0.0.1
 */
router.delete('/delete/:id', ValidateModData.delete, ModData.delete)

/**
 * 获取模块信息
 * @api {get} /api/ModData/getRow 获取模块信息
 * @apiDescription 获取模块权限信息
 * @apiName getRow
 * @apiHeader {String} Authorization token
 * @apiParam {Number} id
 * @apiSampleRequest /api/ModData/getRow
 * @apiGroup ModData
 * @apiVersion 0.0.1
 */
router.get('/getRow/:id', ValidateModData.getRow, ModData.getRow)
/**
 * 获取模块列表
 * @api {get} /api/ModData/getList 获取模块列表
 * @apiDescription 获取模块权限列表
 * @apiName getList
 * @apiHeader {String} Authorization token
 * @apiParam (path参数) {Number} mod_id
 * @apiSampleRequest /api/ModData/getList
 * @apiGroup ModData
 * @apiVersion 0.0.1
 */
router.get('/getList', ValidateModData.getList, ModData.getList)
/**
 * 获取所有模块
 * @api {get} /api/ModData/getAll/:id 获取所有模块
 * @apiDescription 获取所有模块
 * @apiName getAll
 * @apiHeader {String} Authorization token
 * @apiParam {Number} id
 * @apiSampleRequest /api/ModData/getAll
 * @apiGroup ModData
 * @apiVersion 0.0.1
 */
router.get('/getAll/:id', ValidateModData.getAll, ModData.getAll)

export default router
