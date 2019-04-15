import express from 'express'
import File from '../controller/File'
import ValidateFile from '../validate/File'
import multipart from 'connect-multiparty' // 处理form-data数据中间件

const router = express.Router()

/**
 * 上传文件
 * @api {POST} /api/File/upload 创建
 * @apiDescription 创建菜单
 * @apiName upload
 * @apiHeader {String} Authorization token
 * @apiParam (参数) {Number} id 目录ID
 * @apiSampleRequest /api/File/upload
 * @apiGroup File
 * @apiVersion 0.0.1
 */
router.post('/upload', multipart(), ValidateFile.upload, File.upload)
/**
 * 编辑
 * @api {put} /api/File/update 编辑
 * @apiDescription 编辑
 * @apiName update
 * @apiHeader {String} Authorization token
 * @apiParam (参数) {Number} id
 * @apiParam (参数) {Number} pid 父ID
 * @apiParam (参数) {Number} type 菜单类型: 1. 管理平台菜单 2. BBS菜单 3. 移动端菜单
 * @apiParam (参数) {String} code 菜单编码
 * @apiParam (参数) {String} name 菜单名称
 * @apiParam (参数) {String} icon 菜单图标
 * @apiParam (参数) {String} redirect 重定向路径: 配置菜单编码或URL
 * @apiParam (参数) {String} sort 排序
 * @apiParam (参数) {String} desc 描述
 * @apiParam (参数) {String} status 状态: 0：停用，1：启用(默认为1)
 * @apiSampleRequest /api/File/update
 * @apiGroup File
 * @apiVersion 0.0.1
 */
router.put('/update', ValidateFile.update, File.update)
/**
 * 删除
 * @api {delete} /api/File/delete/:id 删除
 * @apiDescription 删除
 * @apiName delete
 * @apiHeader {String} Authorization token
 * @apiParam {Number} id
 * @apiSampleRequest /api/File/delete
 * @apiGroup File
 * @apiVersion 0.0.1
 */
router.delete('/delete/:id', ValidateFile.delete, File.delete)

/**
 * 获取菜单信息
 * @api {get} /api/File/getRow 获取菜单信息
 * @apiDescription 获取菜单信息
 * @apiName getRow
 * @apiHeader {String} Authorization token
 * @apiParam {Number} id
 * @apiSampleRequest /api/File/getRow
 * @apiGroup File
 * @apiVersion 0.0.1
 */
router.get('/getRow/:id', ValidateFile.getRow, File.getRow)
/**
 * 获取菜单列表
 * @api {get} /api/File/getList 获取菜单列表
 * @apiDescription 获取菜单列表
 * @apiName getList
 * @apiHeader {String} Authorization token
 * @apiParam (path参数) {Number} curPage
 * @apiParam (path参数) {Number} pageSize
 * @apiParam (path参数) {String} account 账号
 * @apiParam (path参数) {String} name 昵称
 * @apiParam (path参数) {Number} create_File
 * @apiSampleRequest /api/File/getList
 * @apiGroup File
 * @apiVersion 0.0.1
 */
router.get('/getList', ValidateFile.getList, File.getList)
/**
 * 获取所有菜单
 * @api {get} /api/File/getAll 获取所有菜单
 * @apiDescription 获取所有菜单
 * @apiName getAll
 * @apiParam {Number} type
 * @apiHeader {String} Authorization token
 * @apiSampleRequest /api/File/getAll
 * @apiGroup File
 * @apiVersion 0.0.1
 */
router.get('/getAll', ValidateFile.getAll, File.getAll)

export default router
