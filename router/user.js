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
 * @apiParam (参数) {String} account 账号
 * @apiParam (参数) {String} password 密码
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
 * @apiParam (参数) {Object} data
 * @apiSampleRequest /api/user/update
 * @apiGroup User
 * @apiVersion 0.0.1
 */
router.put('/update', ValidateUser.update, User.update)
/**
 * 删除
 * @api {delete} /api/user/delete/:id 删除
 * @apiDescription 用户登录
 * @apiName delete
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
 * @apiParam {Number} id
 * @apiSampleRequest /api/user/getRow
 * @apiGroup User
 * @apiVersion 0.0.1
 */
router.get('/getRow', User.getRow)
/**
 * 获取用户列表
 * @api {get} /api/user/getList 获取用户列表
 * @apiDescription 获取用户列表
 * @apiName getList
 * @apiParam (path参数) {Number} curPage
 * @apiParam (path参数) {Number} pageSize
 * @apiParam (path参数) {Number} create_user
 * @apiSampleRequest /api/user/getList
 * @apiGroup User
 * @apiVersion 0.0.1
 */
router.get('/getList', User.getList)
/**
 * 获取所有用户
 * @api {get} /api/user/getAll 获取所有用户
 * @apiDescription 获取用户列表
 * @apiName getAll
 * @apiSampleRequest /api/user/getAll
 * @apiGroup User
 * @apiVersion 0.0.1
 */
router.get('/getAll', ValidateUser.getAll, User.getAll)

export default router
