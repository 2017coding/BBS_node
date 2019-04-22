import express from 'express'
import Folder from '../controller/Folder'
import ValidateFolder from '../validate/Folder'
const router = express.Router()

/**
 * 创建
 * @api {POST} /api/Folder/create 创建
 * @apiDescription 创建目录
 * @apiName create
 * @apiHeader {String} Authorization token
 * @apiParam (参数) {Number} pid 父ID
 * @apiParam (参数) {String} name 目录名称
 * @apiParam (参数) {String} sort 排序
 * @apiParam (参数) {String} desc 描述
 * @apiSampleRequest /api/Folder/create
 * @apiGroup Folder
 * @apiVersion 0.0.1
 */
router.post('/create', ValidateFolder.create, Folder.create)
/**
 * 编辑
 * @api {put} /api/Folder/update 编辑
 * @apiDescription 编辑
 * @apiName update
 * @apiHeader {String} Authorization token
 * @apiParam (参数) {Number} id
 * @apiParam (参数) {Number} pid 父ID
 * @apiParam (参数) {String} name 目录名称
 * @apiParam (参数) {String} sort 排序
 * @apiParam (参数) {String} desc 描述
 * @apiSampleRequest /api/Folder/update
 * @apiGroup Folder
 * @apiVersion 0.0.1
 */
router.put('/update', ValidateFolder.update, Folder.update)
/**
 * 删除
 * @api {delete} /api/Folder/delete/:id 删除
 * @apiDescription 删除
 * @apiName delete
 * @apiHeader {String} Authorization token
 * @apiParam {Number} id
 * @apiSampleRequest /api/Folder/delete
 * @apiGroup Folder
 * @apiVersion 0.0.1
 */
router.delete('/delete/:id', ValidateFolder.delete, Folder.delete)

/**
 * 获取目录信息
 * @api {get} /api/Folder/getRow 获取目录信息
 * @apiDescription 获取目录信息
 * @apiName getRow
 * @apiHeader {String} Authorization token
 * @apiParam {Number} id
 * @apiSampleRequest /api/Folder/getRow
 * @apiGroup Folder
 * @apiVersion 0.0.1
 */
router.get('/getRow/:id', ValidateFolder.getRow, Folder.getRow)
/**
 * 获取目录列表
 * @api {get} /api/Folder/getList 获取目录列表
 * @apiDescription 获取目录列表
 * @apiName getList
 * @apiHeader {String} Authorization token
 * @apiParam (path参数) {Number} curPage
 * @apiParam (path参数) {Number} pageSize
 * @apiSampleRequest /api/Folder/getList
 * @apiGroup Folder
 * @apiVersion 0.0.1
 */
router.get('/getList', ValidateFolder.getList, Folder.getList)
/**
 * 获取所有目录
 * @api {get} /api/Folder/getAll 获取所有目录
 * @apiDescription 获取所有目录
 * @apiName getAll
 * @apiParam {Number} type
 * @apiHeader {String} Authorization token
 * @apiSampleRequest /api/Folder/getAll
 * @apiGroup Folder
 * @apiVersion 0.0.1
 */
router.get('/getAll', ValidateFolder.getAll, Folder.getAll)

export default router
