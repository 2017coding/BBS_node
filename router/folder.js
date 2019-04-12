import express from 'express'
import Menu from '../controller/Menu'
import ValidateMenu from '../validate/Menu'
const router = express.Router()

/**
 * 创建
 * @api {POST} /api/Menu/create 创建
 * @apiDescription 创建菜单
 * @apiName create
 * @apiHeader {String} Authorization token
 * @apiParam (参数) {Number} pid 父ID
 * @apiParam (参数) {Number} type 菜单类型: 1. 管理平台菜单 2. BBS菜单 3. 移动端菜单
 * @apiParam (参数) {String} code 菜单编码
 * @apiParam (参数) {String} name 菜单名称
 * @apiParam (参数) {String} icon 菜单图标
 * @apiParam (参数) {String} redirect 重定向路径: 配置菜单编码或URL
 * @apiParam (参数) {String} sort 排序
 * @apiParam (参数) {String} desc 描述
 * @apiParam (参数) {String} status 状态: 0：停用，1：启用(默认为1)
 * @apiSampleRequest /api/Menu/create
 * @apiGroup Menu
 * @apiVersion 0.0.1
 */
router.post('/create', ValidateMenu.create, Menu.create)
/**
 * 编辑
 * @api {put} /api/Menu/update 编辑
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
 * @apiSampleRequest /api/Menu/update
 * @apiGroup Menu
 * @apiVersion 0.0.1
 */
router.put('/update', ValidateMenu.update, Menu.update)
/**
 * 删除
 * @api {delete} /api/Menu/delete/:id 删除
 * @apiDescription 删除
 * @apiName delete
 * @apiHeader {String} Authorization token
 * @apiParam {Number} id
 * @apiSampleRequest /api/Menu/delete
 * @apiGroup Menu
 * @apiVersion 0.0.1
 */
router.delete('/delete/:id', ValidateMenu.delete, Menu.delete)

/**
 * 获取菜单信息
 * @api {get} /api/Menu/getRow 获取菜单信息
 * @apiDescription 获取菜单信息
 * @apiName getRow
 * @apiHeader {String} Authorization token
 * @apiParam {Number} id
 * @apiSampleRequest /api/Menu/getRow
 * @apiGroup Menu
 * @apiVersion 0.0.1
 */
router.get('/getRow/:id', ValidateMenu.getRow, Menu.getRow)
/**
 * 获取菜单列表
 * @api {get} /api/Menu/getList 获取菜单列表
 * @apiDescription 获取菜单列表
 * @apiName getList
 * @apiHeader {String} Authorization token
 * @apiParam (path参数) {Number} curPage
 * @apiParam (path参数) {Number} pageSize
 * @apiParam (path参数) {String} account 账号
 * @apiParam (path参数) {String} name 昵称
 * @apiParam (path参数) {Number} create_Menu
 * @apiSampleRequest /api/Menu/getList
 * @apiGroup Menu
 * @apiVersion 0.0.1
 */
router.get('/getList', ValidateMenu.getList, Menu.getList)
/**
 * 获取用户拥有的所有菜单
 * @api {get} /api/Menu/getRoleMenu 获取所有菜单
 * @apiDescription 获取所有菜单
 * @apiName getRoleMenu
 * @apiParam {Number} type
 * @apiHeader {String} Authorization token
 * @apiSampleRequest /api/Menu/getRoleMenu
 * @apiGroup Menu
 * @apiVersion 0.0.1
 */
router.get('/getRoleMenu', ValidateMenu.getRoleMenu, Menu.getRoleMenu)
/**
 * 获取所有菜单
 * @api {get} /api/Menu/getAll 获取所有菜单
 * @apiDescription 获取所有菜单
 * @apiName getAll
 * @apiParam {Number} type
 * @apiHeader {String} Authorization token
 * @apiSampleRequest /api/Menu/getAll
 * @apiGroup Menu
 * @apiVersion 0.0.1
 */
router.get('/getAll', ValidateMenu.getAll, Menu.getAll)

export default router
