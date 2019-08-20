import express from 'express'
import ArticleComments from '../controller/ArticleComments'
import ValidateArticleComments from '../validate/ArticleComments'
const router = express.Router()

/**
 * 创建
 * @api {POST} /api/ArticleComments/create 创建
 * @apiDescription 创建评论
 * @apiName create
 * @apiHeader {String} Authorization token
 * @apiParam (参数) {Number} article_id 文章ID
 * @apiParam (参数) {Number} pid 父节点，默认为0
 * @apiParam (参数) {String} content 内容
 * @apiSampleRequest /api/ArticleComments/create
 * @apiGroup Article
 * @apiVersion 0.0.1
 */
router.post('/create', ValidateArticleComments.create, ArticleComments.create)

/**
 * 删除
 * @api {delete} /api/ArticleComments/delete/:id 删除
 * @apiDescription 删除
 * @apiName delete
 * @apiHeader {String} Authorization token
 * @apiParam {Number} id
 * @apiSampleRequest /api/ArticleComments/delete
 * @apiGroup Article
 * @apiVersion 0.0.1
 */
router.delete('/delete/:id', ValidateArticleComments.delete, ArticleComments.delete)

/**
 * 获取所有评论
 * @api {get} /api/ArticleComments/getAll 获取所有评论
 * @apiDescription 获取所有评论
 * @apiName getAll
 * @apiParam {Number} type
 * @apiHeader {String} Authorization token
 * @apiSampleRequest /api/ArticleComments/getAll
 * @apiGroup Article
 * @apiVersion 0.0.1
 */
router.get('/getAll', ValidateArticleComments.getAll, ArticleComments.getAll)

export default router
