import express from 'express'
import DataControl from '../controller/DataControl'
import ValidateDataControl from '../validate/DataControl'
const router = express.Router()

/**
 * 创建
 * @api {POST} /api/DataControl/create 创建
 * @apiDescription 创建模块权限
 * @apiName create
 * @apiHeader {String} Authorization token
 * @apiParam (参数) {Number} mod_id 模块ID
 * @apiParam (参数) {String} name 名称
 * @apiParam (参数) {String} code 编码
 * @apiParam (参数) {String} type 类型 按钮或者其他
 * @apiParam (参数) {String} method 请求方式
 * @apiSampleRequest /api/DataControl/create
 * @apiGroup DataControl
 * @apiVersion 0.0.1
 */
router.post('/create', ValidateDataControl.create, DataControl.create)
/**
 * 编辑
 * @api {put} /api/DataControl/update 编辑
 * @apiDescription 编辑
 * @apiName update
 * @apiHeader {String} Authorization token
 * @apiParam (参数) {Number} id
 * @apiParam (参数) {Number} mod_id 模块ID
 * @apiParam (参数) {String} name 名称
 * @apiParam (参数) {String} code 编码
 * @apiParam (参数) {String} type 类型 按钮或者其他
 * @apiParam (参数) {String} method 请求方式
 * @apiSampleRequest /api/DataControl/update
 * @apiGroup DataControl
 * @apiVersion 0.0.1
 */
router.put('/update', ValidateDataControl.update, DataControl.update)
/**
 * 删除
 * @api {delete} /api/DataControl/delete/:id 删除
 * @apiDescription 删除
 * @apiName delete
 * @apiHeader {String} Authorization token
 * @apiParam {Number} id
 * @apiSampleRequest /api/DataControl/delete
 * @apiGroup DataControl
 * @apiVersion 0.0.1
 */
router.delete('/delete/:id', ValidateDataControl.delete, DataControl.delete)

/**
 * 获取模块信息
 * @api {get} /api/DataControl/getRow 获取模块信息
 * @apiDescription 获取模块权限信息
 * @apiName getRow
 * @apiHeader {String} Authorization token
 * @apiParam {Number} id
 * @apiSampleRequest /api/DataControl/getRow
 * @apiGroup DataControl
 * @apiVersion 0.0.1
 */
router.get('/getRow/:id', ValidateDataControl.getRow, DataControl.getRow)
/**
 * 获取模块列表
 * @api {get} /api/DataControl/getList 获取模块列表
 * @apiDescription 获取模块权限列表
 * @apiName getList
 * @apiHeader {String} Authorization token
 * @apiParam (path参数) {Number} mod_id
 * @apiSampleRequest /api/DataControl/getList
 * @apiGroup DataControl
 * @apiVersion 0.0.1
 */
router.get('/getList', ValidateDataControl.getList, DataControl.getList)
/**
 * 获取所有模块权限
 * @api {get} /api/DataControl/getAll 获取所有模块权限
 * @apiDescription 获取所有模块权限
 * @apiName getAll
 * @apiHeader {String} Authorization token
 * @apiParam {Number} modId
 * @apiSampleRequest /api/DataControl/getAll
 * @apiGroup DataControl
 * @apiVersion 0.0.1
 */
router.get('/getAll', ValidateDataControl.getAll, DataControl.getAll)

export default router
