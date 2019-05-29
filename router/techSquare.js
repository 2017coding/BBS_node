import express from 'express'
import TechSquare from '../controller/TechSquare'
import ValidateTechSquare from '../validate/TechSquare'
const router = express.Router()

/**
 * 创建
 * @api {POST} /api/TechSquare/create 创建
 * @apiDescription 创建技术频道
 * @apiName create
 * @apiHeader {String} Authorization token
 * @apiParam (参数) {String} title 标题
 * @apiParam (参数) {String} image 图片地址
 * @apiParam (参数) {Number} click 点击触发类型
 * @apiParam (参数) {String} href 跳转地址
 * @apiParam (参数) {Number} sort 排序
 * @apiParam (参数) {String} desc 描述
 * @apiParam (参数) {Number} status 状态
 * @apiSampleRequest /api/TechSquare/create
 * @apiGroup TechSquare
 * @apiVersion 0.0.1
 */
router.post('/create', ValidateTechSquare.create, TechSquare.create)
/**
 * 编辑
 * @api {put} /api/TechSquare/update 编辑
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
 * @apiSampleRequest /api/TechSquare/update
 * @apiGroup TechSquare
 * @apiVersion 0.0.1
 */
router.put('/update', ValidateTechSquare.update, TechSquare.update)
/**
 * 删除
 * @api {delete} /api/TechSquare/delete/:id 删除
 * @apiDescription 删除
 * @apiName delete
 * @apiHeader {String} Authorization token
 * @apiParam {Number} id
 * @apiSampleRequest /api/TechSquare/delete
 * @apiGroup TechSquare
 * @apiVersion 0.0.1
 */
router.delete('/delete/:id', ValidateTechSquare.delete, TechSquare.delete)

/**
 * 获取技术频道信息
 * @api {get} /api/TechSquare/getRow 获取技术频道信息
 * @apiDescription 获取技术频道信息
 * @apiName getRow
 * @apiHeader {String} Authorization token
 * @apiParam {Number} id
 * @apiSampleRequest /api/TechSquare/getRow
 * @apiGroup TechSquare
 * @apiVersion 0.0.1
 */
router.get('/getRow/:id', ValidateTechSquare.getRow, TechSquare.getRow)
/**
 * 获取技术频道列表
 * @api {get} /api/TechSquare/getList 获取技术频道列表
 * @apiDescription 获取技术频道列表
 * @apiName getList
 * @apiHeader {String} Authorization token
 * @apiParam (path参数) {Number} curPage
 * @apiParam (path参数) {Number} pageSize
 * @apiSampleRequest /api/TechSquare/getList
 * @apiGroup TechSquare
 * @apiVersion 0.0.1
 */
router.get('/getList', ValidateTechSquare.getList, TechSquare.getList)
/**
 * 获取所有技术频道
 * @api {get} /api/TechSquare/getAll 获取所有技术频道
 * @apiDescription 获取所有技术频道
 * @apiName getAll
 * @apiParam {Number} type
 * @apiHeader {String} Authorization token
 * @apiSampleRequest /api/TechSquare/getAll
 * @apiGroup TechSquare
 * @apiVersion 0.0.1
 */
router.get('/getAll', ValidateTechSquare.getAll, TechSquare.getAll)

export default router
