import express from 'express'
import Article from '../controller/Article'
import ValidateArticle from '../validate/Article'
const router = express.Router()

/**
 * 创建
 * @api {POST} /api/Article/create 创建
 * @apiDescription 创建文章
 * @apiName create
 * @apiHeader {String} Authorization token
 * @apiParam (参数) {String} title 标题
 * @apiParam (参数) {String} image 图片地址
 * @apiParam (参数) {Number} click 点击触发类型
 * @apiParam (参数) {String} href 跳转地址
 * @apiParam (参数) {Number} sort 排序
 * @apiParam (参数) {String} desc 描述
 * @apiParam (参数) {Number} status 状态
 * @apiSampleRequest /api/Article/create
 * @apiGroup Article
 * @apiVersion 0.0.1
 */
router.post('/create', ValidateArticle.create, Article.create)
/**
 * 编辑
 * @api {put} /api/Article/update 编辑
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
 * @apiSampleRequest /api/Article/update
 * @apiGroup Article
 * @apiVersion 0.0.1
 */
router.put('/update', ValidateArticle.update, Article.update)
/**
 * 删除
 * @api {delete} /api/Article/delete/:id 删除
 * @apiDescription 删除
 * @apiName delete
 * @apiHeader {String} Authorization token
 * @apiParam {Number} id
 * @apiSampleRequest /api/Article/delete
 * @apiGroup Article
 * @apiVersion 0.0.1
 */
router.delete('/delete/:id', ValidateArticle.delete, Article.delete)

/**
 * 获取文章信息
 * @api {get} /api/Article/getRow 获取文章信息
 * @apiDescription 获取文章信息
 * @apiName getRow
 * @apiHeader {String} Authorization token
 * @apiParam {Number} id
 * @apiSampleRequest /api/Article/getRow
 * @apiGroup Article
 * @apiVersion 0.0.1
 */
router.get('/getRow/:id', ValidateArticle.getRow, Article.getRow)
/**
 * 获取文章列表
 * @api {get} /api/Article/getList 获取文章列表
 * @apiDescription 获取文章列表
 * @apiName getList
 * @apiHeader {String} Authorization token
 * @apiParam (path参数) {Number} curPage
 * @apiParam (path参数) {Number} pageSize
 * @apiSampleRequest /api/Article/getList
 * @apiGroup Article
 * @apiVersion 0.0.1
 */
router.get('/getList', ValidateArticle.getList, Article.getList)
/**
 * 获取所有文章
 * @api {get} /api/Article/getAll 获取所有文章
 * @apiDescription 获取所有文章
 * @apiName getAll
 * @apiParam {Number} type
 * @apiHeader {String} Authorization token
 * @apiSampleRequest /api/Article/getAll
 * @apiGroup Article
 * @apiVersion 0.0.1
 */
router.get('/getAll', ValidateArticle.getAll, Article.getAll)

export default router
