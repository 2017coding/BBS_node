import express from 'express'
import Question from '../controller/Question'
import ValidateQuestion from '../validate/Question'
const router = express.Router()

/**
 * 创建
 * @api {POST} /api/Question/create 创建
 * @apiDescription 创建问题
 * @apiName create
 * @apiHeader {String} Authorization token
 * @apiParam (参数) {Number} pid 父ID
 * @apiParam (参数) {String} name 问题名称
 * @apiParam (参数) {String} columns 专栏数量
 * @apiParam (参数) {Number} users 可创建用户数
 * @apiParam (参数) {Number} desc 描述
 * @apiParam (参数) {String} status 状态: 0：停用，1：启用(默认为1)
 * @apiSampleRequest /api/Question/create
 * @apiGroup Question
 * @apiVersion 0.0.1
 */
router.post('/create', ValidateQuestion.create, Question.create)
/**
 * 编辑
 * @api {put} /api/Question/update 编辑
 * @apiDescription 编辑
 * @apiName update
 * @apiHeader {String} Authorization token
 * @apiParam (参数) {Number} id
 * @apiParam (参数) {Number} pid 父ID
 * @apiParam (参数) {String} name 问题名称
 * @apiParam (参数) {String} columns 专栏数量
 * @apiParam (参数) {Number} users 可创建用户数
 * @apiParam (参数) {Number} desc 描述
 * @apiParam (参数) {String} status 状态: 0：停用，1：启用(默认为1)
 * @apiSampleRequest /api/Question/update
 * @apiGroup Question
 * @apiVersion 0.0.1
 */
router.put('/update', ValidateQuestion.update, Question.update)
/**
 * 删除
 * @api {delete} /api/Question/delete/:id 删除
 * @apiDescription 删除
 * @apiName delete
 * @apiHeader {String} Authorization token
 * @apiParam {Number} id
 * @apiSampleRequest /api/Question/delete
 * @apiGroup Question
 * @apiVersion 0.0.1
 */
router.delete('/delete/:id', ValidateQuestion.delete, Question.delete)

/**
 * 获取问题信息
 * @api {get} /api/Question/getRow 获取问题信息
 * @apiDescription 获取问题信息
 * @apiName getRow
 * @apiHeader {String} Authorization token
 * @apiParam {Number} id
 * @apiSampleRequest /api/Question/getRow
 * @apiGroup Question
 * @apiVersion 0.0.1
 */
router.get('/getRow/:id', ValidateQuestion.getRow, Question.getRow)
/**
 * 获取问题列表
 * @api {get} /api/Question/getList 获取问题列表
 * @apiDescription 获取问题列表
 * @apiName getList
 * @apiHeader {String} Authorization token
 * @apiParam (path参数) {Number} curPage
 * @apiParam (path参数) {Number} pageSize
 * @apiParam (path参数) {String} name 问题名称
 * @apiSampleRequest /api/Question/getList
 * @apiGroup Question
 * @apiVersion 0.0.1
 */
router.get('/getList', ValidateQuestion.getList, Question.getList)
/**
 * 获取所有问题
 * @api {get} /api/Question/getAll 获取所有问题
 * @apiDescription 获取所有问题
 * @apiName getAll
 * @apiHeader {String} Authorization token
 * @apiSampleRequest /api/Question/getAll
 * @apiGroup Question
 * @apiVersion 0.0.1
 */
router.get('/getAll', ValidateQuestion.getAll, Question.getAll)

export default router
