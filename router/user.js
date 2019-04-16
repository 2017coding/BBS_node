import express from 'express'
import User from '../controller/User'
import ValidateUser from '../validate/User'
const router = express.Router()

/**
 * 注册
 * @api {POST} /api/user/registered 注册
 * @apiDescription 注册用户
 * @apiName registered
 * @apiParam (参数) {String} account 账号
 * @apiParam (参数) {String} password 密码
 * @apiParam (参数) {Number} type 用户类型: 0: 手机注册 1: 论坛注册 2: 管理平台添加
 * @apiSampleRequest /api/user/registered
 * @apiGroup User
 * @apiVersion 0.0.1
 */
router.post('/registered', ValidateUser.registered, User.registered)
/**
 * 登录
 * @api {POST} /api/user/login 登录
 * @apiDescription 用户登录
 * @apiName login
 * @apiParam (参数) {String} account 账号
 * @apiParam (参数) {String} password 密码
 * @apiParam (参数) {Number} type 用户类型: 0: 手机注册 1: 论坛注册 2: 管理平台添加
 * @apiSampleRequest /api/user/login
 * @apiGroup User
 * @apiVersion 0.0.1
 */
router.post('/login', ValidateUser.login, User.login)
/**
 * 登出
 * @api {POST} /api/user/loginOut 登出
 * @apiDescription 用户登出
 * @apiName loginOut
 * @apiHeader {String} Authorization token
 * @apiSampleRequest /api/user/loginOut
 * @apiGroup User
 * @apiVersion 0.0.1
 */
router.post('/loginOut', User.loginOut)
/**
 * 创建
 * @api {POST} /api/user/create 创建
 * @apiDescription 创建用户
 * @apiName create
 * @apiHeader {String} Authorization token
 * @apiParam (参数) {String} account 账号
 * @apiParam (参数) {String} name 昵称
 * @apiParam (参数) {String} password 密码
 * @apiParam (参数) {Number} type 用户类型: 0: 手机注册 1: 论坛注册 2: 管理平台添加
 * @apiParam (参数) {Number} sex 性别: 0:男 1:女
 * @apiParam (参数) {String} avatar 头像
 * @apiParam (参数) {String} phone 手机号
 * @apiParam (参数) {String} wechat 微信
 * @apiParam (参数) {String} qq qq
 * @apiParam (参数) {String} email email
 * @apiParam (参数) {String} status 状态: 0：停用，1：启用(默认为1)
 * @apiSampleRequest /api/user/create
 * @apiGroup User
 * @apiVersion 0.0.1
 */
router.post('/create', ValidateUser.create, User.registered)
/**
 * 编辑
 * @api {put} /api/user/update 编辑
 * @apiDescription 编辑
 * @apiName update
 * @apiHeader {String} Authorization token
 * @apiParam (参数) {Number} id
 * @apiParam (参数) {Number} role_id 关联角色
 * @apiParam (参数) {String} account 账号
 * @apiParam (参数) {String} name 昵称
 * @apiParam (参数) {String} password 密码
 * @apiParam (参数) {Number} type 用户类型: 0: 手机注册 1: 论坛注册 2: 管理平台添加
 * @apiParam (参数) {Number} sex 性别: 0:男 1:女
 * @apiParam (参数) {String} avatar 头像
 * @apiParam (参数) {String} phone 手机号
 * @apiParam (参数) {String} wechat 微信
 * @apiParam (参数) {String} qq qq
 * @apiParam (参数) {String} email email
 * @apiParam (参数) {String} status 状态: 0：停用，1：启用(默认为1)
 * @apiSampleRequest /api/user/update
 * @apiGroup User
 * @apiVersion 0.0.1
 */
router.put('/update', ValidateUser.update, User.update)
/**
 * 删除
 * @api {delete} /api/user/delete/:id 删除
 * @apiDescription 删除
 * @apiName delete
 * @apiHeader {String} Authorization token
 * @apiParam {Number} id
 * @apiSampleRequest /api/user/delete
 * @apiGroup User
 * @apiVersion 0.0.1
 */
router.delete('/delete/:id', ValidateUser.delete, User.delete)
/**
 * 获取当前用户信息
 * @api {get} /api/user/userInfo 获取当前用户信息
 * @apiDescription 获取当前用户信息
 * @apiName userInfo
 * @apiHeader {String} Authorization token
 * @apiSampleRequest /api/user/userInfo
 * @apiGroup User
 * @apiVersion 0.0.1
 */
router.get('/userInfo', User.userInfo)
/**
 * 获取用户信息
 * @api {get} /api/user/getRow 获取用户信息
 * @apiDescription 获取用户信息
 * @apiName getRow
 * @apiHeader {String} Authorization token
 * @apiParam {Number} id
 * @apiSampleRequest /api/user/getRow
 * @apiGroup User
 * @apiVersion 0.0.1
 */
router.get('/getRow/:id', ValidateUser.getRow, User.getRow)
/**
 * 获取用户列表
 * @api {get} /api/user/getList 获取用户列表
 * @apiDescription 获取用户列表
 * @apiName getList
 * @apiHeader {String} Authorization token
 * @apiParam (path参数) {Number} curPage
 * @apiParam (path参数) {Number} pageSize
 * @apiParam (path参数) {String} account 账号
 * @apiParam (path参数) {String} name 昵称
 * @apiParam (path参数) {Number} create_user
 * @apiSampleRequest /api/user/getList
 * @apiGroup User
 * @apiVersion 0.0.1
 */
router.get('/getList', ValidateUser.getList, User.getList)
/**
 * 获取所有用户
 * @api {get} /api/user/getAll 获取所有用户
 * @apiDescription 获取所有用户
 * @apiName getAll
 * @apiHeader {String} Authorization token
 * @apiSampleRequest /api/user/getAll
 * @apiGroup User
 * @apiVersion 0.0.1
 */
router.get('/getAll', ValidateUser.getAll, User.getAll)
/**
 * 获取用户的权限数据
 * @api {get} /api/user/getPermissions 获取用户的权限数据
 * @apiDescription 获取用户的权限数据
 * @apiName getPermissions
 * @apiHeader {String} Authorization token
 * @apiSampleRequest /api/user/getPermissions
 * @apiGroup User
 * @apiVersion 0.0.1
 */
router.get('/getPermissions', ValidateUser.getPermissions, User.getPermissions)
/**
 * 获取当前用户创建用户
 * @api {getCreateUser} /api/user/getCreateUser/:id 获取当前用户创建用户
 * @apiDescription 获取当前用户创建用户
 * @apiName getCreateUser
 * @apiHeader {String} Authorization token
 * @apiParam {Number} id
 * @apiSampleRequest /api/user/getCreateUser
 * @apiGroup User
 * @apiVersion 0.0.1
 */
router.get('/getCreateUser/:id', ValidateUser.getCreateUser, User.getCreateUser)
/**
 * 用户转移
 * @api {userTransfer} /api/user/userTransfer 用户转移
 * @apiDescription 用户转移
 * @apiName userTransfer
 * @apiHeader {String} Authorization token
 * @apiParam {Object} Object
 * @apiSampleRequest /api/user/userTransfer
 * @apiGroup User
 * @apiVersion 0.0.1
 */
router.post('/userTransfer', ValidateUser.userTransfer, User.userTransfer)

export default router
