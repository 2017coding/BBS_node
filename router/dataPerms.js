import express from 'express'
import DataPerms from '../controller/DataPerms'
import ValidateDataPerms from '../validate/DataPerms'
const router = express.Router()

/**
 * 创建
 * @api {POST} /api/DataPerms/create 创建
 * @apiDescription 创建模块权限
 * @apiName create
 * @apiHeader {String} Authorization token
 * @apiParam (参数) {Number} menu_id 模块ID
 * @apiParam (参数) {String} name 名称
 * @apiParam (参数) {String} code 编码
 * @apiParam (参数) {String} type 类型 按钮或者其他
 * @apiParam (参数) {String} method 请求方式
 * @apiSampleRequest /api/DataPerms/create
 * @apiGroup DataPerms
 * @apiVersion 0.0.1
 */
router.post('/create', ValidateDataPerms.create, DataPerms.create)
/**
 * 编辑
 * @api {put} /api/DataPerms/update 编辑
 * @apiDescription 编辑
 * @apiName update
 * @apiHeader {String} Authorization token
 * @apiParam (参数) {Number} id
 * @apiParam (参数) {Number} menu_id 模块ID
 * @apiParam (参数) {String} name 名称
 * @apiParam (参数) {String} code 编码
 * @apiParam (参数) {String} type 类型 按钮或者其他
 * @apiParam (参数) {String} method 请求方式
 * @apiSampleRequest /api/DataPerms/update
 * @apiGroup DataPerms
 * @apiVersion 0.0.1
 */
router.put('/update', ValidateDataPerms.update, DataPerms.update)
/**
 * 删除
 * @api {delete} /api/DataPerms/delete/:id 删除
 * @apiDescription 删除
 * @apiName delete
 * @apiHeader {String} Authorization token
 * @apiParam {Number} id
 * @apiSampleRequest /api/DataPerms/delete
 * @apiGroup DataPerms
 * @apiVersion 0.0.1
 */
router.delete('/delete/:id', ValidateDataPerms.delete, DataPerms.delete)

/**
 * 获取模块信息
 * @api {get} /api/DataPerms/getRow 获取模块信息
 * @apiDescription 获取模块权限信息
 * @apiName getRow
 * @apiHeader {String} Authorization token
 * @apiParam {Number} id
 * @apiSampleRequest /api/DataPerms/getRow
 * @apiGroup DataPerms
 * @apiVersion 0.0.1
 */
router.get('/getRow/:id', ValidateDataPerms.getRow, DataPerms.getRow)
/**
 * 获取模块列表
 * @api {get} /api/DataPerms/getList 获取模块列表
 * @apiDescription 获取模块权限列表
 * @apiName getList
 * @apiHeader {String} Authorization token
 * @apiParam (path参数) {Number} menu_id
 * @apiSampleRequest /api/DataPerms/getList
 * @apiGroup DataPerms
 * @apiVersion 0.0.1
 */
router.get('/getList', ValidateDataPerms.getList, DataPerms.getList)
/**
 * 获取用户拥有模块权限
 * @api {get} /api/DataPerms/getRoleDataPerms 获取用户拥有模块权限
 * @apiDescription 获取用户拥有模块权限
 * @apiName getRoleDataPerms
 * @apiHeader {String} Authorization token
 * @apiParam {Number} modId
 * @apiSampleRequest /api/DataPerms/getRoleDataPerms
 * @apiGroup DataPerms
 * @apiVersion 0.0.1
 */
router.get('/getRoleDataPerms', ValidateDataPerms.getRoleDataPerms, DataPerms.getRoleDataPerms)
/**
 * 获取所有模块权限
 * @api {get} /api/DataPerms/getAll 获取所有模块权限
 * @apiDescription 获取所有模块权限
 * @apiName getAll
 * @apiHeader {String} Authorization token
 * @apiParam {Number} modId
 * @apiSampleRequest /api/DataPerms/getAll
 * @apiGroup DataPerms
 * @apiVersion 0.0.1
 */
router.get('/getAll', ValidateDataPerms.getAll, DataPerms.getAll)

export default router
