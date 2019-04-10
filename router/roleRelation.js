import express from 'express'
import RoleRelation from '../controller/RoleRelation'
import ValidateRoleRelation from '../validate/RoleRelation'
const router = express.Router()

/**
 * 设置角色权限
 * @api {POST} /api/RoleRelation/setPermissions 设置角色权限
 * @apiDescription 设置角色权限
 * @apiName setPermissions
 * @apiHeader {String} Authorization token
 * @apiParam (参数) {Object} Object
 * @apiSampleRequest /api/RoleRelation/setPermissions
 * @apiGroup RoleRelation
 * @apiVersion 0.0.1
 */
router.post('/setPermissions', ValidateRoleRelation.setPermissions, RoleRelation.setPermissions)
/**
 * 获取角色权限
 * @api {put} /api/RoleRelation/getPermissions 获取角色权限
 * @apiDescription 获取角色权限
 * @apiName getPermissions
 * @apiHeader {String} Authorization token
 * @apiSampleRequest /api/RoleRelation/getPermissions
 * @apiGroup RoleRelation
 * @apiVersion 0.0.1
 */
router.get('/getPermissions', ValidateRoleRelation.getPermissions, RoleRelation.getPermissions)
/**
 * 设置角色绑定用户
 * @api {POST} /api/RoleRelation/setBindUser 设置角色绑定用户
 * @apiDescription 设置角色绑定用户
 * @apiName setBindUser
 * @apiHeader {String} Authorization token
 * @apiParam (参数) {Object} Object
 * @apiSampleRequest /api/RoleRelation/setBindUser
 * @apiGroup RoleRelation
 * @apiVersion 0.0.1
 */
router.post('/setBindUser', ValidateRoleRelation.setBindUser, RoleRelation.setBindUser)
/**
 * 获取角色绑定的用户
 * @api {delete} /api/RoleRelation/getBindUser 获取角色绑定的用户
 * @apiDescription 获取角色绑定的用户
 * @apiName getBindUser
 * @apiHeader {String} Authorization token
 * @apiSampleRequest /api/RoleRelation/getBindUser
 * @apiGroup RoleRelation
 * @apiVersion 0.0.1
 */
router.get('/getBindUser', ValidateRoleRelation.getBindUser, RoleRelation.getBindUser)

export default router
