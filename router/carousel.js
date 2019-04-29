import express from 'express'
import Carousel from '../controller/Carousel'
import ValidateCarousel from '../validate/Carousel'
const router = express.Router()

/**
 * 创建
 * @api {POST} /api/Carousel/create 创建
 * @apiDescription 创建轮播
 * @apiName create
 * @apiHeader {String} Authorization token
 * @apiParam (参数) {String} title 标题
 * @apiParam (参数) {String} image 图片地址
 * @apiParam (参数) {Number} click 点击触发类型
 * @apiParam (参数) {String} href 跳转地址
 * @apiParam (参数) {Number} sort 排序
 * @apiParam (参数) {String} desc 描述
 * @apiParam (参数) {Number} status 状态
 * @apiSampleRequest /api/Carousel/create
 * @apiGroup Carousel
 * @apiVersion 0.0.1
 */
router.post('/create', ValidateCarousel.create, Carousel.create)
/**
 * 编辑
 * @api {put} /api/Carousel/update 编辑
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
 * @apiSampleRequest /api/Carousel/update
 * @apiGroup Carousel
 * @apiVersion 0.0.1
 */
router.put('/update', ValidateCarousel.update, Carousel.update)
/**
 * 删除
 * @api {delete} /api/Carousel/delete/:id 删除
 * @apiDescription 删除
 * @apiName delete
 * @apiHeader {String} Authorization token
 * @apiParam {Number} id
 * @apiSampleRequest /api/Carousel/delete
 * @apiGroup Carousel
 * @apiVersion 0.0.1
 */
router.delete('/delete/:id', ValidateCarousel.delete, Carousel.delete)

/**
 * 获取轮播信息
 * @api {get} /api/Carousel/getRow 获取轮播信息
 * @apiDescription 获取轮播信息
 * @apiName getRow
 * @apiHeader {String} Authorization token
 * @apiParam {Number} id
 * @apiSampleRequest /api/Carousel/getRow
 * @apiGroup Carousel
 * @apiVersion 0.0.1
 */
router.get('/getRow/:id', ValidateCarousel.getRow, Carousel.getRow)
/**
 * 获取轮播列表
 * @api {get} /api/Carousel/getList 获取轮播列表
 * @apiDescription 获取轮播列表
 * @apiName getList
 * @apiHeader {String} Authorization token
 * @apiParam (path参数) {Number} curPage
 * @apiParam (path参数) {Number} pageSize
 * @apiSampleRequest /api/Carousel/getList
 * @apiGroup Carousel
 * @apiVersion 0.0.1
 */
router.get('/getList', ValidateCarousel.getList, Carousel.getList)
/**
 * 获取所有轮播
 * @api {get} /api/Carousel/getAll 获取所有轮播
 * @apiDescription 获取所有轮播
 * @apiName getAll
 * @apiParam {Number} type
 * @apiHeader {String} Authorization token
 * @apiSampleRequest /api/Carousel/getAll
 * @apiGroup Carousel
 * @apiVersion 0.0.1
 */
router.get('/getAll', ValidateCarousel.getAll, Carousel.getAll)

export default router
