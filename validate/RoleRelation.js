import BaseValidate from './BaseValidate'

class RoleRelation extends BaseValidate{
  constructor () {
    super()
    this.setPermissions = this.setPermissions.bind(this)
    this.getPermissions = this.getPermissions.bind(this)
    this.getBindUser = this.getBindUser.bind(this)
  }
  async setPermissions (req, res, next) {
    next()
  }
  async getPermissions (req, res, next) {
    next()
  }
  async getBindUser (req, res, next) {   
    next()
  }
}

export default new RoleRelation()
