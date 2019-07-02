import express from 'express'
import Topic from '../controller/Topic'
import ValidateTopic from '../validate/Topic'
const router = express.Router()

/**
 * 创建
 * @api {POST} /api/Topic/create 创建
 * @apiDescription 创建标签类型
 * @apiName create
 * @apiHeader {String} Authorization token
 * @apiParam (参数) {Number} type_id 类型ID
 * @apiParam (参数) {String} name 名称
 * @apiParam (参数) {String} sort 排序
 * @apiParam (参数) {String} desc 描述
 * @apiSampleRequest /api/Topic/create
 * @apiGroup Topic
 * @apiVersion 0.0.1
 */
router.post('/create', ValidateTopic.create, Topic.create)
/**
 * 编辑
 * @api {put} /api/Topic/update 编辑
 * @apiDescription 编辑
 * @apiName update
 * @apiHeader {String} Authorization token
 * @apiParam (参数) {Number} id
 * @apiParam (参数) {Number} type_id 类型ID
 * @apiParam (参数) {String} name 名称
 * @apiParam (参数) {String} sort 排序
 * @apiParam (参数) {String} desc 描述
 * @apiSampleRequest /api/Topic/update
 * @apiGroup Topic
 * @apiVersion 0.0.1
 */
router.put('/update', ValidateTopic.update, Topic.update)
/**
 * 删除
 * @api {delete} /api/Topic/delete/:id 删除
 * @apiDescription 删除
 * @apiName delete
 * @apiHeader {String} Authorization token
 * @apiParam {Number} id
 * @apiSampleRequest /api/Topic/delete
 * @apiGroup Topic
 * @apiVersion 0.0.1
 */
router.delete('/delete/:id', ValidateTopic.delete, Topic.delete)

/**
 * 获取订阅信息
 * @api {get} /api/Topic/getRow 获取标签类型信息
 * @apiDescription 获取标签类型信息
 * @apiName getRow
 * @apiHeader {String} Authorization token
 * @apiParam {Number} id
 * @apiSampleRequest /api/Topic/getRow
 * @apiGroup Topic
 * @apiVersion 0.0.1
 */
router.get('/getRow/:id', ValidateTopic.getRow, Topic.getRow)
/**
 * 获取订阅列表
 * @api {get} /api/Topic/getList 获取标签类型列表
 * @apiDescription 获取标签类型列表
 * @apiName getList
 * @apiHeader {String} Authorization token
 * @apiParam (path参数) {Number} curPage
 * @apiParam (path参数) {Number} pageSize
 * @apiSampleRequest /api/Topic/getList
 * @apiGroup Topic
 * @apiVersion 0.0.1
 */
router.get('/getList', ValidateTopic.getList, Topic.getList)
/**
 * 获取所有标签类型
 * @api {get} /api/Topic/getAll 获取所有标签类型
 * @apiDescription 获取所有标签类型
 * @apiName getAll
 * @apiParam {Number} type
 * @apiHeader {String} Authorization token
 * @apiSampleRequest /api/Topic/getAll
 * @apiGroup Topic
 * @apiVersion 0.0.1
 */
router.get('/getAll', ValidateTopic.getAll, Topic.getAll)

export default router
