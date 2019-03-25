import express from 'express'
import Role from '../controller/Role'
import ValidateRole from '../validate/Role'
const router = express.Router()

/**
 * 创建
 * @api {POST} /api/Role/create 创建
 * @apiDescription 创建角色
 * @apiName create
 * @apiHeader {String} Authorization token
 * @apiParam (参数) {Number} pid 父ID
 * @apiParam (参数) {String} name 角色名称
 * @apiParam (参数) {String} columns 专栏数量
 * @apiParam (参数) {Number} users 可创建用户数
 * @apiParam (参数) {Number} desc 描述
 * @apiParam (参数) {String} status 状态: 0：停用，1：启用(默认为1)
 * @apiSampleRequest /api/Role/create
 * @apiGroup Role
 * @apiVersion 0.0.1
 */
router.post('/create', ValidateRole.create, Role.create)
/**
 * 编辑
 * @api {put} /api/Role/update 编辑
 * @apiDescription 编辑
 * @apiName update
 * @apiHeader {String} Authorization token
 * @apiParam (参数) {Number} id
 * @apiParam (参数) {Number} pid 父ID
 * @apiParam (参数) {String} name 角色名称
 * @apiParam (参数) {String} columns 专栏数量
 * @apiParam (参数) {Number} users 可创建用户数
 * @apiParam (参数) {Number} desc 描述
 * @apiParam (参数) {String} status 状态: 0：停用，1：启用(默认为1)
 * @apiSampleRequest /api/Role/update
 * @apiGroup Role
 * @apiVersion 0.0.1
 */
router.put('/update', ValidateRole.update, Role.update)
/**
 * 删除
 * @api {delete} /api/Role/delete/:id 删除
 * @apiDescription 删除
 * @apiName delete
 * @apiHeader {String} Authorization token
 * @apiParam {Number} id
 * @apiSampleRequest /api/Role/delete
 * @apiGroup Role
 * @apiVersion 0.0.1
 */
router.delete('/delete/:id', ValidateRole.delete, Role.delete)

/**
 * 获取角色信息
 * @api {get} /api/Role/getRow 获取角色信息
 * @apiDescription 获取角色信息
 * @apiName getRow
 * @apiHeader {String} Authorization token
 * @apiParam {Number} id
 * @apiSampleRequest /api/Role/getRow
 * @apiGroup Role
 * @apiVersion 0.0.1
 */
router.get('/getRow/:id', ValidateRole.getRow, Role.getRow)
/**
 * 获取角色列表
 * @api {get} /api/Role/getList 获取角色列表
 * @apiDescription 获取角色列表
 * @apiName getList
 * @apiHeader {String} Authorization token
 * @apiParam (path参数) {Number} curPage
 * @apiParam (path参数) {Number} pageSize
 * @apiParam (path参数) {String} name 角色名称
 * @apiSampleRequest /api/Role/getList
 * @apiGroup Role
 * @apiVersion 0.0.1
 */
router.get('/getList', ValidateRole.getList, Role.getList)
/**
 * 获取所有角色
 * @api {get} /api/Role/getAll 获取所有角色
 * @apiDescription 获取所有角色
 * @apiName getAll
 * @apiHeader {String} Authorization token
 * @apiSampleRequest /api/Role/getAll
 * @apiGroup Role
 * @apiVersion 0.0.1
 */
router.get('/getAll', ValidateRole.getAll, Role.getAll)

export default router
