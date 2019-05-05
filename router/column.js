import express from 'express'
import Column from '../controller/Column'
import ValidateColumn from '../validate/Column'
const router = express.Router()

/**
 * 创建
 * @api {POST} /api/Column/create 创建
 * @apiDescription 创建专栏
 * @apiName create
 * @apiHeader {String} Authorization token
 * @apiParam (参数) {String} title 标题
 * @apiParam (参数) {String} image 图片地址
 * @apiParam (参数) {Number} click 点击触发类型
 * @apiParam (参数) {String} href 跳转地址
 * @apiParam (参数) {Number} sort 排序
 * @apiParam (参数) {String} desc 描述
 * @apiParam (参数) {Number} status 状态
 * @apiSampleRequest /api/Column/create
 * @apiGroup Column
 * @apiVersion 0.0.1
 */
router.post('/create', ValidateColumn.create, Column.create)
/**
 * 编辑
 * @api {put} /api/Column/update 编辑
 * @apiDescription 编辑
 * @apiName update
 * @apiHeader {String} Authorization token
 * @apiParam (参数) {Number} id
 * @apiParam (参数) {String} title 标题
 * @apiParam (参数) {String} image 图片地址
 * @apiParam (参数) {Number} click 点击触发类型
 * @apiParam (参数) {String} href 跳转地址
 * @apiParam (参数) {Number} sort 排序
 * @apiParam (参数) {String} desc 描述
 * @apiParam (参数) {Number} status 状态
 * @apiSampleRequest /api/Column/update
 * @apiGroup Column
 * @apiVersion 0.0.1
 */
router.put('/update', ValidateColumn.update, Column.update)
/**
 * 删除
 * @api {delete} /api/Column/delete/:id 删除
 * @apiDescription 删除
 * @apiName delete
 * @apiHeader {String} Authorization token
 * @apiParam {Number} id
 * @apiSampleRequest /api/Column/delete
 * @apiGroup Column
 * @apiVersion 0.0.1
 */
router.delete('/delete/:id', ValidateColumn.delete, Column.delete)

/**
 * 获取专栏信息
 * @api {get} /api/Column/getRow 获取专栏信息
 * @apiDescription 获取专栏信息
 * @apiName getRow
 * @apiHeader {String} Authorization token
 * @apiParam {Number} id
 * @apiSampleRequest /api/Column/getRow
 * @apiGroup Column
 * @apiVersion 0.0.1
 */
router.get('/getRow/:id', ValidateColumn.getRow, Column.getRow)
/**
 * 获取专栏列表
 * @api {get} /api/Column/getList 获取专栏列表
 * @apiDescription 获取专栏列表
 * @apiName getList
 * @apiHeader {String} Authorization token
 * @apiParam (path参数) {Number} curPage
 * @apiParam (path参数) {Number} pageSize
 * @apiSampleRequest /api/Column/getList
 * @apiGroup Column
 * @apiVersion 0.0.1
 */
router.get('/getList', ValidateColumn.getList, Column.getList)
/**
 * 获取所有专栏
 * @api {get} /api/Column/getAll 获取所有专栏
 * @apiDescription 获取所有专栏
 * @apiName getAll
 * @apiParam {Number} type
 * @apiHeader {String} Authorization token
 * @apiSampleRequest /api/Column/getAll
 * @apiGroup Column
 * @apiVersion 0.0.1
 */
router.get('/getAll', ValidateColumn.getAll, Column.getAll)

export default router
