import express from 'express'
import Mod from '../controller/Mod'
import ValidateMod from '../validate/Mod'
const router = express.Router()

/**
 * 创建
 * @api {POST} /api/Mod/create 创建
 * @apiDescription 创建模块
 * @apiName create
 * @apiHeader {String} Authorization token
 * @apiParam (参数) {Number} pid 父ID
 * @apiParam (参数) {Number} type 模块类型: 1. 管理平台模块 2. BBS模块 3. 移动端模块
 * @apiParam (参数) {String} code 模块编码
 * @apiParam (参数) {String} name 模块名称
 * @apiParam (参数) {String} icon 模块图标
 * @apiParam (参数) {String} redirect 重定向路径: 配置模块编码或URL
 * @apiParam (参数) {String} sort 排序
 * @apiParam (参数) {String} desc 描述
 * @apiParam (参数) {String} status 状态: 0：停用，1：启用(默认为1)
 * @apiSampleRequest /api/Mod/create
 * @apiGroup Mod
 * @apiVersion 0.0.1
 */
router.post('/create', ValidateMod.create, Mod.create)
/**
 * 编辑
 * @api {put} /api/Mod/update 编辑
 * @apiDescription 编辑
 * @apiName update
 * @apiHeader {String} Authorization token
 * @apiParam (参数) {Number} id
 * @apiParam (参数) {Number} pid 父ID
 * @apiParam (参数) {Number} type 模块类型: 1. 管理平台模块 2. BBS模块 3. 移动端模块
 * @apiParam (参数) {String} code 模块编码
 * @apiParam (参数) {String} name 模块名称
 * @apiParam (参数) {String} icon 模块图标
 * @apiParam (参数) {String} redirect 重定向路径: 配置模块编码或URL
 * @apiParam (参数) {String} sort 排序
 * @apiParam (参数) {String} desc 描述
 * @apiParam (参数) {String} status 状态: 0：停用，1：启用(默认为1)
 * @apiSampleRequest /api/Mod/update
 * @apiGroup Mod
 * @apiVersion 0.0.1
 */
router.put('/update', ValidateMod.update, Mod.update)
/**
 * 删除
 * @api {delete} /api/Mod/delete/:id 删除
 * @apiDescription 删除
 * @apiName delete
 * @apiHeader {String} Authorization token
 * @apiParam {Number} id
 * @apiSampleRequest /api/Mod/delete
 * @apiGroup Mod
 * @apiVersion 0.0.1
 */
router.delete('/delete/:id', ValidateMod.delete, Mod.delete)

/**
 * 获取模块信息
 * @api {get} /api/Mod/getRow 获取模块信息
 * @apiDescription 获取模块信息
 * @apiName getRow
 * @apiHeader {String} Authorization token
 * @apiParam {Number} id
 * @apiSampleRequest /api/Mod/getRow
 * @apiGroup Mod
 * @apiVersion 0.0.1
 */
router.get('/getRow/:id', ValidateMod.getRow, Mod.getRow)
/**
 * 获取模块列表
 * @api {get} /api/Mod/getList 获取模块列表
 * @apiDescription 获取模块列表
 * @apiName getList
 * @apiHeader {String} Authorization token
 * @apiParam (path参数) {Number} curPage
 * @apiParam (path参数) {Number} pageSize
 * @apiParam (path参数) {String} account 账号
 * @apiParam (path参数) {String} name 昵称
 * @apiParam (path参数) {Number} create_Mod
 * @apiSampleRequest /api/Mod/getList
 * @apiGroup Mod
 * @apiVersion 0.0.1
 */
router.get('/getList', ValidateMod.getList, Mod.getList)
/**
 * 获取用户拥有的所有模块
 * @api {get} /api/Mod/getUserMod 获取所有模块
 * @apiDescription 获取所有模块
 * @apiName getUserMod
 * @apiParam {Number} type
 * @apiHeader {String} Authorization token
 * @apiSampleRequest /api/Mod/getUserMod
 * @apiGroup Mod
 * @apiVersion 0.0.1
 */
router.get('/getUserMod', ValidateMod.getUserMod, Mod.getUserMod)
/**
 * 获取所有模块
 * @api {get} /api/Mod/getAll 获取所有模块
 * @apiDescription 获取所有模块
 * @apiName getAll
 * @apiParam {Number} type
 * @apiHeader {String} Authorization token
 * @apiSampleRequest /api/Mod/getAll
 * @apiGroup Mod
 * @apiVersion 0.0.1
 */
router.get('/getAll', ValidateMod.getAll, Mod.getAll)

export default router
