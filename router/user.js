import express from 'express'
import User from '../controller/User'
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
 * @apiVersion 1.0.0
 */
router.post('/registered', User.registered)
/**
 * 登录
 * @api {POST} /api/user/login 登录
 * @apiDescription 用户登录
 * @apiName login
 * @apiParam (参数) {String} account 账号
 * @apiParam (参数) {String} password 密码
 * @apiSampleRequest /api/user/login
 * @apiGroup User
 * @apiVersion 1.0.0
 */
router.post('/login', User.login)
/**
 * 编辑
 * @api {put} /api/user/update 编辑
 * @apiDescription 编辑
 * @apiName update
 * @apiParam (参数) {Object} data
 * @apiSampleRequest /api/user/update
 * @apiGroup User
 * @apiVersion 1.0.0
 */
router.put('/update', User.update)
/**
 * 删除
 * @api {delete} /api/user/delete/:id 删除
 * @apiDescription 用户登录
 * @apiName delete
 * @apiParam (path参数) {Number} id
 * @apiSampleRequest /api/user/delete
 * @apiGroup User
 * @apiVersion 1.0.0
 */
router.delete('/delete/:id', User.delete)
/**
 * 获取用户信息
 * @api {get} /api/user/userInfo 获取用户信息
 * @apiDescription 获取用户信息
 * @apiName userInfo
 * @apiParam (path参数) {Number} id
 * @apiSampleRequest /api/user/userInfo
 * @apiGroup User
 * @apiVersion 1.0.0
 */
router.get('/userInfo', User.userInfo)
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
 * @apiVersion 1.0.0
 */
router.get('/getList', User.getList)
/**
 * 获取所有用户
 * @api {get} /api/user/getAll 获取所有用户
 * @apiDescription 获取用户列表
 * @apiName getAll
 * @apiSampleRequest /api/user/getAll
 * @apiGroup User
 * @apiVersion 1.0.0
 */
router.get('/getAll', User.getAll)

export default router
