import Base from './Base'

class RoleRelation extends Base{
  constructor () {
    super()
    this.setPermissions = this.setPermissions.bind(this)
    this.getPermissions = this.getPermissions.bind(this)
    this.setBindUser = this.setBindUser.bind(this)
    this.getBindUser = this.getBindUser.bind(this)
  }
  async setPermissions (req, res, next) {
    next()
  }
  async getPermissions (req, res, next) {
    next()
  }
  async setBindUser (req, res, next) {   
    next()
  }
  async getBindUser (req, res, next) {   
    next()
  }
}

export default new RoleRelation()
