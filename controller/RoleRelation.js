import Base from './Base'
import RoleRelationModel from '../model/RoleRelation'

class RoleRelation extends Base {
  constructor () {
    super()
    this.setPermissions = this.setPermissions.bind(this)
    this.getPermissions = this.getPermissions.bind(this)
    this.setBindUser = this.setBindUser.bind(this)
    this.getBindUser = this.getBindUser.bind(this)
  }
  // 设置权限
  async setPermissions (req, res, next) {
    let userInfo = await this.getUserInfo(req), result,
        data = req.body
    try {
      result = await RoleRelationModel.setPermissions({
        get: {role_id: data.roleId},
        data: {
          menu: data.menu,
          permissions: data.permissions
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
    let userInfo = await this.getUserInfo(req), menu, permissions,
        role_id = req.query.roleId
    // TODO: 不是改用户创建的角色，用户不能查看到这个角色的权限
    try {
      menu = await RoleRelationModel.getMenu({get: {role_id}})
      permissions = await RoleRelationModel.getDataPerms({get: {role_id}})
    } catch (e) {
      this.handleException(req, res, e)
      return
    }
    res.json({
      code: 20000,
      success: true,
      content: {
        menu: menu.map(item => item.id),
        permissions: permissions.map(item => item.id)
      },
      message: '操作成功'
    })
  }
  // 设置绑定用户
  async setBindUser (req, res, next) {
    let userInfo = await this.getUserInfo(req), checkBind, result,
    data = req.body
    try {
      // 当传入的用户已经有绑定的角色, 并且当前要绑定的不是之前的角色，则不往下执行
      checkBind = await RoleRelationModel.checkBindUser(data.user)
      checkBind = checkBind.filter(item => {
        return item.role_id !== data.roleId
      })
      if (checkBind.length > 0) {
        res.json({
          code: 20000,
          success: false,
          content: {},
          message: `用户<${checkBind[0].name}>已绑定角色<${checkBind[0].role_name}>, 请先解绑`
        })
        return
      }
      result = await RoleRelationModel.setBindUser({
        get: {role_id: data.roleId},
        data: {
          user: data.user
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
  // 获取绑定用户
  async getBindUser (req, res, next) {
    let result, userInfo = await this.getUserInfo(req), role_id = req.query.roleId
    try {
      result = await RoleRelationModel.getBindUser({get: {role_id, userId: userInfo.id}})
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
