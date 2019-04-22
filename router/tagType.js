import express from 'express'
import TagType from '../controller/TagType'
import ValidateTagType from '../validate/TagType'
const router = express.Router()

/**
 * 创建
 * @api {POST} /api/TagType/create 创建
 * @apiDescription 创建标签
 * @apiName create
 * @apiHeader {String} Authorization token
 * @apiParam (参数) {Number} type_id 类型ID
 * @apiParam (参数) {String} name 名称
 * @apiParam (参数) {String} wikipedia 标签百科
 * @apiParam (参数) {String} sort 排序
 * @apiParam (参数) {String} desc 描述
 * @apiSampleRequest /api/TagType/create
 * @apiGroup TagType
 * @apiVersion 0.0.1
 */
router.post('/create', ValidateTagType.create, TagType.create)
/**
 * 编辑
 * @api {put} /api/TagType/update 编辑
 * @apiDescription 编辑
 * @apiName update
 * @apiHeader {String} Authorization token
 * @apiParam (参数) {Number} id
 * @apiParam (参数) {Number} type_id 类型ID
 * @apiParam (参数) {String} name 名称
 * @apiParam (参数) {String} wikipedia 标签百科
 * @apiParam (参数) {String} sort 排序
 * @apiParam (参数) {String} desc 描述
 * @apiSampleRequest /api/TagType/update
 * @apiGroup TagType
 * @apiVersion 0.0.1
 */
router.put('/update', ValidateTagType.update, TagType.update)
/**
 * 删除
 * @api {delete} /api/TagType/delete/:id 删除
 * @apiDescription 删除
 * @apiName delete
 * @apiHeader {String} Authorization token
 * @apiParam {Number} id
 * @apiSampleRequest /api/TagType/delete
 * @apiGroup TagType
 * @apiVersion 0.0.1
 */
router.delete('/delete/:id', ValidateTagType.delete, TagType.delete)

/**
 * 获取标签信息
 * @api {get} /api/TagType/getRow 获取标签信息
 * @apiDescription 获取标签信息
 * @apiName getRow
 * @apiHeader {String} Authorization token
 * @apiParam {Number} id
 * @apiSampleRequest /api/TagType/getRow
 * @apiGroup TagType
 * @apiVersion 0.0.1
 */
router.get('/getRow/:id', ValidateTagType.getRow, TagType.getRow)
/**
 * 获取标签列表
 * @api {get} /api/TagType/getList 获取标签列表
 * @apiDescription 获取标签列表
 * @apiName getList
 * @apiHeader {String} Authorization token
 * @apiParam (path参数) {Number} curPage
 * @apiParam (path参数) {Number} pageSize
 * @apiSampleRequest /api/TagType/getList
 * @apiGroup TagType
 * @apiVersion 0.0.1
 */
router.get('/getList', ValidateTagType.getList, TagType.getList)
/**
 * 获取所有标签
 * @api {get} /api/TagType/getAll 获取所有标签
 * @apiDescription 获取所有标签
 * @apiName getAll
 * @apiParam {Number} type
 * @apiHeader {String} Authorization token
 * @apiSampleRequest /api/TagType/getAll
 * @apiGroup TagType
 * @apiVersion 0.0.1
 */
router.get('/getAll', ValidateTagType.getAll, TagType.getAll)

export default router
