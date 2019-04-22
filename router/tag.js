import express from 'express'
import Tag from '../controller/Tag'
import ValidateTag from '../validate/Tag'
const router = express.Router()

/**
 * 创建
 * @api {POST} /api/Tag/create 创建
 * @apiDescription 创建标签类型
 * @apiName create
 * @apiHeader {String} Authorization token
 * @apiParam (参数) {Number} type_id 类型ID
 * @apiParam (参数) {String} name 名称
 * @apiParam (参数) {String} sort 排序
 * @apiParam (参数) {String} desc 描述
 * @apiSampleRequest /api/Tag/create
 * @apiGroup Tag
 * @apiVersion 0.0.1
 */
router.post('/create', ValidateTag.create, Tag.create)
/**
 * 编辑
 * @api {put} /api/Tag/update 编辑
 * @apiDescription 编辑
 * @apiName update
 * @apiHeader {String} Authorization token
 * @apiParam (参数) {Number} id
 * @apiParam (参数) {Number} type_id 类型ID
 * @apiParam (参数) {String} name 名称
 * @apiParam (参数) {String} sort 排序
 * @apiParam (参数) {String} desc 描述
 * @apiSampleRequest /api/Tag/update
 * @apiGroup Tag
 * @apiVersion 0.0.1
 */
router.put('/update', ValidateTag.update, Tag.update)
/**
 * 删除
 * @api {delete} /api/Tag/delete/:id 删除
 * @apiDescription 删除
 * @apiName delete
 * @apiHeader {String} Authorization token
 * @apiParam {Number} id
 * @apiSampleRequest /api/Tag/delete
 * @apiGroup Tag
 * @apiVersion 0.0.1
 */
router.delete('/delete/:id', ValidateTag.delete, Tag.delete)

/**
 * 获取标签类型信息
 * @api {get} /api/Tag/getRow 获取标签类型信息
 * @apiDescription 获取标签类型信息
 * @apiName getRow
 * @apiHeader {String} Authorization token
 * @apiParam {Number} id
 * @apiSampleRequest /api/Tag/getRow
 * @apiGroup Tag
 * @apiVersion 0.0.1
 */
router.get('/getRow/:id', ValidateTag.getRow, Tag.getRow)
/**
 * 获取标签类型列表
 * @api {get} /api/Tag/getList 获取标签类型列表
 * @apiDescription 获取标签类型列表
 * @apiName getList
 * @apiHeader {String} Authorization token
 * @apiParam (path参数) {Number} curPage
 * @apiParam (path参数) {Number} pageSize
 * @apiSampleRequest /api/Tag/getList
 * @apiGroup Tag
 * @apiVersion 0.0.1
 */
router.get('/getList', ValidateTag.getList, Tag.getList)
/**
 * 获取所有标签类型
 * @api {get} /api/Tag/getAll 获取所有标签类型
 * @apiDescription 获取所有标签类型
 * @apiName getAll
 * @apiParam {Number} type
 * @apiHeader {String} Authorization token
 * @apiSampleRequest /api/Tag/getAll
 * @apiGroup Tag
 * @apiVersion 0.0.1
 */
router.get('/getAll', ValidateTag.getAll, Tag.getAll)

export default router
