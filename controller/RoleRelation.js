import Base from './Base'
import RoleRelationModel from '../model/RoleRelation'

class RoleRelation extends Base {
  constructor () {
    super()
    this.setPermissions = this.setPermissions.bind(this)
    this.getPermissions = this.getPermissions.bind(this)
    this.getBindUser = this.getBindUser.bind(this)
  }
  // 设置权限
  async setPermissions (req, res, next) {
    let userInfo = this.getUserInfo(req), result,
        data = req.body, modList = [], permissionsList = []
        data.mod.forEach(item => {
          modList.push([data.roleId, item])
        })
        data.permissions.forEach(item => {
          permissionsList.push([data.roleId, item])
        })
    try {
      result = await RoleRelationModel.setPermissions({
        del: {get: {role_id: data.roleId}},
        set: {
          key: {
            mod: [`role_id`, `mod_id`],
            permissions: [`role_id`, `data_permissions_id`]
          }, 
          values: {
            mod: modList,
            permissions: permissionsList || []
          }
        }
      })
    } catch (e) {
      this.handleException(req, res, e)
      return
    }
    if (result) {
      res.json({
        code: 20000,
        success: true,
        content: {},
        message: '操作成功'
      })
    } else {
      res.json({
        code: 20001,
        success: false,
        content: {},
        message: '操作失败'
      })
    }
  }
  // 获取权限
  async getPermissions (req, res, next) {
    let userInfo = this.getUserInfo(req), mod, permissions,
        role_id = req.query.roleId
    // TODO: 不是改用户创建的角色，用户不能查看到这个角色的权限
    try {
      mod = await RoleRelationModel.getMod({get: {role_id}})
      permissions = await RoleRelationModel.getDataControl({get: {role_id}})
    } catch (e) {
      this.handleException(req, res, e)
      return
    }
    res.json({
      code: 20000,
      success: true,
      content: {
        mod: mod.map(item => item.id),
        permissions: permissions.map(item => item.id)
      },
      message: '操作成功'
    })
  }
  // 获取绑定用户
  async getBindUser (req, res, next) {
    let result
    try {
      result = await RoleRelationModel.getBindUser({get: {role_id: -1}})
    } catch (e) {
      this.handleException(req, res, e)
      return
    }
    res.json({
      code: 20000,
      success: true,
      content: result,
      message: '操作成功'
    })
  }
}

export default new RoleRelation()
